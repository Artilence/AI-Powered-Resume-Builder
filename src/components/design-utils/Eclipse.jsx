const Eclipse = ({ top, left, rotate = '' }) => {
  return (
    <div
      className={`absolute ${top} ${rotate} ${left} w-[calc(100vw*1.5)] h-[calc(100vw*1.5)] `}
    >
      <div className="relative flex justify-center bg-black items-center w-full h-full">
        {/* Gradient Circle */}
        <div className="absolute z-[1]  rounded-full w-[90%] h-[90%] bg-gradient-to-r from-[rgba(53,124,247,1)] to-[rgba(110,73,242,1)] flex justify-center items-center">
          {/* Inner Black Circle */}

          <div className="w-[85%]  h-[85%] bg-black rounded-full"></div>

        </div>
        {/* Blurred Backdrop */}
        <div className="absolute z-[2] w-full h-full backdrop-blur-[80px]"></div>
      </div>
    </div>
  );
};
export default Eclipse;
