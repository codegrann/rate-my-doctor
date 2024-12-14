import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ name, specialty, rating, hospitalName, department }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/doctor/${name}`);
  };    return (
      <div className="p-4 border rounded shadow-md md:w-[700px] cursor-pointer" onClick={handleClick}>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">병원: {hospitalName}</p> {/*Hospital*/}
        <p className="text-sm text-gray-600">진료과: {department}</p> {/*Department*/}
        <p className="text-sm text-gray-600">전문분야: {specialty}</p> {/*Specialty*/}
        <p className="text-sm text-gray-600">평점: {rating} ⭐</p> {/*Rating*/}
      </div>
    );
  };
  
  export default DoctorCard;
  