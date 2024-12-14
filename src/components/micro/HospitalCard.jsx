import { useNavigate } from 'react-router-dom';

const HospitalCard = ({ name, rating }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hospital/${name}`);
  };
    return (
      <div className="p-4 border rounded shadow-md md:w-[700px] cursor-pointer" onClick={handleClick}>
        <h3 className="text-lg font-bold">{name}</h3>
        {/* <p className="text-sm text-gray-600">Rating: {rating} ⭐</p> */}
      </div>
    );
  };
  
  export default HospitalCard;
  