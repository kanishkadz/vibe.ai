import { Sparkles } from 'lucide-react';

const ChangePrompt = () => {
  return (
    <div className='fixed bottom-8 left-8 bg-[#1a1a1a] rounded-full py-3 px-6 text-gray-300 flex items-center gap-2 border border-gray-800 cursor-pointer hover:bg-[#252525] transition-colors'>
      <Sparkles className='w-5 h-5 text-[#ff3e9a]' />
      <span>Want to change anything?</span>
    </div>
  );
};

export default ChangePrompt;
