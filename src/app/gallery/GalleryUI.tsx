"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Generate 30 unique images with different themes and sizes
const GALLERY_ITEMS = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  // Using different categories and IDs to ensure images look different
  url: `https://picsum.photos/seed/${i + 50}/800/${(i % 3 === 0 ? 1200 : i % 2 === 0 ? 800 : 1000)}`,
  title: [
    "Sunday Worship", "Youth Night", "Community Outreach", "Choir", 
    "Morning Prayer", "Bible Study", "Summer Camp", "Grace Feast"
  ][i % 8] + ` ${Math.floor(i / 8) + 1}`,
}));

export default function GalleryUI() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0F0C1E]" />;
  }

  return (
    <main 
      ref={containerRef} 
      className="relative bg-[#0F0C1E] min-h-screen selection:bg-[#F0C060] overflow-x-hidden"
    >
      {/* --- HERO --- */}
      <section className="h-[60vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <motion.div 
          style={{ y: yParallax }}
          className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"
        />
        <motion.h4 
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.8em" }}
          className="text-[#F0C060] font-black uppercase text-[10px] mb-8 relative z-10"
        >
          Visual Testimony
        </motion.h4>
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-[10vw] font-black text-white leading-none tracking-tighter uppercase relative z-10"
        >
          OUR <span className="text-[#F0C060] italic">TRIBE.</span>
        </motion.h1>
      </section>

      {/* --- MASONRY GRID --- */}
      <section className="max-w-[1600px] mx-auto px-6 pb-40">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-32 bg-[#FDFCF8] rounded-t-[3rem] md:rounded-t-[5rem] text-center px-6">
        <h2 className="text-[#0F0C1E] text-4xl md:text-8xl font-black tracking-tighter leading-none mb-12 uppercase">
          Become part <br /> of the <span className="text-[#F0C060] italic">story.</span>
        </h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#0F0C1E] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl"
        >
          Join a Ministry
        </motion.button>
      </section>
    </main>
  );
}

function GalleryCard({ item, index }: { item: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? cardRef : undefined,
    offset: ["start end", "end start"]
  });

  // Varying speeds based on index to create a "kinetic" feel
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative group rounded-3xl overflow-hidden bg-[#1A162E] inline-block w-full"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C1E] via-[#0F0C1E]/20 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-500 z-10" />
      
      <img 
        src={item.url} 
        alt={item.title}
        loading="lazy"
        className="w-full h-auto object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />

      <div className="absolute bottom-6 left-6 z-20 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-[#F0C060] font-bold text-[8px] uppercase tracking-[0.2em] mb-1">LBC Family</p>
        <h3 className="text-white text-lg font-black uppercase tracking-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
}