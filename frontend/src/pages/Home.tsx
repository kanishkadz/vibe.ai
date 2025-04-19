import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#ff6cbf] via-[#fc5bb6] to-[#0c0c0c] flex flex-col px-6'>
      <header className='pt-8 pb-4'>
        <img src="Logo.png" alt="Logo" />
      </header>

      <main className='flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full pb-20'>
        <div className='flex flex-col items-center justify-center'>
          {/* logo */}
          <img src="Icon.png" alt="Icon" />

          {/* heading */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] text-center mb-8'>
            Ready To Bring Your Ideas To Life?
          </h1>
          <p className='font-bold text-white'>
            Design. Build. and Launch Stunning Websites & Apps - All In One Place
          </p>

          {/* input */}
          <div className='relative w-full max-w-[700px] mx-auto mt-16'>
            <div className='absolute left-5 top-1/2 transform -translate-y-1/2 text-[#ff3e9a]'>
              <Sparkles className='w-5 h-5' />
            </div>
            <input
              type="text"
              placeholder='What do you want to build today?'
              className='w-full py-5 px-12 bg-[#1a1a1a] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff3e9a] transition-all duration-300 placeholder-gray-400 text-lg'
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
