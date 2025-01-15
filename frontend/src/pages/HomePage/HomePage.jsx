import Layout from '../../components/Layout/Layout';
import { HeroSection, HomeSection3, HomeSection4 } from './home-components/';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <HomeSection3 />
      <HomeSection4 />
    </Layout>
  );
};

export default HomePage;
