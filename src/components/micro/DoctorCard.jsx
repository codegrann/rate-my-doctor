import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ name, specialty, rating, hospitalName, department, BASE_URL }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/doctor-ratings/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
        calculateAverageRating(data);
      })
      .catch((error) => console.error('Error fetching ratings:', error));
  }, [name]);

  const calculateAverageRating = (ratingsData) => {
    if (ratingsData.length === 0) {
      setAverageRating(0);
      return;
    }
    const total = ratingsData.reduce((sum, rating) => sum + rating.overallRating, 0);
    setAverageRating((total / ratingsData.length).toFixed(1));
  };

  const handleClick = () => {
    navigate(`/doctor/${name}`);
  };
  
  return (
      <div className="p-4 border rounded shadow-md md:w-[700px] cursor-pointer" onClick={handleClick}>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">병원: {hospitalName}</p> {/*Hospital*/}
        <p className="text-sm text-gray-600">진료과: {department}</p> {/*Department*/}
        <p className="text-sm text-gray-600">전문분야: {specialty}</p> {/*Specialty*/}
        <p className="text-sm text-gray-600">
        {ratings.length} Ratings | Average Rating: {averageRating} ⭐
      </p>
      </div>
    );
  };
  
  export default DoctorCard;
  