import gsap from "gsap";
import { navLinks } from "../constant";
import { useGSAP } from "@gsap/react";
import LOGO from "../../public/images/logo (2).png";
const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "#navbar",
      {
        backgroundColor: "transparent",
      },
      {
        backgroundColor: "black",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  }, []);
  return (
    <nav id="navbar">
      <div>
        <a href="#home" className="flex items-center gap-2">
          <img src={LOGO} alt="Purple cocktail glass logo" />
          <p>Velvet Pour</p>
        </a>
        <ul>
          {navLinks.map((link: any) => (
            <li key={`nav-link-${link.id}`}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
