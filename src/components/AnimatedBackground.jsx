import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
    const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16; // Font size of the characters
    const columns = Math.floor(canvas.width / fontSize); // Number of columns
    const drops = Array(columns).fill(1); // Y positions for each column

    const drawMatrix = () => {
      // Set background with slight opacity for trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = "#0f0"; // Green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0"; // Randomly choose 1 or 0
        const x = i * fontSize; // X-coordinate
        const y = drops[i] * fontSize; // Y-coordinate

        // Draw the character
        ctx.fillText(text, x, y);

        // Randomly reset drop position or move down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0; // Reset to top
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
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
  );
};

export default AnimatedBackground;