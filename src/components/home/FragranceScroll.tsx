"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const TOTAL_FRAMES = 240;

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
    <div ref={containerRef} dir={dir} className="relative h-[500vh] bg-[#0a0a0a]">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[600] flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mb-8 rounded-full border-2 border-[var(--gold)]/20 flex items-center justify-center"
            >
              <span className="text-[var(--gold)] text-4xl font-bold font-outfit">Y</span>
            </motion.div>
            <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gold-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="mt-6 font-outfit text-white/30 text-[9px] tracking-[0.3em] uppercase font-bold">
              {t("common.loading")} {Math.round(loadProgress)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
        <canvas ref={canvasRef} className="w-full h-full object-contain mix-blend-screen opacity-90" />
        
        {/* Ambient Light Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--gold)]/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--gold)]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6">
          {/* Section 1: The Essence */}
          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.1, 0.25], [0, 1, 0]),
              y: useTransform(smoothProgress, [0, 0.25], [50, -50]),
              filter: useTransform(smoothProgress, [0, 0.1, 0.25], ["blur(10px)", "blur(0px)", "blur(10px)"])
            }}
            className="text-center"
          >
            <h1 className="text-gold-gradient font-playfair text-6xl md:text-[9rem] mb-6 leading-none tracking-tight">
              {t("hero.title1")}
            </h1>
            <p className="text-white/40 text-[10px] md:text-sm uppercase tracking-[0.6em] font-bold">
              {t("hero.subtitle1")}
            </p>
          </motion.div>

          {/* Section 2: Craftsmanship */}
          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0.4, 0.5, 0.65], [0, 1, 0]),
              scale: useTransform(smoothProgress, [0.4, 0.65], [0.85, 1.1]),
              filter: useTransform(smoothProgress, [0.4, 0.5, 0.65], ["blur(10px)", "blur(0px)", "blur(10px)"])
            }}
            className="text-center"
          >
            <h2 className="text-white font-playfair text-5xl md:text-[7rem] mb-6 leading-none italic">
              {t("hero.title2")}
            </h2>
            <p className="text-[var(--gold)]/50 text-[10px] md:text-sm uppercase tracking-[0.6em] font-bold">
              {t("hero.subtitle2")}
            </p>
          </motion.div>

          {/* Section 3: Call to Action */}
          <motion.div
            style={{ 
              opacity: useTransform(smoothProgress, [0.8, 0.95, 1], [0, 1, 1]),
              y: useTransform(smoothProgress, [0.8, 1], [50, 0]),
            }}
            className="text-center"
          >
            <h2 className="text-gold-gradient font-playfair text-5xl md:text-[8rem] mb-12 leading-none">
              {t("hero.title3")}
            </h2>
            <Link href="/store" className="pointer-events-auto inline-block group">
              <div className="relative p-[1px] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gold-gradient animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '3s' }} />
                <div className="relative bg-[#0a0a0a] px-16 py-5 rounded-full transition-all group-hover:bg-transparent">
                  <span className="text-white group-hover:text-black font-black text-xs uppercase tracking-[0.3em] transition-colors">
                    {t("hero.cta")}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0.5, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 80] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-white shadow-[0_0_10px_#fff]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
