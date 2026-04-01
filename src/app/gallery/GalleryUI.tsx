"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Gallery Images Array - 20 unique images
const GALLERY_IMAGES = [
  { id: 1, url: "https://picsum.photos/seed/church1/800/1200", title: "Sunday Worship 1" },
  { id: 2, url: "https://picsum.photos/seed/church2/800/900", title: "Youth Night 1" },
  { id: 3, url: "https://picsum.photos/seed/church3/800/1100", title: "Community Outreach 1" },
  { id: 4, url: "https://picsum.photos/seed/church4/800/950", title: "Choir Performance 1" },
  { id: 5, url: "https://picsum.photos/seed/church5/800/1300", title: "Morning Prayer 1" },
  { id: 6, url: "https://picsum.photos/seed/church6/800/850", title: "Bible Study 1" },
  { id: 7, url: "https://picsum.photos/seed/church7/800/1050", title: "Summer Camp 1" },
  { id: 8, url: "https://picsum.photos/seed/church8/800/1150", title: "Grace Feast 1" },
  { id: 9, url: "https://picsum.photos/seed/church9/800/980", title: "Sunday Worship 2" },
  { id: 10, url: "https://picsum.photos/seed/church10/800/1250", title: "Youth Night 2" },
  { id: 11, url: "https://picsum.photos/seed/church11/800/920", title: "Community Outreach 2" },
  { id: 12, url: "https://picsum.photos/seed/church12/800/1080", title: "Choir Performance 2" },
  { id: 13, url: "https://picsum.photos/seed/church13/800/1350", title: "Morning Prayer 2" },
  { id: 14, url: "https://picsum.photos/seed/church14/800/870", title: "Bible Study 2" },
  { id: 15, url: "https://picsum.photos/seed/church15/800/1120", title: "Summer Camp 2" },
  { id: 16, url: "https://picsum.photos/seed/church16/800/990", title: "Grace Feast 2" },
  { id: 17, url: "https://picsum.photos/seed/church17/800/1180", title: "Sunday Worship 3" },
  { id: 18, url: "https://picsum.photos/seed/church18/800/940", title: "Youth Night 3" },
  { id: 19, url: "https://picsum.photos/seed/church19/800/1280", title: "Community Outreach 3" },
  { id: 20, url: "https://picsum.photos/seed/church20/800/1060", title: "Choir Performance 3" },
];

export default function GalleryUI() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end end"],
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
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-40">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {GALLERY_IMAGES.map((item, index) => (
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

function GalleryCard({ item, index }: { item: { id: number; url: string; title: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? cardRef : undefined,
    offset: ["start end", "end start"],
  });

  // Varying parallax direction for natural feel
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 40 : -40, index % 2 === 0 ? -30 : 30]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative group rounded-3xl overflow-hidden bg-[#1A162E] inline-block w-full break-inside-avoid"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C1E] via-[#0F0C1E]/30 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500 z-10" />

      <img
        src={item.url}
        alt={item.title}
        loading="lazy"
        className="w-full h-auto object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />

      {/* Caption */}
      <div className="absolute bottom-6 left-6 z-20 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-[#F0C060] font-bold text-[8px] uppercase tracking-[0.2em] mb-1">LBC Family</p>
        <h3 className="text-white text-lg font-black uppercase tracking-tight leading-tight">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}