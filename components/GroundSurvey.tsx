"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    src: "/images/survey-1.png",
    alt: "Chalo team speaking with auto drivers to understand their challenges",
    caption: "Understanding driver pain points firsthand",
  },
  {
    src: "/images/survey-2.png",
    alt: "Auto drivers at Bihta sharing their daily challenges with the Chalo team",
    caption: "Drivers who face daily cancellations and lost income",
  },
  {
    src: "/images/survey-3.png",
    alt: "Field research with auto drivers at their stands near IIT Patna",
    caption: "Mapping real routes and pricing at auto stands",
  },
];

const productPhotos = [
  {
    src: "/images/product-collage.png",
    alt: "Chalo WhatsApp-based ride system in action — students and drivers using the platform at IIT Patna",
    caption: "Live product testing with students and drivers near IIT Patna, Bihta",
  },
  {
    src: "/images/product-live.png",
    alt: "Real ride completed through Chalo — student paying driver at Bihta station with WhatsApp confirmation",
    caption: "First completed ride — Bihta Station. Fare ₹100, advance ₹20 applied, driver earned ad incentive.",
  },
];

const stats = [
  { value: "50+", label: "Drivers interviewed" },
  { value: "200+", label: "Students surveyed" },
  { value: "IIT Patna", label: "First campus" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GroundSurvey() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <Image
          src="/images/bihta-road.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.94] via-gray-50/[0.96] to-white/[0.94]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-chalo-navy/5 text-chalo-navy border border-chalo-navy/10 mb-4">
            On the ground — IIT Patna, Bihta
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
            We Didn&apos;t Guess. We Asked.
          </h2>
          <p className="mt-4 text-chalo-slate/60 max-w-xl mx-auto leading-relaxed">
            Before writing a single line of code, we spent weeks at auto stands and college gates
            in Bihta, talking to the people who live this problem every day.
          </p>
        </motion.div>

        {/* Field survey photos */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.src}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/60 shadow-sm
                         hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-sm font-medium text-white leading-snug">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Product in action — larger showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h3 className="text-center text-lg font-bold text-chalo-navy mb-6">
            The Product in Action
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productPhotos.map((photo) => (
              <div
                key={photo.src}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/60 shadow-sm
                           hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm font-medium text-white leading-snug">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16
                     py-8 px-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-chalo-navy">{stat.value}</div>
              <div className="text-sm text-chalo-slate/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
