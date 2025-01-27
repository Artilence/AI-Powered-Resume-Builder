import { useState, useRef } from 'react';

const PercentageSlider = ({ level }) => {
  const LEVELS = {
    beginner: 25,
    intermediate: 60,
    expert: 100,
  };

  // Set the initial percentage based on the level
  const [percentage, setPercentage] = useState(LEVELS[level] || 50);
  const sliderRef = useRef(null);

  // Handle dragging
  const handleDrag = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    let newPercentage = Math.round((offsetX / rect.width) * 100);
    newPercentage = Math.min(100, Math.max(0, newPercentage)); // Keep within range
    setPercentage(newPercentage);
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      {/* Custom Slider */}
      <div
        ref={sliderRef}
        className="relative w-full h-full bg-white rounded-full cursor-pointer"
        onMouseDown={(e) => handleDrag(e)} // Allow click & drag
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)} // Dragging
      >
        {/* Filled Progress Bar */}
        <div
          className="absolute w-full top-0 left-0 h-full bg-green-dark rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PercentageSlider;
