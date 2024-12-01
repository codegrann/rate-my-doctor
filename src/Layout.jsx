// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {Navbar, Footer} from './components/homepage/Index';
import Footer from './components/homepage/Footer';

function Layout() {
  return (
    <div>
     <Navbar />
      

      {/* Outlet for nested routes */}
      <Outlet />

      {/* Optional footer */}
    <Footer />
    </div>
  );
}

export default Layout;