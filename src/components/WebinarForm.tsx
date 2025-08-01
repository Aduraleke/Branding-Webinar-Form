"use client";

import { useState } from "react";
import { submitToGoogle } from "@/lib/submitToGoogle";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import SuccessModal from "./SuccessModal";
import Head from "next/head";

export default function BrandingWebinarForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    brand: "",
    hasLogo: "",
    journeyStage: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
const [submittedName, setSubmittedName] = useState("");


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const message = await submitToGoogle(formData);
      toast.success(message || "Thanks for registering! 🎉");
    setSubmittedName(formData.fullName); // ✅ capture name before wiping
    setShowModal(true); // ✅ then show modal

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      brand: "",
      hasLogo: "",
      journeyStage: "",
    });

    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>The Branding Prep Class – Register</title>
        <meta
          name="description"
          content="Join the free Branding Prep Class to learn about logos, colours, and brand clarity."
        />
      </Head>

      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#fff1f5] via-[#f0f4ff] to-[#f9fcff] flex items-center justify-center px-4 py-10 md:py-20 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-pink-300 opacity-30 rounded-full filter blur-3xl z-0 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-80px] w-96 h-96 bg-indigo-300 opacity-20 rounded-full filter blur-3xl z-0 animate-ping" />

        {/* Animated Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-10 sm:px-8 md:px-12 lg:px-16 lg:py-14 transition-all duration-500"
        >
          {/* Badge */}
          <div className="inline-block mb-4 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-md animate-bounce w-fit">
            🔥 Limited Free Seats Available
          </div>

          {/* Header */}
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1f1f2f] leading-tight tracking-tight">
              The Branding Prep Class
            </h1>
            <p className="text-lg sm:text-xl text-pink-600 font-semibold">
              Logo, Colours & Clarity
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
              Take the first step in building your brand with clarity,
              confidence, and creative direction. Learn how to pick colors, get
              a logo that speaks, and define your presence.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                  className="px-4 py-3 rounded-xl bg-[#f9f9fb] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                  className="px-4 py-3 rounded-xl bg-[#f9f9fb] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 801 234 5678"
                  required
                  className="px-4 py-3 rounded-xl bg-[#f9f9fb] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  Brand Name
                </label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Styled by Chioma"
                  required
                  className="px-4 py-3 rounded-xl bg-[#f9f9fb] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Has Logo */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700 font-medium">
                  Do you have a logo?
                </label>
                <div className="flex gap-6">
                  {["Yes", "No"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="hasLogo"
                        value={option}
                        checked={formData.hasLogo === option}
                        onChange={handleChange}
                        className="accent-pink-600"
                        required
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Journey Stage */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  Your brand journey stage
                </label>
                <select
                  name="journeyStage"
                  value={formData.journeyStage}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-xl bg-[#f9f9fb] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800 transition-all duration-300 ease-in-out"
                >
                  <option value="" disabled>
                    Select your stage
                  </option>
                  <option value="Just Starting Out">Just Starting Out</option>
                  <option value="Growing Slowly">Growing Slowly</option>
                  <option value="Ready to Scale">Ready to Scale</option>
                  <option value="I Don’t Even Know!">I Don’t Even Know!</option>
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold text-lg flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
            >
              <Icon icon="mdi:rocket-launch-outline" className="text-xl" />
              {loading ? "Submitting..." : "Register for Free Class"}
            </motion.button>
          </form>

          {/* Bonus Section */}
          <div className="mt-10 bg-[#fdf4ff] rounded-xl p-4 sm:p-6 text-sm sm:text-base text-gray-700 space-y-3">
            <p className="font-semibold text-pink-600">✨ What you’ll get:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Free starter logo templates</li>
              <li>Personalised brand feedback</li>
              <li>Exclusive access to creative design resources</li>
            </ul>
            <div className="pt-4 border-t border-gray-200 space-y-3 text-xs text-gray-500">
              📅 <strong>Date:</strong> August 17th · 🕔 <strong>Time:</strong>{" "}
              5PM WAT ·<br />
              🖥️ Live on Google Meet
              <br />
              🎙️ <strong>Speakers:</strong> TechLeke & Tee C concepts
            </div>
          </div>

          {/* Success Modal */}
          {showModal && (
            <SuccessModal
              onClose={() => setShowModal(false)}
              fullName={submittedName} // ✅ correct name
            />
          )}
        </motion.div>
      </div>
    </>
  );
}
