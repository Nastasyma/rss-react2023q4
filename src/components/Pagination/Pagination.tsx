import styles from './Pagination.module.scss';
import { useRouter } from 'next/router';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

function Pagination({ totalPages, currentPage }: PaginationProps): JSX.Element {
  const router = useRouter();
  const handlePageChange = (page: number): void => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: String(page),
      },
    });
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
