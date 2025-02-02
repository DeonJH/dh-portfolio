import React from "react";
import ProjectsFolder from './ProjectsFolder';
import SocialsBar from './SocialsBar';
import LinkedInProfileCard from './LinkedInProfileCard';
import GitHubPreviewCard from './GitHubPreviewCard';

function Hero() {
    return (
        <section
            id="hero"
            className="p-2 text-white rounded-lg justify-center text-center 
            bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-90 
            border border-gray-500">

            <div className="flex flex-row p-6 gap-4">
                <LinkedInProfileCard />
                <GitHubPreviewCard />
            </div>
            {/* <div className="ml-4 flex"><SocialsBar /></div> */}

            {/* <ProjectsFolder /> */}

            <div className="text-xl">
                <p className="p-6 text-center">Hello and welcome to my digital space! Here, you’ll find a showcase of my passion for technology,
                    where curiosity meets creativity. From developing innovative software to exploring the world of data engineering,
                    data science, and AI, every project reflects my drive to grow and make an impact.
                    I believe data holds the key to unlocking transformative possibilities, and AI empowers us to shape the future.
                    Technology is a journey of endless discovery, and I’m thrilled to share a glimpse of mine with you.
                    Let’s innovate, inspire, and build the future together!</p>

            </div>
        </section>
    );
}

export default Hero;
