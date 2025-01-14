import LogoImg from '../assets/Logo.png';
const Logo = () => {
  return (
    <div className="flex items-center justify-center lg:gap-[8px] xl:gap-[14px]">
      <img
        src={LogoImg}
        alt="logo"
        className="lg:w-[28px] xl:w-[32px] 2xl:w-[44px] object-contain "
      />
      <span className="text-white lg:text-[20px] xl:text-[20px] 2xl:text-[24px] font-albert font-semibold">
        Edvenity
      </span>
    </div>
  );
};

export default Logo;
