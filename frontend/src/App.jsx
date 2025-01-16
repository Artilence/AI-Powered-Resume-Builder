import { Route, Routes } from 'react-router';
import './App.css';

import ResumeEditor from './pages/Resume-Editor/ResumeEditor';

function App() {
  return (
    <>
      <Routes>
        <Route path="/resume-editor" element={<ResumeEditor />} />
      </Routes>
    </>
  );
}

export default App;
