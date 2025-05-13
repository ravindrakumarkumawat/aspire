import React from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white lg:bg-white">
      <div className="flex">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <main className="flex-1 min-h-screen w-full lg:w-auto pb-16 lg:pb-0 bg-white lg:bg-white md:bg-[#0C365A] sm:bg-[#0C365A] bg-[#0C365A]">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 max-h-16">
        <MobileNav />
      </div>
    </div>
  );
};

export default Layout;
