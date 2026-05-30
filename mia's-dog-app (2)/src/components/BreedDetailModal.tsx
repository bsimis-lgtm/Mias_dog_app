import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Breed } from "../breedsData";
import { playPopSound, playSparkleSound, playWoofSound } from "../utils/audio";

interface BreedDetailModalProps {
  breed: Breed;
  isFavorited: boolean;
  onClose: () => void;
  onToggleFavorite: (breedId: string) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  emoji: string;
}

export default function BreedDetailModal({
  breed,
  isFavorited,
  onClose,
  onToggleFavorite,
}: BreedDetailModalProps) {
  const [viewMode, setViewMode] = useState<"puppy" | "adult">("puppy");
  const [activeTab, setActiveTab] = useState<"temperament" | "care" | "diet">("temperament");
  const [heartParticles, setHeartParticles] = useState<Particle[]>([]);
  const [isLiking, setIsLiking] = useState(false);
  
  // Track interactions inside this view to trigger a "woof" every 5-6 actions
  const [interactionCount, setInteractionCount] = useState(0);

  // Map category to a voice size
  const getBreedVoice = (): "high" | "medium" | "low" => {
    if (breed.category === "pocket-pals" || breed.id === "pomeranian" || breed.id === "bichon-frise") {
      return "high";
    }
    if (breed.category === "gentle-giants") {
      return "low";
    }
    return "medium";
  };

  // Trigger occasional woofs to make the app interactive and delightful
  const registerInteraction = () => {
    const nextCount = interactionCount + 1;
    setInteractionCount(nextCount);
    
    // Play sound on every 5th interaction
    if (nextCount > 0 && nextCount % 5 === 0) {
      playWoofSound(getBreedVoice());
    } else {
      playPopSound();
    }
  };

  const handleToggleView = (mode: "puppy" | "adult") => {
    if (viewMode !== mode) {
      setViewMode(mode);
      registerInteraction();
    }
  };

  const handleTabChange = (tab: "temperament" | "care" | "diet") => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      registerInteraction();
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wasFavorited = isFavorited;
    onToggleFavorite(breed.id);
    
    registerInteraction();

    if (!wasFavorited) {
      playSparkleSound();
      setIsLiking(true);
      setTimeout(() => setIsLiking(false), 500);

      // Sparkle burst
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 80,
        y: -10 - Math.random() * 60,
        scale: Math.random() * 0.9 + 0.6,
        emoji: ["💖", "✨", "🌸", "⭐", "🐾", "🦴"][Math.floor(Math.random() * 6)],
      }));
      setHeartParticles(newParticles);
      setTimeout(() => setHeartParticles([]), 1200);
    }
  };

  const handleHearBark = () => {
    playWoofSound(getBreedVoice());
    setInteractionCount((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs flex items-end justify-center z-40 p-0 md:p-4"
    >
      {/* Tap outside to close helper */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => { playPopSound(); onClose(); }} />

      {/* Main Drawer Shell */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="w-full max-w-lg bg-[#FAFAFA] rounded-t-[36px] md:rounded-[36px] overflow-hidden shadow-2xl relative z-50 flex flex-col max-h-[92%] border-t-4 border-[#FFD1DC]"
      >
        {/* Cute top handle handle line for tactile dragging design */}
        <div className="w-16 h-1.5 bg-[#FFD1DC] rounded-full mx-auto my-3 cursor-pointer shrink-0" onClick={() => { playPopSound(); onClose(); }} />

        {/* Media Block / Image Container */}
        <div className="relative w-full aspect-4/3 overflow-hidden shrink-0 bg-rose-50">
          <AnimatePresence mode="wait">
            <motion.img
              key={viewMode}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.25 }}
              src={viewMode === "puppy" ? breed.images.puppy : breed.images.adult}
              alt={`${breed.name} ${viewMode}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Sparkles / Bark overlay triggers */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => { playPopSound(); onClose(); }}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-600 shadow-md hover:bg-white border border-[#FFD1DC] transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-4.5 h-4.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Dynamic Voice Bark Bubble */}
          <motion.button
            onClick={handleHearBark}
            whileHover={{ scale: 1.05 }}
            className="absolute top-4 right-4 bg-yellow-100/95 hover:bg-yellow-100 border-2 border-yellow-200 py-1.5 px-3.5 rounded-full text-xs font-bold text-amber-700 shadow-md flex items-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <span>🔊</span>
            <span>Woof!</span>
          </motion.button>

          {/* Puppy vs Grown Bone Slider Toggle */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs p-1 rounded-full shadow-lg flex border-2 border-[#FFD1DC] relative">
            <div className="flex relative z-10">
              <button
                onClick={() => handleToggleView("puppy")}
                className={`py-1.5 px-4 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                  viewMode === "puppy" ? "text-white" : "text-stone-500"
                }`}
              >
                <span>🐶</span> Puppy
              </button>
              <button
                onClick={() => handleToggleView("adult")}
                className={`py-1.5 px-4 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                  viewMode === "adult" ? "text-white" : "text-stone-500"
                }`}
              >
                <span>🐕</span> Grown-Up
              </button>
            </div>

            {/* Slider back background shape (Bone style color) */}
            <motion.div
              layout
              transition={{ type: "spring", damping: 20, stiffness: 180 }}
              className="absolute top-1 bottom-1 left-1 bg-[#FF85A2] rounded-full z-0"
              style={{
                width: viewMode === "puppy" ? "48%" : "48%",
                transform: viewMode === "puppy" ? "translateX(0%)" : "translateX(98%)",
              }}
            />
          </div>

          {/* Sparkles / Heart Particles overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <AnimatePresence>
              {heartParticles.map((pt) => (
                <motion.span
                  key={pt.id}
                  initial={{ opacity: 1, scale: 0.1, x: "50%", y: "85%" }}
                  animate={{
                    opacity: 0,
                    scale: pt.scale,
                    x: `calc(50% + ${pt.x}px)`,
                    y: `calc(75% + ${pt.y}px)`,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="absolute text-xl font-bold z-20 filter drop-shadow-md"
                >
                  {pt.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Detailed Info Column */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col relative">
          
          {/* Heart Favorite Trigger Float placement */}
          <div className="absolute top-0 right-8 -translate-y-1/2 z-20">
            <motion.button
              onClick={handleHeartClick}
              animate={isLiking ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer border-3 ${
                isFavorited
                  ? "bg-[#FF85A2] text-white border-white"
                  : "bg-white text-[#FF85A2] border-[#FFD1DC] hover:text-[#FF85A2]/80"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorited ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </motion.button>
          </div>

          <div className="mb-4">
            <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight flex items-center gap-2">
              {breed.name}
              <span className="text-xl filter grayscale-30 select-none">🐾</span>
            </h1>
            <p className="text-xs font-bold text-[#FF85A2] tracking-wider uppercase mt-1">
              {breed.category === "fluffiest" && "☁️ The Fluffiest!"}
              {breed.category === "pocket-pals" && "🎒 Special Pocket Pal"}
              {breed.category === "gentle-giants" && "🦁 Giant Gentle Sweetie"}
              {breed.category === "energy-bundles" && "⚡ High Energy Bundle"}
              {breed.category === "super-smarties" && "🎓 Intelligent Smarty"}
            </p>
          </div>

          {/* Interactive Information Tabs */}
          <div className="flex bg-[#FDF2F5]/50 p-1 rounded-2xl gap-1 border border-[#FFD1DC]/40 mb-5 relative shrink-0">
            <button
              onClick={() => handleTabChange("temperament")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "temperament"
                  ? "bg-white text-[#FF85A2] shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <span>🎾</span> About Me
            </button>
            <button
              onClick={() => handleTabChange("care")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "care"
                  ? "bg-white text-[#FF85A2] shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <span>🛌</span> Cozy Bed
            </button>
            <button
              onClick={() => handleTabChange("diet")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === "diet"
                  ? "bg-white text-[#FF85A2] shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <span>🍎</span> Yummy Diet
            </button>
          </div>

          {/* Tab Information Panels */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === "temperament" && (
                <motion.div
                  key="temperament"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="bg-white p-4 rounded-2xl border border-[#FFD1DC]/50 shadow-xs">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>💭</span> My Personality
                    </h3>
                    <p className="text-stone-600 text-sm font-medium leading-relaxed">
                      {breed.character.personality}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#E6E6FA]/40 p-3.5 rounded-2xl border border-purple-100/80">
                      <span className="text-xs font-bold text-purple-600 block mb-1">🎮 Playfulness</span>
                      <span className="text-stone-700 text-sm font-semibold">{breed.character.playfulness}</span>
                    </div>
                    <div className="bg-[#CCF5E1]/40 p-3.5 rounded-2xl border border-emerald-100/80">
                      <span className="text-xs font-bold text-emerald-600 block mb-1">👶 Kid Friendly</span>
                      <span className="text-stone-700 text-sm font-semibold">{breed.character.kidFriendly}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "care" && (
                <motion.div
                  key="care"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="bg-white p-4 rounded-2xl border border-[#FFD1DC]/50 shadow-xs flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🛌</span>
                    <div>
                      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5">My Cozy Bedding</h3>
                      <p className="text-stone-600 text-sm font-medium leading-relaxed">
                        {breed.care.bedding}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#FFD1DC]/50 shadow-xs flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🧴</span>
                    <div>
                      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5">Brushing & Grooming</h3>
                      <p className="text-stone-600 text-sm font-medium leading-relaxed">
                        {breed.care.grooming}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#FFD1DC]/50 shadow-xs flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🏡</span>
                    <div>
                      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5">My Ideal Owner</h3>
                      <p className="text-stone-600 text-sm font-medium leading-relaxed">
                        {breed.care.idealOwner}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "diet" && (
                <motion.div
                  key="diet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="bg-white p-5 rounded-2xl border border-[#FFD1DC]/50 shadow-xs flex flex-col items-center text-center space-y-3"
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, repeatDelay: 1 }}
                    className="text-4xl"
                  >
                    🥣
                  </motion.div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">What keeps me healthy</h3>
                    <p className="text-stone-700 text-sm font-medium leading-relaxed max-w-sm">
                      {breed.diet}
                    </p>
                  </div>
                  <div className="bg-amber-50/50 border border-amber-100 text-amber-800 text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                    <span>⚠️</span>
                    <span>Note: Always ask an adult before feeding any dog!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive footer tracker */}
          <div className="mt-6 pt-3 text-center border-t border-dotted border-[#FFD1DC]/60 flex items-center justify-between text-[11px] text-stone-400 shrink-0 font-medium select-none">
            <span>🐾 Tap things to check sound effects!</span>
            <span>Interactions: {interactionCount}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
