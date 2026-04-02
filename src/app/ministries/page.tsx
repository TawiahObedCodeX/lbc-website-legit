"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const ministries = [
  {
    id: "01",
    name: "Men of Valour",
    tagline: "STRENGTH & HONOR",
    theme: "dark",
    mainDesc: "Our Men's Ministry is a radical brotherhood focused on forging godly character and leadership. We believe that when a man is transformed, a family is saved.",
    details: [
      "Monthly Prayer Breakfasts",
      "Annual Leadership Retreats",
      "Community Mentorship Programs",
      "Technical Skill Workshops"
    ],
    images: [
      "/images/menministries.jpg",
      "/images/menministries2.jpg",
    ]
  },
  {
    id: "02",
    name: "Women of Grace",
    tagline: "VIRTUE & POWER",
    theme: "light",
    mainDesc: "A vibrant community where women flourish. We focus on spiritual growth, emotional healing, and supporting one another through every season of womanhood.",
    details: [
      "Weekly Spirit-Filled Studies",
      "Mothers' Support Network",
      "Annual Women's Conference",
      "Outreach to Local Shelters"
    ],
    images: [
      "/images/womenministries.png",
      "/images/womenministries2.png",
    ]
  },
  {
    id: "03",
    name: "LBC Youth",
    tagline: "FIRE & VISION",
    theme: "dark",
    mainDesc: "The next generation isn't just the future; they are the NOW. We equip teenagers with a biblical foundation to navigate a complex world with fire and vision.",
    details: [
      "Friday Night Live Sessions",
      "Music & Creative Arts Hub",
      "Academic Excellence Coaching",
      "Summer Mission Trips"
    ],
    images: [
      "/images/youthministries.png",
      "/images/serviceyouth.png",
    ]
  },
  {
    id: "04",
    name: "Children's Church",
    tagline: "SEED OF GREATNESS",
    theme: "light", // Set to light if you want it to pop against the dark Youth section
    mainDesc: "Investing eternal seeds in our little ones. Through creative storytelling, music, and interactive play, we ensure every child understands God's love in a way that sticks.",
    details: [
      "Age-Appropriate Bible Classes",
      "Creative Arts & Puppetry",
      "Safe & Secure Check-in System",
      "Annual Vacation Bible School"
    ],
    images: [
      "/images/childministries.png",
      "/images/childrenministries2.png",
    ]
  }
];

function MinistryBlock({ item, index }: { item: typeof ministries[0], index: number }) {
  const isDark = item.theme === "dark";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={ref} 
      style={{ opacity }}
      className={`py-40 px-6 min-h-screen flex items-center ${isDark ? "bg-[#0F0C1E] text-white" : "bg-white text-[#0F0C1E]"}`}
    >
      <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">
        
        {/* --- LEFT: DENSE INFO --- */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h4 className="font-black tracking-[0.5em] text-[10px] text-[#F0C060] uppercase">
              Ministry {item.id} — {item.tagline}
            </h4>
            <h2 className="text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase">
              {item.name}
            </h2>
          </div>

          <p className={`text-2xl md:text-4xl font-medium leading-tight italic ${isDark ? "text-white/60" : "text-[#5C5490]"}`}>
            "{item.mainDesc}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-current/10">
            {item.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#F0C060]" />
                <span className="font-black text-xs uppercase tracking-widest opacity-80">{detail}</span>
              </div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            className={`px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${isDark ? "bg-[#F0C060] text-[#0F0C1E]" : "bg-[#0F0C1E] text-white"}`}
          >
            Join This Ministry
          </motion.button>
        </div>

        {/* --- RIGHT: MASONRY IMAGES --- */}
        <div className="relative h-[800px] hidden md:block">
          <motion.div style={{ y: yImage }} className="absolute top-0 right-0 w-2/3 h-2/3 z-10">
            <img src={item.images[0]} className="w-full h-full object-cover rounded-[4rem] shadow-2xl border-8 border-current/5" />
          </motion.div>
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute bottom-10 left-0 w-1/2 h-1/2 z-20">
            <img src={item.images[1]} className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-[#F0C060]" />
          </motion.div>
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 opacity-20 blur-2xl bg-[#F0C060] rounded-full" />
        </div>
      </div>
    </motion.section>
  );
}

export default function MinistriesPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0F0C1E]" />;

  return (
    <main className="selection:bg-[#F0C060] selection:text-[#0F0C1E]">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#F0C060] z-50 origin-[0%]" style={{ scaleX }} />

      {/* --- CATCHY INTRO --- */}
      <section className="h-[90vh] bg-[#0F0C1E] flex flex-col justify-center px-6 md:px-20 overflow-hidden relative">  
        <motion.h4 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#F0C060] font-black uppercase tracking-[0.8em] text-[10px] mb-12"
        >
          Community & Growth
        </motion.h4>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl md:text-[14rem] font-black text-white leading-[0.75] tracking-tighter uppercase"
        >
          EVERY <br /> <span className="text-[#F0C060] italic">GENERATION.</span>
        </motion.h1>
      </section>

      {/* --- ALTERNATING BLOCKS --- */}
      <div className="relative">
        {ministries.map((item, index) => (
          <MinistryBlock key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* --- CATCHY OUTRO (WHITE BG) --- */}
      <section className="py-60 bg-white text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="text-[#0F0C1E] text-5xl md:text-[10rem] font-black tracking-tighter leading-none mb-12 uppercase">
            Start Your <br /><span className="text-[#F0C060] italic">Journey.</span>
          </h2>
          <p className="text-2xl md:text-4xl text-[#5C5490] font-medium tracking-tight mb-20 max-w-3xl mx-auto">
            Lakeside isn't just a place to visit; it's a home to belong.
          </p>
          <button className="bg-[#0F0C1E] text-white px-20 py-8 rounded-full font-black text-xs uppercase tracking-[0.5em] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] hover:bg-[#F0C060] hover:text-[#0F0C1E] transition-all">
            Get Connected
          </button>
        </motion.div>
      </section>
    </main>
  );
}