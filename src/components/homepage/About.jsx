import React from 'react'

function About() {
  return (
    <>
      <section className="py-12 bg-white font-montserrat">
            {/* Main About Section */}
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-center text-3xl font-bold md:text-4xl">About us</h2>
                <div className="mt-6 space-y-4 text-justify text-gray-800">
                    <p>
                    Doctor Haus <span className='font-sans'>(닥터하우스)</span>는 환자들이 한국에서 가장 적합한 의사와 의료 서비스를 찾을 수 있도록 다양한 사용자 중심의 서비스를 제공합니다. 개개인의 환자들이 부상이나 질환으로 병원 정보를 검색하는 것은 비교적 쉬웠지만, 개별 의사에 대한 평가와 리뷰와 같은 실질적인 정보는 쉽게 얻기 어려웠습니다.
                    </p>
                      <p>닥터하우스는 이러한 정보의 부재와 기존의 폐쇄적인 의료 정보 체계를 개선하기 위해 탄생했습니다. 저희 플랫폼은 전국의 사용자들이 의사와 병원에 대한 평가와 리뷰를 공유할 수 있도록 하며, 의사들의 전문분야와 경력에 대한 상세한 정보를 제공합니다. 닥터하우스는 환자들이 원하는 병원이나 진료를 제공하는 의사를 전문분야, 경력, 위치 등의 기준으로 쉽게 검색할 수 있는 기능을 갖추고 있습니다. 또한, 실제 환자와 보호자들이 작성한 리뷰를 통해 신뢰할 수 있는 정보를 제공하며, 병원과 진료소에 대한 포괄적인 데이터를 통해 지역 내에서 최적의 의료 시설을 찾을 수 있도록 지원합니다. 닥터하우스는 환자 중심의 투명한 의료 정보를 제공함으로써, 의료 선택의 폭을 확장하고 더 나은 의료 경험을 지원하는 것을 목표로 합니다.</p>                 
                      
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="mt-12 md:mt-16 md:mb-4 px-4 flex flex-col md:flex-row items-center md:justify-center max-w-6xl mx-auto">
                {/* Text Content */}
                <div className="md:w-1/2 md:pr-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="mt-4 text-gray-800">
                    병원을 찾는 모든 사람들이 Doctor Haus <span className='font-sans'>(닥터하우스)</span>를 통해 올바른 의료 선택을 하고, 투명한 의료 정보에 대한 접근 권리를 보장받을 수 있다고 믿습니다. 이를 실현하는 것이 저희의 사명이자 미션입니다.
                        {/* Our mission is to revolutionize medical care through transparency, trust, and community-driven feedback. By connecting patients with hospitals and doctors they can trust, we aim to set a new standard for healthcare services. */}
                    </p>
                </div>

                {/* Image */}
                <div className="mt-8 md:mt-0 w-1/2 md:w-1/4 flex justify-center">
                    <img
                        src="/hos4.JPG"
                        alt="Our Mission"
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    </>
  )
}

export default About