import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Play from './components/Play.jsx';
import Journal from './components/Journal.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Ambient warmth — fixed, subtle, behind everything */}
      <div
        className="ambient-blob bg-moss/10"
        style={{ top: '8%', right: '-12%', width: '520px', height: '520px' }}
        aria-hidden
      />
      <div
        className="ambient-blob bg-clay/15"
        style={{ top: '110vh', left: '-12%', width: '600px', height: '600px' }}
        aria-hidden
      />
      <div
        className="ambient-blob bg-moss/8"
        style={{ top: '230vh', right: '0%', width: '420px', height: '420px' }}
        aria-hidden
      />

      <Navbar />

      <main>
        <Hero />
        <Projects />
        <Play />
        <Journal />
        <About />
        <Footer />
      </main>
    </div>
  );
}
