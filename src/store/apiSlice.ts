import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICard } from "../utils/types";
import { HYDRATE } from "next-redux-wrapper";
import { setCardsList, setTotalCount, setTotalPages } from "./cardList/cardListSlice";
import { setDetailedCard } from "./details/detailsSlice";

export const apiSlice = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mock-server-api-nastasyma.vercel.app",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCards: builder.query<
      { cardsList: ICard[]; totalCount: number; totalPages: number },
      { searchText?: string; page?: number; itemsPerPage?: number }
    >({
      query: ({ searchText, page = 1, itemsPerPage = 4 }) => ({
        url: "/catalog",
        params: {
          _limit: itemsPerPage,
          _page: page,
          ...(searchText && searchText.trim() !== ""
            ? { title_like: searchText }
            : {}),
        },
      }),
      transformResponse(response: ICard[], meta, context) {
        const totalCount = Number(meta?.response?.headers.get("X-Total-Count"));
        const itemsPerPage = context.itemsPerPage || 4;
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        return {
          cardsList: response,
          totalCount,
          totalPages,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        dispatch(setCardsList({ cardsList: data.data.cardsList }));
        dispatch(setTotalCount({ totalCount: data.data.totalCount }));
        dispatch(setTotalPages({ totalPages: data.data.totalPages }));
      },
    }),
    getDetailedCard: builder.query<ICard, string>({
      query: (id) => `/catalog/${id}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        dispatch(setDetailedCard({ detailedCard: data.data }));
      },
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetDetailedCardQuery,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getCards, getDetailedCard } = apiSlice.endpoints;
