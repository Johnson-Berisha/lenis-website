"use client";
import { useEffect, useState } from "react";
import Lenis from 'lenis';
import "./globals.css";

export default function Page() {
  const [scale, setScale] = useState(1);
  const [bg, setBg] = useState("black");
  const [hideWelcome, setHideWelcome] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);

      const scroll = window.scrollY;
      setScale(1 + scroll / 100);
      setBg(scroll > 200 ? "white" : "black");
      setHideWelcome(scroll > 250);
      setShowTitle(scroll > 100);
    }

    requestAnimationFrame(raf);
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
        <h1 className={`title ${showTitle ? "show-title" : "hide-title"}`}>Gjonson Berisha</h1>
        <div className="cards">
        <div className="card">
        <h1>Crafting Digital Experiences</h1>
        <p>I design and build sleek, performance-driven websites that blend creativity with precision. Every scroll, hover, and pixel matters — because great design deserves great execution.</p>
        </div>
        <div className="card">
        <h1>Powered by Code & Curiosity</h1>
        <p>From physics formulas to CSS grids, I explore how things work and how they can look better. Logic and beauty aren’t opposites — they’re partners in creation.</p>
        </div>
        <div className="card">
        <h1>Minimal. Fast. Human.</h1>
        <p>No clutter, no noise — just smooth, meaningful web experiences. My goal is to make interfaces that feel natural, responsive, and built for humans, not algorithms.</p>
        </div>
        </div>
      </section>
    </div>
  );
}
