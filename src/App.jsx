import { Route, Routes } from 'react-router';
import './App.css';

import { MyDocumentsPage, ResumeEditor, SignUpPage, SignInPage } from './pages';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<ResumeEditor />} />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route path="/my-resumes" element={<MyDocumentsPage />} />
      </Routes>
    </>
  );
}

export default App;
