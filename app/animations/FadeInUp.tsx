"use client"
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type fadeInProps = { children: ReactNode; className?: string };

const FadeInUp = ({ children, className }: fadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 1.5,
      }}
      viewport={{ once: false }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;