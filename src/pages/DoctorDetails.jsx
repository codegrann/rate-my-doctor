import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

const DoctorDetails = ({ data, BASE_URL }) => {
  const { doctorName } = useParams();
  const doctor = data.find((doc) => doc.name === doctorName); // Retain doctor data structure
  const [ratings, setRatings] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [topTags, setTopTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    overallRating: '',
    wasAwesome: 0,
    gentleness: 0,
    wouldRecommend: 'Yes',
    comments: '',
    tags: [],
  });

  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    fetch(`${BASE_URL}/doctor-ratings/${doctorName}`)
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
        calculateRatingDistribution(data);
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
    return <p className="text-gray-600">Doctor not found.</p>;
  }

  return (
    <div className="p-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4">{doctor.name}</h1>
      <p className="text-sm text-gray-600">Hospital: {doctor.hospitalName}</p>
      <p className="text-sm text-gray-600">Department: {doctor.department}</p>
      <p className="text-sm text-gray-600">Specialty: {doctor.specialty}</p>

    {isLoggedIn ?
      <button onClick={toggleModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Rate Doctor
      </button>
    :
    <a onClick={()=>navigate('/login')} className="text-blue-500 underline cursor-pointer">
          Login to rate the doctor
    </a>
    }

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Rate {doctor.name}</h2>
            <form onSubmit={handleFormSubmit}>
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

      <h2 className="text-xl font-semibold mt-6">Rating Distribution</h2>
      <ul>
        {Object.entries(ratingDistribution).map(([level, count]) => (
          <li key={level}>Level {level}: {count} ratings</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Top Tags</h2>
      <p>{topTags.join(', ')}</p>
      <p>No. of ratings: {ratings.length}</p>

      <h2 className="text-xl font-semibold mt-6">User Ratings</h2>
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={index} className="p-4 border rounded shadow">
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
