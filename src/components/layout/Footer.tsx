"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import footerData from "@/../data/footer.json";
import siteData from "@/../data/site.json";

export default function Footer() {
  const { social, bottomBar } = footerData;
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <footer className="bg-white text-gray-900">
      {/* Book with Confidence Banner */}
      <div className="bg-[#fde3d5] rounded-[12px] m-5 py-5 px-5" data-banner="true">
        <div className="fw-container-custom flex items-center justify-between py-3 px-6 sm:px-8">
          <p className="heading-h3 text-[#d43510] text-lg md:text-2xl font-bold mb-0 w-50 md:w-100 text-wrap md:text-nowrap">
            Our Book with Confidence Guarantee
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[#d43510] font-semibold text-sm hover:opacity-80"
          >
            Find out more
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="rounded-[12px] m-5 bg-[#3a3f3a] text-white pt-6 md:pt-12 px-6 sm:px-8">

        {/* Brochure CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="heading-h2">
             Order your FREE India Escapes brochure now
            </h2>
            {/* <p className="body-lg text-gray-300">
              Speak with our Himachal-based specialists about private journeys and handpicked stays.
            </p> */}
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#d43510] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Order now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      <hr className="border-t border-gray-200 mt-10" />


        <div className="flex flex-col lg:flex-row gap-0 md:gap-12 lg:gap-0 lg:items-start lg:justify-between">

          <div className="fw-container-custom pt-5 md:py-5">


           

            {/* Main Content Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-2 mt-5">
              {/* India Escapes Column */}
              {/* <div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">India Escapes</h3>
                <ul className="space-y-2.5">
                  <li><Link href="/about-us" className="text-sm text-gray-300 hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white">Talk to our team</Link></li>
                </ul>
              </div> */}
                   {/* Logo and Awards */}
            <div className=" flex flex-col sm:flex-row items-start pt-5 md-pt-0 justify-start gap-8">
              <img src="/images/main_weblogo.svg" alt={`${siteData.name} Logo`} className="h-18" />
              {/* <img src="/images/India Escapes red on white.svg" alt={`${siteData.name} Logo`} className="h-52" /> */}
            </div>

              {/* Holiday Inspiration Column */}
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-4">Holiday Inspiration</h3>
                <ul className="space-y-2.5 text-[16px]">
                  <li><Link href="/destinations" className="text-sm text-gray-300 hover:text-white">Destinations</Link></li>
                  <li><Link href="/tour-types" className="text-sm text-gray-300 hover:text-white">Tour Types</Link></li>
                  {/* <li><Link href="/blog" className="text-sm text-gray-300 hover:text-white">Travel journal</Link></li> */}
                </ul>
              </div>

              {/* Planning Column */}
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-4">Plan your journey</h3>
                <ul className="space-y-2.5 text-[16px]">
                  <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white">Request a quote</Link></li>
                  <li><Link href="/faqs" className="text-sm text-gray-300 hover:text-white">Travel FAQs</Link></li>
                </ul>
              </div>

              {/* Contact Us Column */}
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-4">Contact Us</h3>
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1 text-[16px]">{siteData.phoneHours}</p>
                  <a href={`tel:${siteData.phoneFree.replace(/\s/g, "")}`} className="text-2xl font-bold text-white hover:text-gray-300">
                    {siteData.phoneFree}
                  </a>
                </div>
                <ul className="space-y-2.5 text-[16px]">
                  <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white">Contact us</Link></li>
                  <li><Link href="/faqs" className="text-sm text-gray-300 hover:text-white">FAQs</Link></li>
                </ul>
              </div>

              {/* Other Links Column */}
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-4">Other Links</h3>
                <ul className="space-y-2.5 text-[16px]">
                  <li><Link href="/customer-reviews" className="text-sm text-gray-300 hover:text-white">Customer reviews</Link></li>
                  <li><Link href="/image-credits" className="text-sm text-gray-300 hover:text-white">Image Credits</Link></li>
                  <li><Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white">Cookie/Privacy</Link></li>
                  <li><Link href="/sitemap" className="text-sm text-gray-300 hover:text-white">Sitemap</Link></li>
                </ul>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-4">Follow us</h3>
                <div className="flex gap-4">
                  <a href={social.facebook} className="inline-flex items-center justify-center h-10 w-10 border-2 border-white rounded-full text-white hover:bg-white hover:text-[#3a3f3a] transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  </a>
                  <a href={social.instagram} className="inline-flex items-center justify-center h-10 w-10 border-2 border-white rounded-full text-white hover:bg-white hover:text-[#3a3f3a] transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Newsletter Signup and Social */}
            
          </div>
          {/* newsletter */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-4">Stay in the know</h3>
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="FIRST NAME"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-white text-gray-900 px-4 py-2.5 rounded text-sm placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#d43510]"
              />
              <input
                type="text"
                placeholder="LAST NAME"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-white text-gray-900 px-4 py-2.5 rounded text-sm placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#d43510]"
              />
              </div>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white text-gray-900 px-4 py-2.5 rounded text-sm placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#d43510]"
              />
            </div>
            <button className="inline-flex items-center gap-2 w-full bg-white text-[#d43510] px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition mb-4">
              Subscribe
              <ArrowRight size={14} />
            </button>
            <p className="text-xs text-gray-400 leading-5 pb-5">
              In accordance with the latest GDPR data regulations, you can unsubscribe from our emails at any time. You can read our privacy policy that provides further information about how we use personal data.
            </p>
          </div>

        </div>
      </div>


      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 px-5 pt-5">
        <div className="fw-container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Country Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">
                Country
              </label>
              <select className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded text-sm appearance-none cursor-pointer">
                <option>India (INR)</option>
              </select>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">
                {bottomBar.registered}
              </p>
              <p className="text-xs text-gray-600">
                {bottomBar.copyright}<br />
                {bottomBar.registration}
              </p>
            </div>

            {/* Trust Badges and Payment */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
              {/* <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-gray-600">India Escapes</span>
              </div> */}
              <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              {/* ABTOT */}
              <div className="p-2">
              <img src="/images/Ministry_of_Commerce_logo.svg" alt="MOC" className="h-10 object-cover" />
              </div>

              <div className="p-2">
              <img src="/images/life.png" alt="MOC" className="h-10 object-cover" />
              </div>

              <div className="p-2">
              <img src="/images/nidhi.png" alt="MOC" className="h-10 object-cover" />
              </div>

              <div className="p-2">
              <img src="/images/hp-tourism.png" alt="MOC" className="h-10 object-cover" />
              </div>
           
            </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setEnquiryOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#F24822] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition hover:bg-[#D84524] focus:outline-none focus:ring-2 focus:ring-[#D84524] focus:ring-offset-2"
        aria-label="Open request a quote form"
      >
        Request a quote
        <ArrowRight size={16} />
      </button>
      {enquiryOpen ? <EnquiryForm modal onClose={() => setEnquiryOpen(false)} /> : null}
    </footer>
  );
}
