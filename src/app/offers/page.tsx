import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    title: "Early booking offers",
    description:
      "Plan ahead for thoughtful India journeys with handpicked stays and local guides.",
    image: "/images/dest-india.jpg",
    href: "/offers/early-booking",
  },
  {
    title: "Late availability",
    description:
      "Speak with our Himachal-based specialists about current availability and private journeys.",
    image: "/images/dest-srilanka.jpg",
    href: "/offers/late-availability",
  },
];

const testimonials = [
  {
    quote: "The adviser I spoke to was informative, knowledgeable and friendly; he made the booking procedure very straightforward.",
    author: "Booking Made Easy",
  },
  {
    quote: "Brilliant and very efficient service from start to finish — we felt looked after every step of the way.",
    author: "Joe Was Very Efficient",
  },
];

export default function OffersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-black text-white m-5 rounded-[20px] flex items-center" style={{ minHeight: 420 }}>
          <Image
            src="/images/hero-bg.jpg"
            alt="Special offers"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />

          <div className="relative container-custom h-full flex flex-col justify-center py-24 text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white mb-2 lg:mb-4 leading-tight drop-shadow-lg">
              Special offers
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-5 font-medium drop-shadow-md">
              Explore current India Escapes journeys and speak with our team about availability.
            </p>

            <p className="text-sm uppercase tracking-[0.35em] text-orange-300 mb-4">Home › Special Offers</p>

            {/* <div className="mt-10 inline-flex items-center gap-4 rounded-full bg-white/10 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-1 text-white">
                <span className="text-lg font-semibold">4.9/5</span>
                <span className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                  ))}
                </span>
              </div>
            </div> */}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom max-w-5xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Offer highlights</p>
            <h2 className="cs-section-heading">From last-minute savings to Early Booking Offers for those planning ahead.</h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              We have selected opportunities across India, with flexible planning support from our local team.
            </p>
          </div>
        </section>

        <section className="container-custom pb-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {offers.map((offer) => (
              <Link
                key={offer.title}
                href={offer.href}
                className="group relative overflow-hidden rounded-[28px] shadow-[0_25px_80px_rgba(15,23,42,0.12)]"
              >
                <div className="relative h-96">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">{offer.title}</span>
                  <h3 className="text-3xl font-semibold text-white mb-4">{offer.title}</h3>
                  <p className="max-w-xl text-sm text-white/90 leading-relaxed">{offer.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-white font-semibold">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10">→</span>
                    View offers
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

       

        <section className="py-16 bg-[#f9f7f3]">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_0.9fr] items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Customer testimonials</p>
                <h2 className="cs-section-heading">Customer testimonials</h2>
                <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl">
                  Hear from travellers who value thoughtful planning and personal service.
                </p>
              </div>

              <div className="space-y-6">
                {testimonials.map((item) => (
                  <div key={item.author} className="rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} className="h-3.5 w-3.5 rounded-full bg-[#fbbf24]" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed">“{item.quote}”</p>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">{item.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#1a3d5c] bg-white px-8 py-3 text-sm font-semibold text-[#1a3d5c] transition-colors hover:bg-[#1a3d5c] hover:text-white">
                View all reviews
              </Link>
            </div>
          </div>
        </section>

        <section className="container-custom py-20 text-center text-sm text-gray-500">
          Full details on terms and conditions can be found on offer pages.
        </section>
      </main>

      <Footer />
    </div>
  );
}
