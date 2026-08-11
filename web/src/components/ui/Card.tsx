"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "elevated" | "outlined" | "subtle";
  hoverEffect?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "elevated",
  hoverEffect = true,
  className = "",
  children,
  ...motionProps
}) => {
  const variantStyles = {
    elevated: "bg-surface border-hairline text-primary shadow-xl",
    outlined: "bg-canvas border-hairline text-primary",
    subtle: "bg-subtle border-hairline text-primary",
  };

  const hoverAnimation = hoverEffect
    ? { whileHover: { y: -4, scale: 1.01 } }
    : {};

  return (
    <motion.div
      {...hoverAnimation}
      {...motionProps}
      className={`rounded-2xl border transition-all duration-300 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
