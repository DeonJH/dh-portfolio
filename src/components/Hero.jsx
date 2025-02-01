import React from "react";
import ProjectsFolder from './ProjectsFolder';
import SocialsBar from './SocialsBar';

function Hero() {
    return (
        <section
            id="hero"
            className="text-white min-h-screen m-4 rounded-lg flex flex-col items-center justify-center text-center"
        >
            <div className="text-xl mb-6 rounded-lg p-15 text-center 
            bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-90 
            border border-gray-500 flex flex-row items-center">
                {/* Paragraph moved to the right */}
                <p className="px-20 ml-3 text-center">Hello and welcome to my digital space! Here, you’ll find a showcase of my passion for technology,
                    where curiosity meets creativity. From developing innovative software to exploring the world of data engineering,
                    data science, and AI, every project reflects my drive to grow and make an impact.
                    I believe data holds the key to unlocking transformative possibilities, and AI empowers us to shape the future.
                    Technology is a journey of endless discovery, and I’m thrilled to share a glimpse of mine with you.
                    Let’s innovate, inspire, and build the future together!</p>

                {/* Left side (you can put images, text, etc.) */}
                <div className="flex-2 mr-15">
                    {/* Place your images or any other content you want on the left side */}
                    <h2 className="text-3xl font-semibold">Right side content</h2>
                    <ProjectsFolder />
                </div>

                <div className="mr-15">
                    <SocialsBar />
                </div>


            </div>
        </section>
    );
}

export default Hero;
