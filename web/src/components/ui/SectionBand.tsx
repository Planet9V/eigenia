"use client";

import React from "react";

interface SectionBandProps {
  id?: string;
  variant?: "canvas" | "subtle" | "surface";
  className?: string;
  children: React.ReactNode;
}

export const SectionBand: React.FC<SectionBandProps> = ({
  id,
  variant = "canvas",
  className = "",
  children,
}) => {
  const variantStyles = {
    canvas: "bg-canvas text-primary border-hairline",
    subtle: "bg-subtle text-primary border-hairline",
    surface: "bg-surface text-primary border-hairline",
  };

  return (
    <section
      id={id}
      className={`py-20 border-b transition-colors duration-300 ${variantStyles[variant]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};
