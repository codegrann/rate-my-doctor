import React from 'react'
import { Outlet } from 'react-router-dom'

function About() {
  return (
    <>
      <section className="py-12 bg-white">
            {/* Main About Section */}
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-center text-3xl font-bold md:text-4xl">About us</h2>
                <div className="mt-6 space-y-4 text-justify text-gray-700">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, pariatur magni nesciunt excepturi blanditiis, nisi quos cumque distinctio, minima doloremque enim eveniet porro quae natus ex. Illum nostrum cum ratione beatae iste magni similique nobis quo cupiditate veniam, dolore libero. Dolores voluptas ex nam voluptate, ullam sint maiores tempore quod!
                    </p>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos aspernatur nobis repellendus mollitia repellat at, doloribus inventore qui laboriosam tempore reprehenderit rem ab quis impedit recusandae quae? Placeat labore ratione repellat voluptates eveniet dolores eius porro quasi officia exercitationem. Doloremque consectetur harum vel eaque nisi assumenda commodi quos aliquid labore?                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam tempore quibusdam voluptatibus? Nobis nulla molestiae modi tempora vero quis ut odio adipisci sit non cupiditate fuga eos perspiciatis tempore voluptatum sed, beatae laudantium veniam consequatur animi error? Quos, perferendis cum, officiis tempore voluptatum assumenda quas excepturi labore doloribus est omnis!
                      </p>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="mt-12 md:mt-16 md:mb-4 px-4 flex flex-col md:flex-row items-center md:justify-center max-w-6xl mx-auto">
                {/* Text Content */}
                <div className="md:w-1/2 md:pr-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="mt-4 text-gray-700">
                        Our mission is to revolutionize medical care through transparency, trust, and community-driven feedback. By connecting patients with hospitals and doctors they can trust, we aim to set a new standard for healthcare services.
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