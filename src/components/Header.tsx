import React from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <header className="bg-green-500 text-white py-4 px-6 md:py-6 md:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button 
            aria-label="Toggle menu"
            className="md:hidden mr-4 focus:outline-none focus:ring-2 focus:ring-white rounded"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
          <div className="font-bold text-2xl">Aspire</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            aria-label="Notifications"
            className="p-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Bell size={20} />
          </button>
          
          <div className="hidden md:flex items-center space-x-2 cursor-pointer">
            <div className="w-9 h-9 bg-white text-green-500 rounded-full flex items-center justify-center font-bold">
              JD
            </div>
            <span className="font-medium">John Doe</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;