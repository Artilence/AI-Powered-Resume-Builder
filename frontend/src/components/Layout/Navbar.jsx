import { Link } from 'react-router';
import Logo from '../../assets/rb-logo.png';
const Navbar = () => {
  return (
    <div className="w-full gap-5 flex align-center  jusify-between items-center py-2 px-8 shadow-md">
      <Link to="/">
        <img src={Logo} alt="logo" className="w-[70px] object-contain " />
      </Link>
    </div>
  );
};

export default Navbar;
