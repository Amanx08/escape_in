"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlogRecord, DestinationRecord } from "@/lib/content";

const pageSize = 9;
const filters = ["All", "Himachal Pradesh", "Culture", "Food & drink", "Wildlife", "Adventure"];

function formatDate(value: string) {
  if (!value) return "India Escapes journal";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function matchesFilter(blog: BlogRecord, filter: string) {
  if (filter === "All") return true;
  const haystack = `${blog.title} ${blog.excerpt} ${blog.body}`.toLowerCase();
  return haystack.includes(filter.toLowerCase()) || (filter === "Himachal Pradesh" && /spiti|shimla|himachal|himalaya|manali|kinnaur/.test(haystack));
}

export default function BlogHub({ blogs, destinations }: { blogs: BlogRecord[]; destinations: DestinationRecord[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const latest = blogs[0];
  const filteredBlogs = useMemo(() => blogs.filter((blog) => matchesFilter(blog, activeFilter) && `${blog.title} ${blog.excerpt}`.toLowerCase().includes(search.toLowerCase())), [activeFilter, blogs, search]);
  const totalPages = Math.max(1, Math.ceil(Math.max(filteredBlogs.length - 1, 0) / pageSize));
  const visibleBlogs = filteredBlogs.slice(1 + (page - 1) * pageSize, 1 + page * pageSize);

  const changeFilter = (filter: string) => { setActiveFilter(filter); setPage(1); };

  return <>
    <section className="relative overflow-hidden bg-black text-white m-5 rounded-[20px] flex items-center" style={{ minHeight: 420 }}>
      <div className="container-custom relative py-20 lg:py-28">
        <p className="text-sm uppercase tracking-[0.3em] text-[#f5b36a]">India Escapes journal</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl">Stories, routes and ideas for travelling India well.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Local knowledge, thoughtful inspiration and practical notes from the landscapes and places we love.</p>
        <div className="mt-10 max-w-xl rounded-full bg-white p-2 shadow-xl">
          <label className="flex items-center gap-3 px-4 text-gray-500"><Search size={19} /><span className="sr-only">Search the journal</span><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search the journal" className="w-full bg-transparent py-2 text-sm text-gray-900 outline-none" /></label>
        </div>
      </div>
    </section>

    <section className="container-custom py-16 lg:py-20">
      <div className="flex flex-col gap-5 border-b border-gray-200 pb-5 md:flex-row md:items-center md:justify-between"><h2 className="cs-section-heading">Our latest</h2><div className="flex gap-2 overflow-x-auto pb-1">{filters.map((filter) => <button key={filter} type="button" onClick={() => changeFilter(filter)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${activeFilter === filter ? "bg-[#e8461a] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{filter}</button>)}</div></div>
      {latest && activeFilter === "All" && !search ? <Link href={`/blog/${latest.slug}`} className="group mt-10 grid overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm md:grid-cols-[1.1fr_0.9fr]"><div className="relative min-h-[300px] bg-[#e9e2d8]">{latest.image ? <Image src={latest.image} alt={latest.title} fill className="object-cover transition duration-700 group-hover:scale-105" /> : null}</div><div className="flex flex-col justify-center p-8 lg:p-12"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e8461a]">Featured journal</p><h3 className="mt-4 text-4xl font-semibold leading-tight text-[#173c4d]">{latest.title}</h3><p className="mt-5 leading-7 text-gray-600">{latest.excerpt}</p><p className="mt-6 text-sm text-gray-500">{formatDate(latest.publishedAt)}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e8461a]">Read the story <ArrowRight size={16} /></span></div></Link> : null}
      {filteredBlogs.length > (latest && activeFilter === "All" && !search ? 1 : 0) ? <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{(latest && activeFilter === "All" && !search ? visibleBlogs : filteredBlogs.slice((page - 1) * pageSize, page * pageSize)).map((blog) => <Link key={blog.id} href={`/blog/${blog.slug}`} className="group overflow-hidden rounded-[22px] border border-gray-200 bg-white"><div className="relative aspect-[1.35] bg-[#e9e2d8]">{blog.image ? <Image src={blog.image} alt={blog.title} fill className="object-cover transition duration-700 group-hover:scale-105" /> : null}<span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#173c4d]">India travel</span></div><div className="p-6"><p className="text-xs uppercase tracking-[0.2em] text-gray-500">{formatDate(blog.publishedAt)}</p><h3 className="mt-3 text-2xl font-semibold leading-tight text-[#173c4d]">{blog.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{blog.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#e8461a]">Read more <ArrowRight size={15} /></span></div></Link>)}</div> : <div className="mt-12 rounded-[24px] border border-dashed border-gray-300 p-10 text-center text-gray-600">No journal entries match that search.</div>}
      {filteredBlogs.length > pageSize ? <div className="mt-12 flex items-center justify-center gap-3"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-full border border-gray-300 p-3 disabled:opacity-30" aria-label="Previous page"><ChevronLeft size={17} /></button><span className="text-sm text-gray-600">Page {page} of {totalPages}</span><button type="button" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-full border border-gray-300 p-3 disabled:opacity-30" aria-label="Next page"><ChevronRight size={17} /></button></div> : null}
    </section>

    <section className="bg-[#f3eee7] py-20"><div className="container-custom"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[0.25em] text-gray-500">Explore further</p><h2 className="mt-3 text-4xl font-semibold text-[#173c4d]">Browse India by destination</h2></div><Link href="/destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8461a]">All destinations <ArrowRight size={16} /></Link></div><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{destinations.slice(0, 8).map((destination) => <Link key={destination.id} href={destination.href} className="group relative h-52 overflow-hidden rounded-[18px] bg-gray-300"><Image src={destination.image} alt={destination.name} fill className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><span className="absolute bottom-4 left-4 text-lg font-semibold text-white">{destination.name}</span></Link>)}</div></div></section>
  </>;
}