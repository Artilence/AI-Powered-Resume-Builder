import { useState } from 'react';
import Navbar from '../../../components/Layout/Navbar';
import { linkedin, google } from '../../../assets';
import Eclipse from '../../../components/design-utils/Eclipse';
import { Link, useNavigate } from 'react-router';
import { simpleAPI } from '../../../app/api';
const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrorrs] = useState();
  const handleSubmit = async (e) => {
    const combinedName = `${name.firstName} ${name.lastName}`;
    setUserDetails({
      ...userDetails,
      name: combinedName,
    });

    e.preventDefault();
    setErrorrs(null);
    try {
      const response = await simpleAPI.post('/users/', userDetails);
      navigate('/signin');
    } catch (error) {
      console.log(error);

      if (error?.response?.data) {
        setErrorrs(error.response.data);
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
        <div className=" bg-black z-10 flex flex-col border border-white-transparent md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[35%] rounded-3xl text-white py-10 px-8">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="font-albert text-5xl font-semibold tracking-widest text-center">
              Create your free account{' '}
            </h1>
            <p className="font-inter text-base text-center w-[80%]">
              Edvenity is the leading automated recruiting solution that helps
              you engage, nurture and hire talents faster.
            </p>
          </div>
          {/* Errors */}
          <div className="flex flex-col text-[10px] gap-4 py-10 ">
            {errors?.email && (
              <div className="bg-red-800 p-4 rounded-full">
                {errors?.email.map((userError, index) => (
                  <span key={index}>{userError}</span>
                ))}
              </div>
            )}
            {errors?.name && (
              <div className="bg-red-800 p-4 rounded-full">
                {errors?.name.map((userError, index) => (
                  <span key={index}>{userError}</span>
                ))}
              </div>
            )}
            {errors?.password && (
              <div className="bg-red-800 p-4 rounded-full">
                {errors?.password.map((userError, index) => (
                  <span key={index}>{userError}</span>
                ))}
              </div>
            )}
            {typeof errors === 'string' && (
              <div className="bg-red-800 p-4 rounded-full">{errors}</div>
            )}
          </div>
          {/* Form */}
          <div className="w-full py-10">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-10"
            >
              <div className="flex flex-col gap-3 justify-center items-start">
                <span className="font-inter text-sm text-label-gray">
                  Email address
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

              <div className="flex flex-col gap-3 justify-center items-start">
                <span className="font-inter text-sm text-label-gray">
                  Password
                </span>
                <input
                  type="password"
                  className="w-full rounded-full border  border-white-transparent-2 text-base bg-black py-4 px-6 outline-none placeholder:text-white-transparent"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  value={userDetails.password}
                  placeholder="********"
                />
              </div>
              <div className="w-full flex items-center gap-10 justify-between">
                <div className="flex w-full flex-col gap-3 justify-center items-start">
                  <span className="font-inter text-sm text-label-gray">
                    First Name
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-full border border-white-transparent-2 text-base bg-black py-4 px-6 outline-none placeholder:text-white-transparent"
                    onChange={(e) =>
                      setName({ ...name, firstName: e.target.value })
                    }
                    value={name.firstName}
                    placeholder="Example@gmail.com"
                  />
                </div>
                <div className="flex w-full flex-col gap-3 justify-center items-start">
                  <span className="font-inter text-sm text-label-gray">
                    Last Name
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-full border border-white-transparent-2 text-base bg-black py-4 px-6 outline-none placeholder:text-white-transparent"
                    onChange={(e) =>
                      setName({ ...name, lastName: e.target.value })
                    }
                    value={name.lastName}
                    placeholder="Example@gmail.com"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex items-center flex-col gap-10 justify-center pt-10 border-t border-white-transparent w-full">
                <button className="w-full gap-5 px-9 py-4   flex items-center justify-center font-inter text-base bg-white-transparent rounded-full cursor-pointer">
                  <img
                    src={linkedin}
                    alt="linkedin"
                    className="w-10 object-contain"
                  />
                  Sign up with LinkedIn
                </button>
                <button className="w-full gap-5 px-9 py-4   flex items-center justify-center font-inter text-base bg-white-transparent rounded-full cursor-pointer">
                  <img
                    src={google}
                    alt="google"
                    className="w-10 object-contain"
                  />
                  Sign up with Google
                </button>
              </div>
              <button className="w-full bg-btn-purple text-white font-inter text-base py-4 px-6 rounded-full">
                Sign Up
              </button>
            </form>
          </div>
          <span className="w-full text-center flex items-center justify-center gap-2 font-inter text-sm text-label-gray">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary-blue cursor-pointer">
              Login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
