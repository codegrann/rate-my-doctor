import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { FaSearch } from "react-icons/fa";

import {DoctorCard, HospitalCard} from "../components/Index";

const ResultsPage = ({BASE_URL}) => {
  const navigate=useNavigate()
    const location = useLocation();
    const { results = [], searchType = "" } = location.state || {}; // Default values
console.log(results)
  return (
    <div className="p-4 md:px-20">
      <h1 className="flex gap-4 items-center text-2xl font-bold mb-4">Search Results <a onClick={()=>navigate('/search')}><FaSearch className="text-gray-500 w-6 h-6 cursor-pointer"/></a></h1>
      {results.length > 0 ? (
        <div className="grid gap-4">
          {searchType === "Doctor"
            ? results.map((doctor) => (
                <DoctorCard
                key={uuidv4()}
                name={doctor.name}
                hospitalName={doctor.hospitalName}
                department={doctor.department}
                specialty={doctor.specialty}
                BASE_URL={BASE_URL}
                  // rating={doctor.rating}
                />
              ))
            : results.map((hospital) => (
                <HospitalCard
                  key={uuidv4()}
                  name={hospital.name}
                  BASE_URL={BASE_URL}
                  // location={hospital.location}
                  // rating={hospital.rating}
                />
              ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
