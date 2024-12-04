import React, { useState } from "react";
import {DoctorCard, HospitalCard} from "../components/Index";

const SearchPage = () => {
  const [searchType, setSearchType] = useState("Doctor");
  const [items, setItems] = useState([]);
  const [showMoreCount, setShowMoreCount] = useState(5);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setItems([]); // Reset items when type changes
    setShowMoreCount(5); // Reset showMoreCount
  };

  const handleShowMore = () => {
    setShowMoreCount((prev) => prev + 5);
  };

  return (
    <div className="p-4">
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
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${searchType}`}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* List */}
      <div className="grid gap-4">
        {searchType === "Doctor"
          ? items.slice(0, showMoreCount).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                rating={doctor.rating}
              />
            ))
          : items.slice(0, showMoreCount).map((hospital) => (
              <HospitalCard
                key={hospital.id}
                name={hospital.name}
                location={hospital.location}
                rating={hospital.rating}
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
