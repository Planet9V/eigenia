"use client";

import React from "react";
import Link from "next/link";
import { getAllWorkingGroups, getAllWikiDocuments } from "@/lib/wikiRegistry";

/**
 * Nine working groups, each a door into the corpus.
 *
 * Every number here is derived. Nothing is typed by hand, which is the point:
 * the site advertised 25 treatises for months while the real figure climbed
 * to 59.
 *
 * No motion. This is navigation, not persuasion.
 */
export const WorkingGroupsStrip: React.FC = () => {
  const groups = getAllWorkingGroups();
  const total = getAllWikiDocuments().length;

  return (
    <section
      aria-label="Research working groups"
      className="py-16 bg-subtle text-primary border-b border-hairline transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-dutchOrange font-semibold">
            Working Groups
          </span>
          <span className="font-mono text-[11px] text-muted">
            {total} treatises across {groups.length} groups
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {groups.map((g) => (
            <li key={g.id}>
              <Link
                href={`/wiki?wg=${g.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-surface border border-hairline hover:border-dutchOrange transition-colors"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] text-dutchOrange font-semibold tracking-wider">
                    {g.id}
                  </span>
                  <span className="block text-sm text-primary font-medium truncate">
                    {g.title}
                  </span>
                </span>
                <span className="font-mono text-sm text-muted shrink-0">
                  {g.documents.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
