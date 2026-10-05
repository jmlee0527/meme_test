"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  // Keep server-rendered content readable before hydration and without JavaScript.
  return <motion.div className={className} initial={false} whileInView={reduceMotion ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, ease: "easeOut" }}>{children}</motion.div>;
}
