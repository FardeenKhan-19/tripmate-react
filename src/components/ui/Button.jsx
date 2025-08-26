import React from 'react';

export const Button = ({ children, onClick, className = '', type = 'button', icon }) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${className}`}
  >
    {icon}
    {children}
  </button>
);