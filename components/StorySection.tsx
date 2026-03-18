"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ChatBubble, { BubbleVariant } from "./ChatBubble";

interface ChatMessage {
  message: string;
  variant: BubbleVariant;
  label?: string;
  frustration?: boolean;
  highlight?: boolean;
}

const beforeMessages: ChatMessage[] = [
  { message: "Bhaiya station chaloge?", variant: "student", label: "Student" },
  { message: "10 min mein aata hoon", variant: "driver", label: "Driver 1" },
  { message: "Bhaiya station? Kitna time?", variant: "student", label: "Calls another..." },
  { message: "5 min", variant: "driver", label: "Driver 2" },
  { message: "Arre bhaiya kahan ho?", variant: "driver", label: "Driver 1 arrives...", frustration: true },
  { message: "Auto mil gaya", variant: "student", frustration: true },
  { message: "🙂", variant: "driver", frustration: true },
];

const afterMessages: ChatMessage[] = [
  { message: "Chalo Station", variant: "student", label: "Student" },
  { message: "Finding best ride...", variant: "system", label: "Chalo" },
  { message: "₹120", variant: "driver", label: "Drivers bidding" },
  { message: "₹100", variant: "driver" },
  { message: "₹90", variant: "driver", highlight: true },
  { message: "Ride confirmed at ₹90 ✓", variant: "system", highlight: true },
  { message: "2 min mein pahunch raha hoon", variant: "driver", label: "Driver" },
  { message: "👍", variant: "student" },
];

function BubbleWithScroll({
  msg,
  progress,
  threshold,
}: {
  msg: ChatMessage;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const opacity = useTransform(progress, [threshold, threshold + 0.04], [0, 1]);
  const y = useTransform(progress, [threshold, threshold + 0.04], [20, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <ChatBubble
        message={msg.message}
        variant={msg.variant}
        label={msg.label}
        isVisible={true}
        frustration={msg.frustration}
        highlight={msg.highlight}
      />
    </motion.div>
  );
}

function ChatPane({
  messages,
  progress,
  startAt,
  endAt,
}: {
  messages: ChatMessage[];
  progress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const step = (endAt - startAt) / messages.length;
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, i) => (
        <BubbleWithScroll
          key={`${msg.message}-${i}`}
          msg={msg}
          progress={progress}
          threshold={startAt + step * i}
        />
      ))}
    </div>
  );
}

function FloatingCharacter({
  src,
  alt,
  side,
  glow,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
  glow: string;
}) {
  const rotate = side === "left" ? "-2deg" : "2deg";
  const alignment = side === "left" ? "left-0 sm:left-4 lg:left-8" : "right-0 sm:right-4 lg:right-8";

  return (
    <div className={`absolute bottom-0 ${alignment} hidden md:block pointer-events-none`}>
      {/* Radial glow behind character */}
      <div
        className={`absolute bottom-8 ${side === "left" ? "left-1/2 -translate-x-1/2" : "right-1/2 translate-x-1/2"}
          w-48 h-48 rounded-full ${glow} blur-[60px] opacity-60`}
      />
      <div
        className="relative w-48 h-72 lg:w-56 lg:h-80 xl:w-64 xl:h-96 drop-shadow-xl"
        style={{ transform: `rotate(${rotate})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 192px, (max-width: 1280px) 224px, 256px"
        />
      </div>
    </div>
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const beforeOpacity = useTransform(scrollYProgress, [0, 0.42, 0.48], [1, 1, 0]);
  const afterOpacity = useTransform(scrollYProgress, [0.48, 0.54, 1], [0, 1, 1]);

  const beforeProgress = useTransform(scrollYProgress, [0.04, 0.42], [0, 1]);
  const afterProgress = useTransform(scrollYProgress, [0.56, 0.95], [0, 1]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section id="story" ref={containerRef} className="relative min-h-[480vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* ─── BEFORE CHALO ─── */}
        <motion.div
          style={{ opacity: beforeOpacity }}
          className="absolute inset-0 z-10"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/60 via-orange-50/30 to-white pointer-events-none" />

          {/* Characters */}
          <FloatingCharacter
            src="/images/student-before.png"
            alt="Frustrated student calling for rides"
            side="left"
            glow="bg-red-200"
          />
          <FloatingCharacter
            src="/images/driver-before.png"
            alt="Annoyed auto driver on phone"
            side="right"
            glow="bg-orange-200"
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center pt-20 sm:pt-24">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-red-100/80 text-red-600 border border-red-200/60 mb-3">
                The struggle is real
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
                Before Chalo
              </h2>
            </div>

            {/* Mobile characters */}
            <div className="flex md:hidden justify-center gap-8 mb-4">
              <div className="w-20 h-28 relative drop-shadow-lg" style={{ transform: "rotate(-3deg)" }}>
                <Image src="/images/student-before.png" alt="Student" fill className="object-contain" sizes="80px" />
              </div>
              <div className="w-20 h-28 relative drop-shadow-lg" style={{ transform: "rotate(3deg)" }}>
                <Image src="/images/driver-before.png" alt="Driver" fill className="object-contain" sizes="80px" />
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 w-full max-w-sm mx-auto px-4 overflow-y-auto scrollbar-hide">
              <ChatPane
                messages={beforeMessages}
                progress={beforeProgress}
                startAt={0}
                endAt={1}
              />
            </div>
          </div>
        </motion.div>

        {/* ─── WITH CHALO ─── */}
        <motion.div
          style={{ opacity: afterOpacity }}
          className="absolute inset-0 z-10"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-green-50/30 to-white pointer-events-none" />

          {/* Characters */}
          <FloatingCharacter
            src="/images/student-after.png"
            alt="Happy student with confirmed ride"
            side="left"
            glow="bg-emerald-200"
          />
          <FloatingCharacter
            src="/images/driver-after.png"
            alt="Confident auto driver ready to go"
            side="right"
            glow="bg-green-200"
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center pt-20 sm:pt-24">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-700 border border-emerald-200/60 mb-3">
                Smooth &amp; simple
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chalo-navy">
                With Chalo
              </h2>
            </div>

            {/* Mobile characters */}
            <div className="flex md:hidden justify-center gap-8 mb-4">
              <div className="w-20 h-28 relative drop-shadow-lg" style={{ transform: "rotate(-3deg)" }}>
                <Image src="/images/student-after.png" alt="Student" fill className="object-contain" sizes="80px" />
              </div>
              <div className="w-20 h-28 relative drop-shadow-lg" style={{ transform: "rotate(3deg)" }}>
                <Image src="/images/driver-after.png" alt="Driver" fill className="object-contain" sizes="80px" />
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 w-full max-w-sm mx-auto px-4 overflow-y-auto scrollbar-hide">
              <ChatPane
                messages={afterMessages}
                progress={afterProgress}
                startAt={0}
                endAt={1}
              />
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <motion.div style={{ opacity: beforeOpacity }} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">Before</span>
          </motion.div>
          <div className="w-4 h-px bg-gray-300" />
          <motion.div style={{ opacity: afterOpacity }} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">After</span>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-6 right-6 flex items-center gap-2 text-gray-400 z-20"
        >
          <span className="text-xs font-medium">Scroll to see the story</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10m0 0l3-3m-3 3L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
