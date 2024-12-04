const DoctorCard = ({ name, specialty, rating }) => {
    return (
      <div className="p-4 border rounded shadow-md">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">Specialty: {specialty}</p>
        <p className="text-sm text-gray-600">Rating: {rating} ⭐</p>
      </div>
    );
  };
  
  export default DoctorCard;
  