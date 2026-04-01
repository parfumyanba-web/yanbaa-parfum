"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const TOTAL_FRAMES = 237;

export default function FragranceScroll() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload images with progressive loading
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      // First pass: Preload a low-res subset or priority frames if needed
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i}.jpg`;
        img.onload = () => {
          loadedCount++;
          setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
          if (loadedCount === TOTAL_FRAMES) {
            setIsLoading(false);
          }
        };
        loadedImages[i] = img;
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, []);

  // Draw to canvas
  useEffect(() => {
    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx && images[index]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      drawFrame(Math.round(latest));
    });

    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        drawFrame(Math.round(frameIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} dir={dir} className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
          <motion.h2 className="font-playfair text-3xl mb-8 uppercase tracking-[0.2em]"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F0D060, #A88820)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ينبع للعطور
          </motion.h2>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#D4AF37]"
              initial={{ width: 0 }}
              animate={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-4 font-inter text-white/40 text-[10px] tracking-widest uppercase">
            {t("common.loading")} {Math.round(loadProgress)}%
          </span>
        </div>
      )}

      {/* Sticky Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
        
        {/* Animated Overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.1, 0.2], [0, 1, 0]),
              y: useTransform(smoothProgress, [0, 0.2], [40, 0])
            }}
            className="text-center"
          >
            <h1 className="font-playfair text-5xl md:text-8xl text-[#D4AF37] mb-4 tracking-tight">
              {t("hero.title1")}
            </h1>
            <p className="text-white/40 text-xs uppercase tracking-[0.5em]">
              {t("hero.subtitle1")}
            </p>
          </motion.div>

          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
              scale: useTransform(smoothProgress, [0.4, 0.6], [0.9, 1.1])
            }}
            className="text-center"
          >
            <h2 className="font-playfair text-4xl md:text-7xl text-white mb-4 drop-shadow-lg">
              {t("hero.title2")}
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-[0.5em]">
              {t("hero.subtitle2")}
            </p>
          </motion.div>

          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1]),
              y: useTransform(smoothProgress, [0.8, 1], [40, 0])
            }}
            className="text-center"
          >
            <h2 className="font-playfair text-4xl md:text-7xl text-[#D4AF37] mb-8">
              {t("hero.title3")}
            </h2>
            <a href="/store" className="pointer-events-auto px-12 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold inline-block">
              {t("hero.cta")}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
