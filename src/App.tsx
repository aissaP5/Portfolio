
import { WebGLBackground } from './components/WebGLBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { FloatingBackToTop } from './components/FloatingBackToTop';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-dark-bg text-gray-100 selection:bg-neon-purple/30 selection:text-white overflow-x-hidden">
      {/* Loading sequence overlay */}
      <Preloader />

      {/* Floating utility tools */}
      <FloatingBackToTop />

      {/* Noise grain overlay */}
      <div className="noise-bg" />

      {/* 3D WebGL starry particle canvas */}
      <WebGLBackground />

      {/* Lagging spring custom cursor */}
      <CustomCursor />

      {/* Fixed top glass floating navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden font-sans">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}

export default App;
