import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython, faJava, faJs, faAws, faDocker, faReact } from "@fortawesome/free-brands-svg-icons";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [iconPositions, setIconPositions] = useState([]);

  const icons = [
    { icon: faPython, color: "#3776AB" }, // Python Blue
    { icon: faJava, color: "#E76F00" }, // Java Orange
    { icon: faJs, color: "#F7DF1E" }, // JavaScript Yellow
    { icon: faAws, color: "#FF9900" }, // AWS Orange
    { icon: faDocker, color: "#2496ED" }, // Docker Blue
    { icon: faReact, color: "#61DBFB" }, // React Cyan
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to fit screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Generate static icon positions
    const generateIconPositions = () => {
      let positions = [];
      for (let i = 0; i < columns; i += Math.floor(Math.random() * 4) + 1) {
        positions.push({
          column: i,
          y: Math.random() * window.innerHeight,
          iconData: icons[Math.floor(Math.random() * icons.length)],
          speed: Math.random() * 2 + 1,
        });
      }
      setIconPositions(positions);
    };

    generateIconPositions();

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      // Draw the matrix rain with 1s and 0s
      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
      />
      {iconPositions.map((pos, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: "100vh" }}
          transition={{ duration: pos.speed * 5, repeat: Infinity, ease: "linear" }}
          whileHover={{
            scale: 1.3, // Slight zoom effect on hover
            y: "-10px", // Move up slightly when hovered
            transition: { duration: 0.3 },
          }}
          style={{
            position: "fixed",
            left: `${pos.column * 18}px`, // Align icons with matrix rain columns
            top: pos.y,
            fontSize: "30px",
            color: pos.iconData.color,
            textShadow: `0 0 10px ${pos.iconData.color}, 0 0 20px ${pos.iconData.color}`,
          }}
        >
          <FontAwesomeIcon icon={pos.iconData.icon} />
        </motion.div>
      ))}
    </>
  );
};

export default AnimatedBackground;