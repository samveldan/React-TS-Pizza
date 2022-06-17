import React from 'react';
import Menu from '../../components/menu/Menu.tsx';
import Content from '../../components/content/Content.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';

const Home: React.FC = () => {
  return (
    <>
      <Menu />
      <Content />
      <Pagination />
    </>
  );
};

export default Home;
