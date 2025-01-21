import React from 'react';
import QuillEditor from './QuillEditor';
import Chat from './Chat';

const Layout = () => {
  return (
    <div className="w-full grid grid-cols-[2fr_1fr] min-h-screen ">
      <QuillEditor />
      <Chat />
    </div>
  );
};

export default Layout;
