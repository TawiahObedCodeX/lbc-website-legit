"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const menu = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Ministers", href: "/ministers" },
    { label: "Services", href: "/services" },
    { label: "GIVE NOW", href: "/donation", highlight: true },
  ];

  return (
    <footer className="relative bg-[#0F0C1E] pt-32 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* --- KINETIC BACKGROUND --- */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* --- LEFT: THE STATEMENT --- */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-6">Connect with us</h4>
              <h2 className="text-[12vw] lg:text-[9rem] font-display font-black text-white leading-[0.8] tracking-tighter group cursor-default">
                GO <span className="text-transparent stroke-text italic group-hover:text-secondary transition-all duration-700">BEYOND</span> <br />
                THE WALLS.
              </h2>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              {["Instagram", "YouTube", "Facebook", "Twitter"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -5, color: "#F0C060" }}
                  className="text-white/40 font-black tracking-widest text-xs uppercase border border-white/10 px-6 py-3 rounded-full hover:border-secondary transition-all"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- RIGHT: THE BENTO INFO CARD --- */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[4rem] relative overflow-hidden group"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-[4rem] group-hover:bg-secondary/20 transition-all" />
              
              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-secondary font-black tracking-widest text-xs uppercase">The Sanctuary</h3>
                  <p className="text-2xl md:text-3xl text-white font-bold leading-tight">
                    123 Lakeside Drive, <br />
                    Accra, Ghana.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-secondary font-black tracking-widest text-xs uppercase">Service Times</h3>
                  <p className="text-white/60 text-lg">
                    Sundays: 8:00 AM — 11:30 AM <br />
                    Wednesdays: 6:00 PM — 8:00 PM
                  </p>
                </div>

                <Link 
                  href="/contact" 
                  className="inline-block bg-white text-primary px-10 py-5 rounded-full font-black tracking-widest text-sm hover:bg-secondary transition-all"
                >
                  GET DIRECTIONS
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- LINKS NAVIGATION GRID --- */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-white/10 pt-16">
          {menu.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all ${
                item.highlight ? "text-secondary hover:text-white" : "text-white/30 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* --- FINAL STRIP --- */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center opacity-30 text-[9px] font-black tracking-[0.3em] uppercase text-white gap-6">
          <p>© {currentYear} LAKESIDE BAPTIST CHURCH. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-secondary cursor-pointer">Privacy</span>
            <span className="hover:text-secondary cursor-pointer">Terms</span>
            <span className="hover:text-secondary cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>

      {/* Global CSS for the stroke effect */}
      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </footer>
  );
}