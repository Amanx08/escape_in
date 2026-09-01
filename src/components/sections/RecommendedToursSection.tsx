"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryRecord, PackageRecord } from "@/lib/content";

export default function RecommendedToursSection({ packages, categories }: { packages: PackageRecord[]; categories: CategoryRecord[] }) {
  const tabs = categories.map((category) => category.name);
  const [activeTab, setActiveTab] = useState(tabs[0] || "");

  const filteredTours = packages.filter((tour) => tour.types.some((type) => type.toLowerCase() === activeTab.toLowerCase()));

  return (
    <section className="py-20 bg-white">
      <div className="fw-container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="cs-section-heading mb-20">India Escapes packages</h2>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pt-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors uppercase tracking-wide ${activeTab === tab
                    ? "bg-[#1a3d5c] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Swiper Slider */}
        <div className="relative px-4 sm:px-10 lg:px-12">
          <button className="tours-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-[#e8461a] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft size={24} />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              968: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: '.tours-prev',
              nextEl: '.tours-next',
            }}
            className="pb-4"
          >
            {filteredTours.map((tour) => (
              <SwiperSlide key={tour.id} className="h-auto">
                <div className="bg-white rounded-lg overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-gray-100 h-full flex flex-col group hover:shadow-card-hover transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {tour.badge && (
                      <div className="absolute top-3 left-3 bg-[#e8461a] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {tour.badge}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {tour.types.map((type) => (
                        <span key={type} className="bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 capitalize">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a3d5c]" />
                          {type.replace(' tours', '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                   
                    <p className="text-[#e8461a] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-4 border-b border-[#e8461a]" />
                      {tour.country}
                    </p>

                    <h3 className="font-bold text-gray-900 text-[20px] min-h-[60px] leading-tight mb-4 group-hover:text-[#e8461a] transition-colors">
                      <Link href={tour.href} className="before:absolute before:inset-0">
                        {tour.title}
                      </Link>
                    </h3>

                    {/* <ul className="space-y-2 mb-6 flex-1">
                      {tour.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#e8461a] mt-2 shrink-0" />
                          <span className="leading-snug">{highlight}</span>
                        </li>
                      ))}
                    </ul> */}

                    {/* Bottom Details */}

                     
                      {/* Price */}
                      <div className="flex items-end justify-center gap-2 mt-3 mb-4">
                        {/* <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Prices from</div> */}
                        <div className="text-xl font-bold text-gray-900 leading-none">₹{tour.priceFrom}</div>
                        {/* <div className="text-[10px] text-gray-500 mb-0.5">{tour.pricePer}</div> */}
                      </div>


                  </div>
                  {/* Full width button */}
                  <div className="bg-[#d43510] text-white py-3.5 text-center text-[13px] font-bold uppercase tracking-wider group-hover:bg-[#b02910] transition-colors mt-auto">
                    Find out more
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="tours-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-[#e8461a] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
}
