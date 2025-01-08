import { Link } from 'react-router';
import Layout from '../components/Layout/Layout';

const Homepage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center px-8 text-center gap-5  py-20 h-[50vw] ">
        <h1 className="text-[35px] font-bold text-center">
          Job-winning resume templates
        </h1>
        <p className="text-[12px]">
          Each resume template is designed to follow the exact rules you need to
          get hired faster. Use our resume templates and get free access to 18
          more career tools!
        </p>
        <Link to="/manage-profiles">
          <button className="px-10 py-5 bg-btn-blue text-white font-medium rounded-md hover:bg-btn-dark">
            Manage-Profiles
          </button>
        </Link>
        <Link to="/preview-resume">
          <button className="px-10 py-5 bg-btn-blue text-white font-medium rounded-md hover:bg-btn-dark">
            Preview Resume
          </button>
        </Link>
        <Link to="/register">
          <button className="px-10 py-5 bg-btn-blue text-white font-medium rounded-md hover:bg-btn-dark">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="px-10 py-5 bg-btn-blue text-white font-medium rounded-md hover:bg-btn-dark">
            Login
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Homepage;
