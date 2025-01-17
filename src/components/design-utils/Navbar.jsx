import { logo } from '../../assets';

const Navbar = () => {
  return (
    <div className="w-full z-50 fixed top-0 left-0 bg-black flex items-center justify-start py-5 px-52">
      <div>
        <img src={logo} alt="logo" className="w-48 object-contain " />
      </div>
    </div>
  );
};

export default Navbar;
