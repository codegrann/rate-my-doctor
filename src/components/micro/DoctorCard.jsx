import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const DoctorCard = ({ name, specialty, hospitalName, department, BASE_URL }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [recommendationPercentage, setRecommendationPercentage] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${BASE_URL}/doctor-ratings/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
        calculateAverageRating(data);
        calculateRecommendationPercentage(data);
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

  const calculateRecommendationPercentage = (ratingsData) => {
    const totalRatings = ratingsData.length;
    const recommendCount = ratingsData.filter(
      (rating) => rating.wouldRecommend === "Yes"
    ).length;

    const percentage =
      totalRatings > 0 ? Math.round((recommendCount / totalRatings) * 100) : 0;
    setRecommendationPercentage(percentage);
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

  const bgColor = getBgColor(averageRating);

  const handleClick = () => {
    navigate(`/doctor/${name}`);
  };
  
  return (
      <div className="flex items-center gap-4 sm:gap-8 p-4 pl-1 sm:pl-4 border rounded shadow-md md:w-[700px] cursor-pointer" onClick={handleClick}>
        <div className="text-[9pt] md:text-[11pt] flex flex-col items-center px-2">  QUALITY <span className={`${ratings.length > 0 ? `${bgColor} font-bold text-lg w-[60px] h-14 flex justify-center items-center` : 'font-normal text-[8pt] text-gray-400 my-2 w-full flex justify-center items-center'}`}>{ratings.length==0? 'Not rated': averageRating}</span> <span>{ratings.length} {ratings.length == 1 ? 'rating': 'ratings'} <span className='text-yellow-600'>⭐</span> </span> </div>
         <div>
            <h3 className="text-lg md:text-2xl font-sans font-bold">{name}</h3>
            <p className="text-[9pt] md:text-lg text-gray-500">진료과: {department}</p> {/*Department*/}
            <p className="text-[9pt] md:text-lg text-gray-500">병원: {hospitalName}</p> {/*Hospital*/}
            <p className="text-[9pt] md:text-lg text-gray-500">전문분야: {specialty}</p> {/*Specialty*/}        
            <p className="text-[9pt] md:text-md"><span className='font-semibold'>{recommendationPercentage}%</span> would take/visit again.</p>
        </div>
      


      </div>
    );
  };
  
  export default DoctorCard;
  