"use client";

import { motion } from "framer-motion";

interface SuccessModalProps {
  onClose: () => void;
  dmLink: string;
}

export default function SuccessModal({ onClose, dmLink }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4">
          🎉 You're Registered!
        </h2>
        <p className="text-gray-700 mb-6">
          We can’t wait to see you in class. Tap below to DM me so I can send
          your welcome pack.
        </p>
        <a
          href={dmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        >
          📩 Message Me Now
        </a>
      </motion.div>
    </div>
  );
}
