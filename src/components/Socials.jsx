import React from "react";
import LinkedInProfileCard from './LinkedInProfileCard';
import GitHubPreviewCard from './GitHubPreviewCard';
import SocialsBar from "./SocialsBar";

const Socials = () => {
    return (
        <section className="p-2 text-white rounded-lg">
            <div className="justify-center items-center flex flex-col p-6 gap-4">
                <LinkedInProfileCard />
                <GitHubPreviewCard />
            </div>
        </section>
    );

}

export default Socials;