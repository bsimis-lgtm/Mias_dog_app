import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PawPrint {
  id: number;
  x: number; // percentage width
  y: number; // percentage height
  scale: number;
  rotation: number;
}

export default function PawTrail() {
  const [paws, setPaws] = useState<PawPrint[]>([]);

  useEffect(() => {
    // Generate walking paws
    const interval = setInterval(() => {
      setPaws((prev) => {
        // Keep at most 12 paws at a time
        const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;
        const freshPaws = prev.filter((p) => p.y > -20); // remove when scrolled past top

        // Let's create a walking pattern: weave slightly left and right
        const xBase = Math.random() * 90 + 5; // offset across layout
        
        // Add a pair of paws (left and right step)
        const leftStep: PawPrint = {
          id: nextId,
          x: xBase - 4,
          y: 110,
          scale: Math.random() * 0.3 + 0.6,
          rotation: -10 + Math.random() * 20,
        };

        const rightStep: PawPrint = {
          id: nextId + 1,
          x: xBase + 4,
          y: 125, // step slightly behind to simulate taking a step
          scale: leftStep.scale * 0.95,
          rotation: leftStep.rotation + 5,
        };

        return [...freshPaws, leftStep, rightStep];
      });
    }, 4500); // spawn walking sequence every few seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0, y: "100%", x: `${paw.x}%` }}
            animate={{
              opacity: [0, 0.12, 0.12, 0],
              y: "-20%", // float smoothly all the way upwards
              transition: { duration: 15, ease: "linear" },
            }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              transform: `rotate(${paw.rotation}deg) scale(${paw.scale})`,
            }}
            className="text-pink-300/40"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14C10.3 14 9 15.3 9 17C9 18.7 10.3 20 12 20C13.7 20 15 18.7 15 17C15 15.3 13.7 14 12 14Z"
                fill="currentColor"
              />
              <circle cx="7.5" cy="11.5" r="2" fill="currentColor" />
              <circle cx="10.5" cy="9" r="2" fill="currentColor" />
              <circle cx="14.5" cy="9" r="2" fill="currentColor" />
              <circle cx="17.5" cy="11.5" r="2" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
