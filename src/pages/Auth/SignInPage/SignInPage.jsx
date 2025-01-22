import { useState } from 'react';

import { linkedin, google } from '../../../assets';
import { Eclipse } from '../../../components';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../../../app/index';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../../components';
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  // Accessing isLoading and error states from auth slice
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(loginUser(userDetails)).then(() => {
      navigate('/');
    });
  };
  return (
    <Layout>
      <div className="w-full relative flex items-center justify-center min-h-screen overflow-hidden py-72 px-10 bg-black">
        <Eclipse
          top="top-[calc(-100vw*.3)] lg:top-[calc(-100vw*1)]"
          left="left-[calc(-100vw*0.2)] lg:left-[calc(-100vw*0.25)]"
        />
        {/* BOX */}
        <div className=" bg-black z-10 flex flex-col border border-white-transparent md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%] rounded-3xl text-white py-10 px-6">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="font-albert text-5xl font-semibold tracking-widest text-center">
              Sign In
            </h1>
            <p className="font-inter text-base text-center w-[60%]">
              Edvenity is the leading automated recruiting solution that helps
              you engage, nurture and hire talents faster.
            </p>
          </div>
          {/* Errors */}
          <div className="flex flex-col text-[10px] gap-4 py-10 ">
            {error && (
              <div className="bg-red-800 p-4 rounded-full">
                <span className="p-3">{error}</span>
              </div>
            )}
          </div>
          {/* Form */}
          <div className="w-full py-10">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-10"
            >
              <div className="flex w-full flex-col md:flex-row  gap-10 justify-between items-start">
                <div className="flex w-full flex-col gap-3 justify-center items-start">
                  <span className="font-inter text-sm text-label-gray">
                    Email
                  </span>
                  <input
                    type="email"
                    className="w-full rounded-full border border-white-transparent-2 text-base bg-black py-4 px-6 outline-none placeholder:text-white-transparent"
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    value={userDetails.email}
                    placeholder="Example@gmail.com"
                  />
                </div>

                <div className="flex w-full flex-col gap-3 justify-center items-start">
                  <span className="font-inter text-sm text-label-gray">
                    Password
                  </span>
                  <input
                    type="password"
                    className="w-full rounded-full border  border-white-transparent-2 text-base bg-black py-4 px-6 outline-none placeholder:text-white-transparent"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    value={userDetails.password}
                    placeholder="********"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex items-center flex-col gap-10 justify-center pt-16 border-t border-white-transparent w-full">
                <button className="w-full gap-5 px-9 py-4   flex items-center justify-center font-inter text-base bg-white-transparent rounded-full cursor-pointer">
                  <img
                    src={linkedin}
                    alt="linkedin"
                    className="w-10 object-contain"
                  />
                  Sign In with LinkedIn
                </button>
                <button className="w-full gap-5 px-9 py-4   flex items-center justify-center font-inter text-base bg-white-transparent rounded-full cursor-pointer">
                  <img
                    src={google}
                    alt="google"
                    className="w-10 object-contain"
                  />
                  Sign In with Google
                </button>
              </div>

              <button className="w-full bg-btn-purple text-white font-inter text-base py-4 px-6 rounded-full">
                Sign In
              </button>
            </form>
          </div>

          <span className="w-full text-center flex items-center justify-center gap-2 font-inter text-sm text-label-gray">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary-blue cursor-pointer">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
