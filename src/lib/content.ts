import { Client, Databases, Query } from "node-appwrite";
import destinationsFallback from "@/../data/destinations.json";
import collectionsFallback from "@/../data/collections.json";
import toursFallback from "@/../data/tours.json";

export type ContentSource = "appwrite" | "fallback";

export interface DestinationRecord {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  offer: string;
  image: string;
  images: string[];
  region: string;
  category: string;
  fullDetail: string;
  pageHeading: string;
  metaTitle: string;
  metaDescription: string;
  source: ContentSource;
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  tagline: string;
  offer: string;
  image: string;
  images: string[];
  pageHeading: string;
  metaTitle: string;
  metaDescription: string;
  source: ContentSource;
}

export interface PackageRecord {
  id: string;
  title: string;
  slug: string;
  country: string;
  href: string;
  summary: string;
  image: string;
  priceFrom: string;
  duration: string;
  highlights: string[];
  departing: string;
  pricePer: string;
  badge: string | null;
  types: string[];
  countrySlug: string;
  source: ContentSource;
  overview: string;
  gallery: string[];
  categories: string[];
  destinations: string[];
  locations: string[];
  activities: string[];
  itinerary: { day: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  expenses: string[];
  importantInformation: { title: string; description: string }[];
  priceDetails: { label: string; value: string }[];
  departureDates: string[];
}

export interface BlogRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image: string;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  source: ContentSource;
}

const endpoint = process.env.APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const projectId = process.env.APPWRITE_PROJECT_ID || "69441e9b00062a6520c1";
const databaseId = process.env.APPWRITE_DATABASE_ID || "694423e30037647a97c1";
const collectionCache = new Map<string, Promise<Record<string, unknown>[] | null>>();

function value(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const candidate = record[key];
    if (candidate !== undefined && candidate !== null && candidate !== "") return candidate;
  }
  return "";
}

function text(record: Record<string, unknown>, ...keys: string[]) {
  const candidate = value(record, ...keys);
  return typeof candidate === "string" ? candidate : String(candidate || "");
}

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeRouteSlug(input: string, fallbackLabel = "") {
  const candidate = (input || fallbackLabel || "").trim();
  if (!candidate) return "";

  const withoutQuery = candidate.split("?")[0].split("#")[0];
  const lastSegment = withoutQuery.split("/").filter(Boolean).pop() || withoutQuery;
  return slugify(lastSegment.replace(/^tour-types\//i, ""));
}

function plainText(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function decodeObjectString(value: string): string {
  const compact = value.trim();
  if (!compact) return "";
  if (!(compact.startsWith("{") || compact.startsWith("["))) return plainText(compact);

  try {
    const parsed = JSON.parse(compact.replace(/'/g, '"'));
    return normalizeNarrative(parsed);
  } catch {
    return plainText(compact);
  }
}

function normalizeNarrative(value: unknown): string {
  if (typeof value === "string") {
    const cleaned = value.trim();
    if (!cleaned) return "";
    if (cleaned.startsWith("{") || cleaned.startsWith("[")) {
      const parsed = decodeObjectString(cleaned);
      if (parsed) return parsed;
    }
    return plainText(cleaned);
  }
  if (Array.isArray(value)) return value.map((item) => normalizeNarrative(item)).filter(Boolean).join(" ");
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return Object.values(record)
      .map((item) => normalizeNarrative(item))
      .filter(Boolean)
      .join(" ");
  }
  return value === null || value === undefined ? "" : String(value).trim();
}

function stringArray(input: unknown) {
  return Array.isArray(input) ? input.map((item) => typeof item === "string" ? plainText(item) : String(item)).filter(Boolean) : [];
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [value];
    }
  }
  if (value !== null && value !== undefined && typeof value === "object") {
    return [value];
  }
  return [];
}

function extractTextFromObject(item: unknown): string {
  if (typeof item === "string") return plainText(item);
  if (!item || typeof item !== "object") return "";
  const record = item as Record<string, unknown>;
  const textValue = value(record, "title", "name", "label", "heading", "day", "value", "summary", "description", "details", "text");
  if (typeof textValue === "string") return plainText(textValue);
  if (typeof textValue === "number") return String(textValue);
  return normalizeNarrative(record).replace(/\s+/g, " ").trim();
}

function relatedText(input: unknown) {
  const items = asArray(input);
  return items.flatMap((item) => {
    if (typeof item === "string") {
      return plainText(item) ? [plainText(item)] : [];
    }
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const candidates = [
      value(record, "name", "title", "label", "heading", "value", "text", "summary"),
      value(record, "description", "details"),
      value(record, "inclusion"),
      value(record, "expense"),
      value(record, "exclusion"),
      value(record, "info"),
    ];
    return candidates
      .flatMap((candidate) => asArray(candidate).map((entry) => extractTextFromObject(entry)))
      .map((entry) => plainText(entry))
      .filter(Boolean);
  });
}

function relatedItinerary(input: unknown) {
  const items = asArray(input);

  return items.flatMap((item, index) => {
    if (typeof item === "string") {
      const cleaned = plainText(item);
      return cleaned ? [{ day: `Day ${index + 1}`, description: cleaned }] : [];
    }
    if (!item || typeof item !== "object") return [];

    const record = item as Record<string, unknown>;
    const rawDay = value(record, "day", "day_name", "title", "name", "label", "period");
    const rawDescription = value(record, "description", "details", "summary", "text", "itinerary", "content");
    const dayText =
      typeof rawDay === "string"
        ? plainText(rawDay)
        : typeof rawDay === "number"
          ? String(rawDay)
          : `Day ${index + 1}`;

    const descriptionText =
      typeof rawDescription === "string"
        ? plainText(rawDescription)
        : asArray(rawDescription)
            .map((entry) => normalizeNarrative(entry))
            .map((entry) => plainText(entry))
            .filter(Boolean)
            .join(" ") || normalizeNarrative(record).replace(/\s+/g, " ").trim();

    const finalDescription = plainText(descriptionText || normalizeNarrative(record));
    if (!finalDescription) return [];

    return [{ day: dayText || `Day ${index + 1}`, description: finalDescription }];
  });
}

function appwriteDatabases() {
  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  if (process.env.APPWRITE_API_KEY) client.setKey(process.env.APPWRITE_API_KEY);
  return new Databases(client);
}

async function readCollection(collectionId: string, queries: string[] = []) {
  const cacheKey = `${collectionId}:${queries.join("|")}`;
  const cached = collectionCache.get(cacheKey);
  if (cached) return cached;

  const readPromise = readCollectionUncached(collectionId, queries);
  collectionCache.set(cacheKey, readPromise);
  return readPromise;
}

async function readCollectionUncached(collectionId: string, queries: string[]) {
  const databases = appwriteDatabases();
  if (!databases) return null;

  try {
    const documents: Record<string, unknown>[] = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      const page = await databases.listDocuments(databaseId, collectionId, [...queries, Query.limit(limit), Query.offset(offset)]);
      documents.push(...(page.documents as unknown as Record<string, unknown>[]));
      if (page.documents.length < limit) return documents;
      offset += limit;
    }
  } catch (error) {
    console.error(`Appwrite read failed for ${collectionId}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

function destinationFallbackRecords(): DestinationRecord[] {
  const records = destinationsFallback.destinations
    .filter((item) => item.name.toLowerCase().includes("india") || item.name.toLowerCase().includes("himachal"))
    .map((item) => ({ ...item, slug: item.id, href: `/destinations/${item.id}`, images: [item.image], region: "India", category: "India travel", fullDetail: item.description, pageHeading: item.name, metaTitle: item.name, metaDescription: item.description, source: "fallback" as const }));
  return records.some((item) => item.slug === "himachal-pradesh") ? records : [...records, {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    href: "/destinations/himachal-pradesh",
    description: "Mountain journeys through Himachal Pradesh, shaped by local guides, quiet valleys and handpicked stays.",
    offer: "Private journeys from the Himalayas",
    image: "/images/hero-bg.jpg",
    images: ["/images/hero-bg.jpg"],
    region: "Himachal Pradesh",
    category: "Mountain journeys",
    fullDetail: "",
    pageHeading: "Himachal Pradesh journeys",
    metaTitle: "Himachal Pradesh Tours | India Escapes",
    metaDescription: "Explore Himachal Pradesh with India Escapes.",
    source: "fallback" as const,
  }];
}

function categoryFallbackRecords(): CategoryRecord[] {
  return collectionsFallback.collections
    .filter((item) => !/cruise|rail|solo/i.test(item.name))
    .map((item) => ({ id: item.id, name: item.name, slug: item.href.split("/").pop() || item.id, href: item.href, description: item.tagline, tagline: item.tagline, offer: item.offer, image: item.image, images: [item.image], pageHeading: item.name, metaTitle: item.name, metaDescription: item.tagline, source: "fallback" as const }));
}

function packageFallbackRecords(): PackageRecord[] {
  return toursFallback.tours
    .filter((item) => /india|himachal/i.test(item.country))
    .map((item) => ({ id: String(item.id), title: item.title, slug: item.href.split("/").pop() || slugify(item.title), country: item.country, href: item.href, summary: item.highlights.join(" "), image: item.image, priceFrom: item.priceFrom, duration: item.duration, highlights: item.highlights, departing: item.departing, pricePer: item.pricePer, badge: item.badge, types: item.types, countrySlug: item.href.split("/").filter(Boolean)[0] || slugify(item.country), source: "fallback" as const, overview: item.highlights.join(" "), gallery: [item.image], categories: item.types, destinations: [item.country], locations: [], activities: [], itinerary: [], inclusions: [], exclusions: [], expenses: [], importantInformation: [], priceDetails: [{ label: "Tour price", value: item.priceFrom }], departureDates: [item.departing] }));
}

export async function getDestinations() {
  const records = await readCollection("destinations");
  if (!records?.length) return destinationFallbackRecords();

  const usedSlugs = new Set<string>();
  const mapped = records.map((record) => {
    const name = text(record, "name", "title", "destination");
    const baseSlug = text(record, "slug", "url", "id") || slugify(name);
    const id = text(record, "$id", "id");
    const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-${id.slice(-6)}` : baseSlug;
    usedSlugs.add(slug);
    const images = stringArray(record.images);
    const image = text(record, "featured_image", "featuredImage", "image") || images[0] || "/images/hero-bg.jpg";
    return { id, name, slug, href: `/destinations/${slug}`, description: plainText(text(record, "description", "summary")), offer: text(record, "offer", "badge"), image, images: [image, ...images.filter((item) => item !== image)], region: text(record, "region"), category: text(record, "category"), fullDetail: plainText(text(record, "full_detail", "fullDetail")), pageHeading: text(record, "page_heading", "pageHeading") || name, metaTitle: text(record, "meta_title", "metaTitle") || name, metaDescription: text(record, "meta_description", "metaDescription") || text(record, "description"), source: "appwrite" as const };
  });

  const deduped = new Map<string, (typeof mapped)[number]>();
  for (const destination of mapped) {
    const key = destination.slug || destination.id || destination.name;
    if (!deduped.has(key)) deduped.set(key, destination);
  }

  return [...deduped.values()];
}

export async function getCategories() {
  const records = await readCollection("categories");
  const fallbackCategories = categoryFallbackRecords();
  if (!records?.length) return fallbackCategories;

  const mapped: CategoryRecord[] = records.map((record) => {
    const name = text(record, "name", "title", "category");
    const hrefValue = text(record, "href", "url", "path");
    const slug = normalizeRouteSlug(text(record, "slug", "href", "url", "path", "id"), name) || slugify(name);
    const images = Array.isArray(record.images) ? record.images.map(String) : [];
    const image = text(record, "featured_image", "featuredImage", "image") || images[0] || "/images/hero-bg.jpg";
    const href = hrefValue && hrefValue.includes("/tour-types/") ? hrefValue : `/tour-types/${slug}`;
    return { id: text(record, "$id", "id"), name, slug, href, description: text(record, "description", "summary"), tagline: text(record, "description", "summary"), offer: text(record, "offer", "badge"), image, images: [image, ...images.filter((item) => item !== image)], pageHeading: text(record, "page_heading", "pageHeading") || name, metaTitle: text(record, "meta_title", "metaTitle") || name, metaDescription: text(record, "meta_description", "metaDescription") || text(record, "description"), source: "appwrite" as const };
  });

  const merged = new Map<string, CategoryRecord>();
  for (const category of [...mapped, ...fallbackCategories]) {
    const key = category.slug || slugify(category.name);
    if (!merged.has(key)) merged.set(key, category);
  }

  return [...merged.values()];
}

export async function getPackages() {
  const records = await readCollection("packages");
  if (!records?.length) return packageFallbackRecords();
  const related = await Promise.all(["destinations", "categories"].map(async (collection) => [collection, await readCollection(collection)] as const));
  const relatedByCollection = new Map(related);
  return records.map((record) => {
    const title = text(record, "title", "name", "package_name");
    const slug = text(record, "slug", "url", "id") || slugify(title);
    const id = text(record, "$id", "id");
    const images = stringArray(record.images);
    const image = text(record, "featured_image", "featuredImage", "image") || images[0] || "/images/hero-bg.jpg";
    const categoryIds = stringArray(record.categories);
    const destinationIds = stringArray(record.destinations);
    const categoryRecords = relatedByCollection.get("categories") || [];
    const destinationRecords = relatedByCollection.get("destinations") || [];
    const categories = categoryIds.map((categoryId) => text(categoryRecords.find((item) => text(item, "$id", "id") === categoryId) || {}, "name") || categoryId);
    const destinations = destinationIds.map((destinationId) => text(destinationRecords.find((item) => text(item, "$id", "id") === destinationId) || {}, "name") || destinationId);
    const country = text(record, "country", "region") || "India";
    const priceFrom = text(record, "offer_price", "price", "price_from", "priceFrom") || "Enquire for price";
    const departing = text(record, "departing", "departure_dates");
    return { id, title, slug, country, href: slug.startsWith("/") ? slug : `/${slugify(country)}-tours/${slug}`, summary: plainText(text(record, "description", "summary", "short_description")), image, priceFrom, duration: text(record, "duration", "days"), highlights: stringArray(record.highlights), departing, pricePer: text(record, "price_per", "pricePer") || "Per person", badge: text(record, "badge") || null, types: categories, countrySlug: `${slugify(country)}-tours`, source: "appwrite" as const, overview: plainText(text(record, "description", "summary")), gallery: [image, ...images.filter((item) => item !== image)], categories, destinations, locations: stringArray(record.locations), activities: stringArray(record.activities), itinerary: [], inclusions: [], exclusions: [], expenses: [], importantInformation: [], priceDetails: [{ label: "Tour price", value: priceFrom }], departureDates: departing ? [departing] : [] };
  });
}

export async function getPackageBySlug(slug: string) {
  const packageItem = (await getPackages()).find((item) => item.slug === slug);
  if (!packageItem) return undefined;

  const collections = [
    "itinerary",
    "package_inclusions",
    "package_exclusions",
    "package_expenses",
    "package_important_informaion",
    "locations",
    "activities",
    "accommodations",
  ];

  const related = await Promise.all(
    collections.map(async (collection) => [
      collection,
      await readCollection(collection, [Query.equal("package_id", packageItem.id), Query.equal("packageId", packageItem.id)])
        .then((documents) => documents && documents.length ? documents : readCollection(collection, [Query.equal("package_id", packageItem.id)]))
        .then((documents) => documents && documents.length ? documents : readCollection(collection, [Query.equal("packageId", packageItem.id)])),
    ] as const)
  );

  const records = new Map(related);
  const getRecords = (collection: string) => records.get(collection) || [];

  const itineraryRecords = getRecords("itinerary");
  const inclusionRecords = getRecords("package_inclusions");
  const exclusionRecords = getRecords("package_exclusions");
  const expenseRecords = getRecords("package_expenses");
  const importantInfoRecords = getRecords("package_important_informaion");

  const itinerary = itineraryRecords.flatMap((record) => {
    const dayData = value(record, "days", "itinerary", "entries", "details", "items");
    if (dayData !== undefined && dayData !== "") {
      const nested = relatedItinerary(dayData);
      if (nested.length) return nested;
    }
    return relatedItinerary(record);
  });

  const inclusions = inclusionRecords.flatMap((record) => {
    const values = [
      value(record, "inclusions", "items", "list", "content", "details"),
      value(record, "description", "summary"),
    ];
    return values.flatMap((entry) => relatedText(entry));
  });

  const exclusions = exclusionRecords.flatMap((record) => {
    const values = [
      value(record, "exclusions", "items", "list", "content", "details"),
      value(record, "description", "summary"),
    ];
    return values.flatMap((entry) => relatedText(entry));
  });

  const expenses = expenseRecords.flatMap((record) => {
    const values = [
      value(record, "expenses", "items", "list", "content", "details"),
      value(record, "description", "summary"),
    ];
    return values.flatMap((entry) => relatedText(entry));
  });

  const importantInformation = importantInfoRecords.flatMap((record) => {
    const rawItems = [
      value(record, "items", "info", "details", "content", "list"),
      value(record, "description", "summary"),
    ];

    return rawItems.flatMap((entry) => {
      const nested = asArray(entry);
      if (!nested.length) return [];
      return nested.flatMap((item) => {
        if (typeof item === "string") {
          return [{ title: "Important information", description: plainText(item) }];
        }
        if (!item || typeof item !== "object") return [];
        const infoRecord = item as Record<string, unknown>;
        const title = plainText(text(infoRecord, "title", "name", "label") || "Important information");
        const description = plainText(text(infoRecord, "description", "details", "summary", "content") || extractTextFromObject(infoRecord));
        return description ? [{ title, description }] : [];
      });
    });
  });

  return {
    ...packageItem,
    itinerary: itinerary.length ? itinerary : packageItem.itinerary || [],
    inclusions: inclusions.length ? inclusions : packageItem.inclusions || [],
    exclusions: exclusions.length ? exclusions : packageItem.exclusions || [],
    expenses: expenses.length ? expenses : packageItem.expenses || [],
    importantInformation: importantInformation.length ? importantInformation : packageItem.importantInformation || [],
  };
}

export async function getBlogs() {
  const records = await readCollection("blogs");
  return (records || []).map((record) => {
    const title = text(record, "title", "name");
    const slug = text(record, "slug", "url", "id") || slugify(title);
    return { id: text(record, "$id", "id"), title, slug, excerpt: plainText(text(record, "short_description", "excerpt", "summary", "description")), body: text(record, "content", "body"), image: text(record, "featured_image", "featuredImage", "image"), publishedAt: text(record, "published_at", "publishedAt", "date", "$createdAt"), metaTitle: text(record, "meta_title", "metaTitle") || title, metaDescription: text(record, "meta_description", "metaDescription") || plainText(text(record, "short_description", "description")), source: "appwrite" as const };
  });
}