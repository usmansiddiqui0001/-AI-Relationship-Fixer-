import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center text-center gap-2">
      <h1 
        className="text-4xl sm:text-[2.5rem] font-bold text-[#d6336c] mb-2"
      >
        👩‍❤️‍💋‍👨 AI Relationship Fixer 💞
      </h1>
      <p className="text-lg sm:text-[1.2rem] text-[#444] max-w-[600px]">
        Craft the perfect message to mend hearts and rebuild connections.<br />Let our AI help you find the right words.
      </p>
    </header>
  );
};

export default Header;