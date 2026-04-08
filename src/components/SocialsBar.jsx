import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const FaIcon = (icon) => ({ size, className }) => (
  <FontAwesomeIcon icon={icon} className={className} style={{ fontSize: size }} />
);

const SocialsBar = () => {
  const [falling, setFalling] = useState({
    github: false,
    linkedin: false,
    mail: false,
  });

  const handleClick = (icon, url) => {
    setFalling((prev) => ({ ...prev, [icon]: true }));

    setTimeout(() => {
      window.open(url, "_blank");
      setFalling((prev) => ({ ...prev, [icon]: false }));
    }, 1000);
  };

  const socialLinks = [
    { 
      name: "github", 
      Icon: FaIcon(faGithub),
      color: "text-white", 
      link: "https://github.com/DeonJH", 
      label: "Github" 
    },
    { 
      name: "linkedin", 
      Icon: FaIcon(faLinkedin), 
      color: "text-blue-500", 
      link: "https://linkedin.com/in/deon-hill", 
      label: "LinkedIn" 
    },
    { 
      name: "mail", 
      Icon: Mail, 
      color: "text-red-500", 
      link: "mailto:Contact@deonhill.dev", 
      label: "Email" 
    },
  ];

  return (
    <div className="fixed flex flex-col top-0 left-0 p-4">
      {socialLinks.map(({ name, Icon, color, link, label }) => (
        <div key={name} className="relative group flex">
          <motion.button
            whileHover={{ scale: 1.1, transition: { duration: 0.05, ease: "easeOut" } }}
            animate={falling[name] ? { y: 500, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            onClick={() => handleClick(name, link)}
            className="mb-2"
          >
            <Icon size={24} className={`${color} hover:scale-110 transition-transform`} />
          </motion.button>

          {/* Label that appears only on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm ml-2 flex items-center">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SocialsBar;
