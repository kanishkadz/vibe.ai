import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2 } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from '../config';

export function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#e6b3d1] via-[#d9c1d9] to-[#d1d1d1] flex flex-col px-6'>
      <header className='pt-8 pb-4'>
        <div className='text-4xl font-bold text-[#FF3E9A]'>vibe.ai</div>
      </header>

      <main className='flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full pb-20'>
        <div className='flex flex-col items-center justify-center'>
          {/* logo */}

          {/* heading */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] text-center mb-8'>Ready To Bring Your Ideas To Life?</h1>

          {/* input */}
          <div className='relative w-full max-w-[700px] mx-auto mt-16'>
            <div className='absolute left-5 top-1/2 transform -translate-y-1/2 text-[#ff3e9a]'>
              <Sparkles className='w-5 h-5' />
            </div>
            <input type="text" placeholder='What do you want to build today?' className='w-full py-5 px-12 bg-[#1a1a1a] text-white rounded-xl focus:outline-none focus:ring-2 focus-ring-[#ff3e9a] transition-all duration-300 placeholder-gray-400 text-lg' />
          </div>
        </div>
      </main>
    </div>
  );
}