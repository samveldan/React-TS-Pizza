import React from 'react';
import HomeLoader from '../home-loader/HomeLoader.tsx';
import { Link } from 'react-router-dom';
import styles from './pizza.module.scss';

type PizzaProps = {
  imageUrl: string;
  id: number;
  price: number;
  title: string;
  isLoading: boolean;
}

const Pizza: React.FC<PizzaProps> = ({ imageUrl, id, price, title, isLoading}) => {
  return !isLoading ? (
    <div className={styles.pizza}>
      <div className={styles.pizzaImg}>
        <img src={imageUrl} alt="" />
      </div>
      <div className="pizza__content">
        <h4>{title}</h4>
        <div className={styles.footer}>
          <div className={styles.footerPrice}>
            <span>от {price}</span>
            <svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.44 12V0.575999H5.088C6.56 0.575999 7.632 0.874666 8.304 1.472C8.98667 2.06933 9.328 2.89067 9.328 3.936C9.328 4.55467 9.18933 5.136 8.912 5.68C8.63467 6.224 8.17067 6.66133 7.52 6.992C6.88 7.32267 6.00533 7.488 4.896 7.488H3.856V12H1.44ZM0.16 10.288V8.736H6.32V10.288H0.16ZM0.16 7.488V5.504H4.848V7.488H0.16ZM4.656 5.504C5.11467 5.504 5.50933 5.456 5.84 5.36C6.17067 5.25333 6.42667 5.088 6.608 4.864C6.78933 4.64 6.88 4.35733 6.88 4.016C6.88 3.52533 6.72533 3.16267 6.416 2.928C6.10667 2.68267 5.62133 2.56 4.96 2.56H3.856V5.504H4.656Z"
                fill="white"
              />
            </svg>
          </div>
          <Link to={`/pizza?id=${id}`}>
            <button className={styles.footerBtn}>
              <span>Подробнее</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="pizza">
      <HomeLoader />
    </div>
  );
};

export default Pizza;
