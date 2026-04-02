import { openingHours, socials } from "../constant";

import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", {
      type: "words",
    });
    const timeline = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
    });
    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to("#f-right-leaf", {
        y: -50,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-leaf",
        {
          y: 50,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
  }, []);
  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
      />
      <div className="content">
        <h2>Where to Find Us</h2>
        <div>
          <h3>Visit Our Bar</h3>
          <p>Pune, Maharashtra India</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>
            <a href="tel:+44123456789">+917820924353</a>
          </p>
          <p>
            <a href="mailto:shaikhsufiyan174@gmail.com">
              shaikhsufiyan174@gmail.com
            </a>
          </p>
        </div>
        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
