import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '../../hooks/AuthContext';

function WhyJoinUs() {
  const navigate=useNavigate();
  const { isLoggedIn } = useAuth();


  return (
    <section className="py-12 px-2 bg-gray-50 font-montserrat">
            {/* Main Content */}
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold md:text-4xl">
                    { isLoggedIn ? "다시 오신 것을 환영합니다!" : "Doctor Haus 가족이 되어주세요"}
                    {/* { isLoggedIn ? "다시 오신 것을 환영합니다!" : "Join the Doctor Haus family"} */}
                </h2>
                <p className="mt-4 text-gray-700 px-3">
                    당신의 이야기와 경험은 대한민국 의료의 새로운 기준이 됩니다
                    {/* Your story and experience will become a new standard for medical care in Korea. */}
                </p>
                { !isLoggedIn && <button  className="font-sans mt-6 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    <Link to={'/signup'}>
                        회원가입
                        {/* Join the Membership */}
                    </Link>
                </button> }
            </div>

            {/* Reasons Section */}
            <div className="grid grid-cols-1 gap-6 lg:gap-2 mt-10 md:grid-cols-3 lg:w-[65vw] lg:mx-auto md:px-2">
                {/* Reason 1 */}
                <div className="text-center">
                    <img
                        src="/hos1.JPG"
                        alt="Reason 1"
                        className="w-48 h-48 lg:w-60 lg:h-60 mx-auto rounded-md"
                    />
                    <p className="mt-2 font-medium text-gray-800 flex flex-col">
                        <span className="text-sm">당신의 평가는 항상 익명으로 처리됩니다</span>
                        <span className="text-xs px-3 mt-2 md:mt-3 text-gray-500">모든 사용자의 평가는 익명으로 처리되며, 개인정보가 노출되지 않습니다</span>
                    </p>
                </div>
                {/* Reason 2 */}
                <div className="text-center">
                    <img
                        src="/hos2.JPG"
                        alt="Reason 2"
                        className="w-48 h-48 lg:w-60 lg:h-60 mx-auto rounded-md"
                    />
                    <p className="mt-2 font-medium text-gray-800 flex flex-col">
                    <span className="text-sm">평가에 공감하거나 공감하지 않을수 있습니다</span>
                    <span className="text-xs px-3 mt-2 md:mt-3 text-gray-500">다른 사용자들이 남긴 평가를 좋아하거나 싫어하며 피드백을 제공하세요</span>
                    </p>
                </div>
                {/* Reason 3 */}
                <div className="text-center">
                    <img
                        src="/hos3.JPG"
                        alt="Reason 3"
                        className="w-48 h-48 lg:w-60 lg:h-60 mx-auto rounded-md"
                    />
                    <p className="mt-2 font-medium text-gray-800 flex flex-col">
                    <span className="text-sm">평가를 관리하고 수정할수 있습니다</span>
                    <span className="text-xs px-3 mt-2 md:mt-3 text-gray-500">당신이 제공한 평가를 언제든지 확인하고, 필요에 따라 당신의 의견이 반영되게 합니다</span>
                    </p>
                </div>
            </div>
        </section> 
  )
}

export default WhyJoinUs