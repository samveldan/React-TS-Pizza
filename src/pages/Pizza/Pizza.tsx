import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styles from './pizza.module.scss';
import { fetchBought, setCurrentPizza } from '../../redux/reducers/pizzasReducer.ts';
import { useSearchParams } from 'react-router-dom';
import PizzaLoader from '../../components/pizza-loader/PizzaLoader.tsx';
import debounce from 'lodash.debounce';
import { dispatchState, rootState, store } from '../../redux/store.ts';

const Pizza: React.FC  = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const idQuery = searchParams.get('id');
  const { currentPizza, bought } = useSelector((state: rootState) => state.pizzas);
  let [pizzaTypes, setPizzaTypes] = React.useState<Array<number>>([]);
  let [pizzaSizes, setPizzaSizes] = React.useState<Array<number>>([]);
  let [pizzaPrice, setPizzaPrice] = React.useState(0);
  const dispatch: dispatchState = useDispatch();

  const textTypes = ['тонкое', 'традиционное'];
  const [pizzaLoaded, setPizzaLoaded] = React.useState(false);
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [counter, setCounter] = React.useState(1);
  const [btnCounter, setBtnCounter] = React.useState(0);

  React.useEffect(() => {
    axios.get(`https://628ff784dc4785236549c5a3.mockapi.io/pizzas?id=${idQuery}`).then((item) => {
      dispatch(setCurrentPizza(item.data[0]));
      setActiveType(item.data[0].info[0].type);
      setPizzaLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    const localTypes: number[] = [];
    const localSizes: number[] = [];

    type ItemProps = {
      type: number;
      size: number;
      price: number;
    }

    if (pizzaLoaded) {
      currentPizza.info.forEach((item: ItemProps) => {
        if (!localTypes.includes(item.type)) localTypes.push(item.type);
        if (!localSizes.includes(item.size)) localSizes.push(item.size);
      });

      setPizzaTypes(localTypes);
      setPizzaSizes(localSizes);
      setActiveType(currentPizza.info[0].type);
    }
  }, [pizzaLoaded]);

  React.useEffect(() => {
    if (pizzaLoaded) {
      setBtnCounter(0);
      currentPizza.info.forEach((item) => {
        if (item.type == activeType && item.size == pizzaSizes[activeSize]) {
          setPizzaPrice(item.price);
        }
      });
    }
  }, [activeType, activeSize, pizzaSizes]);

  const sendPizza = debounce((item) => {
    axios
      .post('https://628ff784dc4785236549c5a3.mockapi.io/bought', item)
      .then(() => dispatch(fetchBought()));
  }, 500);

  const putPizza = debounce((item) => {
    axios
      .put(`https://628ff784dc4785236549c5a3.mockapi.io/bought/${item.id}`, {
        amount: item.amount + counter,
      })
      .then(() => dispatch(fetchBought()));
  }, 500);

  const buyPizza = React.useCallback(() => {
    const boughtItem = {
      title: currentPizza.title,
      imageUrl: currentPizza.imageUrl,
      type: activeType,
      size: pizzaSizes[activeSize],
      price: pizzaPrice,
      amount: counter,
    };

    if (bought.length == 0) sendPizza(boughtItem);
    else {
      const hasItem = bought.find((item) => {
        if (
          item.title == boughtItem.title &&
          item.type == boughtItem.type &&
          item.size == boughtItem.size
        ) {
          putPizza(item);
          return item;
        }
      });

      if (!hasItem) sendPizza(boughtItem);
    }
    setCounter(1);
  }, [currentPizza, bought, pizzaSizes, pizzaTypes, pizzaPrice]);

  return (
    <div className={styles.pizza}>
      {pizzaLoaded ? (
        <>
          {' '}
          <img src={currentPizza.imageUrl} alt="" className={styles.item} />
          <div className={styles.info}>
            <h2 className={styles.title}>{currentPizza.title}</h2>
            <span className={styles.subtitle}>
              {pizzaSizes[activeSize]} см, {textTypes[activeType]} тесто
            </span>
            <div className={styles.controlls}>
              <div>
                {pizzaTypes.map((type, index) => {
                  return (
                    <button
                      key={index}
                      className={activeType == type ? styles.activeBtn : ''}
                      onClick={() => setActiveType(type)}>
                      {textTypes[index]}
                    </button>
                  );
                })}
              </div>
              <div>
                {pizzaSizes.map((size, index) => {
                  return (
                    <button
                      key={index}
                      className={activeSize == index ? styles.activeBtn : ''}
                      onClick={() => setActiveSize(index)}>
                      {size} см
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.footerPrice}>
                <span>{pizzaPrice}</span>
                <svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z"
                    fill="white"
                  />
                </svg>
              </div>
              <button
                className={styles.footerBtn}
                onClick={() => {
                  setCounter((prev) => prev + 1);
                  buyPizza();
                  setBtnCounter((prev) => prev + 1);
                }}>
                <div className={styles.footerBtnPlus}>
                  <span></span>
                  <span></span>
                </div>
                <span>Добавить</span>
                <span
                  className={`${styles.footerBtnAmount} ${
                    btnCounter > 0 ? styles.amountActive : ''
                  }`}>
                  {btnCounter}
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <PizzaLoader />
      )}
    </div>
  );
};

export default Pizza;
