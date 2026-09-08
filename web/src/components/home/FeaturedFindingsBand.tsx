"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedDocuments, getAllWikiDocuments } from "@/lib/wikiRegistry";
import { BUILD_ROTATION } from "@/lib/buildStamp";

/**
 * Thirteen featured papers, each led by its finding rather than its title.
 *
 * A strip of titles is a table of contents. A strip of findings is an argument,
 * which is why the hook renders large and the title small.
 *
 * Imports wikiRegistry only. Importing @/lib/wiki here would pull the 3.3 MB
 * content bundle onto the most performance-sensitive route on the site.
 */
export const FeaturedFindingsBand: React.FC = () => {
  const ranked = getFeaturedDocuments();
  const total = getAllWikiDocuments().length;

  if (ranked.length === 0) return null;

  // Rotate which finding leads. BUILD_ROTATION is baked at build time, so the
  // server render and the client render agree and there is no hydration
  // mismatch and no post-mount reflow. Rotation is per deploy, not per visit.
  const offset = BUILD_ROTATION % ranked.length;
  const featured = [...ranked.slice(offset), ...ranked.slice(0, offset)];

  return (
    <section
      aria-label="Featured research findings"
      className="py-20 bg-canvas text-primary border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold block">
              Featured Findings
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
              What the research actually found
            </h2>
          </div>
          <Link
            href="/wiki"
            className="text-dutchOrange font-mono text-[11px] font-semibold hover:underline flex items-center gap-1 shrink-0"
          >
            all {total} treatises
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="findings-track flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {featured.map((doc) => (
            <Link
              key={doc.id}
              href={`/papers/${doc.slug}`}
              className="snap-start shrink-0 w-[19rem] sm:w-[22rem] p-8 rounded-2xl bg-surface border border-hairline shadow-xl flex flex-col justify-between gap-6 hover:border-dutchOrange transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-dutchOrange font-semibold">
                    {doc.workingGroupId}
                  </span>
                  {doc.badge ? (
                    <span className="text-muted uppercase tracking-wider">
                      {doc.badge}
                    </span>
                  ) : null}
                </div>
                <p className="font-sans text-lg font-semibold text-primary leading-snug">
                  {doc.hook}
                </p>
              </div>
              <div className="pt-4 border-t border-hairline space-y-2">
                <p className="text-xs text-secondary font-light leading-relaxed">
                  {doc.title}
                </p>
                <span className="text-dutchOrange font-mono text-[11px] font-semibold flex items-center gap-1">
                  Read paper
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
