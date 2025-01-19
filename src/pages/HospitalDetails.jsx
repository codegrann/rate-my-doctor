import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {DoctorCard} from "../components/Index";
import { v4 as uuidv4 } from 'uuid';


const HospitalDetails = ({ data, isLoggedIn }) => {
  const { hospitalName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDoctorsCount, setVisibleDoctorsCount] = useState(5);
  const [activity, setActivity]=useState('ratings')
  const [ratings, setRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


// fetching ratings when page loads
  useEffect(() => {
    fetch(`/api/ratings/${hospitalName}`)
      .then((response) => response.json())
      .then((data) => setRatings(data))
      .catch((error) => console.error('Error fetching ratings:', error));
  }, [hospitalName]);
  

  // Filter doctors by hospital and search query
  const filteredDoctors = data.filter(
    (doctor) =>
      doctor.hospitalName === hospitalName &&
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

//show more docotrs results 
  const handleShowMore = () => {
    setVisibleDoctorsCount((prevCount) => prevCount + 5); // Show 5 more doctors
  };

  // alternate between doctors and ratings of a hospital
  const changePageView=(activity)=>{
    console.log(isLoggedIn)
    if(activity=='ratings'){
      setActivity('ratings');
    } else if(activity=='doctors'){
      setActivity('doctors');
    }
  }

  // find average of ratings
  const average = (values) => {
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
  };
  
  // Submitting ratings
  const handleSubmit = (e) => {
    e.preventDefault();
    // Capture form data here
    const formData = new FormData(e.target);
    const ratingData = {
      overallRating: formData.get('overallRating'),
      facilities: formData.get('facilities'),
      location: formData.get('location'),
      safety: formData.get('safety'),
      comments: formData.get('comments'),
    };
  
    fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hospitalName, ...ratingData }),
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        // Optionally fetch and update ratings here
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };
  

  return (
    <div className="p-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">{hospitalName}</h1>
      {isLoggedIn &&
      <button
      onClick={openModal}
      className='block border px-8 py-1 rounded-3xl bg-blue-500 text-white'>Rate</button>
      }
      <div className='flex gap-6 my-4'>
        {activity=='ratings' ?
        <p className='underline text-sm hover:cursor-pointer' onClick={()=>changePageView('doctors')}>View all doctors</p> :
        <p className='underline text-sm hover:cursor-pointer' onClick={()=>changePageView('ratings')}>View ratings</p>
        }
  
      </div>

      {activity=='ratings' && (
        <>
        <div>
          <h2 className="text-xl font-bold">General Ratings</h2>
          {ratings.length > 0 && (
            <>
              <p>Overall Rating: {average(ratings.map(r => r.overallRating))} / 5</p>
              <p>Facilities: {average(ratings.map(r => r.facilities))} / 5</p>
              <p>Location: {average(ratings.map(r => r.location))} / 5</p>
              <p>Safety: {average(ratings.map(r => r.safety))} / 5</p>
              <p>Staff: {average(ratings.map(r => r.staff))} / 5</p>
              <p>Cleanliness: {average(ratings.map(r => r.cleanliness))} / 5</p>
            </>
          )}
          <h3>{ratings.length} Ratings</h3>
          {ratings.map((rating, index) => (
            <div key={index} className="border p-4 mb-4">
              <p><strong>Overall Rating:</strong> {rating.overallRating} / 5</p>
              <p><strong>Comment:</strong> {rating.comments}</p>
              <p><strong>Date:</strong> {new Date(rating.dateAdded).toLocaleDateString()}</p>
              <p><strong>Facilities:</strong> {rating.facilities} / 5</p>
              <p><strong>Location:</strong> {rating.location} / 5</p>
              <p><strong>Safety:</strong> {rating.safety} / 5</p>
            </div>
          ))}
        </div>
      </>
    )
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

{/* Modal:form for submitting ratings  */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px]">
      <h2 className="text-xl font-bold mb-4">Rate Hospital</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Overall Rating (1-5)</span>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded mb-4"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Facilities</span>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded mb-4"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Location</span>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded mb-4"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Safety</span>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded mb-4"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Comments</span>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
          ></textarea>
        </label>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border rounded bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border rounded bg-blue-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default HospitalDetails;
