import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Breed, CATEGORIES } from "../breedsData";
import { playPopSound, playSparkleSound } from "../utils/audio";

interface BreedCardProps {
  key?: string | number;
  breed: Breed;
  isFavorited: boolean;
  onSelect: () => void;
  onToggleFavorite: (breedId: string) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  emoji: string;
}

export default function BreedCard({ breed, isFavorited, onSelect, onToggleFavorite }: BreedCardProps) {
  const [heartParticles, setHeartParticles] = useState<Particle[]>([]);
  const [isLiking, setIsLiking] = useState(false);

  const categoryObj = CATEGORIES.find((c) => c.id === breed.category);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening detailed modal
    
    const wasFavorited = isFavorited;
    onToggleFavorite(breed.id);

    if (!wasFavorited) {
      // Play sparkle chime
      playSparkleSound();
      setIsLiking(true);
      setTimeout(() => setIsLiking(false), 500);

      // Spawn floating sparkles / hearts
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        // scatter around
        x: (Math.random() - 0.5) * 40,
        y: -10 - Math.random() * 40,
        scale: Math.random() * 0.8 + 0.6,
        emoji: ["💖", "✨", "🌸", "❤️", "🐾"][Math.floor(Math.random() * 5)],
      }));
      setHeartParticles(newParticles);
      
      // Clean up particles
      setTimeout(() => {
        setHeartParticles([]);
      }, 1200);
    } else {
      // Play clean pop
      playPopSound();
    }
  };

  const handleCardClick = () => {
    playPopSound();
    onSelect();
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="bg-white rounded-3xl border-3 border-[#FFD1DC] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col relative"
    >
      {/* Category Indicator Tag */}
      <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-xs py-1 px-3.2 rounded-full text-[11px] font-bold text-[#4A4A4A] shadow-xs flex items-center gap-1 border border-[#FFD1DC]">
        <span>{categoryObj?.emoji}</span>
        <span>{categoryObj?.label}</span>
      </span>

      {/* Heart Button */}
      <div className="absolute top-3 right-3 z-10">
        <motion.button
          onClick={handleHeartClick}
          animate={isLiking ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md select-none transition-all border ${
            isFavorited
              ? "bg-[#FF85A2] text-white border-[#FF85A2]"
              : "bg-white/95 hover:bg-white text-[#FF85A2] border-[#FFD1DC]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorited ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </motion.button>

        {/* Small floating particles on heart click */}
        <AnimatePresence>
          {heartParticles.map((pt) => (
            <motion.span
              key={pt.id}
              initial={{ opacity: 1, scale: 0.1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: pt.scale,
                x: pt.x,
                y: pt.y - 60,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute pointer-events-none text-sm font-bold z-20 left-3 top-3 filter drop-shadow-xs"
            >
              {pt.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Breed Image Container */}
      <div className="relative w-full aspect-4/3 bg-rose-50/50 overflow-hidden border-b-2 border-pink-50">
        <img
          src={breed.images.puppy}
          alt={breed.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/5 to-transparent pointer-events-none" />
      </div>

      {/* Metadata Detail info */}
      <div className="p-4 flex flex-col flex-grow bg-radial from-white to-[#FDF2F5]/15">
        <h2 className="text-xl font-bold text-[#4A4A4A] tracking-tight leading-snug">
          {breed.name}
        </h2>

        {/* Short personality snippet */}
        <p className="text-xs text-[#4A4A4A]/70 font-medium line-clamp-2 mt-1 mb-3.5">
          {breed.character.personality}
        </p>

        {/* Mini Ratings section */}
        <div className="mt-auto space-y-1.5 pt-2 border-t border-dashed border-[#FFD1DC]">
          {/* Fluffiness rating */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#4A4A4A]">
            <span className="flex items-center gap-1">
              <span>☁️</span> Fluffiness:
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] ${
                    idx < breed.fluffinessRating ? "text-[#FF85A2]" : "text-stone-200"
                  }`}
                >
                  ☁️
                </span>
              ))}
            </div>
          </div>

          {/* Playfulness rating */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#4A4A4A]">
            <span className="flex items-center gap-1">
              <span>🦴</span> Playfulness:
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] filter ${
                    idx < breed.playfulnessRating ? "text-[#FF85A2] drop-shadow-xs" : "text-stone-200 grayscale"
                  }`}
                >
                  🎾
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
