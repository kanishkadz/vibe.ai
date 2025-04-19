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

  const handleMouseLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.currentTarget.style.setProperty('--x', `50%`);
    e.currentTarget.style.setProperty('--y', `50%`);
  };

  return (
    <h1
      ref={titleRef}
      className='hero-title'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Ready To Bring Your Ideas To Life?
    </h1>
  );
};

export default HeroTitle;
