import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {DoctorCard} from "../components/Index";
import { v4 as uuidv4 } from 'uuid';


const HospitalDetails = ({ data }) => {
  const { hospitalName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter doctors by hospital and search query
  const filteredDoctors = data.filter(
    (doctor) =>
      doctor.hospitalName === hospitalName &&
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">{hospitalName}</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search doctors"
        className="w-full p-2 border rounded mb-4"
      />
      {filteredDoctors.length > 0 ? (
        <div className="grid gap-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={uuidv4()}
              name={doctor.name}
              hospitalName={doctor.hospitalName}
              department={doctor.department}
              specialty={doctor.specialty}
              rating={doctor.rating}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No doctors found.</p>
      )}
    </div>
  );
};

export default HospitalDetails;
