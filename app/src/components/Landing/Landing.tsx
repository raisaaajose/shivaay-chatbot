"use client";

import { useEffect } from "react";
import Hero from "./Hero";
import Features from "./Features";
import TechStack from "./TechStack";
import TourismFocus from "./TourismFocus";
import Architecture from "./Architecture";
import ProjectStats from "./ProjectStats";
import FinalCTA from "./FinalCTA";
import "./Landing.css";

export default function Landing() {
  useEffect(() => {
    // Initialize any setup needed for animations
  }, []);

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <Hero />
      <Features />
      <TechStack />
      <TourismFocus />
      <Architecture />
      <ProjectStats />
      <FinalCTA />
    </div>
  );
}
