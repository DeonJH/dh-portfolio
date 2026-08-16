import {
  faPython,
  faJava,
  faJs,
  faReact,
  faNodeJs,
  faDocker,
  faAws,
  faGitAlt,
  faHtml5,
  faCss3Alt
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCog, faRobot, faBolt } from "@fortawesome/free-solid-svg-icons";

const TECH_ICONS = [
  // Programming Languages
  { icon: faPython, color: "#3776AB", name: "Python" },
  { icon: faJava, color: "#ED8B00", name: "Java" },
  { icon: faJs, color: "#F7DF1E", name: "JavaScript" },
  { icon: faHtml5, color: "#E34F26", name: "HTML5" },
  { icon: faCss3Alt, color: "#1572B6", name: "CSS3" },

  // Frameworks & Tools
  { icon: faReact, color: "#61DAFB", name: "React" },
  { icon: faNodeJs, color: "#339933", name: "Node.js" },
  { icon: faDocker, color: "#2496ED", name: "Docker" },
  { icon: faAws, color: "#FF9900", name: "AWS" },
  { icon: faGitAlt, color: "#F05032", name: "Git" },

  // Data & AI Tools
  { icon: faDatabase, color: "#336791", name: "Database" },
  { icon: faRobot, color: "#22C55E", name: "AI/ML" },
  { icon: faCog, color: "#6B7280", name: "Automation" },
  { icon: faBolt, color: "#FBBF24", name: "Performance" },
];

// Build the floating particles once. Randomness lives here (outside render)
// so the component render stays pure.
export const buildParticles = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 8 : 16;

  return Array.from({ length: particleCount }, (_, i) => {
    const techIcon = TECH_ICONS[Math.floor(Math.random() * TECH_ICONS.length)];
    return {
      id: i,
      icon: techIcon.icon,
      color: techIcon.color,
      name: techIcon.name,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      size: Math.random() * 16 + 24,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      duration: 20 + Math.random() * 10,
    };
  });
};
