import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDestinations, getPackages } from "@/lib/content";

interface PageProps {
  params: Promise<{ id: string }>;
}

const essentialInformation = [
  { label: "Time difference", value: "GMT +5.5 hrs" },
  { label: "Best time to visit", value: "April - October" },
  { label: "Official languages", value: "Hindi and English" },
  { label: "Currency", value: "Indian Rupee (INR)" },
  { label: "Flight time", value: "Around 9 hrs from UK" },
  { label: "Electricity", value: "Voltage: 230V; Plug type(s): C, D, M" },
];

function matchesDestination(
  tour: Awaited<ReturnType<typeof getPackages>>[number],
  destination: Awaited<ReturnType<typeof getDestinations>>[number],
) {
  const destinationValues = [destination.id, destination.slug, destination.name].map((value) => value.toLowerCase());
  return tour.destinationIds.some((id) => destinationValues.includes(id.toLowerCase()))
    || tour.destinations.some((name) => destinationValues.includes(name.toLowerCase()))
    || tour.country.toLowerCase().includes(destination.name.toLowerCase().replace(" pradesh", ""));
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const [destinations, packages] = await Promise.all([getDestinations(), getPackages()]);
  const destination = destinations.find((item) => item.id === resolvedParams.id || item.slug === resolvedParams.id);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  const tours = packages.filter((tour) => matchesDestination(tour, destination));
  const destinationName = destination.name.replace(/\s+tours?$/i, "");

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfaf7]">
      <Header />

      <main className="flex-1">

   <section className="relative overflow-hidden bg-black text-white m-5 rounded-[20px] flex items-center" style={{ minHeight: 420 }}>
          <Image src="/images/hero-bg.jpg" alt="A beautiful India Escapes journey" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3C3C3A]/35 via-[#3C3C3A]/55 to-[#3C3C3A]/95" />
          <div className="relative container-custom flex min-h-[440px] flex-col items-center justify-center py-24 text-center">
            {/* <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#FFDCD6]">Let&apos;s plan your journey</p> */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white mb-2 lg:mb-4 leading-tight drop-shadow-lg">{destination.pageHeading || destinationName}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{destination.description}</p>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">Home / Destinations / {destinationName}</p>
          </div>
        </section>



        <section id="tour-grid" className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#d8d4cc] pb-8 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#e8461a]">Escorted tours & holidays</p>
              <h2 className="heading-h2 text-[#173c4d]">Our {destinationName} tours collection</h2>
            </div>
            <p className="text-base font-semibold text-[#3c3c3a]/70">{tours.length} {tours.length === 1 ? "result" : "results"} found</p>
          </div>

          {tours.length ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <article key={tour.id} className="group flex h-full flex-col overflow-hidden border border-[#dedbd4] bg-white shadow-[0_10px_35px_rgba(23,60,77,0.08)]">
                  <Link href={tour.href} className="relative block aspect-[1.78] overflow-hidden">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    {tour.badge && <span className="absolute left-4 top-4 bg-[#e8461a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{tour.badge}</span>}
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#e8461a]">
                      <span className="inline-flex items-center gap-1"><MapPin size={14} /> {tour.country}</span>
                      {tour.duration && <span className="inline-flex items-center gap-1 text-[#173c4d]/65"><Clock3 size={14} /> {tour.duration}</span>}
                    </div>
                    <h3 className="heading-h4 text-[#173c4d] transition-colors group-hover:text-[#e8461a]"><Link href={tour.href}>{tour.title}</Link></h3>
                    <ul className="mt-5 flex-1 space-y-2 text-sm leading-relaxed text-[#3c3c3a]/75">
                      {tour.highlights.slice(0, 3).map((highlight) => <li key={highlight} className="flex gap-2"><span className="text-[#e8461a]">•</span><span>{highlight}</span></li>)}
                    </ul>
                    <div className="mt-6 flex items-end justify-between border-t border-[#ebe8e1] pt-5">
                      <div><p className="text-xs uppercase tracking-wider text-[#3c3c3a]/60">Prices from</p><p className="mt-1 text-xl font-bold text-[#173c4d]">{tour.priceFrom}</p><p className="text-xs text-[#3c3c3a]/60">{tour.pricePer}</p></div>
                      <Link href={tour.href} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#e8461a]">Find out more <ArrowRight size={16} /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[#c9c4ba] bg-white p-12 text-center text-[#3c3c3a]/70">No tours available for this destination right now.</div>
          )}
        </section>

        <section className="bg-[#173c4d] text-white">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_auto] lg:px-16">
            <div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">Plan your journey</p><h2 className="heading-h2 text-white">Book your next adventure</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">Enquire online or contact one of our friendly travel experts to start planning your {destinationName} escape.</p></div>
            <Link href="/contact" className="btn-primary justify-center">Enquire now <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="bg-[#f0ede6]">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[180px_1fr_auto] lg:px-16">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-8 border-white shadow-lg lg:mx-0"><Image src={destination.image} alt="India Escapes brochure" fill className="object-cover" sizes="160px" /></div>
            <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#e8461a]">Travel inspiration</p><h2 className="heading-h3 text-[#173c4d]">Request your FREE brochure</h2><p className="mt-3 text-lg text-[#3c3c3a]/75">Order for post or view our latest India Escapes journeys online.</p></div>
            <Link href="/contact" className="btn-primary justify-center">Request a brochure <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mb-10"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#e8461a]">Before you travel</p><h2 className="heading-h2 text-[#173c4d]">Essential information in {destinationName}</h2></div>
          <div className="grid border-l border-t border-[#d8d4cc] bg-white sm:grid-cols-2 lg:grid-cols-3">
            {essentialInformation.map((item) => <div key={item.label} className="border-b border-r border-[#d8d4cc] p-7"><div className="mb-4 flex items-center gap-3 text-[#e8461a]"><CalendarDays size={18} /><h3 className="text-sm font-bold uppercase tracking-wider">{item.label}</h3></div><p className="text-lg font-semibold text-[#173c4d]">{item.value}</p></div>)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
