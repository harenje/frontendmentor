import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null); // Create a ref for the hero element
  

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);

        gsap.to(heroRef.current, {
          "--x": `${x}%`,
          "--y": `${y}%`,
          duration: 0.3,
          ease: "sine.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tl = gsap.timeline({ delay: 1 });

    tl.to(heroRef.current, {
      "--maskSize1": "20%",
      duration: 0.5,
      ease: "back.out(2)",
    }).to(heroRef.current, {
      "--maskSize2": "28%",
      "--maskSize3": "calc(28% + 0.1rem)",
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(2)",
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToMain = () => {
    gsap.to(window, { duration: 2, scrollTo: "#main" });
  };
 

  return (
    <>
      <div className="wrapper">
        <div className="hero hero--primary">
          <div className="container">
            <h1 className="hero__heading" data-splitting>
              Frontendmentor project
            </h1>
      <button onClick={scrollToMain} className="hero__button">
        Scroll to Challenge
      </button>
          </div>
        </div>

        <div
          className="hero hero--secondary"
          aria-hidden="true"
          data-hero
          ref={heroRef}
        >
          <div className="container">
            <p className="hero__heading" data-splitting>
              Frontendmentor project
            </p>
            <button  onClick={scrollToMain} className="hero__button">
        Scroll to Challenge
      </button>
          </div>
        </div>
      </div>
    </>
  );
  }

export default Hero;
