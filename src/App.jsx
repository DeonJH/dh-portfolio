import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import SocialsBar from './components/socialsBar';
import AnimatedBackground from './components/AnimatedBackground';
import ContactForm from './components/ContactForm';
import FloatingSphere from './components/FloatingSphere';

// Components for different sections

function Navbar() {

  return (
    <nav
      className={`m-4 rounded-lg text-white shadow-lg`}
    >
      <div className="justify-center max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="space-x-4">
          <a href="#about" className="bg-black rounded-md px-4 py-2 hover:bg-green-600 border border-green-500">
            About
          </a>
          <a href="#projects" className="bg-black rounded-md px-4 py-2 hover:bg-green-600 border border-green-500">
            Projects
          </a>
          <a href="#contact" className="bg-black rounded-md px-4 py-2 hover:bg-green-600 border border-green-500">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

function Hero() {
  return (
    <section
      id="hero"
      className="text-white min-h-screen m-4 rounded-lg flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-5xl font-bold mb-4">DEON HILL</h1>
      <p className="text-xl mb-6 rounded-lg shadow-md p-6 text-center bg-radial-[at_50%_75%] from-black-300 via-black to-black to-100%">
      Hello and welcome to my digital space! Here, you’ll find a showcase of my passion for technology, 
      where curiosity meets creativity. From developing innovative software to exploring the world of data engineering, 
      data science, and AI, every project reflects my drive to grow and make an impact.
      I believe data holds the key to unlocking transformative possibilities, and AI empowers us to shape the future. 
      Technology is a journey of endless discovery, and I’m thrilled to share a glimpse of mine with you. 
      Let’s innovate, inspire, and build the future together!
      </p>
    
    </section>
  );
}

function About() {
  return (
    <section id="about" className="text-white py-20 px-6 p-6 m-4 rounded-lg shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-xl mb-6 bg-black rounded-lg shadow-md p-6 text-center border border-green-500">
          I’m an IT Specialist and Software Developer with over 4 years of
          experience in backend engineering, cloud platforms, and building
          efficient systems. I enjoy solving challenging problems and
          delivering impactful solutions.
        </p>
      </div>
    </section>
  );
}

function Projects() {
  const projectList = [
    {
      title: "Project 1",
      description: "A cool project using React and TailwindCSS.",
    },
    {
      title: "Project 2",
      description: "A backend API built with Python and Flask.",
    },
    {
      title: "Project 3",
      description: "A data pipeline solution using Java and AWS services.",
    },
  ];

  return (
    <section id="projects" className="text-white py-20 px-6 p-6 m-4 rounded-lg shadow-lg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project, index) => (
            <div
              key={index}
              className="bg-black rounded-lg shadow-md p-6 text-center border border-green-500"
            >
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="text-white py-20 px-6 p-6 m-4 rounded-lg shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Contact</h2>
        <div className='bg-black rounded-lg shadow-md p-6 text-center border border-green-500'>
        <p className="mb-6">
          If you'd like to connect or learn more about my work, feel free to
          reach out!
        </p>
        <a
          href="mailto:your-email@example.com"
          className="px-6 py-3 bg-black rounded-md text-white hover:bg-green-600"
        >
          Get in Touch
        </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-white py-4 m-4 text-center rounded-lg">
      <p>&copy; 2025 Deon's Portfolio. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <SocialsBar />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <ContactForm />
      
    </div>
  );
}

export default App;