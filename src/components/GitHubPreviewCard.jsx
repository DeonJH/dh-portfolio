import React from "react";
import GitHubLogo from "../assets/GitHubLogo.png";

const GitHubPreviewCard = () => {
  return (
    <a href="https://github.com/DeonJH">
      <div className="group bg-gray-900 flex flex-col justify-center rounded-lg shadow-md border border-gray-500 hover:bg-gray-800">
        <div className="p-2 flex flex-col items-center">
          <img src={GitHubLogo} className="mb-2 w-16" />

          <img
            src="https://github.com/DeonJH.png"
            alt="GitHub Profile"
            className="w-20 h-20 rounded-lg border-2 border-gray-600"
          />
        </div>

        <p className="p-2 text-sm">GitHub - @DeonJH</p>
        <a
          href="https://github.com/DeonJH"
          className="p-2 text-blue-600 group-hover:underline text-sm"> View Profile </a>

      </div>
    </a>
  );
};

export default GitHubPreviewCard;
