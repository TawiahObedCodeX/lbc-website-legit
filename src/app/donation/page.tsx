"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const DonationForm = dynamic(() => import("@/components/DonationForm"), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center text-black font-black animate-pulse uppercase tracking-widest text-xs">Initializing Secure Portal...</div>,
});

function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="relative h-[85vh] flex flex-col items-center justify-center px-6 z-10 overflow-hidden">
      <motion.div style={{ opacity, y }} className="text-center">
        <span className="inline-block px-4 py-1 rounded-full border border-[#F0C060]/30 text-[#F0C060] text-[10px] font-black uppercase tracking-[0.4em] mb-8 bg-[#F0C060]/5 backdrop-blur-md">
          Stewardship & Excellence
        </span>
        <h1 className="text-7xl md:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase mb-6">
          FAITHFUL <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0C060] to-yellow-200">GIVING.</span>
        </h1>
        <p className="max-w-xl mx-auto text-white/40 text-lg md:text-xl font-light">
          Your generosity fuels our mission to spread the Gospel and serve the Lakeside community.
        </p>
      </motion.div>
    </section>
  );
}

export default function DonatePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-[#06040d]" />;

  return (
    <main className="relative min-h-screen bg-[#06040d] text-white overflow-x-hidden selection:bg-[#F0C060] selection:text-black">
      
      {/* --- HERO --- */}
      <HeroSection />

      {/* --- WHITE CONTENT SECTION --- */}
      <section className="relative z-20 bg-[#FDFCF8] text-[#0F0C1E] rounded-t-[4rem] md:rounded-t-[8rem] pb-32">
        
        {/* --- FORM CONTAINER --- */}
        <div className="relative -top-24 md:-top-40 z-30">
          <DonationForm />
        </div>

        {/* --- WHY WE GIVE (Content) --- */}
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h4 className="text-[#F0C060] font-black uppercase tracking-[0.3em] text-xs">Our Purpose</h4>
              <h2 className="text-5xl md:text-7xl font-black leading-none uppercase">
                YOUR GIFT, <br />HIS <span className="italic text-[#F0C060]">GLORY.</span>
              </h2>
              <p className="text-xl text-black/60 leading-relaxed font-medium">
                At Lakeside Baptist Church, we believe giving is an act of worship. Your contributions support local outreaches, global missions, and the nurturing of a Christ-centered community.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h3 className="text-4xl font-black text-[#0F0C1E]">100%</h3>
                  <p className="text-sm font-bold text-black/40 uppercase tracking-widest">Transparency</p>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#0F0C1E]">24/7</h3>
                  <p className="text-sm font-bold text-black/40 uppercase tracking-widest">Global Support</p>
                </div>
              </div>
            </motion.div>

            {/* IMPACT IMAGE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070" 
                alt="Church Community" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C1E]/60 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white/80 font-bold italic text-lg leading-tight">
                  "Generosity is the most natural outward expression of an inner attitude of faith."
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- WAYS TO GIVE (Cards) --- */}
        <div className="max-w-7xl mx-auto px-6 mt-40">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase">Channels of Blessing</h2>
              <div className="h-1.5 w-20 bg-[#F0C060] mx-auto mt-4 rounded-full" />
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { t: "Tithes", d: "The first tenth of our increase, returned to God in gratitude.", i: "⛪" },
                { t: "Offerings", d: "Freewill gifts above the tithe to support special projects.", i: "🎁" },
                { t: "Missions", d: "Direct support for our missionaries spreading the Gospel globally.", i: "🌍" }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 bg-white border border-black/5 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="text-5xl mb-6">{card.i}</div>
                  <h3 className="text-2xl font-black mb-4 uppercase">{card.t}</h3>
                  <p className="text-black/50 font-medium leading-relaxed">{card.d}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <footer className="bg-white py-20 text-center border-t border-black/5">
        <p className="text-black/20 text-[10px] font-black tracking-[0.5em] uppercase">
          Lakeside Baptist Church • © 2026
        </p>
      </footer>
    </main>
  );
}