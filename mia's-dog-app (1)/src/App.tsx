import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BREEDS, CATEGORIES, Breed } from "./breedsData";
import { playPopSound, playWoofSound, setSoundEnabled, isSoundEnabled } from "./utils/audio";
import BreedCard from "./components/BreedCard";
import BreedDetailModal from "./components/BreedDetailModal";
import PawTrail from "./components/PawTrail";
import Splash from "./components/Splash";

const getCategoryStyles = (catId: string) => {
  switch (catId) {
    case "fluffiest":
      return "bg-[#CCF5E1] text-[#4A4A4A] border-[#66CFA0] shadow-xs";
    case "pocket-pals":
      return "bg-[#FFD1DC] text-[#4A4A4A] border-[#FF85A2] shadow-xs";
    case "gentle-giants":
      return "bg-[#E6E6FA] text-[#4A4A4A] border-[#B5B5E6] shadow-xs";
    case "energy-bundles":
      return "bg-[#FFE5B4] text-[#4A4A4A] border-[#F2C981] shadow-xs";
    case "super-smarties":
      return "bg-[#FDF2F5] text-[#4A4A4A] border-[#FFA6C9] shadow-xs";
    default:
      return "bg-[#FFD1DC] text-[#4A4A4A] border-[#FF85A2] shadow-xs";
  }
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<"explore" | "pack">("explore");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [soundOn, setSoundOn] = useState(true);

  // Load favorites from local storage on launch
  useEffect(() => {
    const saved = localStorage.getItem("mias_dog_app_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Update sound enabled states
  const handleToggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    setSoundEnabled(nextVal);
    
    // Play sound immediately if toggled on
    if (nextVal) {
      setTimeout(() => {
        playWoofSound("high");
      }, 50);
    }
  };

  const handleToggleFavorite = (breedId: string) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(breedId)) {
        updated = prev.filter((id) => id !== breedId);
      } else {
        updated = [...prev, breedId];
      }
      localStorage.setItem("mias_dog_app_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    playPopSound();
    setSelectedCategory(categoryId);
  };

  const handleTabChange = (tab: "explore" | "pack") => {
    playPopSound();
    setActiveTab(tab);
  };

  // Filter logic
  const filteredBreeds = BREEDS.filter((breed) => {
    // Category match
    const matchesCategory =
      selectedCategory === "all" || breed.category === selectedCategory;

    // Search query match (search name, category titles, or description)
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (!normalizedQuery) return matchesCategory;

    const matchesName = breed.name.toLowerCase().includes(normalizedQuery);
    const matchesPersonality = breed.character.personality
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesDiet = breed.diet.toLowerCase().includes(normalizedQuery);
    const matchesCategoryLabel = CATEGORIES.find((c) => c.id === breed.category)
      ?.label.toLowerCase()
      .includes(normalizedQuery);

    return matchesCategory && (matchesName || matchesPersonality || matchesDiet || matchesCategoryLabel);
  });

  const favoriteBreeds = BREEDS.filter((b) => favorites.includes(b.id));

  // If splash is true, render the launcher layout
  if (showSplash) {
    return <Splash onEnter={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#FFF5F7] via-[#FFFDD0]/30 to-[#E6E6FA]/40 flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden relative font-sans">
      
      {/* Dynamic Background Paw Trail */}
      <PawTrail />

      {/* Decorative floating shapes in background */}
      <div className="absolute top-10 left-5 text-4xl opacity-10 select-none animate-bounce duration-1000">🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-10 select-none animate-bounce duration-700">🎾</div>
      <div className="absolute top-1/4 right-5 text-4xl opacity-10 select-none animate-bounce duration-900">🦴</div>
      <div className="absolute bottom-1/3 left-5 text-4xl opacity-10 select-none animate-bounce duration-800">🧸</div>

      {/* Main Interactive Mobile frame simulator */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        id="app_main_frame"
        className="relative max-w-md w-full h-[90vh] md:h-[780px] bg-[#FAF9F6] rounded-[48px] shadow-2xl border-10 md:border-12 border-[#FFD1DC] flex flex-col overflow-hidden z-20"
      >
        {/* Device Notch simulation design */}
        <div className="absolute top-0 inset-x-0 h-6 bg-[#FFD1DC] rounded-b-2xl pointer-events-none z-30 flex justify-center items-start shrink-0">
          <div className="w-20 h-3 bg-stone-800/20 rounded-full mt-1 flex items-center justify-center gap-1.5 px-2">
            <div className="w-1.5 h-1.5 bg-stone-900/40 rounded-full" />
            <div className="w-8 h-1 bg-stone-900/30 rounded-full" />
          </div>
        </div>

        {/* Dynamic Header */}
        <header className="bg-white pt-9 pb-4 px-5 border-b border-[#FFD1DC]/50 shadow-xs flex flex-row items-center justify-between shrink-0 relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => playWoofSound("high")}>
              <span className="text-xl">🐾</span>
              <h1 className="text-xl font-black text-[#FF85A2] tracking-tight">
                Mia's Dog App
              </h1>
            </div>
            <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-0.5">
              Your Pocket Pet Guide
            </span>
          </div>

          {/* Sound toggle button */}
          <button
            onClick={handleToggleSound}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-sm relative ${
              soundOn
                ? "bg-yellow-50 text-amber-500 border-yellow-200"
                : "bg-stone-50 text-stone-400 border-stone-200"
            }`}
          >
            <span className="text-sm font-bold">{soundOn ? "🔊" : "🔇"}</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              {soundOn && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              )}
            </span>
          </button>
        </header>

        {/* Main Sandbox Interactive Body */}
        <main className="flex-grow overflow-y-auto bg-stone-50/50 p-4 pb-24 relative">
          
          {/* Active TAB Explore */}
          {activeTab === "explore" && (
            <motion.div
              key="explore-tab"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="space-y-4"
            >
              {/* Cute Interactive Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search Pomeranians, Golden Retrievers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-[#FFD1DC] rounded-2xl py-3 pl-11 pr-4 text-xs font-bold font-sans shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FF85A2] focus:border-transparent text-[#4A4A4A] placeholder-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => { playPopSound(); setSearchQuery(""); }}
                    className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600 font-bold text-xs"
                  >
                    ✕
                  </button>
                )}
                <span className="absolute left-4 top-3.5 text-rose-300 select-none pointer-events-none text-sm">🐶</span>
              </div>

              {/* Horizontal Category selector */}
              <div className="relative shrink-0">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x px-0.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`py-2 px-3.5 rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer snap-start shrink-0 border-2 transition-all ${
                        selectedCategory === cat.id
                          ? getCategoryStyles(cat.id)
                          : "bg-white text-[#4A4A4A]/80 border-[#FFD1DC]/40 hover:bg-[#FDF2F5]/50"
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid listings of breeds matching categories */}
              {filteredBreeds.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {filteredBreeds.map((breed) => (
                    <BreedCard
                      key={breed.id}
                      breed={breed}
                      isFavorited={favorites.includes(breed.id)}
                      onSelect={() => setSelectedBreed(breed)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 px-4">
                  <span className="text-4xl filter grayscale">🕵️‍♀️</span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-stone-700 text-sm">No doggies found!</h3>
                    <p className="text-stone-400 text-xs">Try searching for other words or clearing your filter.</p>
                  </div>
                  <button
                    onClick={() => { playPopSound(); setSearchQuery(""); setSelectedCategory("all"); }}
                    className="text-xs bg-pink-100 hover:bg-pink-150 text-rose-500 font-extrabold py-2 px-4 rounded-full border border-pink-200"
                  >
                    Show All Pups ✨
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Active TAB Favorites ("My Pack") */}
          {activeTab === "pack" && (
            <motion.div
              key="pack-tab"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Cute Subheading */}
              <div className="bg-gradient-to-r from-pink-100/60 to-purple-100/60 p-4 rounded-2xl border border-pink-100/50 flex items-center justify-between shadow-xs">
                <div>
                  <h2 className="font-extrabold text-stone-800 text-sm flex items-center gap-1">
                    <span>👑</span> My Selected Pack
                  </h2>
                  <p className="text-[10px] text-stone-500 font-semibold">Your ultimate list of favorite dogs!</p>
                </div>
                <span className="bg-rose-400 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-white shadow-xs">
                  {favorites.length} Pups
                </span>
              </div>

              {/* Grid of favorited items */}
              {favoriteBreeds.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {favoriteBreeds.map((breed) => (
                    <BreedCard
                      key={breed.id}
                      breed={breed}
                      isFavorited={true}
                      onSelect={() => setSelectedBreed(breed)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border-3 border-dashed border-pink-100 p-8 flex flex-col items-center text-center space-y-4 mt-6">
                  {/* Floating heart jumping anim */}
                  <motion.div
                    animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    onClick={() => playWoofSound("high")}
                    className="text-5xl cursor-pointer"
                  >
                    💖
                  </motion.div>
                  
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="font-extrabold text-stone-800 text-base">Your Pack is Empty!</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-semibold">
                      Press the pink hearts on your favorite puppy cards to stack up your very own beautiful dog pack here!
                    </p>
                  </div>

                  <button
                    onClick={() => handleTabChange("explore")}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold text-xs py-2.5 px-6 rounded-full border-b-3 border-pink-500/30 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    🐾 Find a Puppy Friend
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </main>

        {/* Global Bottom Navigation Bar (Dog collar style with gold accents) */}
        <nav className="absolute bottom-0 inset-x-0 h-20 bg-white border-t border-[#FFD1DC]/50 shadow-lg flex items-center justify-around px-6 z-20 shrink-0">
          
          {/* Explore button */}
          <button
            onClick={() => handleTabChange("explore")}
            className="flex flex-col items-center justify-center gap-0.5 relative cursor-pointer"
          >
            <div className="relative">
              <span className={`text-xl transition-all duration-300 block ${
                activeTab === "explore" ? "scale-12 y-[-2px]" : "scale-10 grayscale-30"
              }`}>
                🐾
              </span>
              {activeTab === "explore" && (
                <motion.div
                  layoutId="active-nav-sparkle"
                  className="absolute -top-1 -right-1 text-[8px]"
                >
                  ✨
                </motion.div>
              )}
            </div>
            <span className={`text-xs font-black transition-colors ${
              activeTab === "explore" ? "text-[#FF85A2]" : "text-stone-400"
            }`}>
              Explore Pups
            </span>
            {activeTab === "explore" && (
              <motion.div
                layoutId="active-tab-bar"
                className="absolute bottom-[-8px] w-8 h-1 bg-[#FF85A2] rounded-full"
              />
            )}
          </button>

          {/* My Pack button */}
          <button
            onClick={() => handleTabChange("pack")}
            className="flex flex-col items-center justify-center gap-0.5 relative cursor-pointer"
          >
            <div className="relative">
              <span className={`text-xl transition-all duration-300 block ${
                activeTab === "pack" ? "scale-12 y-[-2px]" : "scale-10 grayscale-30"
              }`}>
                💖
              </span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF85A2] border border-white text-white font-black text-[8px] h-4 w-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className={`text-xs font-black transition-colors ${
              activeTab === "pack" ? "text-[#FF85A2]" : "text-stone-400"
            }`}>
              My Pack
            </span>
            {activeTab === "pack" && (
              <motion.div
                layoutId="active-tab-bar"
                className="absolute bottom-[-8px] w-8 h-1 bg-[#FF85A2] rounded-full"
              />
            )}
          </button>
        </nav>

        {/* Detailed Breed Dialog popup view */}
        <AnimatePresence>
          {selectedBreed && (
            <BreedDetailModal
              breed={selectedBreed}
              isFavorited={favorites.includes(selectedBreed.id)}
              onClose={() => setSelectedBreed(null)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
