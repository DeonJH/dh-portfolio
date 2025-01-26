import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const SocialsBar = () => {
  return (
    <div className="fixed top-4 left-2 flex flex-col items-center space-y-4">
      <a
        href="https://github.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-green-600 transition"
      >
        <Github className="w-6 h-6 text-white" />
      </a>
      <a
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full hover:bg-green-600 transition"
      >
        <Linkedin className="w-6 h-6 text-white" />
      </a>
      <a
        href="mailto:your.email@example.com"
        className="p-2 rounded-full hover:bg-green-600 transition"
      >
        <Mail className="w-6 h-6 text-white" />
      </a>
      
    </div>
  );
};

export default SocialsBar;