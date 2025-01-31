import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='font-montserrat h-[75vh] flex flex-col gap-4 items-center justify-center px-8 text-center'>
      <h1> <span className='text-red-500 font-bold text-2xl'>404 - Page Not Found</span> </h1>
      <p className='text-gray-500'>The page you are looking for seems not to work or does not exist.</p>
      <Link to="/" className='text-blue-600 text-lg'>Go back to Home</Link>
    </div>
  );
}

export default NotFound;
