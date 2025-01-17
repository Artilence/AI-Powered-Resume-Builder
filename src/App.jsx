import { Route, Routes } from 'react-router';
import './App.css';

import ResumeEditor from './pages/Resume-Editor/ResumeEditor';
import SignUpPage from './pages/Auth/SignUpPage/SignUpPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResumeEditor />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
