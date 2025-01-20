import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ name, rating }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  // Fetch ratings when component loads
  useEffect(() => {
    fetch(`${BASE_URL}/ratings/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
        calculateAverageRating(data); // Calculate average once data is fetched
      })
      .catch((error) => console.error('Error fetching ratings:', error));
  }, [name]);


  // Calculate the average rating
  const calculateAverageRating = (ratingsData) => {
    if (ratingsData.length === 0) {
      setAverageRating(0);
      return;
    }
    const total = ratingsData.reduce((sum, rating) => sum + rating.overallRating, 0);
    const average = total / ratingsData.length;
    setAverageRating(parseFloat(average.toFixed(1))); // Rounded to one decimal
  };

  const handleClick = () => {
    navigate(`/hospital/${name}`);
  };
    return (
      <div className="p-4 border rounded shadow-md md:w-[700px] cursor-pointer" onClick={handleClick}>
        <h3 className="text-lg font-bold">{name}</h3>
        <h3 className="text-lg font-bold">No. of ratings: {ratings.length} | Overal Quality: {averageRating} ⭐</h3>
        {/* <p className="text-sm text-gray-600">Rating: {rating} ⭐</p> */}
      </div>
    );
  };
  
  export default HospitalCard;
  