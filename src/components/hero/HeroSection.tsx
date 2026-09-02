"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import heroData from "@/../data/hero.json";

export default function HeroSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    region: "",
    destination: "",
        departing: "",
  });
  const [destinationOptions, setDestinationOptions] = useState<string[]>([]);
  const [regionOptions, setRegionOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/destinations").then((response) => response.json()).then((items: Array<{ name: string; region: string }>) => {
      const uniqueDestinations = [...new Set(items.map((item) => item.name).filter(Boolean))];
      const uniqueRegions = [...new Set(items.map((item) => item.region).filter(Boolean))];

      setDestinationOptions(uniqueDestinations);
      setRegionOptions(uniqueRegions);
    }).catch(() => undefined);
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (formData.region) params.set("region", formData.region);
    if (formData.destination) params.set("destination", formData.destination);
    if (formData.departing) params.set("month", formData.departing);
    router.push(`/destinations${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (


    <section>
      <div className="relative w-full overflow-hidden cs-hero-section rounded-[20px]">
        {/* Background Image */}
        <div className="absolute inset-0 m-5">
          <Image
            src={heroData.backgroundImage}
            alt="India Escapes - For life's greatest journeys"
            fill
            priority
            quality={90}
            className="object-cover cs-hero-bg rounded-[20px]"
            style={{ objectPosition: "center 60%" }}
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>

        {/* Content */}

        <div className="relative h-full flex flex-col items-center justify-center lg:justify-end container-custom text-center text-white gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl w-full mx-auto "
          >
            <h1
              className="heading-h1 text-white mb-2 lg:mb-4 drop-shadow-lg"
            >
              {heroData.heading}
            </h1>
            <p className="subheading-lg text-white/90 mb-5 drop-shadow-md">
              {heroData.subheading}
            </p>

            {/* Feefo rating below search */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-5 lg:hidden"
            >
              <span className="font-bold text-white text-sm tracking-tight">Tripadvisor</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <span className="text-white text-md font-semibold">{heroData.feefo.rating}</span>
            </motion.div>
          </motion.div>

          {/* Search Form */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-8xl mx-auto mb-30 cs-form-container"
          >
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-[15px] shadow-2xl p-2 flex flex-col sm:flex-row items-stretch"
            >

              <div className="flex-1 flex items-stretch">
                {/* Region */}
                <div className="flex-1 relative border-r border-gray-200 flex items-center px-6">

                  <select
                    id="hero-region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full p-3 text-gray-700 bg-transparent appearance-none focus:outline-none cursor-pointer z-10 relative"
                  >
                    <option value="" disabled hidden>Region</option>
                    <option value="">Any Region</option>
                    {regionOptions.map((opt, index) => (
                      <option key={`${opt}-${index}`} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute z-20 right-4 text-red-500 pointer-events-none" />
                </div>

                {/* Destination */}
                <div className="flex-1 relative border-r border-gray-200 flex items-center px-6">
                  <select
                    id="hero-destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full p-3 text-gray-700 bg-transparent appearance-none focus:outline-none cursor-pointer z-10 relative"
                  >
                    <option value="" disabled hidden>Destination</option>
                    <option value="">Any Destination</option>
                    {destinationOptions.map((opt, index) => (
                      <option key={`${opt}-${index}`} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 text-red-500 pointer-events-none" />
                </div>

                {/* Month */}
                <div className="flex-1 relative flex items-center px-6">
                  <select
                    id="hero-departing"
                    value={formData.departing}
                    onChange={(e) => setFormData({ ...formData, departing: e.target.value })}
                    className="w-full p-3 text-gray-700 bg-transparent appearance-none focus:outline-none cursor-pointer z-10 relative"
                  >
                    <option value="" disabled hidden>Month</option>
                    <option value="">Any Month</option>
                    {heroData.search.fields[2].options.map((opt, index) => (
                      <option key={`${opt}-${index}`} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 text-red-500 pointer-events-pointer" />
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="bg-primary-hover hover:bg-[#b02910] text-white px-10 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-colors shrink-0 flex items-center justify-center gap-2 mt-2 sm:mt-0 sm:ml-2"
              >
                <Search size={18} />
                SEARCH
              </button>
            </form>

            {/* Feefo rating below search */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-5"
            >
              <span className="font-bold text-white text-2xl tracking-tight">Tripadvisor</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <span className="text-white text-2xl font-semibold">{heroData.feefo.rating}</span>
            </motion.div>

          </motion.div>


        </div>


      </div>


      {/* mobile searchbar */}
      <div className="bg-[#f4f4f4] border-2 border-[#d84d1f] rounded-[20px] mx-4 p-2 cs-searchform-mb">

         <form
              onSubmit={handleSearch}
              className="rounded-[15px] py-2 flex flex-col sm:flex-row items-stretch"
            >

              <div className="flex-1 flex flex-col items-stretch">
                {/* Region */}
                <div className="flex-1 relative flex items-center px-6 border-b border-[#d8d8d8]">

                  <select
                    id="hero-region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full p-3 text-gray-700 appearance-none focus:outline-none cursor-pointer z-10 relative"
                  >
                    {/* <option value="" disabled hidden>Region</option> */}
                    <option value=""> Region</option>
                    {regionOptions.map((opt, index) => (
                      <option key={`${opt}-${index}`} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute z-20 right-4 text-red-500 pointer-events-none" />
                </div>

                {/* Destination */}
                <div className="flex-1 relative border-b border-[#d8d8d8] flex items-center px-6">
                  <select
                    id="hero-destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full p-3 text-gray-700 bg-transparent appearance-none focus:outline-none cursor-pointer z-10 relative"
                  >
                    {/* <option value="" disabled hidden>Destination</option> */}
                    <option value=""> Destination</option>
                    {destinationOptions.map((opt, index) => (
                      <option key={`${opt}-${index}`} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 text-red-500 pointer-events-none" />
                </div>

                {/* Month */}
                <div className="flex-1 border-b border-[#d8d8d8] mb-2 relative flex items-center px-6">
                  <select
                    id="hero-departing"
                    value={formData.departing}
                    onChange={(e) => setFormData({ ...formData, departing: e.target.value })}
                    className="w-full p-3 text-gray-700 bg-transparent appearance-none focus:outline-none cursor-pointer z-10 relative"
                  >
                    {/* <option value="" disabled hidden>Month</option> */}
                    <option value=""> Month</option>
                    {heroData.search.fields[2].options.map((opt, index) => (
                      <option key={`${opt}-${index}`} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 text-red-500 pointer-events-pointer" />
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="bg-primary-hover hover:bg-[#b02910] text-white px-10 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-colors shrink-0 flex items-center justify-center gap-2 mt-2 sm:mt-0 sm:ml-2"
              >
                <Search size={18} />
                SEARCH
              </button>
            </form>

      </div>

    </section>

  );
}
