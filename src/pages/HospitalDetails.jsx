import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FaTools, FaMapMarkerAlt, FaShieldAlt, FaUserMd, FaBroom } from "react-icons/fa";

import { DoctorCard } from "../components/Index";

import { useAuth } from '../hooks/AuthContext';
import { useModal } from '../hooks/ModalContext';


const HospitalDetails = ({ data, BASE_URL }) => {
  const { hospitalName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleDoctorsCount, setVisibleDoctorsCount] = useState(5);
  const [activity, setActivity] = useState('ratings')
  const [ratings, setRatings] = useState([]);
  const [overallRating, setOverallRating] = useState(0);

  const navigate = useNavigate();

  const { isLoggedIn, } = useAuth();
  const { isModalOpen, setIsModalOpen } = useModal();


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(() => {
    fetch(`${BASE_URL}/ratings/${hospitalName}`)
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
  const changePageView = (activity) => {
    if (activity == 'ratings') {
      setActivity('ratings');
    } else if (activity == 'doctors') {
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


    fetch(`${BASE_URL}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    })
      .then((response) => {
        response.json()
      })
      .then(() => {
        closeModal();
        toast.success('Submitted rating!!');
        window.location.reload();
        toast.error('Submitted rating')
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

  // Determine the background color based on the rating range
  const getBgColor = (rating) => {
    if (rating >= 0 && rating <= 1) return "bg-gray-300";
    if (rating > 1 && rating <= 2) return "bg-orange-300";
    if (rating > 2 && rating <= 3) return "bg-yellow-300"; //yellow3
    if (rating > 3 && rating <= 4) return "bg-green-300";
    if (rating > 4 && rating <= 5) return "bg-green-500";
    return "bg-gray-200"; // Fallback color
  };


  function formatDate(dateString) {
    const date = new Date(dateString);

    // Map of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Determine the suffix for the day
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

    // Return the formatted date
    return `${month} ${day}${suffix}, ${year}`;
  }


    const renderBoxes = (value) => {
      return Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < value; // Determine if the box is filled
        const getbgColor=()=>{
          if (value < 2) return "bg-red-300";
          if (value < 3) return "bg-red-300";
          if (value < 4) return "bg-yellow-300";
          if (value < 5) return "bg-green-300";          
          return "bg-green-300";
        }
        const classes = `
          ${isFilled ? getbgColor() : "bg-gray-200"}
          w-6 max-[320px]:w-4 md:w-8 h-2 md:h-4
          ${i === 0 ? "rounded-l-lg" : ""} 
          ${i === 4 ? "rounded-r-lg" : ""}
        `;
    
        return <div key={i} className={classes}></div>;
      });
    };
    


    return (
      <div className="p-6 max-[350px]:px-4 md:px-20 lg:px-28 md:pt-12 font-montserrat">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 font-sans">{hospitalName}</h1>
        {isLoggedIn ?
          <button
            onClick={openModal}
            className='block border px-8 py-1 md:py-3 md:px-12 rounded-3xl bg-blue-500 text-white'>Rate</button>
          :
          <a onClick={() => navigate('/login')} className="text-blue-500 underline cursor-pointer">
            Login to rate the hospital
          </a>
        }
        <div className='flex gap-6 my-4'>
          {activity == 'ratings' ?
            <p className='underline text-sm md:text-lg hover:cursor-pointer' onClick={() => changePageView('doctors')}>View all doctors</p> :
            <p className='underline text-sm md:text-lg hover:cursor-pointer' onClick={() => changePageView('ratings')}>View ratings</p>
          }

        </div>

        {activity == 'ratings' && (
          <>
            <div className='text-customBlack'>
              <div className='flex flex-col md:flex-row'>
                {/* <h2 className="text-xl font-bold">General Ratings</h2> */}
                {ratings.length > 0 && (
                  <div className="max-md:max-w-[330px] md:flex md:items-center md:gap-16 p-4 md:p-8 border border-gray-200 rounded-lg shadow-md bg-white">
                    <div className="text-center mb-6"> {/*flex flex-col*/}
                      <h2 className="text-4xl md:text-8xl font-bold">{average(ratings.map((r) => r.overallRating))}</h2>
                      <p className="text-gray-400">Overall Quality</p>
                    </div>
                    {/* <p className='flex flex-col text-center'><span className='text-4xl font-bold'>{average(ratings.map(r => r.overallRating))}</span><span className='text-gray-400'>Overall Rating</span></p> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                          <FaTools className="text-blue-500 md:text-3xl" />
                          <span className='text-sm md:text-lg'>Facilities</span>
                        </div>
                        <span className="font-bold text-blue-600 md:text-2xl bg-customGreen px-2 py-[1px] md:px-4 md:py-2">{average(ratings.map((r) => r.facilities))}</span>
                      </div>
                      {/* Location */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                          <FaMapMarkerAlt className="text-blue-500 md:text-3xl" />
                          <span className='text-sm md:text-lg'>Location</span>
                        </div>
                        <span className="font-bold text-blue-600 md:text-2xl bg-customGreen px-2 py-[1px] md:px-4 md:py-2">{average(ratings.map((r) => r.location))}</span>
                      </div>
                      {/* Safety */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                          <FaShieldAlt className="text-blue-500 md:text-3xl" />
                          <span className='text-sm md:text-lg'>Safety</span>
                        </div>
                        <span className="font-bold text-blue-600 md:text-2xl bg-customGreen px-2 py-[1px] md:px-4 md:py-2">{average(ratings.map((r) => r.safety))}</span>
                      </div>
                      {/* Staff */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                          <FaUserMd className="text-blue-500 md:text-3xl" />
                          <span className='text-sm md:text-lg'>Staff</span>
                        </div>
                        <span className="font-bold text-blue-600 md:text-2xl bg-customGreen px-2 py-[1px] md:px-4 md:py-2">{average(ratings.map((r) => r.staff))}</span>
                      </div>
                      {/* Cleanliness */}
                      <div className="flex items-center justify-between md:gap-4">
                        <div className="flex items-center gap-2 md:gap-6">
                          <FaBroom className="text-blue-500 md:text-3xl" />
                          <span className='text-sm md:text-lg'>Cleanliness</span>
                        </div>
                        <span className="font-bold text-blue-600 md:text-2xl bg-customGreen px-2 py-[1px] md:px-4 md:py-2">{average(ratings.map((r) => r.cleanliness))}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <h3 className='mt-4 font-bold md:text-xl'>{ratings.length} Ratings</h3>
              <div className="space-y-4">
                {ratings.slice(0, visibleDoctorsCount).map((rating, index) => (
                  <div key={index} className="relative flex md:gap-4 px- py-6 md:p-4 rounded bg-gray-100 lg:max-w-[70vw] text-[9pt] md:text-[11pt]">
                    <div className="text-[9pt] md:text-[11pt] flex flex-col items-center px-2 max-[350px]:px-[6px]">  Quality <span className={`${ratings.length > 0 ? `${getBgColor(rating.overallRating)} font-bold text-lg w-[60px] h-14 flex justify-center items-center` : 'font-normal text-[8pt] text-gray-400 my-2 w-full flex justify-center items-center'}`}>{rating.overallRating}</span></div>
                    <div className='md:py-2'>
                      <p className='absolute right-3 top-2 text-gray-500'>{formatDate(new Date(rating.dateAdded).toLocaleDateString())}</p>
                      <p>{rating.comments}</p>
                      <div>
                        <div className="flex space-x-1 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 mt-2">
                          <div className="flex items-center justify-between space-x-2">
                            <p className="font-semibold">Facilities:</p>
                            <div className="flex space-x-[3px] max-[350px]:space-x-[1px] rounded">{renderBoxes(rating.facilities)}</div>
                          </div>
                          <div className="flex items-center justify-between space-x-2">
                            <p className="font-semibold">Location:</p>
                            <div className="flex space-x-[3px] max-[350px]:space-x-[1px]">{renderBoxes(rating.location)}</div>
                          </div>
                          <div className="flex items-center justify-between space-x-2">
                            <p className="font-semibold">Safety:</p>
                            <div className="flex space-x-[3px] max-[350px]:space-x-[1px]">{renderBoxes(rating.safety)}</div>
                          </div>
                          <div className="flex items-center justify-between space-x-2">
                            <p className="font-semibold">Staff:</p>
                            <div className="flex space-x-[3px] max-[350px]:space-x-[1px]">{renderBoxes(rating.staff)}</div>
                          </div>
                          <div className="flex items-center justify-between space-x-2">
                            <p className="font-semibold">Cleanliness:</p>
                            <div className="flex space-x-[3px] max-[350px]:space-x-[1px]">{renderBoxes(rating.cleanliness)}</div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleShowMore}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Show More
              </button>
            </div>
          </>
        )
        }

        {activity == 'doctors' && (
          <>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctors"
              className="w-[60%] p-2 border rounded mb-4 font-sans"
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
                    className="mt-4 p-2 bg-blue-500 text-white rounded w-[120px]"
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
                <label className="block mb-3">
                  <span className="text-gray-700">Facilities (1-5)</span>
                  <input
                    name="facilities"
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
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
                    step="0.5"
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
                    step="0.5"
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
                    step="0.5"
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
                    step="0.5"
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
