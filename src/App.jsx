import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Papa from 'papaparse';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import * as Kakao from 'kakao-js-sdk'


import { useAuth } from './hooks/AuthContext';
Kakao.init('6ec9fb4811670e4bd219a26028bb3e5e');

import { ModalProvider } from './hooks/ModalContext';

import Homepage from './pages/Homepage'
import Layout from './Layout';
import NotFound from './pages/Notfound';
import { Login, Signup } from './components/Index';
import ResultsPage from './pages/Results';
import SearchPage from './pages/Search';
import HospitalDetails from './pages/HospitalDetails';
import DoctorDetails from './pages/DoctorDetails';
import SessionTimeout from './utilities/SessionTimeout';

function App() {
  const [ddata, setDdata] = useState([]);

  // doctor or hospital
  const [searchType, setSearchType] = useState("Doctor");
  // Hospital data
  const [filteredItems, setFilteredItems] = useState([]);
  // search quesry
  const [searchQuery, setSearchQuery] = useState("");

  // API Base URL
  const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
  // Client ID
  // const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_ID='433554555492-rrbsfe7d5cg6l9ne7016rah47b1esnv5.apps.googleusercontent.com';
  // console.log(import.meta.env.GOOGLE_CLIENT_ID);

  // Authentication state
  const { isLoggedIn } = useAuth();


  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('/data.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Parse the CSV text into JSON
        Papa.parse(csvText, {
          header: true, // Use the first row as headers
          skipEmptyLines: true,
          complete: (results) => {
            setDdata(results.data); // Save parsed data
          },
        });
      });
  }, []);

  

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ModalProvider>
    <Router>
      <ToastContainer />
      <SessionTimeout />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage searchType={searchType} setSearchType={setSearchType} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
          <Route path="login" element={isLoggedIn ? <Navigate to="/" replace /> :<Login BASE_URL={BASE_URL}/>} />
          <Route path="signup" element={isLoggedIn ? <Navigate to="/" replace /> :<Signup BASE_URL={BASE_URL}/>} />
          <Route path="results" element={<ResultsPage searchType={searchType} setSearchType={setSearchType} BASE_URL={BASE_URL}/>} />
          <Route path="search" element={<SearchPage data={ddata} searchType={searchType} setSearchType={setSearchType} filteredItems={filteredItems} setFilteredItems={setFilteredItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery} BASE_URL={BASE_URL}/>} />
          <Route path="hospital/:hospitalName" element={<HospitalDetails data={ddata} BASE_URL={BASE_URL}/>} />
          <Route path="doctor/:doctorName" element={<DoctorDetails data={ddata} BASE_URL={BASE_URL}/>} />
          {/* <Route path="contact" element={<Contact />}> */}
              {/* <Route path="email" element={<EmailContact />} /> */}
              {/* <Route path="phone" element={<PhoneContact />} /> */}
          {/* </Route> */}
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />      
        </Route>
      </Routes>
    </Router>
    </ModalProvider>
    </GoogleOAuthProvider>
  )
}

export default App
