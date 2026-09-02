"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategoryRecord } from "@/lib/content";

export default function CollectionsSection({ categories }: { categories: CategoryRecord[] }) {

  return (
    <section className="py-20 bg-white">
      <div className="fw-container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2 className="cs-section-heading">Handcrafted journeys, tailored by experts...</h2>
        </motion.div>

        {/* First row: 3 equal width cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-3">
          {categories.slice(0, 3).map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <CollectionCard collection={collection} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
}: {
  collection: CategoryRecord;
}) {
  return (
    <Link
      href={collection.href}
      className="group relative block overflow-hidden rounded-lg"
      style={{ height: "360px" }}
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-collection-gradient" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <h3 className="heading-h4 text-white mb-1 drop-shadow-md">{collection.name}</h3>
          <p className="text-[11px] text-white/90 font-medium uppercase tracking-wide">
            {collection.offer}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full border border-white/40 bg-black/20 flex items-center justify-center shrink-0">
          <ArrowRight size={16} className="text-white" />
        </div>
      </div>
    </Link>
  );
}
