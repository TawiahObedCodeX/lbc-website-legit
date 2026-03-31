"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePaystackPayment } from "react-paystack";

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000];

export default function DonationForm() {
  const [amount, setAmount] = useState<string>("100");
  const [email, setEmail] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: email || "donor@lakeside.com",
    amount: parseFloat(amount || "0") * 100,
    publicKey: "pk_test_your_public_key_here", 
    currency: "GHS",
    metadata: {
      custom_fields: [{ display_name: "Donor Name", variable_name: "donor_name", value: donorName }],
    },
  };

  const initializePayment = usePaystackPayment(config);

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
                      : "bg-[#FDFCF8] text-[#0F0C1E]/40 border border-black/5 hover:border-[#F0C060]"
                  }`}
                >
                  ₵{val}
                </button>
              ))}
            </div>

            <div className={`relative transition-all duration-500 border-b-2 ${isFocused ? 'border-[#F0C060]' : 'border-black/10'}`}>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-5xl font-black text-[#F0C060]">₵</span>
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

          {/* INPUTS */}
          <div className="grid md:grid-cols-2 gap-8">
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full bg-[#FDFCF8] border border-black/5 rounded-2xl p-6 font-bold text-[#0F0C1E] outline-none focus:border-[#F0C060] transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FDFCF8] border border-black/5 rounded-2xl p-6 font-bold text-[#0F0C1E] outline-none focus:border-[#F0C060] transition-all"
            />
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!amount || !email}
            onClick={() => {
                // @ts-ignore
                initializePayment((ref) => alert("Blessings! " + ref.reference), () => {});
            }}
            className="w-full py-8 rounded-[2rem] bg-[#0F0C1E] text-white font-black text-xl uppercase tracking-[0.4em] shadow-xl hover:bg-[#F0C060] hover:text-[#0F0C1E] transition-all disabled:opacity-20"
          >
            Sow My Seed
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