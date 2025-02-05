import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './components/homepage/Index';

import { useModal } from './hooks/ModalContext';

function Layout() {
  const {isModalOpen}=useModal();
  return (
    <div className='overflow-x-hidden text-customBlack'>
      {!isModalOpen &&<div className='h-[65px] bg-white shadow-lg'><Navbar/></div>}
      <div className='min-h-[80vh]'>
      <Outlet /> {/* renders nested route components */}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;