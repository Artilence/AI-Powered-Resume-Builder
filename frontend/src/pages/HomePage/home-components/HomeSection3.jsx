import Eclipse from '../../../components/design-utils/Eclipse';
import {
  checkTick2,
  checkTick,
  edvenitySolutionsSection1Image,
} from '../../../assets';

const HomeSection3 = () => {
  return (
    <div className=" w-full h-max flex relative   justify-center items-center bg-black ">
      <Eclipse
        top="top-[calc(40vw*0.1)]"
        left="left-[calc(-100vw*0.8)]"
        rotate="transform rotate-[90deg]"
      />
      <div className="px-[40px] py-[100px] md:px-[100px]  md:py-[100px] left-0 h-full 2xl:px-[200px]  z-10 gap-[100px] w-full  flex flex-col justify-center items-center">
        {/* TOP/Header */}
        <div className="flex flex-col gap-[20px] xl:gap-[10px] 2xl:gap-[30px] items-center justify-center">
          <div className=" w-[max-content] tracking-widest xl:mb-[40px] 2xl:mb-[0] gap-[6px] flex items-center justify-center border border-white-transparent rounded-[50px] px-[16px] py-[8px]">
            <span className="font-albert text-pink-purple text-sm font-semibold">
              Problem vs Solution
            </span>
            <img
              src={checkTick2}
              className="w-[24px] h-[24px] object-contain"
              alt=""
            />
          </div>
          <h2 className="text-center font-albert text-heading2 text-white font-bold">
            Why Edvenity is a right choice?
          </h2>
          <p className="2xl:w-[60%] leading-[1.8] text-center font-inter text-base_2 text-light-gray ">
            Edvenity offers a safe and realistic environment for practicing
            interviews with AI for any job role or subject, tailored to your
            resume. Our AI interviewer adapts to your needs, providing instant
            feedback for quick improvement. Practice with AI, gain confidence,
            and achieve success.
          </p>
        </div>
        {/* Bottom */}
        <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 gap-[100px] xl:gap-[50px] 2xl:gap-[100px] w-full">
          {/* LEFT */}
          <div className="flex flex-col gap-[100px] xl:gap-[300px]">
            <div className="flex flex-col items-start justify-start gap-[20px]">
              <h3 className="font-[500] font-albert text-[25px] 2xl:text-heading3 text-dim-white">
                Prepare for a Wide Range of Job Roles
              </h3>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Access comprehensive interview scenarios for diverse
                    positions
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Build expertise with role-specific question sets
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Simulate interviews for both entry-level and advanced roles
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[20px]">
              <h3 className="font-[500] font-albert text-[25px] 2xl:text-heading3 text-dim-white">
                Practice Interviews with AI on Any Subject or Skill
              </h3>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Customize mock interviews for any subject or skill
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Enhance your expertise in targeted areas
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Perfect for continuous learning and improvement
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[20px]">
              <h3 className="font-[500] font-albert text-[25px] 2xl:text-heading3 text-dim-white">
                Prepare for a Wide Range of Job Roles
              </h3>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Access comprehensive interview scenarios for diverse
                    positions
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Build expertise with role-specific question sets
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[10px]">
                <div className="flex justify-start items-start gap-[20px] ">
                  <img
                    src={checkTick}
                    alt=""
                    className="w-[24px] h-[24px] object-contain mt-[4px]"
                  />
                  <p className="font-inter text-base 2xl:text-base_2 text-light-gray ">
                    Simulate interviews for both entry-level and advanced roles
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full flex justify-center items-start">
            <img
              src={edvenitySolutionsSection1Image}
              className="object-contain w-full rounded-[20px] "
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
