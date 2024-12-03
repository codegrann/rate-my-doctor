import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';


import Homepage from './pages/Homepage'
import Layout from './Layout';
import NotFound from './pages/Notfound';
import { Login, Signup } from './components/Index';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route path="contact" element={<Contact />}> */}
            {/* <Route path="email" element={<EmailContact />} /> */}
            {/* <Route path="phone" element={<PhoneContact />} /> */}
        {/* </Route> */}
          
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
