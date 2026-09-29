
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const topStats = [
  {
    value: "58%",
    text: "Increase in pick up point use",
    color: "lime",
  },
  {
    value: "27%",
    text: "Increase in pick up point use",
    color: "dark",
  },
];

const bottomStats = [
  {
    value: "23%",
    text: "Decreased in customer phone calls",
    color: "blue",
  },
  {
    value: "40%",
    text: "Decreased in customer phone calls",
    color: "orange",
  },
];

function StatCard({ item, className = "" }) {
  return (
    <div className={`metric-card ${item.color} ${className}`}>
      <h2>{item.value}</h2>
      <p>{item.text}</p>
    </div>
  );
}

export default function App() {
  const mainRef = useRef(null);
  const bannerRef = useRef(null);
  const carRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the top statistics on page load
      gsap.from(".top-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Car and banner scroll animation
      const carTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: "+=1600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Move the car from right to left across the banner
      carTimeline.fromTo(
        carRef.current,
        {
          x: () => window.innerWidth * 1.2,
        },
        {
          x: () => -window.innerWidth * 1.2,
          ease: "none",
          duration: 1,
        },
        0
      );

      // Subtle movement of the background headline
      carTimeline.fromTo(
        titleRef.current,
        {
          x: 0,
        },
        {
          x: () => -window.innerWidth * 0.25,
          ease: "none",
          duration: 1,
        },
        0
      );

      // Reveal bottom statistics when they enter the viewport
      gsap.from(".bottom-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bottom-stats",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Refresh ScrollTrigger after images load
      const car = carRef.current;

      if (car && !car.complete) {
        car.addEventListener("load", ScrollTrigger.refresh, {
          once: true,
        });
      } else {
        ScrollTrigger.refresh();
      }
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={mainRef}>
      {/* SECTION 1: TOP STATISTICS */}
      <section className="intro-section">
        <div className="intro-heading">
          <span className="small-label">
            ITZFIZZ DIGITAL EXPERIENCE
          </span>

          <h1>
            Scroll to
            <br />
            <span>experience.</span>
          </h1>

          <p className="intro-description">
            Discover the power of creative digital
            experiences through motion and design.
          </p>
        </div>

        <div className="top-stats">
          {topStats.map((item, index) => (
            <StatCard
              item={item}
              className="top-card"
              key={index}
            />
          ))}
        </div>

        <div className="intro-footer">
          <span>SCROLL DOWN TO EXPLORE</span>
          <span>01 / 03</span>
        </div>
      </section>

      {/* SECTION 2: PINNED CAR ANIMATION */}
      <section
        className="car-banner"
        ref={bannerRef}
      >
        {/* Horizontal green background band */}
        <div className="green-panel" />

        {/* Large background text */}
        <div className="banner-title-wrap">
          <h2
            className="banner-title"
            ref={titleRef}
          >
            WELCOME ITZFIZZ
          </h2>
        </div>

        {/* Moving car */}
        <div className="car-track">
          <img
            ref={carRef}
            src="/car.png"
            alt="Sports car driving across the screen"
            className="scroll-car"
          />
        </div>

        <div className="banner-footer">
          <span>INNOVATION MEETS DESIGN</span>
          <span>02 / 03</span>
        </div>
      </section>

      {/* SECTION 3: BOTTOM STATISTICS */}
      <section className="bottom-stats">
        <div className="bottom-heading">
          <span className="small-label">
            OUR IMPACT
          </span>

          <h2>
            Numbers that
            <br />
            <span>move us forward.</span>
          </h2>
        </div>

        <div className="stats-grid">
          {bottomStats.map((item, index) => (
            <StatCard
              item={item}
              className="bottom-card"
              key={index}
            />
          ))}
        </div>

        <div className="intro-footer">
          <span>BUILT FOR WHAT'S NEXT</span>
          <span>03 / 03</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <a href="#home" className="footer-logo">
          ITZ<span>FIZZ</span>.
        </a>

        <span>Crafted with creativity © 2026</span>
      </footer>
    </main>
  );
}