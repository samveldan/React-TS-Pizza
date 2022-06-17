import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/reducers/filtersReducer.ts';
import { dispatchState, rootState } from '../../redux/store.ts';
import styles from './pagination.module.scss';

const Pagination: React.FC  = () => {
  const dispatch: dispatchState = useDispatch();
  const {
    filters: { currentPage, pages },
  } = useSelector((state: rootState) => state);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected))}
      forcePage={currentPage}
      pageRangeDisplayed={4}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className={styles.pagination}
    />
  );
};

export default Pagination;
