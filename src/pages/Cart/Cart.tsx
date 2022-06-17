import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBought } from '../../redux/reducers/pizzasReducer.ts';
import { dispatchState, rootState, store } from '../../redux/store.ts';
import styles from './cart.module.scss';

const Cart: React.FC = () => {
  const dispatch: dispatchState = useDispatch();
  const {
    pizzas: { bought },
    cart: { items, total },
  } = useSelector((state: rootState) => state);

  const types = ['тонкое', 'традиционное'];

  const wait = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), ms);
    });
  };

  const minusAmount = (item) => {
    if (item.amount == 1) {
      axios
        .delete(`https://628ff784dc4785236549c5a3.mockapi.io/bought/${item.id}`)
        .then(() => dispatch(fetchBought()));
    } else {
      axios
        .put(`https://628ff784dc4785236549c5a3.mockapi.io/bought/${item.id}`, {
          amount: item.amount - 1,
        })
        .then(() => dispatch(fetchBought()));
    }
  };

  const plusAmount = (item) => {
    axios
      .put(`https://628ff784dc4785236549c5a3.mockapi.io/bought/${item.id}`, {
        amount: item.amount + 1,
      })
      .then(() => dispatch(fetchBought()));
  };

  const removeItem = (item) => {
    axios
      .delete(`https://628ff784dc4785236549c5a3.mockapi.io/bought/${item.id}`)
      .then(() => dispatch(fetchBought()));
  };

  const cleanCart = (items) => {
    (async function () {
      for (const item of items) {
        console.log('WAIT');
        axios
          .delete(`https://628ff784dc4785236549c5a3.mockapi.io/bought/${item.id}`)
          .then(() => dispatch(fetchBought()));
        await wait(300);
      }
    })();
  };

  return (
    <div className={styles.cart}>
      <div className="container">
        <div className={styles.wrapper}>
          {bought.length > 0 ? (
            <div className={styles.fullCart}>
              <div className={styles.fullHeader}>
                <div>
                  <img src={require('../../assets/images/cart.svg').default} alt="" />
                  <h2>Корзина</h2>
                </div>
                <div>
                  <button onClick={() => cleanCart(bought)}>
                    <img src={require('../../assets/images/bin.svg').default} alt="" />
                    <span>Очистить корзину</span>
                  </button>
                </div>
              </div>
              <div className={styles.items}>
                {bought.map((item, index) => {
                  return (
                    <div className={styles.item} key={index}>
                      <div className={styles.itemInfo}>
                        <img src={item.imageUrl} alt="" />
                        <div>
                          <h4>{item.title}</h4>
                          <span>
                            {types[item.type]} тесто, {item.size} см.
                          </span>
                        </div>
                      </div>
                      <div className={styles.controlls}>
                        <button onClick={() => minusAmount(item)}>
                          <span></span>
                        </button>
                        <span className={styles.amount}>{item.amount}</span>
                        <button onClick={() => plusAmount(item)}>
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                      <div className={styles.price}>
                        {item.price * item.amount}
                        <svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <button className={styles.close} onClick={() => removeItem(item)}>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className={styles.footer}>
                <div className={styles.footerTop}>
                  <div>
                    Всего пицц: <span>{items} шт</span>
                  </div>
                  <div>
                    Сумма заказа:
                    <span>
                      {total}
                      <svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z"
                          fill="#FE5F1E"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className={styles.footerBottom}>
                  <Link to={'/'}>
                    <button>
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 13L1 6.93015L6.86175 1"
                          stroke="#D3D3D3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Вернуться назад</span>
                    </button>
                  </Link>
                  <button className={styles.pay}>Оплатить сейчас</button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyCart}>
              <div className={styles.title}>
                <h2>Корзина пустая</h2>
                <img src={require('../../assets/images/empty-smile.png')} alt="" />
              </div>
              <div className={styles.info}>
                Вероятней всего, вы не заказывали ещё пиццу. <br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
              </div>
              <img src={require('../../assets/images/empty-cart.png')} alt="" />
              <Link to={'/'}>
                <button className={styles.btn}>Вернуться назад</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
