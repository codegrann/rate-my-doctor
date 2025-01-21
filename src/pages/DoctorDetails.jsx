import React from 'react';
import { useParams } from 'react-router-dom';

const DoctorDetails = ({ data }) => {
  const { doctorName } = useParams();

  // Find doctor by name
  const doctor = data.find((doc) => doc.name === doctorName);

  if (!doctor) {
    return <p className="text-gray-600">Doctor not found.</p>;
  }

  return (
    <div className="p-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">{doctor.name}</h1>
      <p className="text-sm text-gray-600">Hospital: {doctor.hospitalName}</p>
      <p className="text-sm text-gray-600">Department: {doctor.department}</p>
      <p className="text-sm text-gray-600">Specialty: {doctor.specialty}</p>
    </div>
  );
};

export default DoctorDetails;
