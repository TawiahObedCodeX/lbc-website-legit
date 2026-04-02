"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FEATURED_SERIES = [
  { title: "Sovereign", episodes: "8 Parts", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000" },
  { title: "The Basin", episodes: "4 Parts", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1000" },
  { title: "Kingdom", episodes: "12 Parts", img: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1000" },
];

const LATEST_MESSAGES = [
  {
    id: "01",
    title: "The Gravity of Grace",
    speaker: "Lead Pastor",
    date: "Mar 29",
    duration: "42 min",
    desc: "Understanding the weight and power of grace in everyday life.",
    img: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000",
    tags: ["Grace", "Faith"],
  },
  {
    id: "02",
    title: "Ancient Paths",
    speaker: "Associate Pastor",
    date: "Mar 22",
    duration: "38 min",
    desc: "Rediscovering timeless truths that guide modern living.",
    img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1000",
    tags: ["Truth", "History"],
  },
  {
    id: "03",
    title: "Quiet Waters",
    speaker: "Visiting Minister",
    date: "Mar 15",
    duration: "35 min",
    desc: "Finding peace in God amidst life’s chaos.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000",
    tags: ["Peace", "Psalms"],
  },
  {
    id: "04",
    title: "The Radical Table",
    speaker: "Lead Pastor",
    date: "Mar 08",
    duration: "40 min",
    desc: "A call to authentic community and unity.",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000",
    tags: ["Community"],
  },
];

export default function SermonsUI() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleX = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0]);

  return (
    <main ref={containerRef} className="bg-[#0F0C1E] text-white">

      {/* HERO */}
      <section className="relative h-screen flex items-end pb-20 px-6 md:px-20 overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600"
            className="w-full h-full object-cover brightness-50"
          />
        </motion.div>

        <div className="relative z-10">
          <motion.h1
            style={{ x: titleX }}
            className="text-[14vw] font-black uppercase leading-[0.8]"
          >
            WATCH <br />
            <span className="text-transparent stroke-text italic">
              THE WORD.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* SERIES */}
      <section className="py-24">
        <div className="flex gap-6 overflow-x-auto px-6 md:px-20 no-scrollbar">
          {FEATURED_SERIES.map((series, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="min-w-[280px] md:min-w-[450px] h-[300px] relative rounded-3xl overflow-hidden"
            >
              <img src={series.img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-black">{series.title}</h3>
                <p className="text-sm text-[#F0C060]">{series.episodes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 NEW SERMON CARDS SECTION */}
      <section className="px-6 md:px-20 py-32">
        
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-black uppercase">
            Latest Messages
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Explore powerful teachings, deep revelations, and life-transforming
            messages.
          </p>
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {LATEST_MESSAGES.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
              className="relative group cursor-pointer"
            >
              
              {/* IMAGE */}
              <div className="h-[300px] rounded-3xl overflow-hidden">
                <img
                  src={msg.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-16 left-5 right-5 bg-white text-[#0F0C1E] p-6 rounded-2xl shadow-2xl group-hover:-translate-y-4 transition-all duration-500">
                
                <h3 className="text-2xl font-black mb-2">
                  {msg.title}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  {msg.speaker} • {msg.date} • {msg.duration}
                </p>

                <p className="text-sm mb-4 text-gray-600">
                  {msg.desc}
                </p>

                {/* TAGS */}
                <div className="flex gap-2 flex-wrap">
                  {msg.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-[#F0C060]/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-40 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-6">
          Take The Word Anywhere
        </h2>
        <p className="text-gray-400 mb-10">
          Listen anytime on your favorite platforms.
        </p>
        <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-[#F0C060]">
          Listen Now
        </button>
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