import React from 'react'
import TextEditor from '../components/TextEditor';
import CodePreview from '../components/CodePreview';

export const Builder = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#b14a84] via-[#000000] to-[#000000] flex flex-col px-6'>
      <div className='max-w-[1400px] mx-auto px-8 py-6'>
        <header className='mb-12'> <img src="Logo.png" alt="" /></header>

        <main className='flex gap-8'>
          <TextEditor />
          <CodePreview />
        </main>

        
      </div>
    </div>
  )
};
