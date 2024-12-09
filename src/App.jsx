import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';


import Homepage from './pages/Homepage'
import Layout from './Layout';
import NotFound from './pages/Notfound';
import { Login, Signup } from './components/Index';
import ResultsPage from './pages/Results';
import SearchPage from './pages/Search';

function App() {
  const navigate=useNavigate()
  // doctor or hospital
  const [searchType, setSearchType] = useState("Doctor");
  // Hospital data
  const [items, setItems] = useState([]);
  // search quesry
  const [searchQuery, setSearchQuery] = useState("");
  // search result
  // const  [searchResults, setSearchResults] = useState();
  // handle search
  // const handleSearch = () => {
  //   const filteredResults = data.filter((item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // //  if(results!=null) {
  //   navigate("/results", { state: { results: filteredResults, searchType } });
  // //  }
  // };
  


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="results" element={<ResultsPage searchType={searchType} setSearchType={setSearchType}/>} />
        <Route path="search" element={<SearchPage searchType={searchType} setSearchType={setSearchType} items={items} setItems={setItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
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
