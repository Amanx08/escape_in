"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award } from "lucide-react";

const differencePoints = [
  {
    icon: Award,
    title: "Specialists in the extraordinary",
    body: "We craft extraordinary award-winning tours to the world's most iconic places, backed by 29 British Travel Awards, including gold for Best Travel Company for Escorted Group Holidays 2025 and Feefo's Platinum Trusted status for consistently exceptional customer reviews.",
  },
  {
    icon: CheckCircle2,
    title: "Our price promise to you",
    body: "You can relax knowing you are paying the best price for your holiday with our Price Promise. Our philosophy is simple - the earlier you book the better the offer you will receive.",
  },
  {
    icon: ShieldCheck,
    title: "100% financial protection",
    body: "Book in the confidence your money is 100% safe. All India Escapes holidays are fully bonded by the Civil Aviation Authority (ATOL number 10913) or ABTOT (number 5427).",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="cs-section-heading "
            >
              The India Escapes difference...
            </h2>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-4 mt-6">
              {/* ABTOT */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-black">A</span>
                </div>
                <span className="text-xs font-semibold text-gray-600">ABTOT</span>
              </div>
              {/* ATOL */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-black">A</span>
                </div>
                <span className="text-xs font-semibold text-gray-600">ATOL</span>
              </div>
              {/* AITO */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <div className="w-8 h-8 bg-navy-800 border-2 border-blue-800 rounded flex items-center justify-center">
                  <span className="text-blue-800 text-xs font-black">A</span>
                </div>
                <span className="text-xs font-semibold text-gray-600">AITO</span>
              </div>
              {/* BTA */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <div className="w-8 h-8 bg-amber-600 rounded flex items-center justify-center">
                  <Award size={16} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-600">BTA Gold</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Difference points */}
          <div className="space-y-8">
            {differencePoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex gap-4 items-start"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#e8461a] flex items-center justify-center mt-1">
                  <point.icon size={16} className="text-[#e8461a]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1.5 text-2xl font-display">
                    {point.title}
                  </h3>
                  <p className="text-md text-gray-600 leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
