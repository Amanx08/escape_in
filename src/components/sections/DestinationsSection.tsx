"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DestinationRecord } from "@/lib/content";

export default function DestinationsSection({ destinations }: { destinations: DestinationRecord[] }) {
  const heading = "Our destinations";
  const ctaLabel = "View all destinations";
  const ctaHref = "/destinations";

  const row1 = destinations.slice(0, 3);
  const row2 = destinations.slice(4, 7);

  return (
    <section className="py-20 bg-white">
      <div className="fw-container-custom d-flex align-items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="cs-section-heading">{heading}</h2>
        </motion.div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {row1.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`${i === 0 ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <DestinationCard dest={dest} tall={i === 0} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {row2.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className={`${i === 2 ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <DestinationCard dest={dest} tall={i === 2} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link href={ctaHref} className="bg-[#3a6a4c] hover:bg-[#2c5339]  text-white px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-colors flex items-center gap-2 focus:outline-none focus:ring-2">
            {ctaLabel}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function DestinationCard({
  dest,
  tall, // keeping the prop for compatibility, but we use a fixed height class
}: {
  dest: DestinationRecord;
  tall: boolean;
}) {
  return (
    <Link href={dest.href} className="group block relative overflow-hidden rounded-lg h-[300px] md:h-[400px]">
      <Image
        src={dest.image}
        alt={dest.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-card-gradient" />

      {/* Offer badge */}
      <div className="absolute top-3 left-3">
        <span className="text-xs text-white/90 font-medium bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {dest.offer}
        </span>
      </div>

      {/* Destination name */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <h3 className="text-white font-display text-2xl lg:text-3xl mb-1">{dest.name}</h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs text-white/90">Explore our tours to {dest.name}</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/40 bg-black/20 flex items-center justify-center shrink-0">
          <ArrowRight size={16} className="text-white" />
        </div>
      </div>
    </Link>
  );
}
