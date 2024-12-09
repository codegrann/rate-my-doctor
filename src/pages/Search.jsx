import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';

import {DoctorCard, HospitalCard} from "../components/Index";

const SearchPage = ({searchType, setSearchType, items, setItems, searchQuery, setSearchQuery, data}) => {
  const [showMoreCount, setShowMoreCount] = useState(5);
  const navigate=useNavigate()


  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    // setItems([]); // Reset items when type changes
    setShowMoreCount(5); // Reset showMoreCount
  };

  const handleShowMore = () => {
    setShowMoreCount((prev) => prev + 5);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery with input value
  };


  const getHospitalsFromDoctors = (doctors) => {
    const hospitalSet = new Set();
  
    // Create a unique list of hospitals
    const hospitals = doctors.reduce((acc, doctor) => {
      if (!hospitalSet.has(doctor.hospitalName)) {
        hospitalSet.add(doctor.hospitalName);
        acc.push({
          name: doctor.hospitalName,
          location: doctor.location || "Unknown",
          rating: doctor.rating || "Not Rated",
        });
      }
      return acc;
    }, []);
  
    return hospitals;
  };

   // Extract unique hospitals
   const hospitalsData = getHospitalsFromDoctors(data);
  

  const handleSearch = () => {
    let filteredResults;

  if (searchType === "Doctor") {
    // Filter doctors by name
    filteredResults = data.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (searchType === "Hospital") {

    // Filter hospitals by name
    filteredResults = hospitalsData.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

    // Navigate to results page with filtered results
    navigate("/results", { state: { results: filteredResults, searchType } });
  };

  return (
    <div className="p-4 md:px-16">
      <div className="mb-4">
        {/* Dropdown */}
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="p-2 border rounded"
        >
          <option value="Doctor">Doctor</option>
          <option value="Hospital">Hospital</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <div className="mb-4 w-[60%]">
            <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={`Search ${searchType}`}
            className="w-full p-2 border rounded"
            />
        </div>

        {/* Search Button */}
        <button
            onClick={handleSearch} // Call the search logic
            className="px-2 h-10 bg-blue-500 text-white rounded"
        >
            Search
        </button>

      </div>

      {/* List */}
      <div className="grid gap-4">
        {searchType === "Doctor"
          ? data.slice(0, showMoreCount).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                hospitalName={doctor.hospitalName}
                department={doctor.department}
                specialty={doctor.specialty}
                // rating={doctor.rating}
              />
            ))
          : hospitalsData.slice(0, showMoreCount).map((hospital) => (
            <HospitalCard
              key={hospital.hospitalName} // Using hospitalName as a unique key
              name={hospital.hospitalName}
              // location={doctor.location || "N/A"} // Default fallback if location is not available
              // rating={doctor.rating || "N/A"}   // Default fallback for rating
            />
          ))}
    
      </div>

      {/* Show More Button */}
      <button
        onClick={handleShowMore}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Show More
      </button>
    </div>
  );
};

export default SearchPage;
