import React from 'react';
import { Bird } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-duck-green text-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bird size={32} className="text-duck-orange" />
          <h1 className="text-2xl font-bold tracking-tight">DuckCall Master</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
