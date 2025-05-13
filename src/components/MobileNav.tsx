import React from 'react';
import { Home, CreditCard, Wallet, User, Settings } from 'lucide-react';

const MobileNav: React.FC = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', active: false },
    { icon: <CreditCard size={20} />, label: 'Cards', active: true },
    { icon: <Wallet size={20} />, label: 'Payments', active: false },
    { icon: <User size={20} />, label: 'Credit', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 py-2 shadow-lg w-full h-auto">
      <div className="grid grid-cols-5 gap-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-2 ${
              item.active 
                ? 'text-[#01D167]' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {React.cloneElement(item.icon, { 
              color: item.active ? '#01D167' : 'currentColor' 
            })}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
