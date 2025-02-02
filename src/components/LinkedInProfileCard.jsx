import React from "react";
import ProfileImage from "../assets/ProfileImage.jpg";
import LILogo from "../assets/LI-Logo.png";

const LinkedInProfileCard = () => {
  return (
    <a
      href="https://linkedin.com/in/deon-hill">
      <div id="md" className="group flex items-center p-4 bg-gray-900 rounded-lg shadow-md border border-gray-500 hover:bg-gray-800">
        <div className="flex flex-col items-center gap-4">

            <img src={LILogo} className="w-16" />

            {/* Profile Picture */}
            <img
              src={ProfileImage}
              alt="LinkedIn Profile"
              className="w-25 h-25 rounded-full border border-gray-500"
            />
          <h2 className="text-lg font-semibold text-gray-400">Deon Hill</h2>
          <p className="text-gray-600 text-sm">Full Stack Software Engineer | Java | Spring Framework | React | JavaScript | Computer Science</p>
          <a
            href="https://linkedin.com/in/deon-hill"
            className="text-blue-600 group-hover:underline text-sm"> View Profile </a>
        </div>
      </div>
    </a>
  );
};

export default LinkedInProfileCard;
