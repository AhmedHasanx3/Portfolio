import React from "react";
// import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  theme: "light" | "dark";
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const HeadTag =
    theme === "dark"
      ? "bg-linear-to-r from-green-400 to-purple-500"
      : "bg-linear-to-r from-pink-500 to-purple-600";

  const textMain = theme === "dark" ? "text-gray-400" : "text-gray-900/90";
  const borderColor = theme === "dark" ? "border-white/10" : "border-black/10";

  return (
    <footer
      className={`px-6 sm:px-10 lg:px-12 py-10 transition-colors duration-300 border-t ${borderColor}`}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <h3
            className={`font-bold text-lg sm:text-xl md:text-2xl cursor-pointer transition-colors animate-pulse ${HeadTag} bg-clip-text text-transparent`}
          >
            Syed Ahmed Mohi Uddin Hasan
          </h3>
          <p
            className={`text-xs sm:text-sm md:text-base ${textMain} font-semibold`}
          >
            Web Developer - Al Khobar, Saudi Arabia © 2025 — Built with passion
            for modern web experiences
          </p>
        </div>

        {/* Optional Links or Socials (if needed in future) */}
        {/* <div className="flex gap-4">
          <a href="#" className="text-sm sm:text-base hover:underline">
            GitHub
          </a>
          <FaGithub className="w-10 h-10 bg-gray-400" />
          <FaLinkedin className="w-10 h-10 text-blue-800 bg-amber-50" />
          <div className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-lg transition-colors duration-300 hover:bg-gray-800">
            <FaGithub className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-blue-800 rounded-lg transition-colors duration-300 hover:bg-blue-700">
            <FaLinkedin className="w-6 h-6 text-white" />
          </div>
          <a href="#" className="text-sm sm:text-base hover:underline">
            LinkedIn
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
