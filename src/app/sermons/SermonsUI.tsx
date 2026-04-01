"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const FEATURED_SERIES = [
  { title: "Sovereign", episodes: "8 Parts", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000" },
  { title: "The Basin", episodes: "4 Parts", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1000" },
  { title: "Kingdom", episodes: "12 Parts", img: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1000" },
];

const LATEST_MESSAGES = [
  { id: "01", title: "The Gravity of Grace", speaker: "Lead Pastor", date: "Mar 29", tags: ["Grace", "Faith"] },
  { id: "02", title: "Ancient Paths", speaker: "Associate Pastor", date: "Mar 22", tags: ["History", "Truth"] },
  { id: "03", title: "Quiet Waters", speaker: "Visiting Minister", date: "Mar 15", tags: ["Peace", "Psalms"] },
  { id: "04", title: "The Radical Table", speaker: "Lead Pastor", date: "Mar 08", tags: ["Community"] },
];

export default function SermonsUI() {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) setElement(containerRef.current);
  }, []);

  const { scrollYProgress } = useScroll({
    target: element ? { current: element } : undefined,
    offset: ["start start", "end end"]
  });

  const titleX = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0]);

  return (
    <main ref={containerRef} className="bg-[#0F0C1E] text-white selection:bg-[#F0C060]">
      
      {/* --- HERO: THE LIVE EXPERIENCE --- */}
      <section className="relative h-screen flex flex-col justify-end pb-20 px-6 md:px-20 overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600" 
            className="w-full h-full object-cover grayscale brightness-50" 
            alt="Worship"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C1E] via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10">
          <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#F0C060] font-black uppercase tracking-[0.5em] text-[10px] mb-4">
            Now Streaming
          </motion.h4>
          <motion.h1 style={{ x: titleX }} className="text-[15vw] font-black uppercase leading-[0.8] tracking-tighter">
            WATCH <br /> <span className="text-transparent stroke-text italic">THE WORD.</span>
          </motion.h1>
        </div>
      </section>

      {/* --- HORIZONTAL SERIES SCROLLER --- */}
      <section className="py-20 md:py-40 border-t border-white/5">
        <div className="px-6 md:px-20 mb-12 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Sermon Series</h2>
          <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Scroll →</span>
        </div>
        
        <div className="flex gap-6 overflow-x-auto px-6 md:px-20 no-scrollbar pb-10">
          {FEATURED_SERIES.map((series, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="min-w-[300px] md:min-w-[500px] aspect-[16/10] relative rounded-[2rem] overflow-hidden group flex-shrink-0 cursor-pointer shadow-2xl"
            >
              <img src={series.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={series.title} />
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:opacity-0" />
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-[#F0C060] font-black uppercase tracking-widest text-[10px]">{series.episodes}</p>
                <h3 className="text-4xl font-black uppercase tracking-tighter">{series.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- THE MESSAGE GRID (LATEST) --- */}
      <section className="px-6 md:px-20 py-20 bg-white text-[#0F0C1E] rounded-t-[4rem] md:rounded-t-[10rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            
            {/* Left: Sticky Intro */}
            <div className="md:sticky md:top-40">
              <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter mb-8">
                LATEST <br /> <span className="text-[#F0C060]">MESSAGES.</span>
              </h2>
              <p className="text-gray-500 text-xl font-medium max-w-sm leading-tight uppercase">
                Browse our library of biblical teaching and practical wisdom for modern life.
              </p>
            </div>

            {/* Right: Message List */}
            <div className="space-y-1">
              {LATEST_MESSAGES.map((msg) => (
                <motion.div 
                  key={msg.id}
                  whileHover={{ x: 20 }}
                  className="group border-b border-gray-200 py-10 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex gap-10 items-center">
                    <span className="text-gray-300 font-black text-2xl group-hover:text-[#F0C060] transition-colors">{msg.id}</span>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">{msg.title}</h3>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{msg.speaker} • {msg.date}</p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.2 }} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#0F0C1E] group-hover:text-white transition-all">
                    ▶
                  </motion.div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- PODCAST CTA: THE "IMMERSIVE" SECTION --- */}
      <section className="py-40 px-6 text-center bg-[#0F0C1E]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto border border-white/10 p-12 md:p-24 rounded-[4rem] relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F0C060] rounded-full blur-[120px] opacity-20" />
          
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Take the Word <br /> <span className="text-[#F0C060]">On the Go.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
            Available on Spotify, Apple Podcasts, and Google Podcasts. Subscribe and never miss a message.
          </p>
          <button className="bg-white text-[#0F0C1E] px-16 py-8 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#F0C060] transition-colors">
            Listen on Spotify
          </button>
        </motion.div>
      </section>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px #F0C060;
          color: transparent;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}