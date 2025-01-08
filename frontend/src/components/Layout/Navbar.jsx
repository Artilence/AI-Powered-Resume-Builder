import { Link, useNavigate } from 'react-router';
import Logo from '../../assets/rb-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../app/auth/authAPI';
import { persistor } from '../../app/store';
const Navbar = () => {
  //states
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  //logout->blacklist token at backend -> removes all persisted states
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      await persistor.purge();
      navigate('/login');
    } catch (error) {
      console.log('Logout,failed', error);
    }
  };
  return (
    <div className="w-full  flex flex-col">
      <div className="text-center text-sm text-gray-500 bg-gray-100 py-2">
        This app is under development
      </div>
      <div className="w-full gap-5 flex justify-between items-center  py-2 px-8 shadow-md">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[70px] object-contain " />
        </Link>

        <div className="flex justify-center items-center gap-5 font-semibold">
          <span>Details:</span>
          <span>{user?.username}</span>
          <span>{user?.email}</span>
          <button
            onClick={handleLogout}
            className="p-2 bg-slate-200 rounded-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
