import { useRouter } from "next/router";
import styles from "./MainSection.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import ItemsPerPage from "../../components/ItemsPerPage/ItemsPerPage";
import CardsList from "../CardsList/CardsList";
import { IData } from "@/utils/types";

function MainSection({ data }: { data: IData }): JSX.Element {
  // const isLoadingCards = useSelector(selectIsCardsLoading);
  // const id = useSearchParams().get('mushroom');
  const router = useRouter();
  const page = router.query.page || "1";

  return (
    <div className={styles.mainContainer}>
      {/* <div className={id ? styles.cardsContainer : ''}> */}
      <div className={styles.cardsList}>
        {/* {id && (
            <div
              className={styles.overlay}
              onClick={() => {
                setSearchParams((searchParams) => {
                  searchParams.delete('mushroom');
                  return searchParams;
                });
              }}
            />
          )} */}
        <ItemsPerPage count={data.totalCount} />
        <Pagination
          totalPages={Number(data.totalPages)}
          currentPage={Number(page)}
        />
        <CardsList cards={data.cards} />
      </div>
    </div>
    // </div>
  );
}

export default MainSection;
