import React from 'react';

const MobileNav: React.FC = () => {
  const menuItems = [
    { icon: "/src/assets/images/aspire-icon-white.svg", label: 'Home', active: false },
    { icon: "/src/assets/images/cards-green.svg", label: 'Cards', active: true },
    { icon: "/src/assets/images/payments.svg", label: 'Payments', active: false },
    { icon: "/src/assets/images/credit.svg", label: 'Credit', active: false },
    { icon: "/src/assets/images/user.svg", label: 'Profile', active: false }
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
