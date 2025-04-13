import React from 'react';
import Filteration from '../components/Filteration';
import Hero from '../components/Hero';
import SidebarFilter from '../components/header/SidebarFilter';

const Home = () => {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="mx-4 md:mx-8 lg:mx-16">
        <Filteration/>
        <div className="flex flex-col md:flex-row">
          {/* Desktop Sidebar - always visible on desktop */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5 pr-4">
            <SidebarFilter isOpen={true} onClose={() => {}} />
          </div>
          
          <div className="w-full md:w-3/4 lg:w-4/5">
            <Hero/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;