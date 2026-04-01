import { ScrollTrigger, SplitText } from "gsap/all";

import gsap from "gsap";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Cocktail from "./component/Cocktail";
import About from "./component/About";
import Art from "./component/Art";
import Menu from "./component/Menu";
import Contact from "./component/Contact";
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      {/* <Navbar /> */}
      <Navbar />
      <Hero />
      <Cocktail />
      <About />
      <Art />
      <Menu />
      <Contact />
    </main>
  );
};

export default App;
