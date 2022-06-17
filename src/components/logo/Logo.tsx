import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory, setCurrentPage, setSort } from '../../redux/reducers/filtersReducer.ts';
import { dispatchState } from '../../redux/store.ts';
import styles from './logo.module.scss';

const Logo: React.FC = () => {
  const dispatch: dispatchState = useDispatch();

  return (
    <div
      className={styles.logo}
      onClick={() => {
        dispatch(setCategory(0));
        dispatch(setSort(0));
        dispatch(setCurrentPage(0));
      }}>
      <img src={require('../../assets/images/logo.png')} alt="" />
      <div className={styles.content}>
        <h3>React Pizza</h3>
        <span>самая вкусная пицца во вселенной</span>
      </div>
    </div>
  );
};

export default Logo;
