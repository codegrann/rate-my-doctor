import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useModal } from '../hooks/ModalContext';
import { useAuth } from '../hooks/AuthContext';

const DoctorDetails = ({ data, BASE_URL }) => {
  const { doctorName } = useParams();
  const doctor = data.find((doc) => doc.name === doctorName); // Retain doctor data structure
  const [ratings, setRatings] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [averageRating, setAverageRating] = useState(0)
  const [recommendationPercentage, setRecommendationPercentage] = useState(0);
  const [topTags, setTopTags] = useState([]);
  const [visibleRatings, setVisibleRatings] = useState(5);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    overallRating: '',
    wasAwesome: 0,
    gentleness: 0,
    wouldRecommend: 'Yes',
    comments: '',
    tags: [],
  });
  const navigate = useNavigate();
  const { isModalOpen, setIsModalOpen } = useModal();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    fetch(`${BASE_URL}/doctor-ratings/${doctorName}`)
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
        calculateAverageRating(data);
        calculateRatingDistribution(data);
        calculateRecommendationPercentage(data);
        extractTopTags(data);
      })
      .catch((error) => console.error('Error fetching doctor ratings:', error));
  }, [doctorName]);

  const calculateRatingDistribution = (ratings) => {
    const distribution = {
      5: 0, // Awesome
      4: 0, // Great
      3: 0, // Good
      2: 0, // Ok
      1: 0, // Awful
    };
    ratings.forEach((rating) => {
      if (rating.overallRating in distribution) {
        distribution[rating.overallRating]++;
      }
    });
    setRatingDistribution(distribution);
  };

  // mapping for numeric ratings to string labels
  const ratingLabels = {
    5: "Awesome",
    4: "Great",
    3: "Good",
    2: "Ok",
    1: "Awful",
  };

  // Determine the max count to scale the bar width
  const maxCount = Math.max(...Object.values(ratingDistribution));

  // Color shades based on the number of ratings (higher = darker blue)
  //  const getBarColor = (count) => {
  // const intensity = Math.round((count / maxCount) * 255); // Scale intensity
  // return `rgb(0, 0, ${intensity})`; // Varying blue shades
  // };
  const calculateAverageRating = (ratingsData) => {
    if (ratingsData.length === 0) {
      setAverageRating(0);
      return;
    }
    const total = ratingsData.reduce((sum, rating) => sum + rating.overallRating, 0);
    setAverageRating((total / ratingsData.length).toFixed(1));
  };

  const calculateRecommendationPercentage = (ratingsData) => {
    const totalRatings = ratingsData.length;
    const recommendCount = ratingsData.filter(
      (rating) => rating.wouldRecommend === "Yes"
    ).length;

    const percentage =
      totalRatings > 0 ? Math.round((recommendCount / totalRatings) * 100) : 0;
    setRecommendationPercentage(percentage);
  };

  const extractTopTags = (ratings) => {
    const tagCounts = {};
    ratings.forEach((rating) => {
      rating.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);
    setTopTags(sortedTags);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagsChange = (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      tags: value.split(',').map((tag) => tag.trim()),
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formDataToSubmit = {
      ...formData,
      doctorName: doctor.name,
      hospitalName: doctor.hospitalName,
      department: doctor.department,
      specialty: doctor.specialty,
    };
    console.log('form data', formDataToSubmit)

    fetch(`${BASE_URL}/doctor-ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSubmit),
    })
      .then((response) => {
        response.json()
        console.log('response', response)
      })
      .then((data) => {
        console.log("received data", data)
        setIsModalOpen(false);
        // alert('Rating submitted successfully!');
        toast.success('Submitted rating!!');
        window.location.reload();
      })
      .catch((error) => console.log('Error submitting rating:', error));
  };

  if (!doctor) {
    return <p className="text-lg md:text-3xl text-gray-600">Doctor not found.</p>;
  }

  // Determine the background color based on the rating range
  const getBgColor = (rating) => {
    if (rating >= 0 && rating <= 1) return "bg-gray-300";
    if (rating > 1 && rating <= 2) return "bg-orange-300";
    if (rating > 2 && rating <= 3) return "bg-yellow-300"; //yellow3
    if (rating > 3 && rating <= 4) return "bg-green-300";
    if (rating > 4 && rating <= 5) return "bg-green-500";
    return "bg-gray-200"; // Fallback color
  };

  // const bgColor = getBgColor(averageRating);

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

  // Load ratings in bunch of 5's
  const handleShowMore = () => {
    setVisibleRatings((prev) => prev + 5);
  };

  return (
    <div className="p-6 md:px-20 md:pt-12">
      <div className='flex flex-col md:flex-row gap-6 md:gap-12'>

        <div className=' md:max-w-[50%] lg:max-w-md'>
          <h1 className='flex'><span className='text-4xl font-bold'>{averageRating}</span><span className=''>/5</span></h1>
          <p className='text-sm md:text-lg mb-4'>Overall Quality Based on <b>{ratings.length} ratings</b></p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{doctor.name}</h1>
          <p className="text-sm md:text-lg">Doctor in the <b>{doctor.department} department</b> at <b>{doctor.hospitalName}.</b> Specializes in <b>{doctor.specialty}.</b></p>

          {/* <p className="text-sm md:text-xl text-gray-600">병원: {doctor.hospitalName}</p> */}
          {/* <p className="text-sm md:text-xl text-gray-600">진료과: {doctor.department}</p> */}
          {/* <p className="text-sm md:text-xl text-gray-600">전문분야: {doctor.specialty}</p> */}

          <p className="text-sm md:text-lg flex flex-col mt-2"><span className='text-lg md:text-3xl relative left-[10%]  font-bold'>{recommendationPercentage}%</span> would take/visit again.</p>

          {isLoggedIn ?
            <button onClick={toggleModal} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Rate Doctor
            </button>
            :
            <a onClick={() => navigate('/login')} className="text-blue-500 text-sm md:text-lg underline cursor-pointer">
              Login to rate the doctor
            </a>
          }
        </div>



        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white px-6 py-4 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Rate {doctor.name}</h2>
              <form onSubmit={handleFormSubmit} className='text-[11pt] md:text-[12pt]'>
                <label className="block mb-2">
                  Rating Level (Awesome 5, Great 4, Good 3, Ok 2, Awful 1):
                  <input
                    type="number"
                    name="overallRating"
                    value={formData.overallRating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="border p-2 w-full"
                    required
                  />
                </label>
                <label className="block mb-2">
                  Organized & presentable (1-5):
                  <input
                    type="number"
                    name="wasAwesome"
                    value={formData.wasAwesome}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="border p-2 w-full"
                    required
                  />
                </label>
                <label className="block mb-2">
                  Gentleness (1-5):
                  <input
                    type="number"
                    name="gentleness"
                    value={formData.gentleness}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="border p-2 w-full"
                    required
                  />
                </label>
                <label className="block mb-2">
                  Would Recommend (Yes or No):
                  <select
                    name="wouldRecommend"
                    value={formData.wouldRecommend}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
                <label className="block mb-2">
                  Comments:
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  ></textarea>
                </label>
                <label className="block mb-2">
                  Tags (comma-separated):
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={handleTagsChange}
                    className="border p-2 w-full"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit Rating
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <div className='md:min-w-[350px] lg:min-w-[450px] min-h-[350px] border bg-gray-200 rounded-md'>


          <h2 className="text-lg sm:text-xl font-semibold p-4">Rating Distribution</h2>
          <ul className='space-y-2 mt-2'>
            {Object.entries(ratingDistribution).sort(([a], [b]) => b - a).map(([level, count]) => (
              <li key={level} className='max-w-sm text-[11pt] md:text-[13pt] grid grid-cols-[1.8fr,4fr,0.5fr] gap-1 items-center'>
                <span className="justify-self-end text-sm md:text-[12pt] font-medium">
                  {ratingLabels[level]} <b>{level}</b>
                </span>
                <div
                  className="h-2 md:h-5 rounded-md md:rounded-none transition-all"
                  style={{
                    width: `${(count / maxCount) * 100}%`, // Adjust width dynamically
                    backgroundColor: 'rgb(0, 0, 255)',
                  }}
                ></div>
                <span className="text-sm font-medium">{count}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 pl-4">Top Tags</h2>
          {/* <p className='text-[11pt] md:text-[13pt]'>{topTags.join(', ')}</p> */}
          <p className='max-w-xs sm:max-w-sm md:max-w-md p pl-4 text-gray-500 text-[11pt] md:text-[13pt]'>{topTags.map((tag, index) => <span key={index} className='bg-gray-300 p-2 mr-2 rounded-lg'>{tag}</span>)}</p>
          {/* <p className='text-[11pt] md:text-[13pt]'>No. of ratings: {ratings.length}</p> */}
        </div>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 md:mt-12">User Ratings</h2>
      <div className="space-y-4 text-[11pt] md:text-[13pt]">
        {ratings.slice(0, visibleRatings).map((rating, index) => (
          <div key={index} className="relative flex md:gap-4 px-2 py-6 md:p-4 rounded shadow bg-gray-100 lg:max-w-[70vw]">
            <div className="text-[9pt] md:text-[11pt] flex flex-col items-center px-2">  QUALITY <span className={`${ratings.length > 0 ? `${getBgColor(rating.overallRating)} font-bold text-lg w-[60px] h-14 flex justify-center items-center` : 'font-normal text-[8pt] text-gray-400 my-2 w-full flex justify-center items-center'}`}>{rating.overallRating}.0</span></div>
            <div className='text-[9pt] md:text-[11pt]'>
              <p className='absolute right-3 top-2 text-gray-500'>{formatDate(new Date(rating.date).toLocaleDateString())}</p>
              {/* <p>Overall Rating: {rating.overallRating}</p> */}
              <p><span className='text-[12pt] md:font-bold'>O</span>rganized & presentable: <span className='text-orange-400'>{rating.wasAwesome}/5</span></p>
              <p><span className='text-[12pt] md:font-bold'>G</span>entleness: <span className='text-orange-400'>{rating.gentleness}/5</span></p>
              <p><span className='text-[12pt] md:font-bold'>W</span>ould Recommend: <span className='text-green-500'>{rating.wouldRecommend}</span></p>
              <p className='mt-2'>{rating.comments}</p>
              {/* {rating.tags.length > 0 ? <p>Tags: {rating.tags.join(', ')}</p> : ''} */}
              {rating.tags.length > 0 ? <p className='flex flex-wrap gap-1 md:gap-2 text-gray-500 '>{rating.tags.map((tag, index) => <span key={index} className='bg-gray-300 p-1 md:px-2 mr-1 md:mr-2 rounded-lg'>{tag}</span>)}</p> : ''}
            </div>
          </div>
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

export default DoctorDetails;
