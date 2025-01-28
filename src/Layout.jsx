import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Footer } from './components/homepage/Index';

function Layout({setIsLoggedIn, isLoggedIn}) {
  return (
    <div>
      <div className='h-[69px] bg-white shadow-lg'><Navbar/></div>
      <div className='min-h-[80vh]'>
      <Outlet /> {/* This renders the nested route components */}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;