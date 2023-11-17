import { useSearchParams } from 'react-router-dom';
import styles from './ItemsPerPage.module.scss';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setItemsPerPage, setPage } from '../../store/cardList/cardListSlice';

interface ItemsPerPageProps {
  count: string | null;
}

function ItemsPerPage(props: ItemsPerPageProps): JSX.Element {
  const { count } = props;
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = parseInt(searchParams.get('limit') || '0');

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value !== itemsPerPage) {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        searchParams.set('limit', value.toString());
        return searchParams;
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
