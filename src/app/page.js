"use client";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Page() {
  const [scale, setScale] = useState(1);
  const [bg, setBg] = useState("black");
  const [hideWelcome, setHideWelcome] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const secondParagraphRef = useRef(null);
  const [showSkipPanel, setShowSkipPanel] = useState(false);
  const [accent, setAccent] = useState("blue");

  const navRef = useRef(null);
  const pillRef = useRef(null);

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
  const mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
  tl.fromTo(colLeft, { y: 0 }, { y: "220vh", duration: 1, ease: "none" }, 0);
});

gsap.matchMedia().add("(max-width: 768px)", () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  tl.kill();
});


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

  // accent changer
  document.documentElement.setAttribute("data-accent", accent);
  

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

  const texts = document.querySelectorAll(".storyText");

  texts.forEach((el) => {
    const split = new SplitType(el, { types: "chars" });

    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 1.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });
  });

  ScrollTrigger.create({
  trigger: secondParagraphRef.current,
  start: "top 70%",
  onEnter: () => setShowSkipPanel(true),
  onLeave: () => setShowSkipPanel(false)
});

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    tl.kill();
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (lenisRef.current) lenisRef.current.destroy();
  };

  
}, [accent]);

  // Separate effect for pill movement to ensure DOM is ready
  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;

    if (!nav || !pill) return;

    const links = nav.querySelectorAll("a");
    const active = nav.querySelector(".active");

    if (!active) return;

    const move = (el) => {
      const r = el.getBoundingClientRect();
      const p = nav.getBoundingClientRect();
      pill.style.width = `${r.width}px`;
      pill.style.left = `${r.left - p.left}px`;
    };

    // Initial position
    move(active);

    // Add hover listeners
    const handleMouseEnter = (link) => () => move(link);
    const handleMouseLeave = () => move(active);

    links.forEach(link => {
      link.addEventListener("mouseenter", handleMouseEnter(link));
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // Handle window resize to keep pill in sync
    const handleResize = () => {
      const activeNow = nav.querySelector(".active");
      if (activeNow) move(activeNow);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleMouseEnter(link));
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);
const options = ["blue", "red", "green", "yellow", "purple", "pink"];


  return (
    <div className={`container ${bg}`}>

      {/* Header */}
      <nav ref={navRef} className="nav">
        <span ref={pillRef} className="pill" />
        <a className="active">Home</a>
        <a>Projects</a>
        <a>About</a>
        <a>Contact</a>
      </nav>
      <header className="control-panel">
        <div className="settings-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        </div>
          <div className="accent-wrapper">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => setAccent(o)}
                className={`accent-dot accent-${o}`}
              />
            ))}
          </div>
      </header>
        {showSkipPanel && (
          <div className={`skip-panel ${showSkipPanel ? "visible" : ""}`}>
            Too much text? <button onClick={() => window.location.href = "#projects"}>Skip</button>
          </div>
        )}
      <div className="welcome-screen">
        <h1
          className={`storyText welcome ${hideWelcome ? "hidden" : ""}`}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          WELCOME
        </h1>
        <div className="scroll-message">
          <span className="arrow">↓</span> Try scrolling :)
        </div>

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
              creativity with precision. Every scroll, hover, and pixel matters, because great design deserves great execution.
            </p>
          </div>
          <div className="card">
            <h1>Powered by Code & Curiosity</h1>
            <p>
              From physics formulas to CSS grids, I explore how things work and
              how they can look better. Logic and beauty aren't opposites,
              they're partners in creation.
            </p>
          </div>
          <div className="card">
            <h1>Minimal. Fast. Human.</h1>
            <p>
              No clutter, no noise, just smooth, meaningful web experiences.
              My goal is to make interfaces that feel natural, responsive, and
              built for humans, not algorithms.
            </p>
          </div>
        </div>
        <div className="markers">
        <div className="living-marker">
          <p className="marker-text">Web Developer</p>
        </div>
        <div className="living-marker">
          <p className="marker-text"><span className="green-dot"></span> Active</p>
        </div>
        <div className="living-marker">
          <p className="marker-text">Klina, Kosovo</p>
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
                  I'm a <span className="accent">web developer</span> from Klina, Kosovo, focused on building clean, fast, and purposeful digital experiences. I turn ideas into polished interfaces using modern tools and a detail-driven mindset.
                </p>
              </div>
              <div className="vertical__item">
                <p ref={secondParagraphRef}>
                  My strengths are front-end development, <span className="accent">UI/UX</span> thinking, and responsive layouts crafted with precision. I love taking complex problems and shaping them into simple, intuitive interactions.
                </p>
              </div>
              <div className="vertical__item">
                <p>
                 I draw inspiration from physics, technology, and football, different worlds that sharpen my creativity and the way I approach <span className="accent">design</span> and development.
                </p>
              </div>
              <div className="vertical__item">
                <p>
                  I'm always pushing myself forward, refining my <span className="accent">skills</span> and raising my standards. My goal is to build products that feel thoughtful, crafted, and genuinely memorable online.
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
          <span className="project-desc">https://beta-jb.vercel.app/</span>
        </div>
        <div className="project">
          <span>Berisha AL</span>
          <div className="demo-img img-2"></div>
          <span className="project-desc">https://berishaal.vercel.app/</span>
        </div>
        <div className="project" style={{ marginBottom: '200px' }}>
          <span>MPD Player</span>
          <div className="demo-img img-3"></div>
          <span className="project-desc">https://mpdplayer.de/</span>
        </div>
      <section className="projects-info">
        <div className="big-project project1">
          <div className="project-image">
            <img src="oldportfolio.png" alt="Old Portfolio Screenshot" />
          </div>
          <div className="project-text">
            <h2>Old Portfolio</h2>
            <p>
              A personal portfolio website showcasing my projects and skills, built with a focus on clean design and smooth user experience.
            </p>
            <div className="skills">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
              <span>NextJS</span>
              <span>Figma</span>
              <span>LenisJS</span>
              <span>Gsap</span>
              <span>Vercel</span>
            </div>
          </div>
        </div>
        <div className="big-project project2"><div className="project-image">
            <img src="berisha-al.png" alt="Old Portfolio Screenshot" />
          </div>
          <div className="project-text">
            <h2>Berisha A&L</h2>
            <p>
              Berisha AL is a project that showcases the work of a talented construction group in Kosovo. It highlights their achievements and contributions in their field.
            </p>
            <div className="skills">
              <span>HTML</span>
              <span>Figma</span>
              <span>CSS</span>
              <span>JavaScript</span>
              <span>Vercel</span>
            </div>
          </div></div>
        <div className="big-project project3"><div className="project-image">
            <img src="mpdplayer.png" alt="Old Portfolio Screenshot" />
          </div>
          <div className="project-text">
            <h2>MPD Player</h2>
            <p>
              A personal portfolio website showcasing my projects and skills, built with a focus on clean design and smooth user experience.
            </p>
            <div className="skills">
              <span>CSS</span>
              <span>Figma</span>
              <span>HTML</span>
              <span>Vercel</span>
            </div>
          </div></div>
      </section>
      </section>
    </div>
  );
}
