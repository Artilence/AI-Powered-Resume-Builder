import Eclipse from '../../../components/design-utils/Eclipse';
import arrowRight from '../../../assets/arrowRight.png';
import Sparklings from '../../../assets/sparkling.png';
import heroProfiles from '../../../assets/heroProfiles.png';
import { Link } from 'react-router';
import stars from '../../../assets/heroStars.png';
import heroImage from '../../../assets/heroImage.png';
const HeroSection = () => {
  return (
    <div className=" w-full  flex relative  justify-center items-center bg-black ">
      {/* Lower-Layer ring */}
      <Eclipse
        top="top-[calc(-100vw*.4)] xl:top-[calc(-100vw*.8)]"
        left="left-[calc(-100vw*0.2)] xl:left-[calc(-100vw*0.2)]"
      />
      {/* Upper-layer */}
      <div className="px-[40px] py-[150px] gap-[100px] lg:px-[100px] lg:py-[150px] flex flex-col items-center justify-center  xl:grid xl:grid-cols-2 xl:px-[100px] xl:py-[150px] xl:gap-[100px] 2xl:grid-cols-[2fr_1fr] 2xl:gap-[200px] text-white  z-10  w-full h-full  2xl:px-[200px] 2xl:py-[220px]">
        {/* LEFFT */}
        <div className=" flex flex-col gap-[50px] xl:gap-[70px]">
          <div className="w-[fit-content] rounded-[50px] px-[16px] py-[8px] flex items-center gap-[6px] border border-white-transparent">
            <span className="font-inter font-normal text-sm">
              Introducing AI Powered Recruitment System
            </span>
            <img
              src={arrowRight}
              className="w-[24px] h-[24px] object-contain"
            />
          </div>
          <h1 className="flex flex-col justify-center items-start font-albert font-bold text-heading ">
            <span>AI Recruitment</span> <span>Automation</span>{' '}
            <span>You Can Control</span>
          </h1>
          <p className="text-base_2 font-inter font-normal">
            Edvenity is the leading automated recruiting solution that helps you
            engage, nurture and hire talents faster.
          </p>
          <div className=" flex flex-col gap-[40px] lg:flex-row lg:justify-between lg:items-center xl:flex-col 2xl:flex-row xl:justify-start xl:items-start xl:gap-[50px] 2xl:justify-between 2xl:items-center w-full">
            {/* Button */}
            <Link className="flex items-center justify-center gap-[10px] px-[32px] py-[13px] rounded-[50px] bg-primary-blue">
              <span className="text-base font-albert">
                Generate Resume with AI
              </span>
              <img
                src={Sparklings}
                alt=""
                className="w-[24px] h-[24px] object-contain"
              />
            </Link>
            {/* Ratings */}
            <div className=" flex justify-start items-center gap-[12px]">
              <img
                src={heroProfiles}
                alt=""
                className="w-[150px] flex lg:w-[120px] gap-[12px] "
              />
              <div className="flex items-center lg:items-start gap-[12px] flex-col justify-center">
                <img
                  src={stars}
                  alt=""
                  className="w-[150px] lg:w-[100px] lg:h-[16px] object-contain "
                />
                <span className="font-inter text-sm ">
                  Trusted by 500+ job seekers
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex justify-center items-center">
          <img
            src={heroImage}
            alt=""
            className="w-[500px] h-[500px] object-contain "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
