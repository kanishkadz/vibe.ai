import { Sparkles } from 'lucide-react';

const ChangePrompt = () => {
  return (
    <div className="fixed bottom-8 left-8 backdrop-blur-md bg-[#1a1a1a]/60 rounded-full py-3 px-6 text-gray-300 flex items-center gap-2 border border-gray-700 cursor-pointer hover:bg-[#252525]/70 transition-all duration-300 shadow-lg">
      <Sparkles className="w-5 h-5 text-[#ff3e9a]" />
      <span>Want to change anything?</span>
    </div>
  );
};

export default ChangePrompt;
