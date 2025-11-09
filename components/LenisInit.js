'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from "react";
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return null; // no UI needed
}