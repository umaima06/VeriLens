import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = "w-full py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-lg";
  
  const variants = {
    primary: "bg-green-900 hover:bg-green-800 text-white shadow-green-900/20",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? variants.disabled : variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;