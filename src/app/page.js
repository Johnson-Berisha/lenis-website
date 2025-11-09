"use client";
import { useEffect, useState } from "react";
import Lenis from 'lenis';
import "./globals.css";

export default function Page() {
  const [scale, setScale] = useState(1);
  const [bg, setBg] = useState("black");
  const [hideWelcome, setHideWelcome] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);

      const scroll = window.scrollY;
      setScale(1 + scroll / 200);
      setBg(scroll > 200 ? "white" : "black");
      setHideWelcome(scroll > 200);
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
        Welcome
      </h1>
      </div>

      <section className="about">
        <div className="card">
        <h1>This is my Lenis website</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eligendi similique molestiae quo consequuntur asperiores eveniet laboriosam a maxime, illo exercitationem! Ad quisquam repellendus quaerat iure consectetur eaque earum at.</p>
        </div>
        <div className="card">
        <h1>This is my Lenis website</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eligendi similique molestiae quo consequuntur asperiores eveniet laboriosam a maxime, illo exercitationem! Ad quisquam repellendus quaerat iure consectetur eaque earum at.</p>
        </div>
        <div className="card">
        <h1>This is my Lenis website</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eligendi similique molestiae quo consequuntur asperiores eveniet laboriosam a maxime, illo exercitationem! Ad quisquam repellendus quaerat iure consectetur eaque earum at.</p>
        </div>
      </section>
    </div>
  );
}
