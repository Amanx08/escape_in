# India Escapes migration audit

## Local folder

`C:\Users\amanx\Downloads\india_es_local_changes`

## Source boundaries

- Appwrite is the primary source in `src/lib/content.ts` for `destinations`, `categories`, `packages`, and `blogs` when a server-only `APPWRITE_API_KEY` is configured and reads succeed.
- Local JSON is an explicit fallback for destinations, categories, and packages. The fallback lead region is India with a Himachal Pradesh route.
- Canva was reachable in the browser and used only as visual direction. No Appwrite catalog records were copied into Canva content.
- The Distant Journeys website was read only as information-architecture reference. Its UK identity, claims, currency, awards, and review-provider content are not approved for India Escapes.
- The legacy Drive source and Appwrite console both redirected to login. No live schema or legacy API implementation was claimed as fetched.

## Appwrite access

Configured identifiers are endpoint `https://fra.cloud.appwrite.io/v1`, project `69441e9b00062a6520c1`, database `694423e30037647a97c1`, and storage bucket `6944523e002d70d78c2e`. An unauthenticated collection probe returned `401 Unauthorized`. A real server-only `APPWRITE_API_KEY` is required to inspect attributes, permissions, indexes, relationships, and records.

The inventory requested for the live database is: `itinerary`, `packages`, `locations`, `activities`, `accommodations`, `tags`, `deals`, `destinations`, `categories`, `package_expenses`, `package_inclusions`, `package_exclusions`, `package_important_informaion`, `queries`, `labels`, `blogs`, `faq`, `reviews_stats`, `featured_image`, and `media_metadata`. Because the console was unavailable, none of the schema fields or relationship IDs can be truthfully confirmed here. The repository currently reads `destinations`, `categories`, `packages`, and `blogs`; related collections remain pending schema access.

`src/lib/content.ts` paginates reads in batches of 100, caches collection reads, and normalizes common aliases such as `slug`/`url`, `featured_image`/`image`, and `summary`/`description`. Package detail reads resolve itinerary, inclusions, exclusions, expenses, and important information by `package_id`; empty or failed reads select fallback records atomically.

## API contract

- `POST /api/query-form` remains server-side and accepts `name`, `email`, `mobile` or `phone`, `destination`, `message`, `query_type`, and optional metadata. Allowed types are `quote`, `callback`, `contact_form`, and `ms_form`.
- Browser forms now call that route; they do not expose Appwrite credentials or write directly from the browser.
- The legacy `send-mail` and `package-query` routes were not present in this local project and were not invented without the legacy source/schema.

## Routes and blogs

Implemented `/blog` and `/blog/[slug]`. Blog content is Appwrite-only with a truthful empty state when no readable records exist. Blog body output is rendered as text, not unsanitized HTML. Homepage category/package cards, category detail, destination listing/detail, and package detail use the normalized repository. The build generated all 45 Appwrite package routes.

## Validation

- `npm install`: passed before this migration session.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; Next generated 27 routes.
- `npm run lint`: zero errors, nine existing warnings.
- Runtime smoke test: `/`, `/tour-types`, and `/india-tours/footsteps-through-the-himalayas-royal-india` returned HTTP 200 from `http://localhost:3000`.
- Development log: only normal React DevTools information and successful compilations; no console error entries.
- `npm run validate:content`: intentionally fails while legacy international fallback files and old about/home sections still contain stale terms and dead links. Those remaining files require the authenticated Appwrite schema and approved Canva/legacy content decisions before deletion.

## Required deployment settings

`APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_DATABASE_ID`, `APPWRITE_BUCKET_ID`, `APPWRITE_API_KEY`, and `APPWRITE_QUERIES_COLLECTION_ID` are required names. The API key must remain server-only. Appwrite read permissions must allow the server key to list documents; query indexes should cover the relationship and slug fields used by production queries; the deployment origin must be added to Appwrite CORS if browser SDK reads are later approved.

No live Appwrite records were created, modified, or deleted. No commit, push, pull request, or remote change was made.