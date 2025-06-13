import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Create floating particles with official tech logos
  const createParticles = useMemo(() => {
    const techIcons = [
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
    const particleCount = 16;
    
         return Array.from({ length: particleCount }, (_, i) => {
       const techIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
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
       };
     });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particlesArray = createParticles;

    // Resize canvas to fit screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);



    // Draw geometric patterns
    const drawBackground = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid pattern
      ctx.strokeStyle = "rgba(34, 197, 94, 0.03)";
      ctx.lineWidth = 1;
      
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw floating geometric shapes
      ctx.fillStyle = "rgba(34, 197, 94, 0.02)";
      for (let i = 0; i < 6; i++) {
        const x = (Math.sin(Date.now() * 0.0005 + i) * 150) + (canvas.width / 2);
        const y = (Math.cos(Date.now() * 0.0003 + i) * 100) + (canvas.height / 2);
        const size = 20 + Math.sin(Date.now() * 0.001 + i) * 8;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      drawBackground();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    setParticles(particlesArray);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [createParticles]);

  return (
    <>
      {/* Canvas for geometric patterns */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: -2 }}
      />
      
      {/* Floating tech symbols */}
      {particles.map((particle) => (
                <motion.div
          key={particle.id}
          className="fixed select-none cursor-pointer"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            zIndex: -1,
          }}
          animate={{
            x: [0, particle.speedX * 100, 0],
            y: [0, particle.speedY * 100, 0],
            rotate: [0, particle.rotationSpeed * 180, particle.rotationSpeed * 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            scale: 1.5,
            y: -20,
            rotate: 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
           <FontAwesomeIcon 
             icon={particle.icon}
             size="2x"
             style={{
               color: particle.color,
               filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
             }}
           />
         </motion.div>
      ))}

      {/* Subtle gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)
          `,
          zIndex: -1,
        }}
      />
    </>
  );
};

export default AnimatedBackground;