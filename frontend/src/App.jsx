import { Route, Routes } from 'react-router';
import './App.css';

import { ResumeEditor, SignUpPage, MyDocumentsPage } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResumeEditor />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/my-documents" element={<MyDocumentsPage />} />
      </Routes>
    </>
  );
}

export default App;
