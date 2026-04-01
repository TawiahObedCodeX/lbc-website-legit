"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import HeroCarousel from "@/components/HeroCarousel";

/* ─────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 56 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.11, ease },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -72 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 72 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

/* ─────────────────────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 uppercase tracking-[0.38em] text-[10px] font-black text-amber-600 mb-4">
      <span className="block w-7 h-px bg-amber-500" />
      {children}
      <span className="block w-7 h-px bg-amber-500" />
    </p>
  );
}

function InViewBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* parallax for welcome image */
  const imgRef = useRef(null);
  const { scrollYProgress: imgProg } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(imgProg, [0, 1], [-30, 30]);

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-amber-500 z-9999 origin-left"
        style={{ scaleX }}
      />

      {/* ════════════════════════════════════════
          1 · HERO CAROUSEL
      ════════════════════════════════════════ */}
      <HeroCarousel />

      {/* ════════════════════════════════════════
          2 · WHO WE ARE  (identity hook only)
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Image with parallax */}
          <motion.div
            ref={imgRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeLeft}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -top-14 -left-14 w-72 h-72 rounded-full bg-amber-100 blur-3xl opacity-70 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-stone-200 blur-2xl opacity-60 pointer-events-none" />
            <motion.img
              src="/images/homepgimg1.jpeg"
              alt="Lakeside Baptist Church congregation"
              className="relative z-10 w-full rounded-[2.5rem] object-cover shadow-[0_40px_90px_-20px_rgba(0,0,0,0.32)]"
              style={{ y: imgY, aspectRatio: "4/5", objectFit: "cover" } as any}
            />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.55,
                duration: 0.65,
                type: "spring",
                stiffness: 180,
              }}
              className="absolute -bottom-6 -right-3 md:-right-10 z-20 bg-amber-500 text-white rounded-2xl px-6 py-5 shadow-2xl"
            >
              <p className="font-black text-3xl leading-none font-serif">
                Est.
              </p>
              <p className="font-black text-4xl leading-none font-serif">
                1994
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-7 order-1 lg:order-2"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Welcome Home</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl xl:text-7xl font-black font-serif text-stone-900 leading-[1.04]"
            >
              Where Heaven{" "}
              <span className="relative inline-block text-amber-600">
                Meets Earth.
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.55, ease }}
                  className="absolute -bottom-1 left-0 right-0 h-[4px] bg-amber-300 rounded-full origin-left"
                />
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-stone-500 italic border-l-4 border-amber-300 pl-5 py-1 leading-relaxed"
            >
              "A lighthouse for the lost, a home for the family, and a sanctuary
              for the spirit."
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-stone-600 leading-relaxed text-[15px]"
            >
              Lakeside Baptist Church is a vibrant, multigenerational community
              rooted in the teachings of Christ. Since 1994 we have served the
              Lakeside region with passion, purpose, and an open door for every
              soul seeking belonging.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/about"
                className="px-7 py-3.5 bg-stone-900 text-white rounded-full font-bold text-sm tracking-wide hover:bg-amber-600 transition-colors duration-300 shadow-lg"
              >
                Learn About Us
              </Link>
              <Link
                href="/ministers"
                className="px-7 py-3.5 border-2 border-stone-300 text-stone-700 rounded-full font-bold text-sm hover:border-amber-500 hover:text-amber-600 transition-all duration-300"
              >
                Meet Our Pastors →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3 · STATS BAR
      ════════════════════════════════════════ */}
      <section className="bg-stone-900 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.14)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center relative z-10"
        >
          {[
            { icon: "🙏", val: "2,500+", label: "Congregation" },
            { icon: "✝️", val: "45", label: "Ministries" },
            { icon: "❤️", val: "120+", label: "Charity Projects" },
            { icon: "📖", val: "30+", label: "Years of Faith" },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group cursor-default"
            >
              <span className="block text-3xl mb-3">{s.icon}</span>
              <h3 className="text-5xl md:text-6xl font-black font-serif text-amber-400 mb-2 group-hover:text-white transition-colors duration-500">
                {s.val}
              </h3>
              <p className="text-stone-400 uppercase tracking-[0.22em] text-[10px] font-black">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          4 · SERVICE TIMES SNAPSHOT
              (preview only → /services page)
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <InViewBlock>
              <SectionLabel>Plan Your Visit</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-black font-serif text-stone-900 mt-2 leading-tight">
                Join Us <span className="text-amber-600">This Sunday</span>
              </h2>
            </InViewBlock>
            <InViewBlock delay={1}>
              <Link
                href="/services"
                className="text-amber-600 font-bold text-sm hover:underline underline-offset-4 whitespace-nowrap"
              >
                All Service Times →
              </Link>
            </InViewBlock>
          </div>

          {/* 3 Sunday time cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-7">
            {[
              { time: "7:00 AM", name: "Early Morning Service", delay: 0 },
              { time: "9:30 AM", name: "Family Worship Service", delay: 1 },
              { time: "11:30 AM", name: "Contemporary Service", delay: 2 },
            ].map((s, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 45 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: s.delay * 0.13, ease }}
                  className="group relative border-2 border-stone-100 rounded-2xl p-7 hover:border-amber-400 hover:bg-amber-50/40 transition-all duration-400 overflow-hidden cursor-default"
                >
                  <div className="absolute top-0 left-0 h-full w-1 bg-amber-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400 rounded-l-2xl" />
                  <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                    Sunday
                  </span>
                  <p className="text-4xl font-black font-serif text-stone-900 leading-none mb-2">
                    {s.time}
                  </p>
                  <p className="text-stone-500 font-medium text-sm">{s.name}</p>
                  <p className="text-stone-400 text-xs mt-2">Main Sanctuary</p>
                </motion.div>
              );
            })}
          </div>

          {/* Midweek teaser strip */}
          <InViewBlock delay={1}>
            <div className="flex flex-wrap gap-4 items-center bg-stone-50 border border-stone-100 rounded-2xl px-6 py-5">
              <p className="text-stone-500 text-sm font-medium flex-1 min-w-[180px]">
                📅&nbsp; <strong className="text-stone-700">Midweek</strong> —
                Bible Study (Wed 6 PM) · Youth Night (Fri 7 PM) · Prayer (Sat 8
                AM)
              </p>
              <Link
                href="/services"
                className="px-6 py-3 bg-amber-500 text-white rounded-full font-bold text-sm hover:bg-amber-600 transition-colors shadow hover:shadow-amber-200/60"
              >
                See Full Schedule
              </Link>
            </div>
          </InViewBlock>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5 · NEW HERE? — First-time visitor CTA
      ════════════════════════════════════════ */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="relative rounded-[2.5rem] overflow-hidden"
          >
            <img
              src="/images/homepgbg1.png"
              alt="Church congregation"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-r from-stone-950/92 via-stone-900/72 to-transparent" />
            <div className="relative z-10 px-8 md:px-16 py-20 md:py-28 max-w-2xl">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>First Time Visiting?</SectionLabel>
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className="text-4xl md:text-6xl font-black font-serif text-white leading-tight mt-2 mb-5"
                >
                  You Belong <br />
                  <span className="text-amber-400">Here With Us.</span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-stone-300 text-[15px] leading-relaxed mb-8 max-w-lg"
                >
                  Whether you've never been to church or you've been away for
                  years — there is no judgement here. Just grace, warmth, and a
                  family ready to welcome you home.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-400 transition-colors shadow-lg text-sm tracking-wide"
                  >
                    Plan My Visit →
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-colors text-sm tracking-wide backdrop-blur-sm"
                  >
                    What to Expect
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6 · LATEST SERMON PREVIEW
              (featured + 2 recent → /blog)
      ════════════════════════════════════════ */}
      <section className="bg-stone-50 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <InViewBlock>
              <SectionLabel>The Word</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-black font-serif text-stone-900 mt-2">
                Latest Sermons
              </h2>
            </InViewBlock>
            <InViewBlock delay={1}>
              <Link
                href="/blog"
                className="text-amber-600 font-bold text-sm hover:underline underline-offset-4 whitespace-nowrap"
              >
                All Sermons & Blog →
              </Link>
            </InViewBlock>
          </div>

          <div className="grid lg:grid-cols-5 gap-7">
            {/* Featured sermon — large left card */}
            {(() => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  variants={fadeLeft}
                  className="lg:col-span-3 group rounded-3xl overflow-hidden bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] transition-shadow duration-500 cursor-pointer"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src="/images/sermonimg1.png"
                      alt="Latest sermon"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.12 }}
                        className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
                      >
                        <span className="text-amber-600 text-xl ml-1">▶</span>
                      </motion.div>
                    </div>
                    <div className="absolute bottom-5 left-5">
                      <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Faith & Fire Series
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl font-black font-serif text-stone-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                      When God Moves Mountains
                    </h3>
                    <p className="text-stone-500 text-sm mb-4">
                      Pastor Emmanuel Adeyemi
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-5 text-stone-400 text-xs font-medium">
                        <span>📅 Mar 23, 2025</span>
                        <span>🕐 52 min</span>
                      </div>
                      <Link
                        href="/blog"
                        className="text-amber-600 font-bold text-xs hover:underline"
                      >
                        Watch →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Two smaller right cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {[
                {
                  img: "/images/sermonimg2.png",
                  series: "New Beginnings",
                  title: "The God Who Restores",
                  pastor: "Rev. Grace Obiorah",
                  date: "Mar 16, 2025",
                  duration: "44 min",
                  delay: 1,
                },
                {
                  img: "/images/sermonimg3.png",
                  series: "Walking in Purpose",
                  title: "Positioned for Impact",
                  pastor: "Deacon James Nwosu",
                  date: "Mar 9, 2025",
                  duration: "39 min",
                  delay: 2,
                },
              ].map((s, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: "-40px" });
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: s.delay * 0.12, ease }}
                    className="group flex gap-4 bg-white rounded-2xl p-4 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow duration-400 cursor-pointer border border-stone-50"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={s.img}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm">▶</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                        {s.series}
                      </span>
                      <h4 className="font-black font-serif text-stone-900 text-[15px] leading-snug mt-1 mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {s.title}
                      </h4>
                      <p className="text-stone-400 text-xs truncate">
                        {s.pastor}
                      </p>
                      <div className="flex gap-3 mt-2 text-stone-400 text-[11px]">
                        <span>{s.date}</span>
                        <span>·</span>
                        <span>{s.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <InViewBlock delay={2} className="mt-auto pt-1">
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 w-full py-4 border-2 border-stone-200 rounded-2xl font-bold text-sm text-stone-700 hover:border-amber-400 hover:text-amber-600 transition-all duration-300"
                >
                  Browse All Sermons{" "}
                  <span className="text-lg leading-none">→</span>
                </Link>
              </InViewBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7 · UPCOMING EVENTS TEASER
              (3 cards → /blog events)
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <InViewBlock>
              <SectionLabel>Mark Your Calendar</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-black font-serif text-stone-900 mt-2 leading-tight">
                Coming Up at <span className="text-amber-600">Lakeside</span>
              </h2>
            </InViewBlock>
            <InViewBlock delay={1}>
              <Link
                href="/blog"
                className="text-amber-600 font-bold text-sm hover:underline underline-offset-4 whitespace-nowrap"
              >
                All Events →
              </Link>
            </InViewBlock>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                date: "06",
                month: "Apr",
                img: "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=600&q=80",
                title: "Easter Sunrise Service",
                desc: "A powerful dawn celebration of the resurrection of Christ.",
                tag: "Worship",
                delay: 0,
              },
              {
                date: "20",
                month: "Apr",
                img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80",
                title: "Men's Leadership Summit",
                desc: "Two-day intensive leadership and vision conference for men of all ages.",
                tag: "Conference",
                delay: 1,
              },
              {
                date: "27",
                month: "Apr",
                img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
                title: "Women's Arise Conference",
                desc: "An empowering weekend to discover identity, purpose, and destiny.",
                tag: "Conference",
                delay: 2,
              },
            ].map((ev, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: ev.delay * 0.13, ease }}
                  className="group rounded-3xl overflow-hidden bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)] transition-shadow duration-500 cursor-pointer"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-xl bg-amber-500 flex flex-col items-center justify-center text-white shadow-lg">
                      <span className="font-black text-xl leading-none">
                        {ev.date}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-100">
                        {ev.month}
                      </span>
                    </div>
                    <span className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                      {ev.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-black font-serif text-stone-900 text-lg mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
                      {ev.desc}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-amber-600 text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      Learn more <span>→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8 · EXPLORE LAKESIDE — page nav strip
      ════════════════════════════════════════ */}
      <section className="bg-stone-900 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.10)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <InViewBlock className="text-center mb-12">
            <SectionLabel>Explore Lakeside</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black font-serif text-white mt-2">
              Everything in One Place
            </h2>
          </InViewBlock>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { href: "/about", icon: "📖", label: "About Us" },
              { href: "/services", icon: "✝️", label: "Services" },
              { href: "/ministers", icon: "🎙️", label: "Ministers" },
              { href: "/gallery", icon: "🖼️", label: "Gallery" },
              { href: "/blog", icon: "✍️", label: "Blog" },
              { href: "/donation", icon: "🤝", label: "Give" },
            ].map((link, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Link
                  href={link.href}
                  className="group flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-2xl py-7 px-4 hover:bg-amber-500 hover:border-amber-500 transition-all duration-300 text-center"
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-300 block">
                    {link.icon}
                  </span>
                  <span className="text-white font-bold text-xs uppercase tracking-widest">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          9 · CONTACT + GIVE CTA
              (directs to /contact and /donation)
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center space-y-6"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>We'd Love to Hear From You</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black font-serif text-stone-900 leading-tight"
            >
              Any Questions?{" "}
              <span className="text-amber-600">We're Right Here.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed"
            >
              Our team is always ready to help, pray with you, or simply chat.
              Reach out any time.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link
                href="/contact"
                className="px-9 py-4 bg-stone-900 text-white font-bold rounded-full hover:bg-amber-600 transition-colors duration-300 shadow-lg text-sm tracking-wide"
              >
                Get in Touch →
              </Link>
              <Link
                href="/donation"
                className="px-9 py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 transition-colors duration-300 shadow-lg shadow-amber-200/60 text-sm tracking-wide"
              >
                Support the Vision 🙏
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
