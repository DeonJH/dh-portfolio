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

            {/* <div className="flex flex-row p-6 gap-4">
                <LinkedInProfileCard />
                <GitHubPreviewCard />
            </div> */}
            {/* <div className="ml-4 flex"><SocialsBar /></div> */}

            {/* <ProjectsFolder /> */}

            <div className="text-xl">
                <p className="p-6 text-center">Hello and welcome! Here, you’ll find a showcase of my passion for technology. 
                    From developing innovative software to exploring the world of data engineering,
                    data science, cybersecurity, and AI, every project reflects my drive to make an impact.
                    Technology is a journey of endless discovery, and I’m thrilled to share a glimpse of mine with you!</p>
            </div>
        </section>
    );
}

export default Hero;
