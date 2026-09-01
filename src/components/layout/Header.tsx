"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/../data/site.json";
import navData from "@/../data/navigation.json";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import EnquiryForm from "@/components/forms/EnquiryForm";

const supportedNavData = {
  ...navData,
  topBar: navData.topBar.filter((item) => item.href !== "/our-brochures"),
  megaMenu: {
    ...navData.megaMenu,
    destinations: {
      ...navData.megaMenu.destinations,
      regions: navData.megaMenu.destinations.regions.filter((region) => region.name === "Asia").map((region) => ({
        ...region,
        name: "India",
        countries: region.countries.filter((country) => country.name === "India"),
      })),
    },
  },
};

export default function Header() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // No scroll state needed as header is always white


  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = (label: string, hasMega: boolean) => {
    if (!hasMega) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveMega(label.toLowerCase());
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
      hoverTimeoutRef.current = null;
    }, 200);
  };

  const handleMegaMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const isTransparent = false; // Header is always white in new design

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 py-2 bg-white transition-all duration-300"
      >
        {/* Main nav bar */}
        <div className="fw-container-custom">
          <div className="flex items-center justify-between h-[70px] lg:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 mr-8 lg:mr-12">
              <div className="flex items-center gap-2">
                <div className="relative text-[#e8461a] flex items-center gap-2">
                  {/* <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="India Escapes Logo"
                  >
                    <circle cx="20" cy="20" r="16" fill="currentColor" />
                    <path d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4zm0 2.5c1.5 0 3.5 2.2 4.8 6H15.2c1.3-3.8 3.3-6 4.8-6zm-6 6h12c.3 1.1.5 2.3.6 3.5H13.4c.1-1.2.3-2.4.6-3.5zM6.5 20c0-1.2.2-2.4.4-3.5h5.9c-.1 1.1-.2 2.3-.2 3.5s.1 2.4.2 3.5H6.9c-.2-1.1-.4-2.3-.4-3.5zm1.8 6H13c.5 2 1.2 3.7 2.1 5-2.6-1-4.7-2.8-6.1-5zm3.7 0h11c-1.3 3.8-3.3 6-4.8 6s-3.5-2.2-4.8-6h-.4zm11.6 5c.9-1.3 1.6-3 2.1-5h4.7c-1.4 2.2-3.5 4-6.8 5zm3.3-7.5c.1-1.1.2-2.3.2-3.5s-.1-2.4-.2-3.5h5.9c.2 1.1.4 2.3.4 3.5s-.2 2.4-.4 3.5h-5.9z" fill="white" />
                  </svg> */}
                  <img src="/images/India Escapes red on white.svg" alt="India Escapes Logo" width={150} />
                  
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {supportedNavData.topBar.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label, item.hasMega)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-[13px] font-semibold tracking-wide uppercase rounded-md transition-colors duration-200 text-gray-700 hover:text-primary-500 ${activeMega === item.label.toLowerCase() ? "text-primary-500" : ""}`}
                  >
                    {item.label}
                    {item.hasMega && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeMega === item.label.toLowerCase() ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side: phone + CTA */}
            <div className="hidden lg:flex items-center gap-10 shrink-0 border-l border-gray-200 pl-4">
              <a
                href={`tel:${siteData.phoneFree.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors text-gray-700 hover:text-primary-500"
              >
                <div className="text-primary-500">
                  <Phone size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-none mb-1">Call free today</span>
                  <span className="text-lg font-bold text-gray-900 leading-none">{siteData.phoneFree}</span>
                </div>
              </a>
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="bg-[#F24822] hover:bg-[#D84524] text-white px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D84524] focus:ring-offset-2"
              >
                Request a quote
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              className={`lg:hidden p-2 rounded-full transition-colors ${isTransparent ? "text-white" : "text-gray-700"
                }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute left-0 right-0 top-full"
              onMouseEnter={handleMegaMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MegaMenu activeMenu={activeMega} navData={supportedNavData} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {enquiryOpen ? <EnquiryForm modal onClose={() => setEnquiryOpen(false)} /> : null}

      {/* Spacer to keep page content below the fixed header */}
      <div className="h-[70px] lg:h-[80px]" aria-hidden />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            navData={supportedNavData}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
