import React from "react";
import {DoctorCard, HospitalCard} from "../components/Index";

const ResultsPage = ({ searchResults, searchType }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {searchResults.length > 0 ? (
        <div className="grid gap-4">
          {searchType === "Doctor"
            ? searchResults.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  rating={doctor.rating}
                />
              ))
            : searchResults.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  name={hospital.name}
                  location={hospital.location}
                  rating={hospital.rating}
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
