import React from 'react';
import { Home, CreditCard, Wallet, User } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <Home size={22} />, label: 'Home', active: false },
    { icon: <CreditCard size={22} />, label: 'Cards', active: true },
    { icon: <Wallet size={22} />, label: 'Payments', active: false },
    { icon: <User size={22} />, label: 'Credit', active: false },
    { icon: <User size={22} />, label: 'Settings', active: false }
  ];

  return (
    <aside className="w-64 bg-[#0C365A] h-screen text-white">
      <div className="h-full flex flex-col">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[#01D167] rounded flex items-center justify-center mr-2">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent"></div>
            </div>
            <h1 className="text-2xl font-bold text-white">aspire</h1>
          </div>
          <p className="text-xs text-gray-300 mt-2">
            Trusted way of banking for 3,000+ SMEs and startups in Singapore
          </p>
        </div>
        
        <nav className="flex-grow py-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center px-6 py-4 hover:bg-[#0A2E50]
                    ${item.active ? 'border-l-4 border-[#01D167]' : ''}
                  `}
                >
                  <span className={`mr-4 ${item.active ? 'text-[#01D167]' : 'text-white'}`}>{item.icon}</span>
                  <span className={`font-medium ${item.active ? 'text-[#01D167]' : 'text-white'}`}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
