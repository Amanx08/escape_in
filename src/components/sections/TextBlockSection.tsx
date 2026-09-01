"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TextBlockSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[3/2] w-full rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="/images/dest-japan.jpg" // Using an existing image that looks like Mt Fuji
              alt="At India Escapes, we only deal in the extraordinary"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="cs-section-heading">
              At India Escapes, we only deal in the extraordinary
            </h2>
            <p className="text-md text-gray-600 leading-relaxed">
              We meticulously plan our escorted touring holidays to ensure every detail is catered for. We carefully balance guided excursions and incredible experiences with the independence to explore at your own pace.
            </p>
            <p className="text-md text-gray-600 leading-relaxed">
              When you travel with India Escapes, you aren&apos;t simply a tourist; you are our guest, and we want to ensure you have the holiday of a lifetime.
            </p>
            <p className="text-md text-gray-600 leading-relaxed">
              If you have any questions about any of our escorted touring holidays or our business, our friendly experts are always happy to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
