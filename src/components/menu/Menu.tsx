import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrentPage } from '../../redux/reducers/filtersReducer.ts';
import { Link, useSearchParams } from 'react-router-dom';
import SortBlock from '../sort-block/SortBlock.tsx';
import styles from './menu.module.scss';
import { dispatchState } from '../../redux/store.ts';
import { rootState } from '../../redux/store';

const Menu: React.FC  = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');

  const dispatch: dispatchState = useDispatch();
  const { category, currentPage } = useSelector((state: rootState) => state.filters);
  const menuItems = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeItem, setActiveItem] = React.useState<number>(category);

  React.useEffect(() => {
    setActiveItem(searchParams.has('category') ? categoryQuery : category);
  }, [searchParams]);

  React.useEffect(() => {
    setSearchParams(Object.fromEntries([...searchParams.entries(), ['page', currentPage]]));
  }, [currentPage]);

  return (
    <div className={styles.menu}>
      <div className="container">
        <div className={styles.wrapper}>
          <ul className={styles.menuUl}>
            {menuItems.map((item, index) => {
              return (
                <li
                  key={index}
                  data-category={index}
                  className={menuItems[activeItem] == item ? styles.active : ''}
                  onClick={() => {
                    setActiveItem(index);
                    setSearchParams(
                      Object.fromEntries([
                        ...searchParams.entries(),
                        ['category', index],
                        ['page', currentPage],
                      ]),
                    );
                    dispatch(setCategory(index));
                    dispatch(setCurrentPage(0));
                  }}>
                  {item}
                </li>
              );
            })}
          </ul>
          <SortBlock />
        </div>
      </div>
    </div>
  );
};

export default Menu;
