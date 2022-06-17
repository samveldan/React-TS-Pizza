import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './404.module.css';

const NotFound: React.FC = () => {
  return (
    <div>
      <div className="container">
        <div className={styles.wrapper}>
          <h1>Такой страницы не существует :(</h1>
          <Link to={'/'}>
            <button className={styles.btn}>На главную</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
