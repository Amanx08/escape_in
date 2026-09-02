import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import DestinationResults from "@/components/destinations/DestinationResults";
import { getDestinations } from "@/lib/content";

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-[#f8f7f4]">

        <section className="flex items-center relative overflow-hidden bg-black text-white m-5 rounded-[20px]" style={{ minHeight: 520 }}>
          <Image
            src="/images/hero-bg.jpg"
            alt="Destinations"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />

          <div className="relative container-custom h-full flex flex-col justify-center py-24 text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white leading-tight">
              Discover the best places to travel.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-200 leading-relaxed">
              Explore our escorted tours across the world’s most inspiring countries, with expertly crafted itineraries, award-winning service and flexible booking offers.
            </p>

            <p className="text-sm uppercase tracking-[0.35em] text-orange-300 my-4 ">Home › Destinations</p>
          </div>
        </section> 

        

        <section className="container-custom py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="cs-section-heading">India Escapes destinations</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Travel across India with local insight, thoughtful service and unforgettable experiences.
            </p>
          </div>

          <Suspense fallback={<div className="rounded-[24px] bg-white p-8 text-center text-[#3C3C3A]/70">Loading destinations...</div>}>
            <DestinationResults destinations={destinations} />
          </Suspense>
        </section>

        <section className="bg-white py-20">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Why choose our destinations</p>
                <h2 className="cs-section-heading">Travel with award-winning expertise.</h2>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  Every destination is supported by our experienced team, trusted local partners and a commitment to value, safety and unforgettable experiences.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Handpicked guided itineraries",
                  "Small groups and private options",
                  "Award-winning customer service",
                  "Flexible booking offers",
                ].map((item) => (
                  <div key={item} className="rounded-[28px] border border-gray-200 bg-[#f8f7f4] p-6">
                    <p className="text-sm font-semibold text-gray-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
}
