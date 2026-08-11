"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-xs text-slate-500 dark:text-slate-400">
      <ol className="flex items-center flex-wrap gap-1.5">
        
        {/* Home Root */}
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-dutchOrange transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {/* Trail Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-dutchOrange transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? "text-dutchOrange font-bold" : "text-slate-700 dark:text-slate-300"}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}

      </ol>
    </nav>
  );
};
