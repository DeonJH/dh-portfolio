import './App.css'
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Socials from './components/Socials';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Socials />
      <Footer />
    </div>
  );
}

export default App;