import React from 'react';

export const Input = ({ label, value, onChange, placeholder, type = 'text', name }) => (
  <div className="mb-4">
    <label className="block text-gray-600 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
