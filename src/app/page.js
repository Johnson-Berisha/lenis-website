"use client";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Page() {
  const [scale, setScale] = useState(1);
  const [bg, setBg] = useState("black");
  const [hideWelcome, setHideWelcome] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const verticalRef = useRef(null);
  const colLeftRef = useRef(null);
  const rafIdRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  lenisRef.current = new Lenis({ duration: 1.2, smooth: true });

  const section1 = verticalRef.current;
  const colLeft = colLeftRef.current;

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(colLeft, { y: 0 }, { y: "300vh", duration: 1, ease: "none" }, 0);

  const projectsTrigger = ScrollTrigger.create({
    trigger: "#projects",
    start: "top center",
    end: "bottom center",
    onEnter: () => setBg("black"),
    onLeaveBack: () => setBg("white"),
  });

  ScrollTrigger.create({
    animation: tl,
    trigger: section1,
    start: "top top",
    end: "bottom center",
    scrub: true,
  });

  gsap.utils.toArray(".text, .title-showcase").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // on hover of project divs, show the demo image, and it has position:absolute so it can follow the mouse
  
  // Create smooth animators once
const projectDivs = document.querySelectorAll(".project");

const onMouseEnter = (e) => {
  const demoImg = e.currentTarget.querySelector(".demo-img");
  demoImg.classList.add("visible");
};

const onMouseMove = (e) => {
  const demoImg = e.currentTarget.querySelector(".demo-img");
  demoImg.style.left = `${e.clientX}px`;
  demoImg.style.top = `${e.clientY}px`;
};

const onMouseLeave = (e) => {
  const demoImg = e.currentTarget.querySelector(".demo-img");
  demoImg.classList.remove("visible");
};

projectDivs.forEach((div) => {
  div.addEventListener("mouseenter", onMouseEnter);
  div.addEventListener("mousemove", onMouseMove);
  div.addEventListener("mouseleave", onMouseLeave);
});


  

  lenisRef.current.on("scroll", ScrollTrigger.update);    

  function raf(time) {
    lenisRef.current.raf(time);
    ScrollTrigger.update();
    rafIdRef.current = requestAnimationFrame(raf);

    const scroll = window.scrollY;

    // Use getBoundingClientRect for reliable position or ScrollTrigger metrics
    const start = projectsTrigger.start || 0;
    const end = projectsTrigger.end || 0;

    // Only update background if outside the projectsTrigger range
    if (scroll < start || scroll > end) {
      setBg(scroll > 200 ? "white" : "black");
    }

    setScale(1 + scroll / 100);
    setHideWelcome(scroll > 250);
    setShowTitle(scroll > 100);
  }

  rafIdRef.current = requestAnimationFrame(raf);

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    tl.kill();
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (lenisRef.current) lenisRef.current.destroy();
  };
}, []);


  return (
    <div className={`container ${bg}`}>

      {/* Header */}
      <header className="menu">
        <a className="item" href="#home">Home</a>
        <span className="logo">G|</span>
        <a className="item" href="#vertical">About</a>
      </header>

      <div className="welcome-screen">
        <h1
          className={`welcome ${hideWelcome ? "hidden" : ""}`}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          WELCOME
        </h1>
      </div>

      <section className="about" id="home">
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
        <div className="living-marker">
          <p className="marker-text"><span className="green-dot"></span> Alive</p>
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
                <p>
                  My strengths are front-end development, <span className="accent">UI/UX</span> design, and building responsive layouts with precision. I enjoy solving complex problems and turning them into simple, intuitive solutions that users love to interact with.
                </p>
              </div>
              <div className="vertical__item">
                <p>
                  Outside of coding, I'm deeply interested in physics, technology, and <span className="accent">football</span>. I believe creativity grows when you explore different passions, and I bring that energy into every project I build.
                </p>
              </div>
              <div className="vertical__item">
                <p>
                  I'm constantly learning, improving, and pushing myself further. My goal is to build products that stand out through quality, simplicity, and <span className="accent">attention</span> to detail—projects that make an impact and leave a mark online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="projects" id="projects">
        <div className="project">
          <span>Old Portfolio</span>
          <div className="demo-img img-1"></div>
          <span className="project-desc">www.website.com</span>
        </div>
        <div className="project">
          <span>Berisha AL</span>
          <div className="demo-img img-2"></div>
          <span className="project-desc">www.website.com</span>
        </div>
        <div className="project">
          <span>MDPPlayer</span>
          <div className="demo-img img-3"></div>
          <span className="project-desc">www.website.com</span>
        </div>
      </section>


      
        <div className="story-wrapper">
          <section className="panel chapter">
            <p className="text">This is where everything begins...</p>
          </section>

          <section className="panel chapter">
            <p className="text">A new chapter unfolds.</p>
          </section>
          <section className="panel chapter">
            <div className="text">
              <h1>Ok, too much cinematicty</h1>
              <p className="small-text">Or whatever its called</p>
              <div className="flex-content">
                <p>Thanks for scrolling all the way down here. I hope you enjoyed the little interactions and animations sprinkled throughout the page. If you'd like to see more of my work or get in touch, feel free to reach out!</p>
                <p className="vertical-text">Have a great day!</p>
                <div className="links small-text">
                  <div className="link">GitHub</div>
                  <div className="link">IG</div>
                  <div className="link">Codepen</div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
}
