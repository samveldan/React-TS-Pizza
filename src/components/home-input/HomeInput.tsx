import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/reducers/pizzasReducer.ts';
import styles from './homeInput.module.scss';
import { setCurrentPage } from '../../redux/reducers/filtersReducer.ts';
import { dispatchState } from '../../redux/store.ts';

const HomeInput: React.FC  = () => {
  const dispatch: dispatchState = useDispatch();
  const [value, setValue] = React.useState('');

  const useValue = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    setValue(e.target.value);
    dispatch(setCurrentPage(0));
  }, []);

  return (
    <div className={styles.root}>
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
        <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
      <input
        value={value}
        type="text"
        className={styles.input}
        placeholder="Найти пиццу ..."
        onChange={useValue}
      />
    </div>
  );
};

export default HomeInput;