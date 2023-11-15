import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICard } from '../utils/types';

export const apiSlice = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mock-server-api-nastasyma.vercel.app',
  }),
  endpoints: (builder) => ({
    getCards: builder.query<
      { cards: ICard[]; totalCount: number },
      { searchText?: string; page?: number; itemsPerPage?: number }
    >({
      query: ({ searchText, page = 1, itemsPerPage = 4 }) => ({
        url: '/catalog',
        params: {
          _limit: itemsPerPage,
          _page: page,
          ...(searchText && searchText.trim() !== '' ? { title_like: searchText } : {}),
        },
      }),
      transformResponse(response: ICard[], meta) {
        return {
          cards: response,
          totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
        };
      },
    }),
    getDetailedCard: builder.query<ICard, string>({
      query: (id) => `/catalog/${id}`,
    }),
  }),
});
