import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
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
        </div>
      </main>
    </div>
  );
}