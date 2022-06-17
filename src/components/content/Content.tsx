import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/store.ts';
import Pizza from '../pizza/Pizza.tsx';
import styles from './content.module.scss';

const Content: React.FC = () => {
  const {
    pizzas: { filteredData, isLoading },
    filters: { currentPage },
  } = useSelector((state: rootState) => state);

  return (
    <div className="content">
      <div className="container">
        <h1 className={styles.h1}>Все пиццы</h1>
        <div className={styles.wrapper}>
          {!isLoading ? (
            filteredData.length > 0 ? (
              filteredData.slice(currentPage * 4, currentPage * 4 + 4).map((item, index) => {
                const price = item.info.map((i) => i.price);

                return (
                  <Pizza
                    {...item}
                    isLoading={isLoading}
                    pizza={item}
                    key={index}
                    price={Math.min(...price)}
                  />
                );
              })
            ) : (
              <h2>Такой пиццы нет :(</h2>
            )
          ) : (
            [...new Array(8)].map((_, index) => {
              return <Pizza key={index} isLoading={isLoading} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
