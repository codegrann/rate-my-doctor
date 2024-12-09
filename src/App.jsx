import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom';


import Homepage from './pages/Homepage'
import Layout from './Layout';
import NotFound from './pages/Notfound';
import { Login, Signup } from './components/Index';
import ResultsPage from './pages/Results';
import SearchPage from './pages/Search';

function App() {
  // doctor or hospital
  const [searchType, setSearchType] = useState("Doctor");
  // Hospital data
  const [filteredItems, setFilteredItems] = useState([]);
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
  
  // My data
  const data = [
    {
      id: 1,
      name: "Dr. John Doe",
      hospitalName: "City General Hospital",
      department: "Cardiology",
      specialty: "Heart Surgery",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      hospitalName: "Green Valley Medical Center",
      department: "Neurology",
      specialty: "Brain and Spine",
    },
    {
      id: 3,
      name: "Dr. Albert Johnson",
      hospitalName: "Downtown Medical Hub",
      department: "Orthopedics",
      specialty: "Joint Replacement",
    },
    {
      id: 4,
      name: "Dr. Emily Davis",
      hospitalName: "City General Hospital",
      department: "Pediatrics",
      specialty: "Child Care",
    },
    {
      id: 5,
      name: "Dr. Michael Lee",
      hospitalName: "Green Valley Medical Center",
      department: "Dermatology",
      specialty: "Skin Conditions",
    },
  ];
  
  


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="results" element={<ResultsPage searchType={searchType} setSearchType={setSearchType}/>} />
        <Route path="search" element={<SearchPage data={data} searchType={searchType} setSearchType={setSearchType} filteredItems={filteredItems} setFilteredItems={setFilteredItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
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
