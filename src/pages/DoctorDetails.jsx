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
  const [averageRating, setAverageRating]=useState(0)
  const [recommendationPercentage, setRecommendationPercentage] = useState(0);
  const [topTags, setTopTags] = useState([]);
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
    <a onClick={()=>navigate('/login')} className="text-blue-500 text-sm md:text-lg underline cursor-pointer">
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
        {Object.entries(ratingDistribution).sort(([a],[b])=>b-a).map(([level, count]) => (
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
      <p className='max-w-xs sm:max-w-sm md:max-w-md p pl-4 text-gray-500 text-[11pt] md:text-[13pt]'>{topTags.map((tag, index)=><span key={index} className='bg-gray-300 p-2 mr-2 rounded-lg'>{tag}</span>)}</p>
      {/* <p className='text-[11pt] md:text-[13pt]'>No. of ratings: {ratings.length}</p> */}
      </div>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 md:mt-12">User Ratings</h2>
      <div className="space-y-4 text-[11pt] md:text-[13pt]">
        {ratings.map((rating, index) => (
          <div key={index} className="p-4 border rounded shadow bg-gray-200 lg:max-w-[70vw]">
            <p>Overall Rating: {rating.overallRating}</p>
            <p>Rated on: {new Date(rating.date).toLocaleDateString()}</p>
            <p>Organized & presentable: {rating.wasAwesome}/5</p>
            <p>Gentleness: {rating.gentleness}/5</p>
            <p>Would Recommend: {rating.wouldRecommend}</p>
            <p>Comments: {rating.comments}</p>
            {rating.tags.length > 0 ? <p>Tags: {rating.tags.join(', ')}</p> : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDetails;
