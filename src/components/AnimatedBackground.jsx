import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buildParticles } from "../utils/particles.js";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [particles] = useState(buildParticles);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

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
      
      const gridSize = canvas.width < 768 ? 200 : 100;
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
      const shapeCount = canvas.width < 768 ? 3 : 6;
      ctx.fillStyle = "rgba(34, 197, 94, 0.02)";
      for (let i = 0; i < shapeCount; i++) {
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

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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
            duration: particle.duration,
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