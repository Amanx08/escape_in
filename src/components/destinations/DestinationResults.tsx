"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

type Destination = {
  id: string;
  name: string;
  offer: string;
  description: string;
  image: string;
  region?: string;
  href: string;
};

export default function DestinationResults({ destinations }: { destinations: readonly Destination[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = {
    region: searchParams.get("region") || "",
    destination: searchParams.get("destination") || "",
    month: searchParams.get("month") || "",
  };

  const visibleDestinations = destinations.filter((item) => {
    const destinationMatches = !filters.destination || item.name.toLowerCase() === filters.destination.toLowerCase();
    const regionMatches = !filters.region || item.region?.toLowerCase() === filters.region.toLowerCase();
    return destinationMatches && regionMatches;
  });
  const hasFilters = Boolean(filters.region || filters.destination || filters.month);

  const clearFilters = () => router.replace("/destinations");

  return (
    <>
      {hasFilters ? (
        <div className="mb-8 flex flex-col gap-4 rounded-[24px] border border-[#D84524]/20 bg-[#FFF0EB] p-5 text-sm text-[#3C3C3A] sm:flex-row sm:items-center sm:justify-between">
          <p>Showing {filters.destination || filters.region || "all destinations"}{filters.month ? ` for departures in ${filters.month}` : ""}.</p>
          <button type="button" onClick={clearFilters} className="font-semibold text-[#D84524] underline underline-offset-4">Clear search</button>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleDestinations.map((destination) => (
          <Link key={destination.id} href={destination.href} className="group block overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <div className="relative h-72 overflow-hidden">
              <Image src={destination.image} alt={destination.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-gray-900">{destination.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8461a]">Offer</span>
              </div>
              {/* <p className="mb-5 text-sm leading-relaxed text-gray-600">{destination.description}</p> */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-gray-700">{destination.offer}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#e8461a] transition-colors duration-200 group-hover:bg-[#e8461a] group-hover:text-white">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasFilters && visibleDestinations.length === 0 ? (
        <div className="mt-8 rounded-[24px] border border-dashed border-[#3C3C3A]/20 p-8 text-center text-[#3C3C3A]/70">We could not find a destination matching those filters. <button type="button" onClick={clearFilters} className="font-semibold text-[#D84524] underline underline-offset-4">Clear the search</button> and try again.</div>
      ) : null}
    </>
  );
}
