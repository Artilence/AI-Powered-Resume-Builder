import Footer from './Footer';
import Navbar from './Navbar';
const Layout = ({ children }) => {
  return (
    <div className="w-screen h-full overflow-x-hidden overflow-y-scroll">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
