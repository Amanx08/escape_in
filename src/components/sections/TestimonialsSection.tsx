"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import Link from "next/link";
import testimonialsData from "@/../data/testimonials.json";

export default function TestimonialSection() {
  const { heading, subheading, poweredBy, viewAllHref, reviews } = testimonialsData;

  return (
    <section className="py-20 bg-[#fefaf5] overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Heading and Intro */}
          <div className="lg:col-span-4 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="cs-section-heading mb-8 text-center lg:text-start">{heading}</h2>
              <p className="text-md text-gray-600 mb-6 leading-relaxed text-center lg:text-start">
                {subheading}
              </p>
              {/* <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Powered by</span>
                <span className="text-lg font-bold text-gray-900 tracking-tight">{poweredBy}</span>
              </div> */}
            </motion.div>
          </div>

          {/* Right: Swiper Slider */}
          <div className="lg:col-span-8 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{
                  clickable: true,
                  el: '.testimonial-pagination',
                  bulletClass: 'swiper-pagination-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active bg-primary-500',
                }}
                className="pb-12"
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review.id} className="h-auto">
                    <div className="bg-white rounded-lg p-6 lg:p-8 shadow-card h-full flex flex-col">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#fbbf24" className="text-amber-400" />
                        ))}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-2xl mb-3 leading-snug">
                        {review.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3">
                        {review.text}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <span className="font-semibold text-sm text-gray-800">{review.author}</span>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="testimonial-pagination flex justify-center gap-2 absolute bottom-0 left-0 right-0" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Link href={viewAllHref} className="bg-[#3a6a4c] hover:bg-[#2c5339]  text-white px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors">
            View all reviews
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
