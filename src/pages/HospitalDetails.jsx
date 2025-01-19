import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {DoctorCard} from "../components/Index";
import { v4 as uuidv4 } from 'uuid';


const HospitalDetails = ({ data }) => {
  const { hospitalName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDoctorsCount, setVisibleDoctorsCount] = useState(5);
  const [activity, setActivity]=useState('ratings')

  // Filter doctors by hospital and search query
  const filteredDoctors = data.filter(
    (doctor) =>
      doctor.hospitalName === hospitalName &&
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleDoctorsCount((prevCount) => prevCount + 5); // Show 5 more doctors
  };

  const changePageView=(activity)=>{
    if(activity=='ratings'){
      setActivity('ratings');
    } else if(activity=='doctors'){
      setActivity('doctors');
    }
  }

  return (
    <div className="p-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">{hospitalName}</h1>
      <button className='block border px-8 py-1 rounded-3xl bg-blue-500 text-white'>Rate</button>
      <div className='flex gap-6 my-4'>
        {activity=='ratings' ?
        <p className='underline text-sm hover:cursor-pointer' onClick={()=>changePageView('doctors')}>View all doctors</p> :
        <p className='underline text-sm hover:cursor-pointer' onClick={()=>changePageView('ratings')}>View ratings</p>
        }
  
      </div>

      {activity=='ratings' && 
      <p>These are the ratings</p>
      }

    {activity=='doctors' &&  (
      <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search doctors"
        className="w-[60%] p-2 border rounded mb-4"
      />
      {filteredDoctors.length > 0 ? (
        <div className="grid gap-4">
          {filteredDoctors.slice(0, visibleDoctorsCount).map((doctor) => (
            <DoctorCard
              key={uuidv4()}
              name={doctor.name}
              hospitalName={doctor.hospitalName}
              department={doctor.department}
              specialty={doctor.specialty}
              rating={doctor.rating}
            />
          ))}

            {visibleDoctorsCount < filteredDoctors.length && (
            <button
              onClick={handleShowMore}
              className="mt-4 p-2 bg-blue-500 text-white rounded w-[100px]"
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No doctors found.</p>
      )}
      </>
  )}

    </div>
  );
};

export default HospitalDetails;
