import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-900 text-white w-full py-4 px-8 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="text-white text-xl">&#x2630;</span> {}
            <span className="text-sm uppercase font-medium">Menu</span>
          </div>

          {}
          {isMenuOpen && (
            <div className="absolute left-0 mt-2 bg-gray-800 text-white rounded shadow-lg w-40 z-50">
              <ul className="flex flex-col py-2">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 1
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version2"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 2
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version3"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 3
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version4"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 4
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version5"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 5
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version6"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 6
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version7"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 7
                  </Link>
                </li>
                <li>
                  <Link
                    to="/version8"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Version 8
                  </Link>
                </li>
     
              </ul>
            </div>
          )}
        </div>

        {}
        <div className="text-white text-2xl font-bold tracking-widest">
          PORSCHE
        </div>
      </div>
    </div>
  );
};

export default Topbar;
