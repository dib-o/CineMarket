"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function FireParticles() {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          color: {
            
            value: ["#fb2c36", "#ffa2a2"], // sky green + red
          }, // neon yellow
          links: { enable: false },
          move: { enable: true, speed: 1 },
          number: { value: 100 },
          opacity: { value: 0.8 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
