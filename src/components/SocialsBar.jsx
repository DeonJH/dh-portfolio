import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const SocialBar = () => {
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

  return (
    <div className="p-2 space-y-4">
      {[
        { name: "github", Icon: Github, color: "text-white", link: "https://github.com/DeonJH", label: "GitHub" },
        { name: "linkedin", Icon: Linkedin, color: "text-blue-900", link: "https://linkedin.com/in/deon-hill", label: "LinkedIn" },
        { name: "mail", Icon: Mail, color: "text-red-900", link: "mailto:Deonjh12@gmail.com", label: "Email" },
      ].map(({ name, Icon, color, link, label }) => (
        <div key={name} className="relative group">
          <motion.button
            whileHover={{ scale: 1.1, transition: { duration: 0.05, ease: "easeOut" } }}
            animate={falling[name] ? { y: 500, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            onClick={() => handleClick(name, link)}
            className="p-2 hover:bg-gradient-to-r from-gray-400 via-black to-gray-400 rounded-full transition"
          >
            <Icon size={50} className={`w-6 h-6 ${color}`} />
          </motion.button>

          {/* Label that appears only on hover */}
          <span
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm px-4 py-5"
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SocialBar;
