import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 border-b border-blue-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="text-center space-y-2">
          <h1 className="text-white">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Piplator</span>
            <span className="text-blue-100">: Pip Calculator for MT4/MT5</span>
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Instant SL, TP and Risk Management – No More Manual Math.
          </p>
          <p className="text-blue-200/80 text-sm">
            Mainly for US Currencies for now.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
