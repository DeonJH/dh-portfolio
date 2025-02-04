import React from "react";
import GitHubLogo from "../assets/GitHubLogo.png";

const GitHubPreviewCard = () => {
  return (
    <a href="https://github.com/DeonJH">
      <div className="group bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-90 
            border border-gray-500 flex flex-col justify-center rounded-lg shadow-md hover:bg-gray-600">
        <div className="p-2 flex flex-col items-center">
          <img src={GitHubLogo} className="mb-2 w-16" />

          <img
            src="https://github.com/DeonJH.png"
            alt="GitHub Profile"
            className="w-20 h-20 rounded-lg border-2 border-gray-600"
          />
        </div>

        <p className="p-2 text-sm text-gray-400">GitHub - @DeonJH</p>
        <a
          href="https://github.com/DeonJH"
          className="p-2 text-blue-600 group-hover:underline text-sm "> View Profile </a>

      </div>
    </a>
  );
};

export default GitHubPreviewCard;
