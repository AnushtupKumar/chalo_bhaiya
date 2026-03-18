"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — IIT Patna campus gate */}
      <div className="absolute inset-0">
        <Image
          src="/images/iit-patna-gate.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/75 to-white" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-white/80 text-chalo-dark border border-chalo-green/20 backdrop-blur-sm">
            Campus rides, reimagined
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Chalo{" "}
          <span className="text-gradient bg-gradient-to-r from-chalo-green to-emerald-400">
            Bhaiya!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-chalo-slate/80 max-w-xl mx-auto leading-relaxed"
        >
          Getting a ride from campus shouldn&apos;t be this hard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="#waitlist"
            className="group relative px-8 py-3.5 rounded-full bg-chalo-navy text-white font-semibold text-base
                       hover:shadow-lg hover:shadow-chalo-navy/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Join Early Access
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#story"
            className="px-8 py-3.5 rounded-full border border-gray-300 text-chalo-slate font-medium text-base
                       bg-white/60 backdrop-blur-sm hover:bg-white hover:border-gray-400 transition-all duration-200"
          >
            See How It Works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 text-xs text-chalo-slate/40"
        >
          Starting at IIT Patna, Bihta
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-gray-500/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
