import Layout from '../components/Layout/Layout';
import { Link } from 'react-router';
const ManageProfiles = () => {
  return (
    <Layout>
      <div className="w-full min-h-[700px] flex justify-center items-center gap-6">
        <Link
          to={'/'}
          className="flex items-center justify-center p-4 bg-blue-500 text-white text-lg rounded-md"
        >
          Create Profile
        </Link>
        <Link className="flex items-center justify-center p-4 bg-blue-500 text-white text-lg rounded-md">
          Edit Profile
        </Link>
        <Link className="flex items-center justify-center p-4 bg-blue-500 text-white text-lg rounded-md">
          Preview Profile
        </Link>
      </div>
    </Layout>
  );
};

export default ManageProfiles;
