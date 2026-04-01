import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  /**
   * Sets the text animations for the hero section.
   * Splits the hero title and subtitle text and animates each character
   * and line with a staggered animation.
   */
  const setTextAnimations = () => {
    // Split hero title text so each character is animated
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    // Split hero subtitle text so each line in the paragraph is animated
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Add a text gradient to each character of the hero title
    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });

    // Animate each character of the hero title
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    // Animate each line of the hero subtitle
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });
  };

  /**
   * Animates the left and right leaves when scrolling.
   * The animation is done by setting the y position of the leaves
   * based on the scroll position of the hero section.
   */
  const setLeafAnimations = () => {
    // Animate the left and right leaves when scrolling
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
  };

  /**
   * Sets the start and end values for the video based on mobile or desktop
   * and creates a timeline for the video so it plays each frame when scrolling.
   */
  const setVideoAnimation = () => {
    // Set the start and end values for the video
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    // Create a timeline for the video so it plays each frame when scrolling
    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (videoRef.current)
      /**
       * Called when the video metadata has been loaded.
       * Sets the to animation to the end of the video.
       */
      videoRef.current.onloadedmetadata = () => {
        videoTimeline.to(videoRef.current, {
          currentTime: videoRef.current?.duration,
        });
      };
  };

  useGSAP(() => {
    setTextAnimations();
    setLeafAnimations();
    setVideoAnimation();
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">VELVET POUR</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes - designed to ignite your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
