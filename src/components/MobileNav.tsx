import React from 'react';
import { getImageUrl } from '@utils/assetUtils';

const MobileNav: React.FC = () => {
  const menuItems = [
    { icon: getImageUrl('aspire-icon-white.svg'), label: 'Home', active: false },
    { icon: getImageUrl('cards-green.svg'), label: 'Cards', active: true },
    { icon: getImageUrl('payments.svg'), label: 'Payments', active: false },
    { icon: getImageUrl('credit.svg'), label: 'Credit', active: false },
    { icon: getImageUrl('user.svg'), label: 'Profile', active: false }
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
            <img 
              src={item.icon} 
              alt={item.label}
              className="w-5 h-5"
              style={{ filter: item.active ? 'none' : 'grayscale(100%)' }}
            />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
