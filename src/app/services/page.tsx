"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const services = [
  {
    id: "01",
    title: "Sunday Celebration",
    category: "Worship",
    desc: "Join our vibrant congregation for dynamic contemporary worship, powerful preaching of the uncompromised Word, and an atmosphere where the Holy Spirit moves freely. Families worship together and experience real encounters with God.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070",
    time: "Every Sunday • 8:00 AM & 10:30 AM",
    location: "Main Sanctuary, Lakeside Estate, Accra",
  },
  {
    id: "02",
    title: "Lakeside Kids",
    category: "Children",
    desc: "A safe and exciting environment where children learn about Jesus through interactive Bible stories, worship, games, arts & crafts. We nurture their faith and character from an early age.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
    time: "During both Sunday services",
    location: "Kids Wing",
  },
  {
    id: "03",
    title: "Youth & Young Adults",
    category: "Next Gen",
    desc: "Relevant teaching, mentorship, leadership development, social events, and powerful worship designed to help young people stand strong in faith and impact their generation.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070",
    time: "Fridays 6:30 PM & Sundays 10:30 AM",
    location: "Youth Hall",
  },
  {
    id: "04",
    title: "Life Groups",
    category: "Fellowship",
    desc: "Small, authentic home groups across Accra focused on Bible study, prayer, accountability, fellowship, and applying God's Word to everyday life.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2070",
    time: "Weekly (various days)",
    location: "Homes across Greater Accra",
  },
  {
    id: "05",
    title: "Prayer & Healing Ministry",
    category: "Encounter",
    desc: "Passionate prayer meetings, intercession, deliverance, and healing services where we believe God still performs miracles today.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
    time: "Tuesdays 6:00 PM & after services",
    location: "Prayer Chapel",
  },
  {
    id: "06",
    title: "Creative Arts Ministry",
    category: "Arts",
    desc: "Music, media, dance, drama, and visuals used to create excellent worship experiences that glorify God and reach hearts.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070",
    time: "Rehearsals: Wed & Sat",
    location: "Creative Arts Studio",
  },
  {
    id: "07",
    title: "Community Outreach",
    category: "Serve",
    desc: "Practical love in action — feeding the hungry, supporting education, medical outreaches, and transforming communities in Accra with the love of Christ.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070",
    time: "Monthly outreaches",
    location: "Various communities in Accra",
  },
  {
    id: "08",
    title: "Global Missions",
    category: "Missions",
    desc: "Partnering to plant churches, support missionaries, provide aid, and spread the Gospel from Accra to the ends of the earth.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070",
    time: "Monthly prayer & annual trips",
    location: "Global Missions Office",
  },
];

const leadership = [
  {
    name: "Rev. Edgar Nashief",
    role: "Senior Pastor & Visionary",
    desc: "A man of prayer and vision leading Lakeside with a passion for revival, discipleship, and societal transformation in Ghana.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
  },
  {
    name: "Pastor Grace Nashief",
    role: "Co-Pastor",
    desc: "Leads with compassion in women's ministry, family discipleship, and pastoral care.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070",
  },
  {
    name: "Pastor Michael Osei",
    role: "Youth Pastor",
    desc: "Igniting faith and purpose in the next generation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
  },
  {
    name: "Minister Sarah Amoah",
    role: "Worship Director",
    desc: "Creating powerful atmospheres of worship and excellence in the arts.",
    image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?q=80&w=2070",
  },
];

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0F0C1E]" />;

  return (
    <main className="bg-[#FDFCF8] min-h-screen overflow-x-hidden font-sans">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0C1E] to-[#1A1433] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-cover bg-center opacity-40" initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 18 }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438059338422-7bcd74878d21?q=80&w=2070')" }} />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#F0C06022_0%,transparent_70%)]" />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}>
            <div className="mb-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-8 py-3 rounded-3xl text-[#F0C060] text-sm font-bold uppercase tracking-[3px]">LAKESIDE CHURCH • ACCRA, GHANA</div>
            <h1 className="text-[5rem] md:text-[8.5rem] lg:text-[11rem] font-black text-white leading-none tracking-[-6px] uppercase">MINISTRIES</h1>
            <p className="mt-8 text-xl md:text-3xl text-white/80 max-w-3xl mx-auto">A Spirit-filled church where worship is passionate, discipleship is deep, community is authentic, and service is joyful.</p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT OUR MINISTRIES */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0F0C1E]">Our Ministries at Lakeside</h2>
          <p className="mt-10 text-lg md:text-xl text-[#0F0C1E]/80 max-w-3xl mx-auto leading-relaxed">
            At Lakeside Church, we exist to glorify God by helping people encounter Jesus, grow in faith, build meaningful relationships, and serve their community. 
            Our ministries are built on biblical principles and tailored to meet the spiritual and practical needs of families in Accra and beyond.
          </p>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-20 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex px-8 py-3 bg-[#F0C060] text-[#0F0C1E] rounded-full text-sm font-black uppercase tracking-widest mb-6">OUR LEADERSHIP TEAM</div>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter">Shepherds With a Heart for God</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -15 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <img src={leader.image} alt={leader.name} className="w-full aspect-square object-cover" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold">{leader.name}</h3>
                  <p className="text-[#F0C060] font-medium text-sm mt-1">{leader.role}</p>
                  <p className="mt-6 text-sm text-[#0F0C1E]/75 leading-relaxed">{leader.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - HORIZONTAL SCROLL (NO SCROLLBAR) */}
      <section ref={sectionRef} className="py-28 bg-[#0F0C1E]">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center md:text-left">
            <div className="uppercase text-[#F0C060] tracking-[4px] text-sm font-black">DISCOVER YOUR PLACE</div>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter mt-4">Our Ministries</h2>
          </div>
        </div>

        {/* Scrollable horizontal cards - fully responsive & no scrollbar */}
        <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-16">
          <div className="flex gap-8 px-6 md:px-10 w-max">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.04 }}
                className="snap-center w-[360px] md:w-[420px] lg:w-[460px] bg-white rounded-3xl overflow-hidden shadow-2xl flex-shrink-0"
              >
                <div className="relative h-64 md:h-72">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-[#F0C060] text-[#0F0C1E] text-xs font-black uppercase px-6 py-2 rounded-3xl">{service.category}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-semibold leading-tight">{service.title}</h3>
                  <p className="mt-6 text-[#0F0C1E]/75 text-[15px] leading-relaxed">{service.desc}</p>
                  <div className="mt-8 pt-6 border-t text-sm space-y-2 text-[#0F0C1E]/70">
                    <p><span className="font-medium">Time:</span> {service.time}</p>
                    <p><span className="font-medium">Location:</span> {service.location}</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} className="mt-10 w-full py-5 bg-[#0F0C1E] hover:bg-[#F0C060] text-white hover:text-[#0F0C1E] rounded-2xl font-semibold text-sm uppercase tracking-widest transition-all">Get Involved</motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SERVE AT LAKESIDE */}
      <section className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center tracking-tighter mb-16">Why Serve With Us?</h2>
          <div className="grid md:grid-cols-2 gap-12 text-[#0F0C1E]/80 text-lg leading-relaxed">
            <div>
              <p className="mb-6">Serving at Lakeside is an opportunity to use your God-given talents for His glory. Whether you serve in worship, kids ministry, outreach, or behind the scenes, you become part of something eternal.</p>
              <p>We believe every believer has a ministry. When you serve, you grow spiritually, develop meaningful relationships, and see lives changed in Accra.</p>
            </div>
            <div>
              <p className="mb-6">Our church is committed to holistic transformation — spiritually, socially, and practically. From feeding programs to youth empowerment and global missions, your service makes a real difference in Ghana and beyond.</p>
              <p className="font-semibold text-[#F0C060]">Join a family that worships passionately and serves selflessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 bg-[#FDFCF8]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center tracking-tighter mb-16">What People Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ama Mensah", ministry: "Life Groups", quote: "Life Group gave me a spiritual family. I found healing, accountability, and grew deeper in faith." },
              { name: "Kwame Osei", ministry: "Youth Ministry", quote: "The youth program transformed my life. I now lead worship and mentor younger teens with confidence." },
              { name: "Abigail Ofori", ministry: "Creative Arts & Outreach", quote: "Serving in worship and community outreach has been incredibly fulfilling. I feel alive in my purpose." }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-3xl shadow-xl">
                <p className="italic text-lg">“{t.quote}”</p>
                <div className="mt-8">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-[#F0C060] text-sm">— {t.ministry}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-gradient-to-br from-[#F0C060] to-[#E5A930]">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0F0C1E]">Ready to Take Your Next Step?</h2>
          <p className="mt-10 text-2xl text-[#0F0C1E]/80">Whether you're new to faith or looking to serve, Lakeside Church has a place for you. Join a ministry today and be part of God's moving in Accra.</p>

          <div className="mt-20 flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} className="px-20 py-8 bg-[#0F0C1E] text-white rounded-3xl text-xl font-black uppercase tracking-widest">Join a Ministry</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-20 py-8 border-4 border-[#0F0C1E] text-[#0F0C1E] rounded-3xl text-xl font-black uppercase tracking-widest">Speak With a Pastor</motion.button>
          </div>
        </div>
      </section>
    </main>
  );
}