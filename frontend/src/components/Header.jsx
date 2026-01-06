import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
           {/* Logo Mark */}
          {/* <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg group-hover:bg-green-900 transition-colors">
            VeriLens
          </div> */}
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="font-sans font-bold text-gray-1800 tracking-wide text-sm leading-none">VeriLens</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase leading-none mb-0.5">News & Article Analyzer</span>
          </div>
        </Link>

        {/* Optional: Add navigation links here if needed */}
      </div>
    </header>
  );
};

export default Header;