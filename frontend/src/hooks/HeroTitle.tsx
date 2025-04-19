import { useRef } from 'react';

const HeroTitle = () => {
  const titleRef = useRef(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  return (
    <h1
      ref={titleRef}
      className='relative text-4xl md:text-5xl lg:text-6xl font-bold text-transparent stroke-text text-center mb-8 mt-5 hover-reveal'
      data-text="Ready To Bring Your Ideas To Life?"
      onMouseMove={handleMouseMove}
    >
      Ready To Bring Your Ideas To Life?
    </h1>
  );
};

export default HeroTitle;
