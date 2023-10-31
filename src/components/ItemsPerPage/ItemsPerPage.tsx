import styles from './ItemsPerPage.module.scss';

interface ItemsPerPageProps {
  value: number;
  max: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ItemsPerPage(props: ItemsPerPageProps): JSX.Element {
  const { value, max, onChange } = props;

  return (
    <div className={styles.itemsPerPage}>
      <label htmlFor="itemsPerPage">Items per page:</label>
      <input type="number" id="itemsPerPage" value={value} min="0" max={max} onChange={onChange} />
    </div>
  );
}

export default ItemsPerPage;
