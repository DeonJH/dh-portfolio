import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;