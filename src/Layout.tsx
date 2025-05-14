import React from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white lg:bg-white relative">
      <div className="flex h-screen">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block lg:w-[21.25rem] flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 h-screen overflow-y-auto overscroll-contain lg:w-auto pb-16 lg:pb-0 bg-[#0C365A] lg:bg-white">
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
