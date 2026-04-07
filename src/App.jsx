import './App.css'
import ErrorBoundary from './components/ErrorBoundary';
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
    <ErrorBoundary>
      <div className="App flex flex-col flex-1">
        <div className="max-w-[1280px] mx-auto px-8 w-full flex-1">
          <AnimatedBackground />
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <WeeklyTechNews />
          <Socials />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;