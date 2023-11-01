import { useSearchParams } from 'react-router-dom';
import styles from './ItemsPerPage.module.scss';

interface ItemsPerPageProps {
  count: string | null;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function ItemsPerPage(props: ItemsPerPageProps): JSX.Element {
  const { count, itemsPerPage, setItemsPerPage } = props;

  const [, setSearchParams] = useSearchParams();

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value !== itemsPerPage) {
      setItemsPerPage(value);
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
      localStorage.setItem('itemsPerPage-mushrooms', value.toString());
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
