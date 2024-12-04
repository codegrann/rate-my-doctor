import React from 'react';
import { FaStethoscope } from 'react-icons/fa';

const Hero = () => {
    return (
        <section
            className="relative flex flex-col items-center justify-center h-[75vh] text-center bg-cover bg-center px-2"
            style={{ backgroundImage: `url('/banner.jpg')`}} // Replace with your image URL
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className="relative z-10 text-white">
                <h1 className="text-4xl font-bold md:text-6xl">DOCTOR HAUS</h1>
                <p className="mt-4 text-lg md:text-xl">
                    Your own medical map completed with your story
                </p>

                {/* Input Field */}
                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-3 md:left-10 flex items-center text-gray-900 text-2xl w-[22px]">
                        <FaStethoscope />
                    </span>
                    <input
                        type="text"
                        placeholder="Enter the hospital name"
                        className="w-full px-10 py-3 text-gray-700 placeholder-gray-400 rounded-lg shadow-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Link */}
                <a
                    href="/search"
                    className="block mt-4 text-sm text-blue-300 underline hover:text-blue-500"
                >
                    Search by doctor name
                </a>
            </div>
        </section>
    );
};

export default Hero;
