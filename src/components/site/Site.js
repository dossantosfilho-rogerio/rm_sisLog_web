import NavigationBar from "./NavigationBar";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import HeroSection from "./HeroSection";

const Site = () => {

  return (
    <div>
        <NavigationBar />
        <HeroSection />
        <Products />
        <About />
        <Contact />
    </div>
  );
};

export default Site;
