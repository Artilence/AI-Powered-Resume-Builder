import Layout from '../../components/Layout/Layout';
import {
  EdvenitySolutionsSection1,
  HeroSection,
  EdvenitySolutions2,
} from './home-components/';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <EdvenitySolutionsSection1 />
      <EdvenitySolutions2 />
    </Layout>
  );
};

export default HomePage;
