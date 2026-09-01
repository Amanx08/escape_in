import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/forms/ContactForm";
import Image from "next/image";
import Link from "next/link";
import siteData from "@/../data/site.json";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";

const officeHours = [
  ["Monday - Friday", "09:00 - 18:00"],
  ["Saturday", "09:00 - 18:00"],
  ["Sunday", "Closed"],
];

export default function ContactPage() {
  const phoneHref = `tel:${siteData.phoneFree.replace(/\s/g, "")}`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-black text-white m-5 rounded-[20px] flex items-center" style={{ minHeight: 420 }}>
          <Image src="/images/hero-bg.jpg" alt="A beautiful India Escapes journey" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3C3C3A]/35 via-[#3C3C3A]/55 to-[#3C3C3A]/95" />
          <div className="relative container-custom flex min-h-[440px] flex-col items-center justify-center py-24 text-center">
            {/* <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#FFDCD6]">Let&apos;s plan your journey</p> */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white mb-2 lg:mb-4 leading-tight drop-shadow-lg">Contact us</h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">Our specialists are here to help you find the right India escorted tour, tailor your plans, and answer every question.</p>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D84524]">Home <span className="px-2 text-[#3C3C3A]/40">›</span> Contact</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-[#3C3C3A] sm:text-5xl">Start planning something extraordinary.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#3C3C3A]/70">Complete the form and tell us what you have in mind. Whether you are ready to book or simply exploring ideas, our team will be happy to help.</p>
          </div>

          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
            <ContactForm />

            <aside className="space-y-5">
              <div className="rounded-[28px] bg-[#FFDCD6] p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D84524]">Speak to a specialist</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[#3C3C3A]">We&apos;re here to help</h2>
                <p className="mt-4 leading-7 text-[#3C3C3A]/75">Call us for advice about destinations, itineraries, availability, or your next great escape.</p>
                <a href={phoneHref} className="mt-6 inline-flex items-center gap-3 text-xl font-bold text-[#D84524] transition hover:text-[#3C3C3A]"><Phone size={20} /> {siteData.phoneFree}</a>
                <p className="mt-2 text-sm text-[#3C3C3A]/65">{siteData.phoneHours}</p>
              </div>

              <div className="rounded-[28px] border border-[#3C3C3A]/10 bg-white p-7 shadow-sm sm:p-8">
                <div className="flex items-center gap-3"><Clock3 className="text-[#3F8C57]" size={22} /><h2 className="font-display text-2xl font-semibold text-[#3C3C3A]">Opening hours</h2></div>
                <div className="mt-5 space-y-3">{officeHours.map(([day, hours]) => <div key={day} className="flex justify-between gap-4 border-b border-[#3C3C3A]/10 pb-3 text-sm text-[#3C3C3A]/70"><span>{day}</span><span className="font-semibold text-[#3C3C3A]">{hours}</span></div>)}</div>
              </div>

              <div className="rounded-[28px] border border-[#3C3C3A]/10 bg-white p-7 shadow-sm sm:p-8">
                <div className="flex items-center gap-3"><Mail className="text-[#D84524]" size={22} /><h2 className="font-display text-2xl font-semibold text-[#3C3C3A]">Email us</h2></div>
                <p className="mt-4 leading-7 text-[#3C3C3A]/70">Have a question or need a brochure? Send us a message and we&apos;ll get back to you.</p>
                <a href="mailto:hello@indiaescapes.in" className="mt-4 inline-block font-semibold text-[#D84524] underline decoration-[#D84524]/30 underline-offset-4">hello@indiaescapes.in</a>
              </div>

              <div className="rounded-[28px] bg-[#3C3C3A] p-7 text-white sm:p-8">
                <div className="flex items-center gap-3"><MapPin className="text-[#FFDCD6]" size={22} /><h2 className="font-display text-2xl font-semibold">India Escapes</h2></div>
                <p className="mt-4 leading-7 text-white/70">{siteData.address}</p>
                <Link href="/about-us" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FFDCD6] transition hover:text-white">Discover our story <ArrowRight size={16} /></Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
