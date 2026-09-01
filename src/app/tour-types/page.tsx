import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/content";

export const metadata = {
  title: "Tour Types | India Escapes",
  description: "Explore our escorted tour types including classic, private, cruise, rail and exclusively solos tours.",
};

export default async function TourTypesPage() {
  const tourTypes = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
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
              Tour Type
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-200 leading-relaxed">
              Explore our escorted tours across the world’s most inspiring countries, with expertly crafted itineraries, award-winning service and flexible booking offers.
            </p>

            <p className="text-sm uppercase tracking-[0.35em] text-orange-300 my-4 ">Home › Tour Type</p>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="max-w-3xl mb-12">
            <h2 className="cs-section-heading">Choose the right tour type for your next holiday</h2>
            <p className="mt-4 text-gray-600">
              Browse our most popular tour styles and discover inspiration for your next adventure.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tourTypes.map((type) => (
              <Link key={type.id} href={`/tour-types/${type.slug}`} className="group block overflow-hidden rounded-[24px] border border-gray-200 shadow-sm hover:shadow-lg transition-shadow bg-white">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/80">{type.offer}</p>
                    <h3 className="text-2xl font-semibold text-white mt-2">{type.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{type.tagline}</p>
                  <span className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-primary-500 uppercase">
                    Explore {type.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
