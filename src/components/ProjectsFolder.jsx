import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const ProjectsFolder = () => {
  const [isOpen, setIsOpen] = useState(false);

  // List of projects with links
  const projects = [
    { name: "Portfolio", link: "/projects/portfolio" },
    { name: "Data Pipeline", link: "/projects/data-pipeline" },
    { name: "AI Chatbot", link: "/projects/ai-chatbot" },
  ];

  return (
    <div>
      {/* Folder Icon */}
      <button
        className="flex space-x-2 p-4 rounded-lg hover:bg-gray-800 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faFolder} className="text-yellow-400 text-2xl" />
        <span className="text-white">Projects</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <ul className="py-2">
            {projects.map((project, index) => (
              <li key={index}>
                <a
                  href={project.link}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectsFolder;