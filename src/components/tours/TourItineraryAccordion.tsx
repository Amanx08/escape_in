"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function narrativeText(value: unknown): string {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed.replace(/'/g, '"'));
        return narrativeText(parsed);
      } catch {
        return trimmed.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
      }
    }
    return trimmed.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  }
  if (Array.isArray(value)) return value.map((item) => narrativeText(item)).filter(Boolean).join(" ");
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map((item) => narrativeText(item)).filter(Boolean).join(" ");
  }
  return value == null ? "" : String(value).trim();
}

export function TourItineraryAccordion({ items }: { items: Array<{ day: string; description: string }> }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const safeItems = items.length ? items : [{ day: "Overview", description: "This itinerary will be updated shortly." }];

  const toggleItem = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-3">
      {safeItems.map((item, index) => {
        const isOpen = index === expandedIndex;
        return (
          <div key={`${item.day}-${index}`} className="overflow-hidden rounded-[18px] border border-[#e8461a] bg-white">
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-gray-900"
            >
              <span className="font-semibold text-lg md:text-xl">{item.day}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8461a] text-[#e8461a]">
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>

            <div className={`${isOpen ? "max-h-[500px] pb-6" : "max-h-0"} overflow-hidden transition-all duration-300 px-6`}>
              <p className="text-base leading-7 text-gray-700 m-0">{narrativeText(item.description)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
