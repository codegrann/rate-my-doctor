import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function WhyJoinUs() {
  const navigate=useNavigate();
  return (
    <section className="py-12 px-2 bg-gray-50">
            {/* Main Content */}
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold md:text-4xl">
                    Join the Doctor Haus family
                </h2>
                <p className="mt-4 text-gray-700">
                    Your story and experience will become a new standard for medical care in Korea.
                </p>
                <button  className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                <Link to={'/signup'}>
                    Join the Membership
                </Link>
                </button>
            </div>

            {/* Reasons Section */}
            <div className="grid grid-cols-1 gap-6 lg:gap-2 mt-10 md:grid-cols-3 lg:w-[65vw] lg:mx-auto">
                {/* Reason 1 */}
                <div className="text-center">
                    <img
                        src="/hos1.JPG"
                        alt="Reason 1"
                        className="w-48 h-48 lg:w-60 lg:h-60 mx-auto rounded-md"
                    />
                    <p className="mt-4 font-medium text-gray-800">
                        Trusted by Patients
                    </p>
                </div>
                {/* Reason 2 */}
                <div className="text-center">
                    <img
                        src="/hos2.JPG"
                        alt="Reason 2"
                        className="w-48 h-48 lg:w-60 lg:h-60 mx-auto rounded-md"
                    />
                    <p className="mt-4 font-medium text-gray-800">
                        Comprehensive Reviews
                    </p>
                </div>
                {/* Reason 3 */}
                <div className="text-center">
                    <img
                        src="/hos3.JPG"
                        alt="Reason 3"
                        className="w-48 h-48 lg:w-60 lg:h-60 mx-auto rounded-md"
                    />
                    <p className="mt-4 font-medium text-gray-800">
                        Expert Medical Insights
                    </p>
                </div>
            </div>
        </section> 
  )
}

export default WhyJoinUs