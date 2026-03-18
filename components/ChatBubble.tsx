"use client";

import { motion } from "framer-motion";

export type BubbleVariant = "student" | "driver" | "system";

interface ChatBubbleProps {
  message: string;
  variant: BubbleVariant;
  label?: string;
  isVisible: boolean;
  frustration?: boolean;
  highlight?: boolean;
}

export default function ChatBubble({
  message,
  variant,
  label,
  isVisible,
  frustration = false,
  highlight = false,
}: ChatBubbleProps) {
  if (variant === "system") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col items-center gap-1 my-1.5"
      >
        {label && (
          <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
            {label}
          </span>
        )}
        <motion.div
          animate={highlight && isVisible ? { scale: [1, 1.06, 1], boxShadow: ["0 0 0 0 rgba(37,211,102,0)", "0 0 20px 4px rgba(37,211,102,0.3)", "0 0 0 0 rgba(37,211,102,0)"] } : {}}
          transition={highlight ? { duration: 0.8, delay: 0.2 } : {}}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold shadow-md
            ${highlight ? "bg-chalo-green text-white" : "bg-chalo-navy text-white"}`}
        >
          {message}
        </motion.div>
      </motion.div>
    );
  }

  const isStudent = variant === "student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex flex-col gap-0.5 ${isStudent ? "items-start" : "items-end"}`}
    >
      {label && (
        <span className={`text-[10px] font-semibold tracking-widest uppercase text-gray-400 ${isStudent ? "ml-4" : "mr-4"}`}>
          {label}
        </span>
      )}
      <motion.div
        animate={
          frustration && isVisible
            ? { x: [0, -4, 4, -3, 3, 0] }
            : highlight && isVisible
              ? { scale: [1, 1.08, 1] }
              : {}
        }
        transition={frustration ? { duration: 0.5, delay: 0.3 } : highlight ? { duration: 0.5, delay: 0.2 } : {}}
        className={`
          relative px-5 py-3 text-[15px] leading-relaxed
          ${isStudent
            ? `bg-chalo-light text-chalo-navy rounded-2xl rounded-bl-sm ${frustration ? "ring-2 ring-red-300/50" : ""}`
            : `bg-white text-chalo-navy shadow-sm border border-gray-100/80 rounded-2xl rounded-br-sm ${frustration ? "ring-2 ring-red-300/50" : ""}`
          }
          ${highlight ? "ring-2 ring-chalo-green/40 shadow-lg shadow-chalo-green/10" : "shadow-sm"}
        `}
      >
        {message}
      </motion.div>
    </motion.div>
  );
}
