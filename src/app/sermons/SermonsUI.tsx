"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const SERMONS = [
  {
    title: "The Gravity of Grace",
    speaker: "Lead Pastor",
    date: "Mar 29",
    duration: "42 mins",
    desc: "Discover how grace reshapes your life and brings true transformation through faith.",
    img: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200",
    category: "Theology"
  },
  {
    title: "Ancient Paths",
    speaker: "Associate Pastor",
    date: "Mar 22",
    duration: "38 mins",
    desc: "Returning to timeless truths that anchor our modern lives in an ever-changing world.",
    img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1200",
    category: "Wisdom"
  },
  {
    title: "Quiet Waters",
    speaker: "Guest Minister",
    date: "Mar 15",
    duration: "35 mins",
    desc: "Finding peace and rest in God’s presence during life's most turbulent seasons.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    category: "Mental Health"
  },
  {
    title: "The Radical Table",
    speaker: "Lead Pastor",
    date: "Mar 08",
    duration: "40 mins",
    desc: "A call to authentic community, radical hospitality, and unconditional love.",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200",
    category: "Community"
  },
];

export default function SermonsUI() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-x-hidden font-sans">
      
      {/* --- CATCHY HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600" 
            className="w-full h-full object-cover scale-110"
            alt="Hero Background"
          />
        </motion.div>

        <div className="relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#F0C060] uppercase tracking-[0.4em] font-bold text-xs md:text-sm">
              Lakeside Media Archive
            </span>
            <h1 className="text-[14vw] md:text-[9rem] font-black leading-none tracking-tighter mt-4 mb-8">
              WATCH <br /> <span className="text-outline text-transparent">THE WORD</span>
            </h1>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#F0C060] transition-colors"
            >
              Start Streaming
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- THE SERMON FEED (WELL ARRANGED CARDS) --- */}
      <section className="relative z-30 py-24 md:py-40 bg-white text-black rounded-t-[3rem] md:rounded-t-[6rem]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                Recent <br /> <span className="text-gray-300">Teachings.</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-[280px] text-sm uppercase tracking-widest">
              Browse our latest sermons from the Lakeside platform.
            </p>
          </div>

          {/* MASONRY-INSPIRED GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
            {SERMONS.map((sermon, i) => (
              <SermonCard key={i} sermon={sermon} index={i} />
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
        @media (min-width: 768px) {
          .text-outline { -webkit-text-stroke: 3px black; }
        }
      `}</style>
    </div>
  );
}

function SermonCard({ sermon, index }: { sermon: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Alternate grid spans for "Catchy" layout
  const gridClasses = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`${gridClasses[index % 4]} group cursor-pointer`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-gray-100">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={sermon.img}
          className="w-full h-full object-cover"
          alt={sermon.title}
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {sermon.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-20 h-20 bg-[#F0C060] rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
             <span className="text-black text-2xl ml-1">▶</span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3 text-[10px] font-bold text-black uppercase tracking-[0.2em]">
          <span>{sermon.date}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{sermon.duration}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase group-hover:text-[#F0C060] transition-colors">
          {sermon.title}
        </h3>
        <p className=" font-medium text-sm md:text-base leading-relaxed max-w-md">
          {sermon.desc}
        </p>
        <div className="pt-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold">
            {sermon.speaker[0]}
          </div>
          <span className="text-xs font-black uppercase tracking-widest">{sermon.speaker}</span>
        </div>
      </div>
    </motion.div>
  );
}