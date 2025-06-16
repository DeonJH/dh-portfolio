import './App.css'
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import WeeklyTechNews from './components/WeeklyTechNews';
import Socials from './components/Socials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <WeeklyTechNews />
      <Socials />
      <Footer />
    </div>
  );
}

export default App;