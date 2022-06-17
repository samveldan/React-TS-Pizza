import { Link, useLocation } from 'react-router-dom';
import Logo from '../logo/Logo.tsx';
import Cart from '../cart/Cart.tsx';
import HomeInput from '../home-input/HomeInput.tsx';
import styles from './header.module.scss';

const Header: React.FC  = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link to="/">
            <Logo />
          </Link>
          {location.pathname == '/' && <HomeInput />}
          <Link to="/cart">
            <Cart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
