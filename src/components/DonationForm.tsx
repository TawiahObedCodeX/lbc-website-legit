"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { initializePaystack } from "@/lib/paystack";

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000];
const PAYMENT_TYPES = [
  { value: "tithe", label: "Tithe" },
  { value: "offering", label: "Offering" },
  { value: "missions", label: "Missions" },
];

export default function DonationForm() {
  const [amount, setAmount] = useState<string>("100");
  const [email, setEmail] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDonate = async () => {
    setError("");
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!donorName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Optionally subscribe to newsletter
      if (newsletter) {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      }

      const data = await initializePaystack(
        email,
        parseFloat(amount),
        donorName,
        phone || undefined,
        paymentType || undefined
      );

      // Redirect to Paystack hosted checkout (supports card, MoMo, all networks)
      window.location.href = data.authorization_url;
    } catch (err: any) {
      setError(err?.message || "Payment initialization failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-white border border-black/5 rounded-[3.5rem] p-8 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]"
      >
        <div className="space-y-12">

          {/* AMOUNT SELECTION */}
          <div className="space-y-8">
            <h3 className="text-black/40 font-black text-[10px] uppercase tracking-[0.3em]">01. Select Amount</h3>
            <div className="flex flex-wrap gap-3">
              {PRESET_AMOUNTS.map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className={`px-8 py-5 rounded-2xl font-black transition-all duration-300 ${
                    amount === val.toString()
                      ? "bg-[#0F0C1E] text-white shadow-lg scale-105"
                      : "bg-background text-[#0F0C1E]/40 border border-black/5 hover:border-[#F0C060]"
                  }`}
                >
                  ₵{val}
                </button>
              ))}
            </div>
            <div
              className={`relative transition-all duration-500 border-b-2 ${
                isFocused ? "border-[#F0C060]" : "border-black/10"
              }`}
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-5xl font-black text-[#F0C060]">
                ₵
              </span>
              <input
                type="number"
                value={amount}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent py-10 pl-16 text-7xl md:text-8xl font-black text-[#0F0C1E] outline-none"
                placeholder="0"
              />
            </div>
          </div>

          {/* GIVING TYPE */}
          <div className="space-y-4">
            <h3 className="text-black/40 font-black text-[10px] uppercase tracking-[0.3em]">
              02. Giving Type <span className="text-black/20">(Optional)</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {PAYMENT_TYPES.map((pt) => (
                <button
                  key={pt.value}
                  onClick={() =>
                    setPaymentType(paymentType === pt.value ? "" : pt.value)
                  }
                  className={`px-8 py-5 rounded-2xl font-black transition-all duration-300 ${
                    paymentType === pt.value
                      ? "bg-[#F0C060] text-[#0F0C1E] shadow-lg scale-105"
                      : "bg-background text-[#0F0C1E]/40 border border-black/5 hover:border-[#F0C060]"
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            <h3 className="text-black/40 font-black text-[10px] uppercase tracking-[0.3em]">
              03. Your Details
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Full Name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full bg-background border border-black/5 rounded-2xl p-6 font-bold text-[#0F0C1E] outline-none focus:border-[#F0C060] transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-black/5 rounded-2xl p-6 font-bold text-[#0F0C1E] outline-none focus:border-[#F0C060] transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-background border border-black/5 rounded-2xl p-6 font-bold text-[#0F0C1E] outline-none focus:border-[#F0C060] transition-all md:col-span-2"
              />
            </div>
          </div>

          {/* NEWSLETTER */}
          <label className="flex items-center gap-4 cursor-pointer group w-fit">
            <div
              onClick={() => setNewsletter(!newsletter)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                newsletter
                  ? "bg-[#0F0C1E] border-[#0F0C1E]"
                  : "border-black/20 group-hover:border-[#F0C060]"
              }`}
            >
              {newsletter && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-black/30 group-hover:text-black/50 transition-colors">
              Keep me updated with church news
            </span>
          </label>

          {/* ERROR MESSAGE */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm font-bold text-center bg-red-50 rounded-2xl py-4 px-6"
            >
              {error}
            </motion.p>
          )}

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={!amount || !email || !donorName || loading}
            onClick={handleDonate}
            className="w-full py-8 rounded-4xl bg-[#0F0C1E] text-white font-black text-xl uppercase tracking-[0.4em] shadow-xl hover:bg-[#F0C060] hover:text-[#0F0C1E] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Preparing Secure Checkout...
              </span>
            ) : (
              "Sow My Seed"
            )}
          </motion.button>

          <div className="flex justify-center gap-6 opacity-30 text-[9px] font-black uppercase tracking-widest">
            <span>MTN MoMo</span>
            <span>Visa / MasterCard</span>
            <span>Vodafone Cash</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}