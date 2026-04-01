"use client";

import { useRef, useState } from "react";

import gsap from "gsap";
import { sliderLists } from "../constant";
import { useGSAP } from "@gsap/react";

const Menu = () => {
  // Ref, state and total cocktails
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const totalCocktails = sliderLists.length;

  // Animate navigation between cocktails
  useGSAP(() => {
    const xPercent = previousIndex < currentIndex ? -100 : 100;
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent },
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details h2, .details p",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power1.inOut" }
    );
  }, [currentIndex]);

  // Animate leaves
  useGSAP(() => {
    const leftLeafTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "40% 50%",
        end: "60% 60%",
        scrub: true,
      },
    });
    const rightLeafTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "0% 50%",
        end: "20% 60%",
        scrub: true,
      },
    });
    leftLeafTimeline.from("#m-left-leaf", {
      x: -100,
      y: 100,
    });
    rightLeafTimeline.fromTo(
      "#m-right-leaf",
      {
        x: 40,
        y: -100,
        rotateZ: 30,
      },
      {
        x: 20,
        y: 20,
        rotateZ: 0,
      }
    );
  }, []);

  /**
   * Goes to the slide at the given index, wrapping around if necessary.
   * Determines which direction to go based on the previous and current index.
   * @param {number} index - The index of the slide to go to.
   */
  const goToSlide = (index: any) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    const prevIndex =
      index === totalCocktails && newIndex === 0
        ? -1
        : index === -1 && newIndex === totalCocktails - 1
        ? totalCocktails
        : currentIndex;
    setPreviousIndex(prevIndex);
    setCurrentIndex(newIndex);
  };

  /**
   * Returns the cocktail at the given offset from the current index.
   * The offset is wrapped around the list of cocktails if necessary.
   * @param {number} indexOffset - The offset from the current index.
   * @returns {Object} The cocktail at the given offset.
   */
  const getCocktailAt = (indexOffset: any) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  // Get the current, previous, and next cocktails
  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      {/* Left and right leaves */}
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      {/* Section heading */}
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      {/* Cocktail tabs */}
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail: any, index: any) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => {
                goToSlide(index);
              }}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      {/* Cocktail content */}
      <div className="content">
        {/* Arrows */}
        <div className="arrows">
          {/* Left arrow */}
          <button
            className="text-left"
            onClick={() => {
              goToSlide(currentIndex - 1);
            }}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/arrow-left.png"
              alt="left arrow"
              aria-hidden="true"
            />
          </button>
          {/* Right arrow */}
          <button
            className="text-right"
            onClick={() => {
              goToSlide(currentIndex + 1);
            }}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/arrow-right.png"
              alt="right arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Cocktail Image */}
        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="object-contain"
          />
        </div>

        {/* Cocktail recipe */}
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
