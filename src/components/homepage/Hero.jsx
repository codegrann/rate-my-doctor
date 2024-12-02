import React from 'react';

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
                <h1 className="text-4xl font-bold md:text-6xl">Doctor Haus</h1>
                <p className="mt-4 text-lg md:text-xl">
                    Find the best hospitals and doctors near you with ease.
                </p>

                {/* Input Field */}
                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-900 text-2xl">
                        ❤️
                    </span>
                    <input
                        type="text"
                        placeholder="Enter the hospital name"
                        className="w-full px-10 py-3 text-gray-700 placeholder-gray-400 rounded-lg shadow-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Link */}
                <a
                    href="#"
                    className="block mt-4 text-sm text-blue-300 underline hover:text-blue-500"
                >
                    Search by doctor name
                </a>
            </div>
        </section>
    );
};

export default Hero;
