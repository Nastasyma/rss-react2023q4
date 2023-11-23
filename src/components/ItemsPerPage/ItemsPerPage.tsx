import styles from './ItemsPerPage.module.scss';
import { useRouter } from 'next/router';

interface ItemsPerPageProps {
  count?: number;
}

function ItemsPerPage(props: ItemsPerPageProps): JSX.Element {
  const { count } = props;
  const router = useRouter();
  const itemsPerPage = parseInt((router.query.limit as string) || '0');

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value !== itemsPerPage) {
      const queryParams = {
        ...router.query,
        page: '1',
        limit: String(value),
      };
      router.push({
        pathname: router.pathname,
        query: queryParams,
      });
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
