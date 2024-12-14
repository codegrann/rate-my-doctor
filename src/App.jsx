import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';



import Homepage from './pages/Homepage'
import Layout from './Layout';
import NotFound from './pages/Notfound';
import { Login, Signup } from './components/Index';
import ResultsPage from './pages/Results';
import SearchPage from './pages/Search';
import HospitalDetails from './pages/HospitalDetails';
import DoctorDetails from './pages/DoctorDetails';

function App() {
  const [ddata, setDdata] = useState([]);

  // doctor or hospital
  const [searchType, setSearchType] = useState("Doctor");
  // Hospital data
  const [filteredItems, setFilteredItems] = useState([]);
  // search quesry
  const [searchQuery, setSearchQuery] = useState("");

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
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Homepage searchType={searchType} setSearchType={setSearchType} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="results" element={<ResultsPage searchType={searchType} setSearchType={setSearchType}/>} />
        <Route path="search" element={<SearchPage data={ddata} searchType={searchType} setSearchType={setSearchType} filteredItems={filteredItems} setFilteredItems={setFilteredItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
        <Route path="hospital/:hospitalName" element={<HospitalDetails data={ddata} />} />
        <Route path="doctor/:doctorName" element={<DoctorDetails data={ddata} />} />
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
