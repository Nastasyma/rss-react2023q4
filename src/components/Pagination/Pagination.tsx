import { SetURLSearchParams } from 'react-router-dom';
import styles from './Pagination.module.scss';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setPage } from '../../store/cardList/cardListSlice';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setSearchParams: SetURLSearchParams;
}

function Pagination({ totalPages, currentPage, setSearchParams }: PaginationProps): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const handlePageChange = (page: number): void => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
    dispatch(setPage({ page: page }));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={styles.paginationButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
