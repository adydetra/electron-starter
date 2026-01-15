import { useRef, useState, useEffect } from 'react';
import pkg from '../package.json';
import TopBar from './components/organisms/TopBar';

const techStack = [
  {
    title: 'Electron',
    version: pkg.devDependencies.electron.replace('^', ''),
    description: 'Build cross-platform desktop apps with JavaScript, HTML, and CSS.',
  },
  {
    title: 'React',
    version: pkg.dependencies.react.replace('^', ''),
    description: 'The library for web and native user interfaces.',
  },
  {
    title: 'Vite',
    version: pkg.devDependencies.vite.replace('^', ''),
    description: 'Next Generation Frontend Tooling. Fast and lean build tool.',
  },
  {
    title: 'Tailwind CSS',
    version: pkg.dependencies.tailwindcss.replace('^', ''),
    description: 'A utility-first CSS framework for rapidly building modern websites.',
  },
];

function Card({ title, version, description }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative p-6 border border-neutral-800 rounded-lg overflow-hidden group transition-colors duration-300 bg-neutral-900/50"
    >
      <div
        className="pointer-events-none absolute -inset-px transition opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <h2 className="text-lg font-medium mb-2 text-neutral-200">{title}</h2>
        <p className="text-neutral-500 text-sm mb-4">v{version}</p>
        <p className="text-neutral-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function App() {
  const [windowState, setWindowState] = useState({ isMaximized: false });

  useEffect(() => {
    const syncState = async () => {
      if (window.electronAPI) {
        const state = await window.electronAPI.getWindowState();
        setWindowState(state);
      }
    };

    syncState();
    const interval = setInterval(syncState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWindowControl = (action) => {
    if (window.electronAPI) {
      window.electronAPI.windowControls(action);
      // Optimistic update
      if (action === 'maximize') setWindowState({ ...windowState, isMaximized: true });
      if (action === 'unmaximize') setWindowState({ ...windowState, isMaximized: false });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800">
      <TopBar onWindowControl={handleWindowControl} windowState={windowState} />
      <div className="max-w-3xl mx-auto px-6 py-12 pt-20">
        <header className="mb-16">
          <div className="w-12 h-12 bg-neutral-100 rounded-full mb-6 relative overflow-hidden flex items-center justify-center text-neutral-950 font-bold text-xl">
             {/* Simple logo placeholder if no image */}
             ES
          </div>
          <h1 className="text-4xl font-light tracking-tight mb-4 text-neutral-100">Electron Starter</h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed">A simple, clean starter template focusing on performance and developer experience.</p>
        </header>

        <main className="grid gap-8 md:grid-cols-2">
          {techStack.map((tech) => (
            <Card key={tech.title} {...tech} />
          ))}
        </main>

        <footer className="mt-20 pt-8 border-t border-neutral-800 text-sm text-neutral-500 flex justify-between items-center">
          <p>&copy; 2025 - {new Date().getFullYear()} Electron Starter. All rights reserved.</p>
          <p>
            by{' '}
            <a href="https://www.adydetra.my.id" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">
              adydetra
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
