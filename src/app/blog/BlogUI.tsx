"use client";

import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    id: 1,
    category: "Theology",
    date: "March 28, 2026",
    title: "Walking in Unwavering Light",
    excerpt:
      "How to maintain spiritual clarity in a world designed to distract you from truth.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200",
    author: "Pastor Daniel",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Community",
    date: "March 22, 2026",
    title: "The Power of Gathered Prayer",
    excerpt:
      "What happens when believers gather in unity? Discover the unseen impact.",
    image:
      "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200",
    author: "Grace Mensah",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Missions",
    date: "March 15, 2026",
    title: "Hands That Heal Nations",
    excerpt:
      "A recap of our mission outreach and lives transformed through service.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
    author: "Evangelist John",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Leadership",
    date: "March 10, 2026",
    title: "Leading Like Christ",
    excerpt:
      "True leadership is rooted in humility, service, and sacrifice.",
    image:
      "https://images.unsplash.com/photo-1529070532901-d844569581a9?q=80&w=1200",
    author: "Pastor Daniel",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "Faith",
    date: "March 5, 2026",
    title: "Faith in Difficult Times",
    excerpt:
      "Holding onto God when everything feels uncertain.",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200",
    author: "Sarah Owusu",
    readTime: "3 min read",
  },
  {
    id: 6,
    category: "Devotion",
    date: "March 1, 2026",
    title: "Morning Devotion Guide",
    excerpt:
      "Start your day with intentional prayer and scripture reflection.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200",
    author: "Grace Mensah",
    readTime: "4 min read",
  },
];

export default function BlogUI() {
  const featured = BLOG_POSTS[0];

  return (
    <main className="bg-slate-950 text-white">

      {/* HERO */}
      <section className="px-6 md:px-16 py-24">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight max-w-4xl">
          The Pulse  Stories That Strengthen Your Faith
        </h1>
        <p className="mt-6 text-gray-400 max-w-xl text-lg">
          Explore teachings, testimonies, and updates from our church community.
        </p>
      </section>

      {/* FEATURED POST */}
      <section className="px-6 md:px-16 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <motion.img
            src={featured.image}
            alt={featured.title}
            className="rounded-3xl w-full h-[350px] object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
          />

          <div>
            <span className="text-yellow-400 text-sm uppercase">
              Featured Post
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              {featured.title}
            </h2>

            <p className="mt-4 text-gray-400">{featured.excerpt}</p>

            <div className="flex gap-4 mt-4 text-sm text-gray-500">
              <span>{featured.author}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>

            <button className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 md:px-16 pb-32">
        <h3 className="text-2xl font-semibold mb-10">Latest Articles</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -10 }}
              className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <span className="text-yellow-400 text-xs uppercase">
                  {post.category}
                </span>

                <h4 className="text-xl font-bold mt-2">
                  {post.title}
                </h4>

                <p className="text-gray-400 text-sm mt-2">
                  {post.excerpt}
                </p>

                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>

                <button className="mt-4 text-white underline">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-yellow-400 text-black py-20 px-6 md:px-16 text-center rounded-t-[3rem]">
        <h2 className="text-3xl md:text-5xl font-bold">
          Stay Connected
        </h2>

        <p className="mt-4 max-w-xl mx-auto">
          Get weekly encouragement, teachings, and updates directly in your inbox.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full w-full text-black"
          />

          <button className="bg-black text-white px-6 py-3 rounded-full">
            Subscribe
          </button>
        </div>
      </section>
    </main>
  );
}