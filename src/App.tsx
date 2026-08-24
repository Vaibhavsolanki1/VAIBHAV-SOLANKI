import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { ParticleField } from './components/ParticleField';
import { Navigation } from './components/Navigation';

// Chapters
import { Hero } from './sections/Hero';
import { Chapter1_Beginning } from './sections/Chapter1_Beginning';
import { Chapter2_Projects } from './sections/Chapter2_Projects';
import { Chapter3_Achievements } from './sections/Chapter3_Achievements';
import { Chapter4_Skills } from './sections/Chapter4_Skills';
import { Chapter5_Journey } from './sections/Chapter5_Journey';
import { Chapter6_Beyond } from './sections/Chapter6_Beyond';
import { Chapter7_GitHub } from './sections/Chapter7_GitHub';
import { Chapter8_Vision } from './sections/Chapter8_Vision';
import { Contact } from './sections/Contact';

export function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050816] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased font-sans overflow-x-hidden">
        {/* Custom AI Cursor Orb */}
        <CustomCursor />

        {/* 3D Particle Space Field */}
        <ParticleField />

        {/* Floating Chapter Navigation */}
        <Navigation />

        {/* Main Storyline Scroll Experience */}
        <main className="relative z-10 space-y-12 sm:space-y-20">
          <Hero />
          <Chapter1_Beginning />
          <Chapter2_Projects />
          <Chapter3_Achievements />
          <Chapter4_Skills />
          <Chapter5_Journey />
          <Chapter6_Beyond />
          <Chapter7_GitHub />
          <Chapter8_Vision />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
