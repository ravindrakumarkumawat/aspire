import React from 'react';
import { getImageUrl } from '@utils/assetUtils';
import { Button } from '@mui/material';

const MobileNav: React.FC = () => {
  const menuItems = [
    { icon: getImageUrl('home-m-logo.svg'), label: 'Home', active: false },
    { icon: getImageUrl('cards-green.svg'), label: 'Cards', active: true },
    { icon: getImageUrl('payments-m.svg'), label: 'Payments', active: false },
    { icon: getImageUrl('credit-m.svg'), label: 'Credit', active: false },
    { icon: getImageUrl('profile-m.svg'), label: 'Profile', active: false }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 py-2 shadow-lg w-full h-auto">
      <div className="grid grid-cols-5 gap-1">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            className={`flex flex-col items-center justify-center p-2 !normal-case ${
              item.active 
                ? '!text-[#01D167]' 
                : '!text-[#DDDDDD]'
            }`}
          >
            <img 
              src={item.icon} 
              alt={item.label}
              className="w-5 h-5"
              style={{ filter: item.active ? 'none' : 'grayscale(100%)' }}
            />
            <span className="text-[9pt] mt-1 font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
