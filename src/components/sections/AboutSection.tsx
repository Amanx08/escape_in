"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award } from "lucide-react";

const differencePoints = [
  {
    icon: Award,
    title: "Genuine local expertise",
    body: "Our team is based in the Himalayas and has personally explored every destination we offer, ensuring authentic recommendations, insider knowledge, and thoughtfully designed journeys across India.",
  },
  {
    icon: CheckCircle2,
    title: "Carefully Chosen Partners",
    body: "We work directly with trusted hotels, guides, and transport providers across India, allowing us to deliver consistent quality, better value, and seamless travel experiences.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Around the World",
    body: "Trusted by travellers from the UK, Australia, Europe, and beyond, we are associated with recognised tourism organisations and leading global travel platforms, ensuring confidence and reliability.",
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
              className="text-6xl"
            >
              The India escapes promise..
            </h2>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-4 mt-6">
              {/* ABTOT */}
              <div className="p-2">
              <img src="/images/Ministry_of_Commerce_logo.svg" alt="MOC" className="h-15 object-cover" />
              </div>

              <div className="p-2">
              <img src="/images/life.png" alt="MOC" className="h-15 object-cover" />
              </div>

              <div className="p-2">
              <img src="/images/nidhi.png" alt="MOC" className="h-15 object-cover" />
              </div>

              <div className="p-2">
              <img src="/images/hp-tourism.png" alt="MOC" className="h-15 object-cover" />
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
                  <p className="text-md text-gray-600 leading-relaxed" style={{ fontSize: '15px' }}>
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
