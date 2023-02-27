import { WelcomeText } from "@components/index";
import Layout from "@components/layout";
import About from "./About";
import Footer from "./Footer";
import Hero from "./Hero";
import TopResearch from "./TopResearch";
import Topics from "./Topics";

const Home = () => {
  return (
    <Layout>
      <div className="bg-primary-bg overflow-hidden min-h-screen">
        <WelcomeText />
        <Hero />
        <div className="relative">
          <About />
          <Topics />
        </div>
        <div className="relative">
          <TopResearch />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Home;
