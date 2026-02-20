import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="w-full py-6 bg-transparent">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
           {/* Logo Mark */}
          {/* <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg group-hover:bg-green-900 transition-colors">
            VeriLens
          </div> */}
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="font-semibold text-white tracking-wide text-lg">VeriLens</span>
            <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Analyst Engine</span>
          </div>
        </Link>

        {/* Optional: Add navigation links here if needed */}
      </div>
    </header>
  );
};

export default Header;