import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header.tsx';

const MainLayout: React.FC = () => {
  return (
    <main className="app">
      <Header />
      <hr />
      <Outlet />
    </main>
  );
};

export default MainLayout;
