import { useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-lg">
            {" "}
            <img
              className="h-16 xl:h-35 md:h-35 sm:h-22"
              src="/src/assets/logo.png"
              alt="Logo"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 gap-10">
              <li className="cursor-pointer text-black text-xl font-serif hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2 transition duration-300">
                <Link to="/landingpage">
                  Home
                </Link>
              </li>
              <li className="cursor-pointer text-black text-xl font-serif hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2 transition duration-300">
                Find Works
              </li>
              <li className="cursor-pointer text-black text-xl font-serif hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2 transition duration-300">
                Find Freelancers
              </li>
              <li className="cursor-pointer text-black text-xl font-serif hover:text-white hover:bg-orange-400 rounded-lg px-4 py-2 transition duration-300">
                About Us
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-black" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute ">
          <ul className="flex flex-col space-y-2 space-x-4">
            <li></li>
            <li className="text-yellow-500 font-semibold">Home</li>
            <li className="text-yellow-500 font-semibold">Find Freelances</li>
            <li className="text-yellow-500 font-semibold">Find Works</li>
            <li className="text-yellow-500 font-semibold">About Us</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
