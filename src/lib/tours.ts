import collectionsData from "@/../data/collections.json";
import toursData from "@/../data/tours.json";

type CollectionEntry = (typeof collectionsData)["collections"][number];

type RawTourEntry = (typeof toursData)["tours"][number];

export interface TourType {
  id: string;
  name: string;
  tagline: string;
  offer: string;
  image: string;
  href: string;
  slug: string;
}

export interface Tour {
  id: number;
  country: string;
  badge: string | null;
  types: string[];
  title: string;
  highlights: string[];
  departing: string;
  duration: string;
  priceFrom: string;
  pricePer: string;
  image: string;
  href: string;
  slug: string;
  countrySlug: string;
  summary: string;
  overview: string;
  itinerary: {
    day: string;
    description: string;
  }[];
  inclusions: string[];
  departureDates: string[];
  priceDetails: { label: string; value: string }[];
  gallery: string[];
}

const tourTypes: TourType[] = collectionsData.collections.map((item) => ({
  ...item,
  slug: item.href.replace("/tour-types/", ""),
}));

const tours: Tour[] = toursData.tours.map((tour) => {
  const segments = tour.href.split("/").filter(Boolean);
  const countrySlug = segments[0] || "";
  const slug = segments[1] || "";

  const details = getTourDetails(tour);

  return {
    ...tour,
    slug,
    countrySlug,
    summary: details.summary,
    overview: details.overview,
    itinerary: details.itinerary,
    inclusions: details.inclusions,
    departureDates: details.departureDates,
    priceDetails: details.priceDetails,
    gallery: details.gallery,
  };
});

function getTourDetails(tour: RawTourEntry) {
  switch (tour.title) {
    case "The Very Best of Vietnam & Cambodia":
      return {
        summary:
          "Discover the best of Vietnam and Cambodia with immersive cruises, UNESCO temples and cultural highlights in one unforgettable adventure.",
        overview:
          "This iconic itinerary combines the highlights of Vietnam and Cambodia with a four-night Mekong River cruise, a two-night stay on Ha Long Bay and guided visits to the ancient temples of Angkor.",
        itinerary: [
          { day: "Days 1–4", description: "Begin in Hanoi, explore the Old Quarter and travel to Halong Bay for an overnight cruise." },
          { day: "Days 5–8", description: "Fly to Danang and discover the ancient town of Hoi An before travelling to Ho Chi Minh City." },
          { day: "Days 9–13", description: "Set sail along the Mekong River, visiting floating markets and rural villages before crossing into Cambodia." },
          { day: "Days 14–16", description: "Stay in Siem Reap to explore Angkor Wat, Bayon and Ta Prohm before returning home." },
        ],
        inclusions: [
          "Return international flights",
          "All guided tours and entrance fees",
          "Accommodation in handpicked hotels and river cruise cabins",
          "Most meals and transfers throughout the tour",
        ],
        departureDates: ["Oct 2026", "Nov 2026", "Jan 2027", "Mar 2027"],
        priceDetails: [
          { label: "Solo traveller supplement", value: "£695" },
          { label: "Deposit required", value: "£600" },
        ],
        gallery: ["/images/dest-china.jpg", "/images/dest-vietnam.jpg", "/images/dest-cambodia.jpg"],
      };
    case "The Very Best of Sri Lanka":
      return {
        summary:
          "A classic Sri Lanka tour that blends wildlife, culture and coastal relaxation with memorable visits to tea country and safari parks.",
        overview:
          "Experience Sri Lanka from the ancient city of Sigiriya to the lush tea plantations of Nuwara Eliya, with a safari in Yala and time on the southern coast.",
        itinerary: [
          { day: "Days 1–3", description: "Explore Colombo and the hill station of Kandy with a visit to the Temple of the Tooth." },
          { day: "Days 4–7", description: "Visit the rock fortress at Sigiriya, the spice gardens of Matale and the tea plantations near Nuwara Eliya." },
          { day: "Days 8–11", description: "Enjoy a safari in Yala National Park and discover the southern coastal towns and beaches." },
          { day: "Days 12–16", description: "Relax by the sea in Galle before returning home via Colombo." },
        ],
        inclusions: [
          "Flights and local transfers",
          "All accommodation and domestic travel",
          "Expert local guides and excursions",
          "Most breakfasts, lunches and dinners",
        ],
        departureDates: ["Jan 2027", "Feb 2027", "Mar 2027", "Apr 2027"],
        priceDetails: [
          { label: "Single room supplement", value: "£395" },
          { label: "Price based on 2 sharing", value: "From £3,695" },
        ],
        gallery: ["/images/dest-srilanka.jpg", "/images/dest-culture.jpg", "/images/dest-nature.jpg"],
      };
    case "The Very Best of Costa Rica":
      return {
        summary:
          "A rainforest adventure through Costa Rica, with wildlife-rich national parks, volcanic landscapes and Caribbean coast highlights.",
        overview:
          "This 19-day journey visits Tortuguero, Arenal, Monteverde and the Pacific coast, offering a blend of wildlife safaris, cultural experiences and nature walks.",
        itinerary: [
          { day: "Days 1–4", description: "Arrive in San José and transfer to Tortuguero for canal cruises and wildlife spotting." },
          { day: "Days 5–9", description: "Explore Arenal's volcano and rainforest, then continue to Monteverde's cloud forest." },
          { day: "Days 10–14", description: "Head to the Pacific coast for beach time and relaxation near Manuel Antonio." },
          { day: "Days 15–19", description: "Return to San José for a final city tour before flying home." },
        ],
        inclusions: [
          "Return international flights",
          "Park entrance fees and guided tours",
          "Accommodation in boutique hotels and eco-lodges",
          "Most meals included",
        ],
        departureDates: ["Nov 2026", "Dec 2026", "Jan 2027", "Mar 2027"],
        priceDetails: [
          { label: "Beach extension available", value: "From £395" },
          { label: "Price based on 2 sharing", value: "From £5,795" },
        ],
        gallery: ["/images/dest-forest.jpg", "/images/dest-beach.jpg", "/images/dest-costa-rica.jpg"],
      };
    case "Spectacular New Zealand":
      return {
        summary:
          "An iconic New Zealand tour featuring scenic fjords, volcanic landscapes and Māori culture across both islands.",
        overview:
          "Travel from Auckland to Queenstown via Rotorua, Milford Sound and the South Island's dramatic alpine scenery on this 29-day journey.",
        itinerary: [
          { day: "Days 1–6", description: "Start in Auckland and explore the North Island, including Rotorua and the Bay of Islands." },
          { day: "Days 7–14", description: "Cross to the South Island and visit Wellington, Kaikōura, Christchurch and Franz Josef." },
          { day: "Days 15–22", description: "Enjoy Queenstown, Milford Sound cruise and the Central Otago wine region." },
          { day: "Days 23–29", description: "Finish with the Mackenzie Country, Lake Tekapo and return to Auckland via Christchurch." },
        ],
        inclusions: [
          "Inter-island flights and rail journeys",
          "Handpicked hotels and lodges",
          "Guided sightseeing and experiences",
          "Most breakfasts, select lunches and dinners",
        ],
        departureDates: ["Jan 2027", "Feb 2027", "Mar 2027", "Apr 2027"],
        priceDetails: [
          { label: "Early booking discount", value: "£250" },
          { label: "Price based on 2 sharing", value: "From £6,995" },
        ],
        gallery: ["/images/dest-australia.jpg", "/images/dest-nz-1.jpg", "/images/dest-nz-2.jpg"],
      };
    case "The Very Best of Japan":
      return {
        summary:
          "A feature-rich tour of Japan that includes city life, historic temples, countryside gardens and a traditional ryokan stay.",
        overview:
          "From Tokyo and Kyoto to Hakone and Mount Fuji, this 20-day itinerary blends cultural highlights, cuisine and scenic journeys.",
        itinerary: [
          { day: "Days 1–5", description: "Explore Tokyo's neighbourhoods, museums and markets before travelling to Nikko." },
          { day: "Days 6–10", description: "Visit Kyoto's temples, Nara's deer park and the cultural heart of Japan." },
          { day: "Days 11–15", description: "Discover Osaka, Hiroshima and Miyajima before returning to Tokyo via Hakone." },
          { day: "Days 16–20", description: "Enjoy a Mount Fuji viewpoint, a ryokan stay and traditional experiences before departure." },
        ],
        inclusions: [
          "Japan Rail Pass or similar transport package",
          "Hotel accommodation and select meals",
          "Guided city tours and temple visits",
          "Airport transfers and local assistance",
        ],
        departureDates: ["Mar 2027", "Apr 2027", "May 2027", "Nov 2027"],
        priceDetails: [
          { label: "Single supplement", value: "£450" },
          { label: "Price based on 2 sharing", value: "From £6,295" },
        ],
        gallery: ["/images/dest-japan.jpg", "/images/dest-tokyo.jpg", "/images/dest-kyoto.jpg"],
      };
    case "The Golden Triangle & Goa":
      return {
        summary:
          "A classic India tour combining the iconic Golden Triangle with Goa's beaches, palaces and cultural highlights.",
        overview:
          "Discover Delhi, Agra and Jaipur before flying to Goa for a relaxing beach stay and a taste of India's coastal charm.",
        itinerary: [
          { day: "Days 1–4", description: "Arrive in Delhi and tour the city's historic monuments and bustling markets." },
          { day: "Days 5–8", description: "Visit the Taj Mahal in Agra and explore the Pink City of Jaipur." },
          { day: "Days 9–11", description: "Fly to Goa, relax on the beach and explore the Portuguese heritage." },
          { day: "Days 12–14", description: "Enjoy Goa's coastline, markets and local cuisine before heading home." },
        ],
        inclusions: [
          "Domestic flights and touring transport",
          "Hotels with breakfast included",
          "Guided sightseeing and cultural visits",
          "Airport transfers and select meals",
        ],
        departureDates: ["Oct 2026", "Nov 2026", "Feb 2027", "Mar 2027"],
        priceDetails: [
          { label: "Single room supplement", value: "£320" },
          { label: "Price based on 2 sharing", value: "From £3,295" },
        ],
        gallery: ["/images/dest-india.jpg", "/images/dest-taj-mahal.jpg", "/images/dest-goa.jpg"],
      };
    case "Spectacular South Africa":
      return {
        summary:
          "A South Africa journey with safari, wine country and scenic coastline for a memorable adventure.",
        overview:
          "From Kruger National Park to Cape Town and the Cape Winelands, this tour showcases South Africa's stunning diversity.",
        itinerary: [
          { day: "Days 1–5", description: "Begin with safari days in Kruger National Park, searching for the Big Five." },
          { day: "Days 6–11", description: "Travel to Cape Town via Johannesburg and explore the city, Table Mountain and the Peninsula." },
          { day: "Days 12–15", description: "Visit the Cape Winelands, Hermanus and scenic coastal drives before departure." },
          { day: "Days 16–18", description: "Enjoy final city time in Cape Town and a farewell dinner before flying home." },
        ],
        inclusions: [
          "Safari lodge accommodation and game drives",
          "Domestic flights and transfers",
          "Guided Cape Town tours and tastings",
          "Most breakfasts and selected dinners",
        ],
        departureDates: ["Jun 2027", "Jul 2027", "Aug 2027", "Sep 2027"],
        priceDetails: [
          { label: "Single room supplement", value: "£550" },
          { label: "Price based on 2 sharing", value: "From £5,495" },
        ],
        gallery: ["/images/dest-southafrica.jpg", "/images/dest-safari.jpg", "/images/dest-cape-town.jpg"],
      };
    case "Essential Australia":
      return {
        summary:
          "A wide-ranging Australia tour that includes Sydney, the Great Barrier Reef, Uluru and dramatic coastal landscapes.",
        overview:
          "Experience Australia’s must-see highlights on this 19-day journey from Sydney to the Red Centre and up to Cairns.",
        itinerary: [
          { day: "Days 1–5", description: "Start in Sydney with harbour views, coastal walks and cultural sightseeing." },
          { day: "Days 6–10", description: "Travel to Uluru and explore the Red Centre with sunrise and sunset experiences." },
          { day: "Days 11–15", description: "Visit the Great Barrier Reef region and take a scenic cruise." },
          { day: "Days 16–19", description: "Return to Sydney area, then depart from Australia after your final overnight stay." },
        ],
        inclusions: [
          "Domestic flights and tour transport",
          "Select accommodation and meals",
          "Guided experiences at major landmarks",
          "Airport transfers and local assistance",
        ],
        departureDates: ["Apr 2027", "May 2027", "Jun 2027", "Oct 2027"],
        priceDetails: [
          { label: "Early booking offer", value: "£250" },
          { label: "Price based on 2 sharing", value: "From £5,195" },
        ],
        gallery: ["/images/dest-australia.jpg", "/images/dest-sydney.jpg", "/images/dest-uluru.jpg"],
      };
    default:
      return {
        summary: "Discover a beautifully designed escorted tour with curated experiences and local guides.",
        overview: "Explore every destination with comfortable travel, expert guides and authentic experiences.",
        itinerary: [
          { day: "Day 1", description: "Arrive, settle in and meet your tour director." },
          { day: "Day 2", description: "Visit key sights, enjoy local meals and learn about the destination." },
          { day: "Day 3", description: "Continue the guided journey with scenic highlights and cultural experiences." },
        ],
        inclusions: ["Flights, accommodation, guided tours, and many meals included."],
        departureDates: ["2026", "2027"],
        priceDetails: [{ label: "Tour price", value: tour.priceFrom }],
        gallery: [tour.image],
      };
  }
}

export function getTourTypes(): TourType[] {
  return tourTypes;
}

export function getTourTypeBySlug(slug: string): TourType | undefined {
  return tourTypes.find((type) => type.slug === slug);
}

export function getToursByTypeSlug(slug: string): Tour[] {
  return tours.filter((tour) => tour.types.some((type) => type.toLowerCase().replace(/\s+/g, "-") === slug));
}

export function getAllTourTypeParams() {
  return tourTypes.map((type) => ({ type: type.slug }));
}

export function getAllTourParams() {
  return tours.map((tour) => ({ country: tour.countrySlug, tour: tour.slug }));
}

export function getTourByCountryAndSlug(country: string, slug: string): Tour | undefined {
  return tours.find((tour) => tour.countrySlug === country && tour.slug === slug);
}

export function getFeaturedTours(count = 6): Tour[] {
  return tours.slice(0, count);
}

export function getTours(): Tour[] {
  return tours;
}
