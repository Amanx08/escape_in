"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";

interface Country {
  name: string;
  href: string;
  image: string;
  offer: string;
  tours: string[];
}

interface Region {
  name: string;
  href: string;
  countries: Country[];
}

interface MegaMenuProps {
  activeMenu: string;
  navData: {
    megaMenu: {
      destinations: {
        regions: Region[];
      };
    };
  };
}

export default function MegaMenu({ activeMenu, navData }: MegaMenuProps) {
  const [categories, setCategories] = useState<Array<{ id: string; name: string; href: string; image: string; offer: string }>>([]);
  const [destinations, setDestinations] = useState<Array<{ id: string; name: string; href: string; image: string; offer: string }>>([]);
  useEffect(() => {
    fetch("/api/categories").then((response) => response.json()).then(setCategories).catch(() => setCategories([]));
    fetch("/api/destinations").then((response) => response.json()).then(setDestinations).catch(() => setDestinations([]));
  }, []);
  const [activeRegion, setActiveRegion] = useState<string>("asia");
  const [activeCountry, setActiveCountry] = useState<Country | null>(null);

  if (activeMenu !== "destinations") {
    // Tour Types, About Us, Offers mega menus
    return (
      <div className="bg-white border-t border-gray-100 shadow-mega">
        <div className="fw-container-custom py-8">
          {activeMenu === "tour types" && (
            <div>
              <p className="text-sm text-gray-600 mb-6 max-w-2xl">
                Discover your perfect adventure with our diverse range of tours. Whether you prefer escorted group journeys,
                independent solo travel, private custom experiences, scenic rail escapes, or unforgettable cruises.
              </p>
              <div className="grid grid-cols-4 gap-4">
                {categories.map((type) => (
                  <Link key={type.id} href={type.href} className="group block relative rounded-lg overflow-hidden aspect-video">
                    <Image src={type.image} alt={type.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs text-white/80 mb-1">{type.offer}</p>
                      <p className="font-semibold text-sm">{type.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeMenu === "about us" && (
            <div>
              <p className="text-sm text-gray-600 mb-6 max-w-2xl">
                We strive to go far beyond a holiday. We craft meaningful experiences that change perspectives and create lasting memories.
              </p>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { name: "About us", href: "/about-us", img: "/images/dest-india.jpg" },
                  { name: "Why India Escapes", href: "/about-us/why-india-escapes", img: "/images/dest-srilanka.jpg" },
                  { name: "Our awards", href: "/about-us/our-awards", img: "/images/dest-japan.jpg" },
                  { name: "Meet the team", href: "/about-us/meet-the-team", img: "/images/dest-australia.jpg" },
                  { name: "Customer reviews", href: "/about-us/customer-reviews", img: "/images/dest-china.jpg" },
                ].map((item) => (
                  <Link key={item.name} href={item.href} className="group block relative rounded-lg overflow-hidden aspect-video">
                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="font-semibold text-sm text-white">{item.name}</p>
                      <div className="mt-1.5 w-7 h-7 rounded-full bg-white/20 border border-white flex items-center justify-center">
                        <ArrowRight size={12} className="text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeMenu === "offers" && (
            <div>
              <p className="text-sm text-gray-600 mb-6 max-w-2xl">
                From last-minute savings, to Early Booking Offers for those planning ahead, we have great deals available across our escorted tours worldwide.
              </p>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { name: "All offers", href: "/offers", img: "/images/dest-china.jpg" },
                  { name: "Early booking offers", href: "/offers/early-booking", img: "/images/dest-india.jpg" },
                  { name: "Late availability", href: "/offers/late-availability", img: "/images/dest-srilanka.jpg" },
                  { name: "Australia & NZ offers", href: "/offers/australia-new-zealand", img: "/images/dest-australia.jpg" },
                  { name: "Refer a friend", href: "/refer-a-friend", img: "/images/dest-japan.jpg" },
                ].map((offer) => (
                  <Link key={offer.name} href={offer.href} className="group block relative rounded-lg overflow-hidden aspect-video">
                    <Image src={offer.img} alt={offer.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="font-semibold text-sm text-white">{offer.name}</p>
                      <div className="mt-1.5 w-7 h-7 rounded-full bg-white/20 border border-white flex items-center justify-center">
                        <ArrowRight size={12} className="text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Destinations mega menu
  const regions: Region[] = destinations.length ? [{ name: "India", href: "/destinations", countries: destinations.map((destination) => ({ ...destination, tours: [] })) }] : navData.megaMenu.destinations.regions;
  const currentRegion = regions.find((r) => r.name.toLowerCase() === activeRegion) || regions[0];
  const displayedCountry = activeCountry || currentRegion?.countries[0] || null;

  return (
    <div className="bg-white border-t border-gray-100 shadow-mega">
      <div className="flex" style={{ minHeight: "380px" }}>
        {/* Col 1: Region list */}
        <div className="bg-gray-50 w-44 shrink-0 py-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 mb-3">
            Destinations
          </h3>
          {regions.map((region) => (
            <button
              key={region.name}
              onMouseEnter={() => {
                setActiveRegion(region.name.toLowerCase());
                setActiveCountry(region.countries[0] || null);
              }}
              className={`w-full flex items-center justify-between px-5 py-2.5 text-sm font-medium transition-colors text-left ${
                activeRegion === region.name.toLowerCase()
                  ? "text-primary-500 bg-white border-r-2 border-primary-500"
                  : "text-gray-700 hover:text-primary-500 hover:bg-white"
              }`}
            >
              {region.name}
              <ChevronRight size={14} />
            </button>
          ))}
        </div>

        {/* Col 2: Country list in region */}
        <div className="w-64 shrink-0 py-6 border-r border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 mb-3">
            {currentRegion?.name}
          </h3>
          {currentRegion?.countries.map((country, index) => (
            <button
              key={`${country.href || country.name}-${index}`}
              onMouseEnter={() => setActiveCountry(country)}
              className={`w-full flex items-center justify-between px-5 py-2 text-sm transition-colors text-left ${
                activeCountry?.name === country.name
                  ? "text-primary-500 font-medium"
                  : "text-gray-700 hover:text-primary-500"
              }`}
            >
              <Link href={country.href} className="flex-1">
                {country.name}
              </Link>
              <ChevronRight size={14} />
            </button>
          ))}
        </div>

        {/* Col 3: Featured destination image + offer */}
        {displayedCountry && (
          <div className="w-64 shrink-0 py-6 px-5 border-r border-gray-100">
            <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-2">
              {displayedCountry.offer}
            </p>
            <Link href={displayedCountry.href} className="block relative rounded-lg overflow-hidden mb-3" style={{ height: "160px" }}>
              <Image src={displayedCountry.image} alt={displayedCountry.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-semibold text-lg">{displayedCountry.name}</p>
                <div className="mt-1 w-7 h-7 rounded-full bg-white/20 border border-white flex items-center justify-center">
                  <ArrowRight size={12} className="text-white" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Col 4: Popular tours */}
        {displayedCountry && (
          <div className="flex-1 py-6 px-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Our most popular {displayedCountry.name} tours
            </h3>
            <div className="grid grid-cols-3 gap-x-8 gap-y-2">
              {displayedCountry.tours.map((tour, index) => (
                <Link
                  key={`${displayedCountry.href}-${tour}-${index}`}
                  href={displayedCountry.href}
                  className="text-sm text-gray-600 hover:text-primary-500 py-1 flex items-start gap-1 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{tour}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href={displayedCountry.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#4a7c5c] hover:bg-[#3a6a4c] px-5 py-2 rounded-full transition-colors"
              >
                View all {displayedCountry.name} tours
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
