import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDestinations, getPackages } from "@/lib/content";

interface PageProps {
  params: { id: string };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const destinations = await getDestinations();
  const packages = await getPackages();
  const destination = destinations.find((item) => item.id === resolvedParams.id || item.slug === resolvedParams.id);
  const tours = destination ? packages.filter((tour) => tour.country.toLowerCase().includes(destination.name.toLowerCase().replace(" pradesh", ""))) : [];

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-[#f8f7f4]">
        <section className="flex items-center relative overflow-hidden bg-black text-white m-5 rounded-[20px]" style={{ minHeight: 520 }}>
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/95" />

          <div className="relative container-custom h-full flex flex-col justify-center py-24 text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white leading-tight">
              {destination.pageHeading || destination.name}
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-200 leading-relaxed">
              {destination.description}
            </p>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-300 mb-4">Home › Destinations › {destination.name}</p>

          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_0.9fr] items-start">
            <div className="space-y-8">
              <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-semibold text-gray-900">About {destination.name}</h2>
                <p className="mt-6 whitespace-pre-wrap text-gray-600 leading-relaxed">
                  {destination.fullDetail || destination.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900">Top experience</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">Discover handpicked tours, local guides and immersive experiences designed to bring this destination to life.</p>
                </div>
                <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900">Why choose {destination.name}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">From award-winning service to flexible booking options, travel with confidence on every escorted holiday.</p>
                </div>
              </div>

              <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Our tours in {destination.name}</h3>
                <div className="mt-6 space-y-6">
                  {tours.length ? (
                    tours.map((tour) => (
                      <Link
                        key={tour.id}
                        href={tour.href}
                        className="block rounded-3xl border border-gray-200 bg-[#f8f7f4] p-5 transition hover:border-[#e8461a]"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{tour.country}</p>
                            <h4 className="mt-2 text-xl font-semibold text-gray-900">{tour.title}</h4>
                          </div>
                          <div className="text-sm font-semibold text-[#e8461a]">{tour.priceFrom}</div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">{tour.highlights.join(" • ")}</div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-600">No tours available for this destination right now.</p>
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Key offer</p>
                <h3 className="mt-4 text-2xl font-semibold text-gray-900">{destination.offer}</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">Book your escorted holiday now to take advantage of our latest destination offers and special savings.</p>
              </div>

              <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">Need help planning?</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">Our travel experts can recommend the best tours, departures and optional upgrades for {destination.name}.</p>
                <Link href="/contact" className="btn-primary mt-6 inline-flex w-full justify-center">
                  Contact us
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
