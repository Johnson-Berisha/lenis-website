"use client";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
  const [scale, setScale] = useState(1);
  const [bg, setBg] = useState("black");
  const [hideWelcome, setHideWelcome] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const verticalRef = useRef(null);
  const horizontalRef = useRef(null);
  const colLeftRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smooth: true });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafIdRef.current = requestAnimationFrame(raf);

      const scroll = window.scrollY;
      setScale(1 + scroll / 100);
      setBg(scroll > 200 ? "white" : "black");
      setHideWelcome(scroll > 250);
      setShowTitle(scroll > 100);

      // vertical scroll

    }

    rafIdRef.current = requestAnimationFrame(raf);

    const section1 = verticalRef.current;
    const colLeft = colLeftRef.current;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(colLeft, { y: 0 }, { y: "220vh", duration: 1, ease: "none" }, 0);

    const scroll_1 = ScrollTrigger.create({
      animation: tl,
      trigger: section1,
      start: "top top",
      end: "bottom center",
      scrub: true,
    });

    return () => {
      // kill ScrollTrigger instances and GSAP tweens
      try {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } catch (e) {
        // ignore
      }
      try {
        tl.kill();
      } catch (e) {}
      try {
        scroll_2 && scroll_2.kill && scroll_2.kill();
      } catch (e) {}
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current && typeof lenisRef.current.destroy === "function") {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={`container ${bg}`}>
      <div className="welcome-screen">
        <h1
          className={`welcome ${hideWelcome ? "hidden" : ""}`}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          WELCOME
        </h1>
      </div>

      <section className="about">
        <h1 className={`accent title ${showTitle ? "show-title" : "hide-title"}`}>
          Gjonson Berisha
        </h1>
        <div className="cards">
          <div className="card">
            <h1>Crafting Digital Experiences</h1>
            <p>
              I design and build sleek, performance-driven websites that blend
              creativity with precision. Every scroll, hover, and pixel matters
              — because great design deserves great execution.
            </p>
          </div>
          <div className="card">
            <h1>Powered by Code & Curiosity</h1>
            <p>
              From physics formulas to CSS grids, I explore how things work and
              how they can look better. Logic and beauty aren't opposites —
              they're partners in creation.
            </p>
          </div>
          <div className="card">
            <h1>Minimal. Fast. Human.</h1>
            <p>
              No clutter, no noise — just smooth, meaningful web experiences.
              My goal is to make interfaces that feel natural, responsive, and
              built for humans, not algorithms.
            </p>
          </div>
        </div>
      </section>
      <section id="vertical" ref={verticalRef}>
          <div className="container_vertical">
            <div className="vertical__content">
              <div className="col col_left" ref={colLeftRef}>
                <h2 className="vertical__heading">
                  <span>Who</span>
                  <span>Am</span>
                  <span>I Exactly?</span>
                </h2>
              </div>
              <div className="col col_right">
                <div className="vertical__item">
                  
                  <p>
                    I'm a passionate <span className="accent">web developer</span> from Klina, Kosovo, focused on creating clean, fast, and meaningful digital experiences. I love transforming ideas into real products—from concept to polished interface—using modern web technologies.
                  </p>
                </div>
                <div className="vertical__item">
                  
                  <p>My strengths are front-end development, <span className="accent">UI/UX</span> design, and building responsive layouts with precision. I enjoy solving complex problems and turning them into simple, intuitive solutions that users love to interact with.
                  </p>
                </div>
                <div className="vertical__item">
                  
                  <p>Outside of coding, I'm deeply interested in physics, technology, and <span className="accent">football</span>. I believe creativity grows when you explore different passions, and I bring that energy into every project I build.
                  </p>
                </div>
                <div className="vertical__item">
                  
                  <p>I'm constantly learning, improving, and pushing myself further. My goal is to build products that stand out through quality, simplicity, and <span className="accent">attention</span> to detail—projects that make an impact and leave a mark online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    </div>
  );
}