"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image: "/images/carouselimg1.jpeg",
    title: "DIVINE GRACE",
    highlight: "LAKESIDE",
    subtitle:
      "Experience an atmosphere of worship and deep spiritual connection.",
    btn: "Our Services",
  },
  {
    image:
      "/images/carouselimg2.jpeg",
    title: "FAITHFUL",
    highlight: "COMMUNITY",
    subtitle:
      "Building stronger families and deeper faith through Jesus Christ.",
    btn: "Learn More",
  },
  {
    image:
      "/images/carouselimg3.jpeg",
    title: "THE NEXT",
    highlight: "GENERATION",
    subtitle: "Empowering our youth to lead with wisdom, courage, and love.",
    btn: "Youth Ministry",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Parallax Zoom Background */}
          <motion.div
            initial={{ scale: 1.3, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 z-10" />

            {/* Background Image */}
            <img
              src={slides[index].image}
              alt="Church"
              className="w-full h-full object-cover brightness-[0.4]"
            />
          </motion.div>

          {/* Text Content Layout */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="text-center"
            >
              <h1 className="text-[12vw] md:text-[10rem] font-display font-black leading-[0.8] text-white tracking-tighter">
                {slides[index].title} <br />
                <span className="text-secondary drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                  {slides[index].highlight}
                </span>
              </h1>

              <motion.p
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.1em", opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-8 text-sm md:text-xl text-white/70 uppercase font-bold tracking-[0.2em] max-w-2xl mx-auto"
              >
                {slides[index].subtitle}
              </motion.p>

              <motion.div
                className="mt-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <button className="group relative bg-white text-primary font-black px-12 py-5 rounded-full overflow-hidden transition-all hover:scale-110">
                  <span className="relative z-10">{slides[index].btn}</span>
                  <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-700 ${i === index ? "w-16 bg-secondary" : "w-6 bg-white/20"}`}
          />
        ))}
      </div>
    </section>
  );
}
