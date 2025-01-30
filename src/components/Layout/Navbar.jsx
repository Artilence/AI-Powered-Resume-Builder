import { Link, useLocation } from 'react-router';
import {
  myDocuments,
  logo,
  downloadIcon,
  dummyprofile,
  arrowDown,
} from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setIsTemplateDownloading } from '../../app/index';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isTemplateDownloading = useSelector(
    (state) => state.ResumeEditorAndChatCrontrol.isTemplateDownloading
  );
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="w-full z-40 fixed top-0 left-0 bg-black flex items-center justify-between py-5 px-52">
      <div>
        <img src={logo} alt="logo" className="w-80 object-contain " />
      </div>
      <div className="flex items-center justify-end gap-5">
        {location.pathname !== '/signin' && location.pathname !== '/signup' && (
          <Link
            to={'/my-resumes'}
            className="rounded-full px-8 py-3 border flex items-center cursor-pointer justify-center gap-10  border-white-transparent-2"
          >
            <img
              src={myDocuments}
              alt="open document "
              className="w-[25px] text-white object-contain"
            />
            <span className="font-albert text-base text-white">
              My Documents
            </span>
          </Link>
        )}
        {user && location.pathname === '/' && (
          <Link
            // to={'/my-resumes'}
            onClick={() => {
              dispatch(setIsTemplateDownloading(!isTemplateDownloading));
            }}
            className="rounded-full px-8 py-3 bg-btn-purple flex items-center cursor-pointer justify-center gap-5 "
          >
            <img
              src={downloadIcon}
              alt="open document "
              className="w-[25px] text-white object-contain"
            />
            <span className="font-albert text-base text-white">
              Download PDF
            </span>
          </Link>
        )}
        <div className="flex items-center justify-center ">
          {user ? (
            <div className=" px-8 py-3  flex items-center cursor-pointer justify-center gap-5 ">
              <img
                src={dummyprofile}
                alt="open document "
                className="w-[40px] rounded-full text-white object-contain"
              />
              <div className="text-white flex flex-col  items-start justify-start">
                <span className="font-albert text-base">{user?.name}</span>
                <span className="font-inter text-sm text-white opacity-50">
                  {user?.email}
                </span>
              </div>
              <img src={arrowDown} alt="arrow down" className="w-[30px] " />
            </div>
          ) : (
            location.pathname !== '/signin' &&
            location.pathname !== '/signup' && (
              <Link
                to={'/signin'}
                className="rounded-full px-8 py-3 border flex items-center cursor-pointer justify-center gap-10  border-white-transparent-2"
              >
                <span className="font-albert text-base text-white">
                  Sign In
                </span>
              </Link>
            )
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="rounded-full px-8 py-3 border flex items-center cursor-pointer justify-center gap-10 bg-btn-purple  border-white-transparent-2"
            >
              <span className="font-albert text-base text-white">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
