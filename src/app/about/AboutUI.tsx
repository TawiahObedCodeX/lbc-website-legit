"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ABOUT_DATA = [
  {
    title: "BEHOLD",
    subtitle: "The Vision",
    description: "We see a church that is a lighthouse—a place where the broken find healing and the searching find truth. Our vision is to be the hands and feet of Jesus in a world that needs hope.",
    img: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1200",
    color: "#0F0C1E"
  },
  {
    title: "BECOME",
    subtitle: "The Journey",
    description: "Discipleship isn't a program; it's a transformation. We walk together, learning to live like Christ in our homes, our workplaces, and our city.",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200",
    color: "#161229"
  },
  {
    title: "BELONG",
    subtitle: "The Family",
    description: "You weren't meant to do life alone. Lakeside is a tribe of believers from all walks of life, united by one love and one Spirit.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200",
    color: "#0A0814"
  }
];

export default function AboutUI() {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) setElement(containerRef.current);
  }, []);

  const { scrollYProgress } = useScroll({
    target: element ? { current: element } : undefined,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Hero Parallax
  const heroScale = useTransform(smoothScroll, [0, 0.2], [1, 1.5]);
  const heroOpacity = useTransform(smoothScroll, [0, 0.15], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#0F0C1E] text-white selection:bg-[#F0C060]">
      
      {/* --- SECTION 1: THE CINEMATIC HERO --- */}
      <section className="relative h-[150vh] flex items-start justify-center pt-[20vh] overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="fixed inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0F0C1E] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1600" 
            className="w-full h-full object-cover grayscale-[40%]" 
            alt="Hero"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#F0C060] font-black uppercase tracking-[0.5em] text-[10px] mb-4"
          >
            Est. 1984 — Lakeside Community
          </motion.p>
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-[18vw] font-black leading-none tracking-tighter uppercase italic text-white/10 stroke-text"
          >
            LEGACY
          </motion.h1>
          <motion.h2 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-[10vw] font-black leading-none uppercase tracking-tighter -mt-[5vw]"
          >
            OF <span className="text-[#F0C060]">FAITH.</span>
          </motion.h2>
        </div>
      </section>

      {/* --- SECTION 2: THE REVEAL STACK --- */}
      <div className="relative z-30">
        {ABOUT_DATA.map((block, i) => (
          <ScrollBlock key={i} block={block} index={i} />
        ))}
      </div>

      {/* --- SECTION 3: MASSIVE IMPACT GALLERY --- */}
      <section className="py-40 bg-white rounded-t-[4rem] md:rounded-t-[10rem] px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-center">
                <div className="w-full md:w-1/3">
                    <h3 className="text-[#0F0C1E] text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
                        The <br /> <span className="text-[#F0C060]">Tribe.</span>
                    </h3>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        We aren't just a congregation; we are a collective of stories, 
                        brought together by a single truth. Explore the faces and 
                        places that make Lakeside a home.
                    </p>
                </div>
                
                <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                        <motion.div 
                            key={num}
                            whileHover={{ scale: 0.98, rotate: num % 2 === 0 ? 1 : -1 }}
                            className="h-[30vh] md:h-[50vh] rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl"
                        >
                            <img src={`https://picsum.photos/seed/church${num+20}/800/1000`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Gallery" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 4: THE ULTRA-MODERN CTA --- */}
      <section className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-6 text-center">
        <div className="max-w-5xl">
            <motion.h2 
                whileInView={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }}
                className="text-[#0F0C1E] text-7xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.85] mb-12"
            >
                Ready to <br /> <span className="italic text-[#F0C060]">Step in?</span>
            </motion.h2>
            <motion.button 
                whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
                className="bg-[#0F0C1E] text-white px-20 py-10 rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl"
            >
                Plan Your Visit
            </motion.button>
        </div>
      </section>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </main>
  );
}

function ScrollBlock({ block, index }: { block: any, index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden border-t border-white/5" style={{ backgroundColor: block.color }}>
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                
                <div className={index % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                    <motion.span style={{ y: -20 }} className="text-[#F0C060] font-black uppercase tracking-widest text-xs mb-4 block">
                        {block.subtitle}
                    </motion.span>
                    <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
                        {block.title}
                    </h2>
                    <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed max-w-lg">
                        {block.description}
                    </p>
                </div>

                <motion.div 
                    style={{ y }}
                    className={`relative aspect-[4/5] md:aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl ${index % 2 === 0 ? "order-2" : "order-2 md:order-1"}`}
                >
                    <motion.img 
                        style={{ scale: imgScale }}
                        src={block.img} 
                        className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-700" 
                        alt={block.title}
                    />
                </motion.div>

            </div>
            
            {/* Background floating text */}
            <h3 className="absolute -bottom-10 -right-10 text-[30vw] font-black text-white/[0.03] select-none uppercase leading-none z-0">
                {block.title}
            </h3>
        </section>
    );
}