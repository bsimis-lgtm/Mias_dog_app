import React, { useState } from "react";
import { motion } from "motion/react";
import { playWoofSound, playPopSound } from "../utils/audio";

interface SplashProps {
  onEnter: () => void;
}

export default function Splash({ onEnter }: SplashProps) {
  const [blinking, setBlinking] = useState(false);
  const [earsFlapped, setEarsFlapped] = useState(false);

  // Trigger brief blinking style
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handlePuppyTap = () => {
    setEarsFlapped(true);
    playWoofSound("high");
    setTimeout(() => setEarsFlapped(false), 600);
  };

  const handleStart = () => {
    playWoofSound("medium");
    onEnter();
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD1DC]/40 via-[#FAF9F6] to-[#E6E6FA]/40 flex flex-col justify-between items-center p-6 text-center z-50 overflow-hidden">
      
      {/* Soft decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[10%] w-24 h-24 rounded-full bg-[#FFD1DC]/60 blur-xl" />
        <div className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-[#E6E6FA]/60 blur-xl" />
        <div className="absolute top-[40%] right-[20%] w-16 h-16 rounded-full bg-yellow-100/60 blur-lg" />
      </div>

      {/* Header title */}
      <div className="mt-8 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="flex items-center justify-center gap-1.5 mb-2"
        >
          <span className="text-3xl">🐾</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#FF85A2] via-purple-500 to-[#FF85A2]/80 bg-clip-text text-transparent">
            Mia's Dog App
          </h1>
          <span className="text-3xl">🌸</span>
        </motion.div>
        <p className="text-[#4A4A4A]/80 font-bold px-4 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
          Explore, learn, and save your absolute favorite puppy and dog best buddies!
        </p>
      </div>

      {/* Main Puppy Interaction Area */}
      <div className="my-auto flex flex-col items-center relative z-10 cursor-pointer" onClick={handlePuppyTap}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            },
            default: { duration: 0.8 }
          }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          {/* Vector Interactive Puppy */}
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg select-none">
            {/* Left Ear */}
            <motion.path
              d="M 50 70 Q 20 40 35 110 Q 50 110 50 80"
              fill="#d7a15c"
              stroke="#b17a3a"
              strokeWidth="4"
              strokeLinejoin="round"
              animate={{
                rotate: earsFlapped ? [-15, 10, -10, 0] : [0, -2, 2, 0],
              }}
              transition={{ duration: earsFlapped ? 0.6 : 4, repeat: earsFlapped ? 0 : Infinity }}
              style={{ transformOrigin: "50px 70px" }}
            />
            {/* Right Ear */}
            <motion.path
              d="M 150 70 Q 180 40 165 110 Q 150 110 150 80"
              fill="#d7a15c"
              stroke="#b17a3a"
              strokeWidth="4"
              strokeLinejoin="round"
              animate={{
                rotate: earsFlapped ? [15, -10, 10, 0] : [0, 2, -2, 0],
              }}
              transition={{ duration: earsFlapped ? 0.6 : 4, repeat: earsFlapped ? 0 : Infinity }}
              style={{ transformOrigin: "150px 70px" }}
            />
            
            {/* Head Silhouette */}
            <ellipse cx="100" cy="100" rx="60" ry="52" fill="#FFE5B4" stroke="#d4ab6a" strokeWidth="4" />

            {/* Nose Slout Patch */}
            <ellipse cx="100" cy="114" rx="28" ry="18" fill="#FFF" />

            {/* Left Eye */}
            <ellipse cx="75" cy="94" rx="8" ry={blinking ? 1 : 8} fill="#3d3b3c" />
            {!blinking && <circle cx="73" cy="91" r="2.5" fill="#FFF" />}

            {/* Right Eye */}
            <ellipse cx="125" cy="94" rx="8" ry={blinking ? 1 : 8} fill="#3d3b3c" />
            {!blinking && <circle cx="123" cy="91" r="2.5" fill="#FFF" />}

            {/* Cheeks blush */}
            <ellipse cx="60" cy="108" rx="8" ry="5" fill="#ffccd5" opacity="0.8" />
            <ellipse cx="140" cy="108" rx="8" ry="5" fill="#ffccd5" opacity="0.8" />

            {/* Big Heart on forehead! */}
            <path
              d="M 100 78 C 96 70 88 70 88 78 C 88 84 100 92 100 92 C 100 92 112 84 112 78 C 112 70 104 70 100 78 Z"
              fill="#FF85A2"
            />

            {/* Dog Nose */}
            <path d="M 92 106 Q 100 98 108 106 Q 100 111 92 106 Z" fill="#3d3b3c" />

            {/* Cheerful Mouth */}
            <path d="M 94 114 Q 100 118 106 114" fill="none" stroke="#3d3b3c" strokeWidth="3" strokeLinecap="round" />
            
            {/* Playful Tongue */}
            <motion.path
              d="M 96 115 Q 100 128 104 115 Z"
              fill="#ff4d6d"
              stroke="#ff4d6d"
              strokeWidth="1"
              animate={{
                scaleY: earsFlapped ? [1, 1.4, 1] : [1, 1.05, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ transformOrigin: "100px 115px" }}
            />
          </svg>
        </motion.div>
        
        {/* Helper pop instructions */}
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xs text-[#FF85A2] font-bold tracking-wider mt-2 uppercase bg-white/90 px-3.5 py-1 rounded-full border border-[#FFD1DC] shadow-sm"
        >
          💖 Tap the pup to hear a woof!
        </motion.p>
      </div>

      {/* Launch Footer Button */}
      <div className="w-full max-w-sm relative z-10 mb-8">
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-8 bg-[#FF85A2] text-white rounded-full font-bold text-lg shadow-md hover:shadow-lg hover:bg-[#FF85A2]/95 transition-all cursor-pointer flex items-center justify-center gap-2 border-b-4 border-pink-700/20"
        >
          <span>🐾</span>
          <span>Let's Go, Explore Dogs!</span>
          <span>✨</span>
        </motion.button>
      </div>
    </div>
  );
}
