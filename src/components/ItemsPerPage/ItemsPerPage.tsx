
import styles from './ItemsPerPage.module.scss';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setItemsPerPage, setPage } from '../../store/cardList/cardListSlice';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

interface ItemsPerPageProps {
  count?: number;
}

function ItemsPerPage(props: ItemsPerPageProps): JSX.Element {
  const { count } = props;
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const itemsPerPage = parseInt(searchParams.get('limit') || '0');
  const router = useRouter();

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value !== itemsPerPage) {
      const queryParams = {
        ...router.query,
        page: "1",
        limit: String(value),
      };
      router.push({
        pathname: router.pathname,
        query: queryParams,
      });
      dispatch(setItemsPerPage({ itemsPerPage: value }));
      dispatch(setPage({ page: 1 }));
    }
  };

  return (
    <div className={styles.itemsPerPage}>
      <label htmlFor="itemsPerPage">Items per page:</label>
      <input
        type="number"
        id="itemsPerPage"
        value={itemsPerPage}
        min="1"
        max={count !== null ? count : undefined}
        onChange={handleItemsPerPageChange}
      />
    </div>
  );
}

export default ItemsPerPage;
