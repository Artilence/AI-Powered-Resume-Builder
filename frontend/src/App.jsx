import { Route, Routes } from 'react-router';
import './App.css';
import Homepage from './pages/HomePage/HomePage';
import DemoTemplate from './components/DemoTemplate';
import PreviewResume from './pages/PreviewResume';
import CreateProfile from './pages/CreateProfile';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ManageProfiles from './pages/ManageProfiles';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/linkedin/callback" element={<Homepage />} /> */}
        <Route path="/demo-template" element={<DemoTemplate />} />
        <Route
          path="/preview-resume"
          element={<ProtectedRoute element={PreviewResume} />}
        />
        <Route
          path="/selectprofile"
          element={<ProtectedRoute element={CreateProfile} />}
        />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/manage-profiles"
          element={<ProtectedRoute element={ManageProfiles} />}
        />
      </Routes>
    </>
  );
}

export default App;
