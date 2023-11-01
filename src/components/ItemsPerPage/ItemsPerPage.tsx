import styles from './ItemsPerPage.module.scss';

interface ItemsPerPageProps {
  count: string | null;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function ItemsPerPage(props: ItemsPerPageProps): JSX.Element {
  const { count, itemsPerPage, setItemsPerPage, setCurrentPage } = props;

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value !== itemsPerPage) {
      setItemsPerPage(value);
      setCurrentPage(1);
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
