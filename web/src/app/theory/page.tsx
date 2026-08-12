import React from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { TheoryCatalogue } from "@/components/TheoryCatalogue";

export default function TheoryPage() {
  return (
    <main className="min-h-screen bg-charcoal text-slate-100 relative pt-20">
      <SiteChrome>
        <TheoryCatalogue />
      </SiteChrome>
    </main>
  );
}
