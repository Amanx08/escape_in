"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Phone, X, ArrowRight } from "lucide-react";
import siteData from "@/../data/site.json";
import navData from "@/../data/navigation.json";

interface MobileMenuProps {
  navData: typeof navData;
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const [tourTypes, setTourTypes] = useState<Array<{ id: string; name: string; href: string }>>([]);
  const [destinations, setDestinations] = useState<Array<{ id: string; name: string; href: string }>>([]);

  useEffect(() => {
    fetch("/api/categories").then((response) => response.json()).then(setTourTypes).catch(() => setTourTypes([]));
    fetch("/api/destinations").then((response) => response.json()).then(setDestinations).catch(() => setDestinations([]));
  }, []);

  const regions = destinations.length ? [{ name: "India", countries: destinations }] : navData.megaMenu.destinations.regions;
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleRegion = (region: string) => {
    setOpenRegion(openRegion === region ? null : region);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* Mobile menu header */}
      <div className="flex items-center justify-between px-5 h-[70px] border-b border-gray-100">
        <span className="font-bold text-gray-800 text-lg">Menu</span>
        <button
          onClick={onClose}
          className="p-2 text-gray-600 hover:text-gray-900"
          aria-label="Close mobile menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="px-5 py-4">
        {/* Destinations */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("destinations")}
            className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800"
          >
            Destinations
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${openSection === "destinations" ? "rotate-180" : ""}`}
            />
          </button>
          {openSection === "destinations" && (
            <div className="pb-4 pl-2">
              {regions.map((region) => (
                <div key={region.name} className="border-b border-gray-50 last:border-0">
                  <button
                    onClick={() => toggleRegion(region.name)}
                    className="flex items-center justify-between w-full py-3 text-left text-sm font-medium text-gray-700"
                  >
                    {region.name}
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${openRegion === region.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openRegion === region.name && (
                    <div className="pl-4 pb-3 space-y-2">
                      {region.countries.map((country, index) => (
                        <Link
                          key={`${country.href || country.name}-${index}`}
                          href={country.href}
                          onClick={onClose}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 py-1"
                        >
                          <ArrowRight size={12} />
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tour Types */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("tourtypes")}
            className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800"
          >
            Tour Types
            <ChevronDown size={18} className={`text-gray-500 transition-transform ${openSection === "tourtypes" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "tourtypes" && (
            <div className="pb-4 pl-2 space-y-2">
              {tourTypes.map((type) => (
                <Link key={type.id} href={type.href} onClick={onClose} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 py-1">
                  <ArrowRight size={12} />
                  {type.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* About Us */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("about")}
            className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800"
          >
            About Us
            <ChevronDown size={18} className={`text-gray-500 transition-transform ${openSection === "about" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "about" && (
            <div className="pb-4 pl-2 space-y-2">
              {[
                { label: "About us", href: "/about-us" },
                { label: "Why India Escapes", href: "/about-us/why" },
                { label: "Our awards", href: "/about-us/awards" },
                { label: "Meet the team", href: "/about-us/meet-the-team" },
                { label: "Customer reviews", href: "/about-us/customer-reviews" },
              ].map((link) => (
                <Link key={link.label} href={link.href} onClick={onClose} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 py-1">
                  <ArrowRight size={12} />
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Offers */}
        <div className="border-b border-gray-100">
          <Link href="/offers" onClick={onClose} className="flex items-center justify-between w-full py-4 font-medium text-gray-800">
            Offers
          </Link>
        </div>

        {/* Brochures */}
        <div className="border-b border-gray-100">
          <Link href="/our-brochures" onClick={onClose} className="flex items-center justify-between w-full py-4 font-medium text-gray-800">
            Brochures
          </Link>
        </div>

        {/* Contact */}
        <div className="border-b border-gray-100">
          <Link href="/contact" onClick={onClose} className="flex items-center justify-between w-full py-4 font-medium text-gray-800">
            Contact Us
          </Link>
        </div>

        {/* My Booking */}
        <div className="border-b border-gray-100">
          <Link href="https://mmb.indiaescapes.in" onClick={onClose} className="flex items-center justify-between w-full py-4 font-medium text-gray-800">
            My Booking
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-6 border-t border-gray-100 space-y-4">
        <a
          href={`tel:${siteData.phoneFree.replace(/\s/g, "")}`}
          className="flex items-center gap-3 text-gray-700"
        >
          <Phone size={20} className="text-primary-500" />
          <div>
            <div className="font-semibold text-gray-800">{siteData.phone}</div>
            <div className="text-xs text-gray-500">{siteData.phoneHours}</div>
          </div>
        </a>
        <Link
          href="/our-brochures"
          onClick={onClose}
          className="btn-primary w-full justify-center"
        >
          Request a brochure
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
