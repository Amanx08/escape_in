import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCategories, getPackages } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({ type: category.slug }));
}

export default async function TourTypePage({ params }: PageProps) {
  const resolvedParams = await params;
  const categories = await getCategories();
  const normalizedType = resolvedParams.type.toLowerCase();
  const tourType = categories.find((category) => {
    const categorySlug = category.slug.toLowerCase();
    return categorySlug === normalizedType || category.name.toLowerCase().replace(/\s+/g, "-") === normalizedType;
  });
  const tours = (await getPackages()).filter((tour) => tour.types.some((type) => {
    const candidate = type.toLowerCase().replace(/\s+/g, "-");
    return candidate === normalizedType || type.toLowerCase() === normalizedType;
  }));

  if (!tourType) {
    return notFound();
  }

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
              Discover the best places to travel.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-200 leading-relaxed">
              Explore our escorted tours across the world’s most inspiring countries, with expertly crafted itineraries, award-winning service and flexible booking offers.
            </p>

            <p className="text-sm uppercase tracking-[0.35em] text-orange-300 my-4 ">Home › Destinations</p>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">{tours.length} results found</p>
              <h2 className="cs-section-heading mt-3">Browse {tourType.name}</h2>
            </div>
            <div className="space-x-2">
              <Link href="/tour-types" className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                View all tour types
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {tours.map((tour) => (
              <div key={tour.id} className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
                    {tour.badge && (
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
                        {tour.badge}
                      </span>
                    )}
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
                      {tour.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-3 text-sm text-gray-500">
                    <span>{tour.country}</span>
                    <span>•</span>
                    <span>{tour.departing}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    <Link href={`/${tour.countrySlug}/${tour.slug}`}>{tour.title}</Link>
                  </h3>
                  <ul className="mb-6 space-y-2 text-gray-600">
                    {tour.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 text-primary-500">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{tour.priceFrom}</div>
                      <div className="text-xs text-gray-500 mt-1">{tour.pricePer}</div>
                    </div>
                    <Link
                      href={`/${tour.countrySlug}/${tour.slug}`}
                      className="btn-primary"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
