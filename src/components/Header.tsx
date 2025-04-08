import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 bg-[#111827] border-b border-gray-700 shadow-md">
      <h1 className="text-4xl font-bold text-white">Piplator: Pip Calculator for MT4/MT5</h1>
      <p className="text-gray-400 mt-2 text-base">
        Instant SL, TP and Risk Management – No More Manual Math.
      </p>
    </header>
  );
};

export default Header;
