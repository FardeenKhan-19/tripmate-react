import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg rounded-xl p-6 mb-6 transition-shadow duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);
