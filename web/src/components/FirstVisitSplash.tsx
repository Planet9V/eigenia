"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const FirstVisitSplash: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already seen splash during this browser session
    const hasSeen = sessionStorage.getItem("eigenia_splash_seen");
    if (hasSeen) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      // Auto-dismiss after 3.4 seconds
      const timer = setTimeout(() => {
        dismissSplash();
      }, 3400);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissSplash = () => {
    sessionStorage.setItem("eigenia_splash_seen", "true");
    setIsVisible(false);
    onComplete?.();
  };

  // Keyboard shortcut to skip intro immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        dismissSplash();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isVisible === false || isVisible === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="eigenia-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismissSplash}
          className="fixed inset-0 z-[100] bg-[#0b0c0e] flex items-center justify-center cursor-pointer overflow-hidden select-none"
          role="dialog"
          aria-label="Eigenia Entrance Sequence"
        >
          {/* Atmospheric Background Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image
              src="https://eigenia.nl/assets/Eigenia_2.png"
              alt="Eigenia Digital Twin Field"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/60 to-[#0b0c0e]" />
          </motion.div>

          {/* Center Brand & Mission Card */}
          <div className="relative z-10 max-w-2xl px-6 text-center space-y-6">
            {/* Spread-out Typography Logo */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="space-y-1.5"
            >
              <span className="font-sans font-bold text-lg sm:text-2xl lg:text-3xl tracking-[0.3em] uppercase text-white inline-block">
                E I G E N I A &nbsp; B.V.
              </span>
              <span className="block font-mono text-[10px] sm:text-xs tracking-[0.25em] text-dutchOrange uppercase pt-1 font-medium">
                Applied Complexity Science Think Tank & Labs
              </span>
            </motion.div>

            {/* Sovereign Mission Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
              className="font-sans text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-lg mx-auto"
            >
              Securing clean water, healthy food, and sustainable energy through open scientific research and physical digital twins.
            </motion.p>

            {/* Tap / Press Any Key Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="pt-4 font-mono text-[10px] text-zinc-500 tracking-widest uppercase"
            >
              [ Tap anywhere or press Esc to enter ]
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
