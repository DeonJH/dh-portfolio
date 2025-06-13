import ProfileImage from "../assets/ProfileImage.jpg";
import LILogo from "../assets/LI-Logo.png";

const LinkedInProfileCard = () => {
  return (
    <a
      href="https://linkedin.com/in/deon-hill">
      <div id="md" className="group flex items-center p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-90 
            border border-gray-500 rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-4">

          <img src={LILogo} className="w-16" />

          {/* Profile Picture */}
          <img
            src={ProfileImage}
            alt="LinkedIn Profile"
            className="w-25 h-25 rounded-full border border-gray-500"
          />
          <h2 className="text-lg font-semibold text-gray-400">Deon Hill</h2>
          <p className="text-gray-400 text-sm">
            Full Stack Software Engineer | Java | Spring Framework | React | JavaScript | Computer Science
          </p>
          <a
            href="https://linkedin.com/in/deon-hill"
            className="text-blue-600 group-hover:underline text-sm"> View Profile </a>
        </div>
      </div>
    </a>
  );
};

export default LinkedInProfileCard;
