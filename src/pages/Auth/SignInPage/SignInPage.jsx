import { useState } from 'react';
import Navbar from '../../../components/design-utils/Navbar';
import { linkedin, google } from '../../../assets';
import Eclipse from '../../../components/design-utils/Eclipse';
import { Link, useNavigate } from 'react-router';
import { simpleAPI } from '../../../app/api';
const SignInPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrorrs] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorrs(null);
    try {
      const response = await simpleAPI.post('/login/', userDetails);
      console.log(response?.data?.user);
    } catch (error) {
      if (error?.response?.data?.detail) {
        setErrorrs(error?.response?.data?.detail);
      } else {
        setErrorrs(error?.message);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="w-full relative flex items-center justify-center min-h-screen overflow-hidden py-72 px-10 bg-black">
        <Eclipse
          top="top-[calc(-100vw*.3)] lg:top-[calc(-100vw*1)]"
          left="left-[calc(-100vw*0.2)] lg:left-[calc(-100vw*0.25)]"
        />
        {/* BOX */}
        <div className=" bg-black z-10 flex flex-col border border-white-transparent lg:w-[40%] rounded-3xl text-white py-10 px-6">
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
            {errors && (
              <div className="bg-red-800 p-4 rounded-full">
                <span className="p-3">{errors}</span>
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
              <div className="flex items-center flex-col gap-10 justify-center py-16 border-b border-white-transparent w-full">
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
    </>
  );
};

export default SignInPage;
