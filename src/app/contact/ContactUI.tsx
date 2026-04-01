"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiArrowRight } from "react-icons/fi";

export default function ContactUI() {
  const [mounted, setMounted] = useState(false);
  const [activeIntent, setActiveIntent] = useState("General");
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const intents = ["General", "Prayer Request", "Membership", "Counseling"];

  return (
    <main ref={containerRef} className="bg-background min-h-screen selection:bg-[#F0C060] overflow-x-hidden">
      
      {/* --- CATCHY HERO --- */}
      <section className="min-h-[70vh] bg-[#0F0C1E] flex flex-col justify-center px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 text-white/2 text-[25vw] md:text-[35vw] lg:text-[45vw] font-black italic whitespace-nowrap leading-none select-none pointer-events-none"
        >
          CONTACT LBC
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#F0C060] font-black uppercase tracking-[1em] text-[10px] mb-8 md:mb-12"
          >
            Lakeside Community Baptist Church
          </motion.h4>
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-black text-white leading-[0.85] tracking-tighter uppercase"
          >
            LET'S <br /> 
            <span className="text-[#F0C060] italic underline decoration-white/10">TALK.</span>
          </motion.h1>
        </div>
      </section>

      {/* --- INTERACTIVE SPLIT SECTION --- */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: INFO PANEL - Stacks on mobile, sticky on lg+ */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#0F0C1E] uppercase tracking-tighter leading-tight">
                We are <br /> 
                <span className="text-[#F0C060]">Ready</span> to Listen.
              </h2>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <FiMapPin />, 
                    label: "Location", 
                    val: "Lakeside Estate, Community 5, Accra", 
                    sub: "Open for Sunday Service: 8:00 AM" 
                  },
                  { 
                    icon: <FiPhone />, 
                    label: "Call Us", 
                    val: "+233 [0] 00 000 0000", 
                    sub: "Mon - Fri, 9am - 5pm" 
                  },
                  { 
                    icon: <FiMail />, 
                    label: "Email", 
                    val: "hello@lakesidebaptist.com", 
                    sub: "We reply within 24 hours" 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-6 p-6 md:p-8 bg-white rounded-[2.5rem] shadow-xl border border-black/5 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#0F0C1E] text-[#F0C060] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[10px] font-black uppercase text-black/30 tracking-widest">{item.label}</h5>
                      <p className="font-black text-[#0F0C1E] text-lg leading-tight wrap-break-word">{item.val}</p>
                      <p className="text-xs text-[#5C5490] italic mt-1">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FORM SECTION */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-black/5"
            >
              <div className="space-y-12 md:space-y-16">
                {/* Intent Toggle */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-black/40">I am reaching out for...</h3>
                  <div className="flex flex-wrap gap-3">
                    {intents.map((intent) => (
                      <button
                        key={intent}
                        onClick={() => setActiveIntent(intent)}
                        className={`px-6 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                          activeIntent === intent 
                          ? "bg-[#F0C060] text-[#0F0C1E] shadow-lg scale-105" 
                          : "bg-background text-black/40 border border-black/5 hover:border-[#F0C060] hover:text-black/70"
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="group relative">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full bg-background border-none rounded-3xl p-7 md:p-8 font-bold outline-none focus:ring-4 focus:ring-[#F0C060]/20 transition-all text-[#0F0C1E] text-base" 
                      />
                    </div>
                    <div className="group relative">
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-background border-none rounded-3xl p-7 md:p-8 font-bold outline-none focus:ring-4 focus:ring-[#F0C060]/20 transition-all text-[#0F0C1E] text-base" 
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea 
                      rows={7} 
                      placeholder="Write your message here..." 
                      className="w-full bg-background border-none rounded-[3rem] p-7 md:p-10 font-bold outline-none focus:ring-4 focus:ring-[#F0C060]/20 transition-all text-[#0F0C1E] resize-y min-h-[180px]" 
                    />
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#0F0C1E] text-white py-8 md:py-10 rounded-[3rem] font-black text-xs uppercase tracking-[0.6em] shadow-2xl flex items-center justify-center gap-4 hover:bg-[#F0C060] hover:text-[#0F0C1E] transition-all active:scale-95"
                  >
                    Send Message <FiSend className="text-xl" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- THE CINEMATIC MAP --- */}
      <section className="py-20 md:py-32 lg:py-40 px-6 bg-[#0F0C1E] rounded-t-[3rem] md:rounded-t-[5rem] -mt-8 md:-mt-10">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-white text-4xl md:text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
              Visit us in <br /> 
              <span className="text-[#F0C060] italic">Lakeside.</span>
            </h2>
            <p className="text-white/60 font-medium text-lg md:text-xl max-w-2xl mx-auto italic px-4">
              Located in the heart of Lakeside Estate, Community 5. A sanctuary for all seekers.
            </p>
          </div>

          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-4 md:border-8 border-white/10">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.0!2d-0.1!3d5.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDInMDAuMCJOIDDCsDA2JzAwLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="grayscale invert brightness-75 contrast-125"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2.5rem] md:rounded-[4rem]" />
          </div>
        </div>
      </section>
    </main>
  );
}