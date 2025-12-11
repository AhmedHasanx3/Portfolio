import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import CvPreview from "./components/CvPreview";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 0.5, scale: 1 },
};

const AppContent: React.FC<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}> = ({ theme, toggleTheme }) => {
  const Bubbles =
    theme === "dark"
      ? "bg-emerald-600"
      : "bg-linear-to-r from-pink-500 to-purple-600";
  const sectionBg =
    theme === "dark"
      ? "bg-gray-950"
      : "bg-linear-to-br from-purple-600 via-red-300 to-purple-400";

  const bubbles = Array.from({ length: 150 });

  return (
    <div
      className={`relative ${sectionBg} transition-colors duration-300 min-h-screen w-full overflow-hidden`}
    >
      {/* Bubble Background */}
      <div className="absolute inset-0 z-0">
        {bubbles.map((_, i) => {
          const size = Math.random() * 40 + 20;
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${Bubbles}`}
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              transition={{
                duration: Math.random() * 5 + 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Home theme={theme} />
        <About theme={theme} />
        <Skills theme={theme} />
        <Projects theme={theme} />
        <Experience theme={theme} />
        <Testimonials theme={theme} />
        <CvPreview theme={theme} />
        <Contact theme={theme} />
        <Footer theme={theme} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Apply theme globally
  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "light";
  }, [theme]);

  return <AppContent theme={theme} toggleTheme={toggleTheme} />;
};

export default App;
