import Image from "next/image";
import Link from "next/link";
import { getPackages, getPackageBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { TourItineraryAccordion } from "@/components/tours/TourItineraryAccordion";
import TourTemplate from "@/components/tours/TourTemplate";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{ country: string; tour: string }>;
}

function narrativeText(value: unknown): string {
  if (typeof value === "string") return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  if (Array.isArray(value)) return value.map((item) => narrativeText(item)).filter(Boolean).join(" ");
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map((item) => narrativeText(item)).filter(Boolean).join(" ");
  }
  return value == null ? "" : String(value).trim();
}

export async function generateStaticParams() {
  return (await getPackages()).map((packageItem) => ({ country: packageItem.countrySlug, tour: packageItem.slug }));
}

export default async function TourDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const candidate = (await getPackages()).find(
    (packageItem) => packageItem.countrySlug === resolvedParams.country && packageItem.slug === resolvedParams.tour,
  );
  const tour = candidate ? await getPackageBySlug(candidate.slug) : undefined;

  if (!tour) {
    return notFound();
  }

  const itineraryItems = tour.itinerary.length ? tour.itinerary : [{ day: "Overview", description: tour.overview }];
  const highlightCards = tour.highlights.length ? tour.highlights : [tour.summary, tour.overview];
  const inclusionCards = tour.inclusions.length ? tour.inclusions : ["Flights", "Accommodation", "Guided sightseeing", "Transfers"];
  const expenseItems = tour.expenses.length ? tour.expenses : ["Airfare supplements", "Optional excursions", "Travel insurance"];
  const importantItems = tour.importantInformation.length ? tour.importantInformation : [{ title: "Important information", description: tour.overview }];
  const galleryItems = tour.gallery.length ? tour.gallery : [tour.image, tour.image, tour.image];
  const heroImage = tour.image || galleryItems[0];
  const detailImage = tour.gallery[1] || tour.image || galleryItems[0];
  const mapImage = tour.gallery[2] || detailImage || tour.image;
  const accommodationImage = tour.gallery[3] || detailImage || tour.image;
  const firstDeparture = tour.departureDates[0] || tour.departing || "Flexible departures";
  const activeDay = itineraryItems[0];

  return (
    <main className="wrap">
      <Header />

      <TourTemplate tour={tour} />
      <Footer />
    </main>
  );
}
