import './App.css'
import React from "react";
import AnimatedBackground from './components/AnimatedBackground';
import SocialsBar from './components/SocialsBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      {/* <SocialsBar /> */}
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;