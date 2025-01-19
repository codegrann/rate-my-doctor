import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {DoctorCard} from "../components/Index";
import { v4 as uuidv4 } from 'uuid';


const HospitalDetails = ({ data, isLoggedIn, BASE_URL }) => {
  const { hospitalName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDoctorsCount, setVisibleDoctorsCount] = useState(5);
  const [activity, setActivity]=useState('ratings')
  const [ratings, setRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const refreshRatings = () => {
  //   fetch(`/api/ratings?hospitalName=${hospitalName}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const sortedRatings = data.sort((a, b) => new Date(b.date) - new Date(a.date));  // Sort by latest date first
  //       setRatings(sortedRatings); 
  //     })
  //     .catch((error) => console.error('Error fetching ratings:', error));
  // };
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
      hospitalName,    
      facilities: formData.get('facilities'),
      location: formData.get('location'),
      safety: formData.get('safety'),
      staff: formData.get('staff'),
      cleanliness: formData.get('cleanliness'),
      comments: formData.get('comments'),
      overallRating,
    };

    console.log('form data', formData)
    console.log('rating data', ratingData)
  
    fetch(`${BASE_URL}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    })
      .then((response) => {
        console.log(response);
        response.json()
  })
      .then((data) => {
        console.log('Submitted rating:', data);
        closeModal();
        // refreshRatings();
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };
  
  // Calculating overal rating
  const calculateOverallRating = () => {
    const facilities = parseInt(document.querySelector('input[name="facilities"]')?.value) || 0;
    const location = parseInt(document.querySelector('input[name="location"]')?.value) || 0;
    const safety = parseInt(document.querySelector('input[name="safety"]')?.value) || 0;
    const staff = parseInt(document.querySelector('input[name="staff"]')?.value) || 0;
    const cleanliness = parseInt(document.querySelector('input[name="cleanliness"]')?.value) || 0;
  
    const average = (facilities + location + safety + staff + cleanliness) / 5;
    setOverallRating(parseFloat(average.toFixed(1))); // Rounded to one decimal
  };
console.log(isLoggedIn)
  return (
    <div className="p-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">{hospitalName}</h1>
      <p>fhgh {isLoggedIn}</p>
      {/* {isLoggedIn && */}
      <button
      onClick={openModal}
      className='block border px-8 py-1 rounded-3xl bg-blue-500 text-white'>Rate</button>
      {/* } */}
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
              <p><strong>Date:</strong> {new Date(rating.dateAdded).toLocaleDateString()}</p>
              <p><strong>Facilities:</strong> {rating.facilities} / 5</p>
              <p><strong>Location:</strong> {rating.location} / 5</p>
              <p><strong>Safety:</strong> {rating.safety} / 5</p>
              <p><strong>Staff:</strong> {rating.staff} / 5</p>
              <p><strong>Cleanliness:</strong> {rating.cleanliness} / 5</p>
              <p><strong>Comment:</strong> {rating.comments}</p>
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
    <div className="bg-white rounded-lg shadow-lg px-6 pt-4 w-[90%] h-[97vh] md:w-[600px] overflow-y-scroll">
      <h2 className="text-xl font-bold mb-2">Rate Hospital</h2>
      <form onSubmit={handleSubmit}>
        {/* <label className="block mb-2">
          <span className="text-gray-700">Overall Rating</span>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded mb-3"
            required
          />
        </label> */}
        <label className="block mb-3">
          <span className="text-gray-700">Facilities (1-5)</span>
          <input
          name="facilities"
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={calculateOverallRating}
            required
          />
        </label>
        <label className="block mb-3">
          <span className="text-gray-700">Location (1-5)</span>
          <input
          name="location"
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={calculateOverallRating}
            required
          />
        </label>
        <label className="block mb-3">
          <span className="text-gray-700">Safety (1-5)</span>
          <input
          name="safety"
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={calculateOverallRating}
            required
          />
        </label>
        <label className="block mb-3">
          <span className="text-gray-700">Staff (1-5)</span>
          <input
            name="staff"
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={calculateOverallRating}
            required
          />
        </label>
        <label className="block mb-3">
          <span className="text-gray-700">Cleanliness (1-5)</span>
          <input
            name="cleanliness"
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            onChange={calculateOverallRating}
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Comments</span>
          <textarea
            name="comments"
            className="w-full p-2 border rounded text-sm"
            rows="4"
          ></textarea>
        </label>
        <div className="flex justify-end gap-4 mb-2">
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
