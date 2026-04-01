"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary links shown directly in the nav bar
  const primaryItems = ["Home", "About", "Services", "Blog"];

  // Secondary links hidden under "More" dropdown
  const moreItems = ["Ministries", "Gallery", "Contact","Sermons"];

  // All items combined (for mobile full-screen menu)
  const allItems = [...primaryItems, ...moreItems, "Donation"];

  const getHref = (item: string) =>
    item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;

  const isActive = (item: string) => {
    const href = getHref(item);
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isMoreActive = moreItems.some((item) => isActive(item));

  return (
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F0C1E]/85 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-b border-white/10"
          : "bg-transparent py-5 sm:py-6 lg:py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* --- LOGO SECTION --- */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 lg:gap-4 group shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
            className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-linear-to-br from-secondary to-[#8a6d3b] rounded-xl sm:rounded-2xl flex items-center justify-center p-1.5 sm:p-2 shadow-[0_0_20px_rgba(197,160,89,0.4)] border border-white/20"
          >
            <img
              src="https://i.pinimg.com/1200x/c0/d1/e1/c0d1e14223a03cf6209e66d284ab6bf2.jpg"
              alt="LBC Logo"
              className="w-full h-full object-contain rounded-lg"
            />
          </motion.div>

          <div className="flex flex-col leading-[0.9]">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tighter group-hover:text-secondary transition-colors">
              LAKESIDE
            </span>
            <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-secondary font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">
              Baptist Church
            </span>
          </div>
        </Link>

        {/* --- DESKTOP MENU (lg and above) --- */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <div className="flex items-center gap-1 xl:gap-2 bg-white/5 px-4 xl:px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">

            {/* Primary nav links */}
            {primaryItems.map((item, i) => {
              const active = isActive(item);
              return (
                <motion.div
                  key={item}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={getHref(item)}
                    className={`relative px-2 xl:px-3 py-1.5 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-[0.15em] xl:tracking-[0.2em] transition-all group ${
                      active
                        ? "text-primary bg-secondary shadow-[0_0_12px_rgba(197,160,89,0.4)]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item}
                    {!active && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all group-hover:w-4/5 rounded-full" />
                    )}
                    {active && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-full bg-secondary -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {/* "More" Dropdown */}
            <motion.div
              ref={dropdownRef}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: primaryItems.length * 0.08 }}
              className="relative"
            >
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`relative flex items-center gap-1 px-2 xl:px-3 py-1.5 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-[0.15em] xl:tracking-[0.2em] transition-all ${
                  isMoreActive
                    ? "text-primary bg-secondary shadow-[0_0_12px_rgba(197,160,89,0.4)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                More
                <motion.svg
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-[#0F0C1E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                  >
                    {/* Decorative top accent */}
                    <div className="h-0.5 w-full bg-linear-to-r from-transparent via-secondary to-transparent" />

                    <div className="py-2 px-2">
                      {moreItems.map((item) => {
                        const active = isActive(item);
                        return (
                          <Link
                            key={item}
                            href={getHref(item)}
                            onClick={() => setDropdownOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[10px] xl:text-[11px] font-black uppercase tracking-[0.15em] transition-all group ${
                              active
                                ? "text-primary bg-secondary"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            )}
                            {!active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 shrink-0 group-hover:bg-secondary transition-colors" />
                            )}
                            {item}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/donation"
              className="bg-secondary text-primary px-6 xl:px-8 py-3 xl:py-4 rounded-full font-black text-[10px] xl:text-xs tracking-widest shadow-[0_10px_20px_rgba(197,160,89,0.3)] hover:bg-white transition-all whitespace-nowrap"
            >
              GIVE NOW
            </Link>
          </motion.div>
        </div>

        {/* --- TABLET MENU (md to lg) --- */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 px-3 py-2 rounded-full border border-white/10 backdrop-blur-md">
            {["Home", "About", "Services", "Blog"].map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item}
                  href={getHref(item)}
                  className={`relative px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.12em] transition-all ${
                    active
                      ? "text-primary bg-secondary"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-210 w-9 h-9 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.div
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-secondary rounded-full"
            />
            <motion.div
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
          </button>
        </div>

        {/* --- MOBILE TOGGLE (sm and below) --- */}
        <button
          className="md:hidden relative z-210 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-7 sm:w-8 h-0.5 sm:h-1 bg-white rounded-full"
          />
          <motion.div
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-7 sm:w-8 h-0.5 sm:h-1 bg-secondary rounded-full"
          />
          <motion.div
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-7 sm:w-8 h-0.5 sm:h-1 bg-white rounded-full"
          />
        </button>
      </div>

      {/* --- MOBILE / TABLET FULL OVERLAY MENU --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0F0C1E] z-200 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto"
          >
            {/* Decorative Background Text */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
              <h1 className="text-[40vw] font-black leading-none">LBC</h1>
            </div>

            {/* Section labels for mobile */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-6 left-6 text-[9px] font-black tracking-[0.35em] uppercase text-secondary/70"
            >
              You are here →{" "}
              <span className="text-secondary">
                {allItems.find((item) => isActive(item)) ?? "Home"}
              </span>
            </motion.p>

            <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">

              {/* Primary links */}
              {primaryItems.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full text-center"
                  >
                    <Link
                      href={getHref(item)}
                      className={`relative inline-flex items-center gap-3 text-4xl sm:text-5xl md:text-6xl font-black transition-colors tracking-tighter ${
                        active ? "text-secondary" : "text-white hover:text-secondary"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {active && (
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(197,160,89,0.8)]"
                        />
                      )}
                      {item}
                      {active && (
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary/70 self-end mb-1 sm:mb-2">
                          ← current
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Divider with "More" label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 + primaryItems.length * 0.07 }}
                className="flex items-center gap-4 w-full max-w-xs sm:max-w-sm my-1"
              >
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30">More</span>
                <div className="flex-1 h-px bg-white/10" />
              </motion.div>

              {/* More links */}
              {moreItems.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.18 + (primaryItems.length + 1 + i) * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full text-center"
                  >
                    <Link
                      href={getHref(item)}
                      className={`relative inline-flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-black transition-colors tracking-tighter ${
                        active ? "text-secondary" : "text-white/60 hover:text-secondary"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {active && (
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(197,160,89,0.8)]"
                        />
                      )}
                      {item}
                      {active && (
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary/70 self-end mb-1 sm:mb-2">
                          ← current
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 sm:mt-8"
              >
                <Link
                  href="/donation"
                  className="bg-secondary text-primary px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-base sm:text-xl tracking-widest shadow-[0_10px_30px_rgba(197,160,89,0.35)] hover:bg-white transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  GIVE NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}