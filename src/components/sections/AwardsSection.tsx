"use client";

import { motion } from "framer-motion";
import { Award, Trophy, ShieldCheck, Star } from "lucide-react";
import awardsData from "@/../data/awards.json";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

const AwardBadge = ({ name, detail }: { name: string; detail: string }) => {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Laurel Wreath Mock */}
      <div className="relative w-20 h-20 flex flex-col items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-amber-500/80" fill="currentColor">
          <path d="M50,90 C20,90 10,60 10,40 C10,15 30,10 50,15 C70,10 90,15 90,40 C90,60 80,90 50,90 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
          <path d="M15,40 Q25,30 35,45 Q25,55 15,40 Z"/>
          <path d="M85,40 Q75,30 65,45 Q75,55 85,40 Z"/>
          <path d="M20,60 Q30,50 40,65 Q30,75 20,60 Z"/>
          <path d="M80,60 Q70,50 60,65 Q70,75 80,60 Z"/>
          <path d="M30,80 Q40,70 50,85 Q40,95 30,80 Z"/>
          <path d="M70,80 Q60,70 50,85 Q60,95 70,80 Z"/>
        </svg>
        <div className="z-10 mt-2 text-[#1a3d5c]">
          <Award size={20} className="mx-auto" />
          <span className="text-[10px] font-bold block mt-1 uppercase">Winner</span>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-800 leading-tight uppercase tracking-wide">{name}</p>
        <p className="text-[10px] text-gray-500 mt-1 uppercase">{detail}</p>
      </div>
    </div>
  );
};

export default function AwardsSection() {
  return (
    <section className="bg-white pt-20 border-b border-gray-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="cs-section-heading mb-5">
            {awardsData.heading}
          </h2>
          
          {/* <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-5">
            {awardsData.awards.map((award, i) => (
              <motion.div
                key={award.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <AwardBadge name={award.name} detail={award.detail} />
              </motion.div>
            ))}
          </div> */}

          <p className="text-sm md:text-lg text-gray-500 mt-5 mx-auto leading-relaxed">
            {awardsData.description}
          </p>
        </motion.div>


      </div>
    </section>
  );
}
