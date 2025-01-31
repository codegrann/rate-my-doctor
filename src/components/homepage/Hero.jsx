import React, { useState } from "react";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = ({searchType, setSearchType, searchQuery, setSearchQuery}) => {
    const [query, setQuery] = useState(""); // State to store the search query
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && query.trim()) {
            setSearchType("Hospital")
            setSearchQuery(query)
            navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <section
            className="font-montserrat relative flex flex-col items-center justify-center h-[90vh] text-center bg-cover bg-center px-2"
            style={{ backgroundImage: `url('/banner.jpg')`}} // Replace with your image URL
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Content */}
            <div className=" z-10 text-white">
                <h1 className="text-4xl font-bold md:text-6xl">DOCTOR HAUS</h1>
                <p className="mt-4 text-lg md:text-xl">
                당신의 이야기로 완성되는 당신만의 의료지도
                    {/* Your own medical map completed with your story */}
                </p>

                {/* Input Field */}
                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-3 md:left-16 flex items-center text-gray-900 text-2xl w-[22px]">
                        <FaStethoscope/>
                    </span>
                    <input
                        type="text"
                        placeholder="병원 이름을 입력하세요" /*Enter the hospital name*/
                        className="w-full px-10 py-3 text-gray-700 placeholder-gray-400 rounded-lg shadow-lg md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // Update query on input change
                        onKeyDown={handleKeyDown} // Trigger search on Enter key press
                    />
                </div>

                {/* Link */}
                <p
                    // href="/search"
                    onClick={()=>navigate('/search')}
                    className="block mt-4 text-sm md:text-lg text-blue-300 hover:cursor-pointer underline hover:text-blue-400"
                >
                    의사 이름으로 검색하기
                    {/* Search by doctor name */}
                </p>
            </div>
        </section>
    );
};

export default Hero;
