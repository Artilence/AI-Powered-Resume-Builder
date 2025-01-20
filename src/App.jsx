import { Route, Routes } from 'react-router';
import './App.css';
import MyDocumentsPage from './pages/MyDocumentsPage/MyDocumentsPage';
import ResumeEditor from './pages/Resume-Editor/ResumeEditor';
import SignUpPage from './pages/Auth/SignUpPage/SignUpPage';
import SignInPage from './pages/Auth/SignInPage/SignInPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResumeEditor />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/my-resumes" element={<MyDocumentsPage />} />
      </Routes>
    </>
  );
}

export default App;
