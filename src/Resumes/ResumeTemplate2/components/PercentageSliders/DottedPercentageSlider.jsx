import { useState, useRef } from 'react';

const DottedPercentageSlider = ({ level }) => {
  const LEVELS = {
    beginner: 25,
    intermediate: 60,
    expert: 100,
  };

  const [percentage, setPercentage] = useState(LEVELS[level] || 50);
  const sliderRef = useRef(null);

  // Handle dragging
  const handleDrag = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const dotWidth = rect.width / 9; // 9 gaps between 10 dots
    const clickedDotIndex = Math.round(offsetX / dotWidth);
    const newPercentage = (clickedDotIndex / 9) * 100;
    setPercentage(Math.min(100, Math.max(0, newPercentage)));
  };

  // Generate dots
  const renderDots = () => {
    const dots = [];
    const numberOfDots = 10;

    for (let i = 0; i < numberOfDots; i++) {
      const dotPosition = (i / (numberOfDots - 1)) * 100;
      const isActive = percentage >= dotPosition;

      dots.push(
        <div
          key={i}
          className={`w-[12px] h-[12px]  rounded-full ${
            isActive ? 'bg-green-dark' : 'bg-green-light'
          }`}
          style={{ marginLeft: i === 0 ? '0' : '-1px' }}
          onClick={(e) => {
            e.stopPropagation();
            setPercentage(dotPosition);
          }}
        />
      );
    }

    return dots;
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div
        ref={sliderRef}
        className="relative w-full h-full  flex  items-center cursor-pointer"
        onMouseDown={(e) => handleDrag(e)}
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      >
        <div className="flex gap-1">{renderDots()}</div>
      </div>
    </div>
  );
};

export default DottedPercentageSlider;
