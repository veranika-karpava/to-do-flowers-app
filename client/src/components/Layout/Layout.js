import React from 'react';
import { Outlet } from 'react-router';

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
