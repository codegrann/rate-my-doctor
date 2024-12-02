import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Footer } from './components/homepage/Index';

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This renders the nested route components */}
      <Footer />
    </div>
  );
}

export default Layout;