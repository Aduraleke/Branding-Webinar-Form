"use client";

import { useState } from "react";
import { submitToGoogle } from "@/lib/submitToGoogle";
import { toast } from "sonner";

export default function WebinarForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    brand: "",
    hasLogo: "",
    journeyStage: "",
  });

  const [loading, setLoading] = useState(false);

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

  const inputStyle =
    "peer h-12 w-full border-b-2 border-gray-300 text-gray-800 placeholder-transparent focus:outline-none focus:border-indigo-600 transition";

  return (
    <div className="bg-gradient-to-br from-[#E6F0FF] to-[#F5F9FF] min-h-screen py-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Join Our Free Webinar 🎓
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Let’s learn more about your journey and brand!
        </p>

        {/* Full Name */}
        <div className="relative">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your Full Name"
            className={inputStyle}
            required
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={inputStyle}
            required
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
            Email Address
          </label>
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={inputStyle}
            required
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
            Phone Number
          </label>
        </div>

        {/* Brand */}
        <div className="relative">
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Your Brand Name"
            className={inputStyle}
            required
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
            Brand Name
          </label>
        </div>

        {/* Has Logo */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Do you have a logo?</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasLogo"
                value="Yes"
                checked={formData.hasLogo === "Yes"}
                onChange={handleChange}
                required
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasLogo"
                value="No"
                checked={formData.hasLogo === "No"}
                onChange={handleChange}
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Journey Stage */}
        <div className="space-y-2">
          <label htmlFor="journeyStage" className="text-sm text-gray-600">
            What stage are you in your brand journey?
          </label>
          <select
            id="journeyStage"
            name="journeyStage"
            value={formData.journeyStage}
            onChange={handleChange}
            required
            className="w-full h-12 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-600 bg-transparent text-gray-800 transition"
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full text-lg font-semibold tracking-wide transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Register Now"}
        </button>
      </form>
    </div>
  );
}
