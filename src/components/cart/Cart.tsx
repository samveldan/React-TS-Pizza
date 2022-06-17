import { useSelector } from 'react-redux';
import { rootState } from '../../redux/store.ts';
import styles from './cart.module.scss';

const Cart: React.FC = () => {
  const {
    cart: { items, total },
  } = useSelector((state: rootState) => state);

  return (
    <div className={styles.cart}>
      <div className={styles.price}>
        <span>{total}</span>
        <svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z"
            fill="white"
          />
        </svg>
      </div>
      <div className={styles.border}></div>
      <div className={styles.amount}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{items}</span>
      </div>
    </div>
  );
};

export default Cart;
