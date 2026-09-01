"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqs = [
  {
    title: "Deposit",
    content:
      "A deposit is required to secure your booking. The exact amount depends on the tour, but most escorted holidays require a minimum deposit of £250 per person. Final payment is due 10-12 weeks before departure.",
  },
  {
    title: "Flight upgrades",
    content:
      "We offer a range of flight upgrade options, including premium economy and business class, subject to availability. Please contact our team early so we can reserve the best available seats for your chosen airline.",
  },
  {
    title: "Egypt Visa information",
    content:
      "Visitors to Egypt normally require a visa. In many cases, visas can be obtained on arrival, but we recommend checking the latest entry requirements before travel and allowing time for any pre-arranged visas if needed.",
  },
];

export default function FAQsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-[#f8f7f4]">
        <section className="bg-white py-20">
          <div className="container-custom">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Home › FAQs</p>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">Further information</h1>
              <p className="max-w-3xl text-gray-600 leading-relaxed text-base">
                Find the answers to our most frequently asked questions about deposits, flight upgrades, visas, and more.
              </p>
            </div>
          </div>
        </section>

        <section className="container-custom py-16">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const open = index === expandedIndex;
              return (
                <div
                  key={faq.title}
                  className="overflow-hidden rounded-[22px] border border-[#e8461a] bg-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-gray-900"
                  >
                    <span className="font-semibold text-lg">{faq.title}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8461a] text-[#e8461a] transition-all duration-200">
                      {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>

                  <div className={`${open ? "max-h-96 pb-6" : "max-h-0"} overflow-hidden transition-all duration-300 px-6`}> 
                    <p className="text-gray-600 leading-relaxed text-base mt-0">
                      {faq.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
