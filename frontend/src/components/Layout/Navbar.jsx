import { Link } from 'react-router';
import arrowDown from '../../assets/arrowDown.png';
import Logo from '../Logo';

const Navbar = () => {
  //states
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state?.auth?.user);
  // //logout->blacklist token at backend -> removes all persisted states
  // const handleLogout = async () => {
  //   try {
  //     await dispatch(logoutUser()).unwrap();
  //     await persistor.purge();
  //     navigate('/login');
  //   } catch (error) {
  //     console.log('Logout,failed', error);
  //   }
  // };
  return (
    <nav className="z-50 fixed top-0 bg-black w-full xl:px-[100px] px-[20px] 2xl:px-[200px] py-[20px] flex justify-between items-center text-white text-base ">
      <Logo />
      <div className="flex items-center md:gap-[10px] lg:gap-[24px] font-inter md:text-[10px] lg:text-[14px] xl:text-base">
        <Link className="flex items-center justify-center gap-[6px]">
          <span>Create Resume</span>
          <span className="flex items-center justify-center bg-primary-blue py-[4px] px-[8px] rounded-[4px] md:text-[8px] lg:text-[10px] font-semibold">
            NEW
          </span>
        </Link>
        <Link className="flex items-center justify-center ">
          <span>Features</span>
          <img
            src={arrowDown}
            alt="arrowDown"
            className="w-[24px] h-[24px] object-contain"
          />
        </Link>
        <Link className="flex items-center justify-center ">
          <span>Solutions</span>
          <img
            src={arrowDown}
            alt="arrowDown"
            className="w-[24px] h-[24px] object-contain"
          />
        </Link>
        <Link className="flex items-center justify-center ">
          <span>Pricing</span>
        </Link>
        <Link className="flex items-center justify-center ">
          <span>About</span>
        </Link>
      </div>
      <div className="flex md:gap-[10px] items-center justify-center font-albert md:text-[10px] lg:text-[14px] xl:text-base">
        <Link className="lg:py-[8px] xl:py-[13px] lg:px-[32px] cursor-pointer">
          Sign In
        </Link>
        <Link className=" md:py-[4px] md:px-[16px] lg:py-[8px] xl:py-[13px] lg:px-[32px] rounded-[50px] bg-primary-blue cursor-pointer">
          Start Your Free Trial
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
