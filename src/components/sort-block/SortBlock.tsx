import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/reducers/filtersReducer.ts';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './sortBlock.module.scss';
import { dispatchState, rootState } from '../../redux/store.ts';

const SortBlock: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortQuery = searchParams.get('sort');

  const dispatch: dispatchState = useDispatch();
  const { sort } = useSelector((state: rootState) => state.filters);
  const [activePopupItem, setActivePopupItem] = React.useState(
    searchParams.has('sort') ? sortQuery : sort,
  );
  const [openPopup, setOpenPopup] = React.useState(false);
  const popupItems = ['популярности', 'по цене', 'по алфавиту'];

  const onClickLi = (index: number) => {
    setActivePopupItem(index);
    setOpenPopup(false);
    dispatch(setSort(index));
    setSearchParams(Object.fromEntries([...searchParams.entries(), ['sort', index]]));
  };

  React.useEffect(() => {
    setActivePopupItem(searchParams.has('sort') ? sortQuery : sort);
  }, [searchParams]);

  React.useEffect(() => {
    const handleSort = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (!target.closest(`.${styles.sortBlock}`)) {
        setOpenPopup(false);
      }
    };

    window.addEventListener('click', handleSort);

    return () => {
      window.removeEventListener('click', handleSort);
    };
  }, []);

  return (
    <div className={styles.sortBlock}>
      <button onClick={() => setOpenPopup((prev) => !prev)}>
        <img
          src={require('../../assets/images/sort-arrow.svg').default}
          alt=""
          className={openPopup ? styles.arrowActive : ''}
        />
        <span>Сортировка по: </span>
        <span className={styles.sortBlockPopul}>{popupItems[activePopupItem]}</span>
      </button>
      <ul className={`${styles.popup} ${openPopup ? styles.popupActive : ''}`}>
        {popupItems.map((item, index) => {
          return (
            <li
              key={index}
              className={popupItems[activePopupItem] == item ? styles.activeLi : ''}
              onClick={() => onClickLi(index)}>
              <button>{item}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SortBlock;
