import React, { Dispatch } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBought,
  fetchPizzas,
  searchItems,
  sortItems,
} from '../../redux/reducers/pizzasReducer.ts';
import {
  setCategory,
  setCurrentPage,
  setPages,
  setSort,
} from '../../redux/reducers/filtersReducer.ts';
import Home from '../../pages/Home/Home.tsx';
import Cart from '../../pages/Cart/Cart.tsx';
import Pizza from '../../pages/Pizza/Pizza.tsx';
import NotFound from '../../pages/404/404.tsx';
import './app.scss';
import { setItems, setTotal } from '../../redux/reducers/cartReducer.ts';
import MainLayout from '../../layouts/MainLayout.tsx';
import { store } from '../../redux/store.ts';
import { rootState, dispatchState } from '../../redux/store.ts';

const App: React.FC = () => {
  const dispatch: dispatchState = useDispatch();
  const {
    filters: { category, sort },
    pizzas: { search, data, filteredData, bought },
  } = useSelector((state: rootState) => state);

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    dispatch(fetchPizzas());
    dispatch(fetchBought());

    dispatch(
      setCategory(searchParams.has('category') ? Number(searchParams.get('category')) : 0),
    );
    dispatch(setSort(searchParams.has('sort') ? Number(searchParams.get('sort')) : 0));
    dispatch(setCurrentPage(searchParams.has('page') ? Number(searchParams.get('page')) : 0));
  }, []);

  React.useEffect(() => {
    dispatch(setPages(Math.ceil(filteredData.length / 4)));
  }, [filteredData]);

  const [amountItems, setAmountItems] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  React.useEffect(() => {
    setAmountItems(0);
    setTotalItems(0);

    bought.forEach((item) => {
      setAmountItems((prev) => prev + 1);
      setTotalItems((prev) => (prev += item.price * item.amount));
    });
  }, [bought]);

  React.useEffect(() => {
    dispatch(setItems(amountItems));
    dispatch(setTotal(totalItems));
  }, [amountItems, totalItems]);

  React.useEffect(() => {
    dispatch(sortItems({ category, sort }));
  }, [data]);

  React.useEffect(() => {
    dispatch(sortItems({ category, sort }));
    if (search.length > 0) dispatch(searchItems(search));
  }, [category, sort, search]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="pizza" element={<Pizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
