import { useRef } from 'react';

const GlowingInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="What do you want to build today?"
      className="glow-hover-input w-full py-5 px-12 bg-[#1a1a1a] text-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#ff3e9a] transition-all duration-300 placeholder-gray-400 text-lg"
      onMouseMove={handleMouseMove}
    />
  );
};

export default GlowingInput;
