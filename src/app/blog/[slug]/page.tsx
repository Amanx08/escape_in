import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBlogs, getPackages } from "@/lib/content";

function articleBlocks(content: string) {
  return content.split(/<\/(?:p|h[1-6]|li)>/i).map((block) => block.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&rsquo;|&#8217;/g, "'").replace(/&ldquo;|&#8220;/g, '"').replace(/&rdquo;|&#8221;/g, '"').replace(/\s+/g, " ").trim()).filter((block) => block.length > 20);
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((item) => item.slug === slug);
  if (!blog) return notFound();
  const packages = await getPackages();
  const relatedBlogs = blogs.filter((item) => item.id !== blog.id).slice(0, 3);
  const blocks = articleBlocks(blog.body);
  return <div className="flex min-h-screen flex-col">

    <Header />
    <main className="flex-1 bg-[#fbfaf8]">
     


 <section className="relative overflow-hidden bg-black text-white m-5 rounded-[20px] flex items-center" style={{ minHeight: 420 }}>
          <Image src={blog.image} alt="A beautiful India Escapes journey" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3C3C3A]/35 via-[#3C3C3A]/55 to-[#3C3C3A]/95" />
          <div className="relative container-custom flex min-h-[440px] flex-col items-center justify-center py-24 text-center">
            {/* <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#FFDCD6]">Let&apos;s plan your journey</p> */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white mb-2 lg:mb-4 leading-tight drop-shadow-lg">{blog.title}</h1>
            
 <div className="container-custom pt-2 text-sm text-white">
        <Link href="/" className="hover:text-[#e8461a]">Home</Link>
        <span className="mx-2">/</span><Link href="/blog" className="hover:text-[#e8461a]">Blog</Link><span className="mx-2">/</span><span>{blog.title}</span>
        
        </div>

          </div>
        </section>


      <article className="container-custom pb-20 pt-12 lg:pt-16"><header className="mx-auto max-w-4xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8461a]">India Escapes journal</p>
      
      {/* <h1 className="mt-5 text-5xl font-semibold leading-tight text-[#173c4d] sm:text-6xl">{blog.title}</h1> */}
      
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500"><span>India travel</span>{blog.publishedAt ? <><span>•</span><time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time></> : null}</div></header>
        
        
        {/* {blog.image ? <div className="relative mx-auto mt-12 aspect-[2/1] max-w-5xl overflow-hidden rounded-[28px] bg-[#e9e2d8] shadow-[0_24px_70px_rgba(23,60,77,0.12)]">
        
        <Image src={blog.image} alt={blog.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
        </div> : null} */}


        <div className="mx-auto mt-14 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start"><div className="min-w-0"><p className="mb-10 text-xl font-medium leading-8 text-[#173c4d]">{blog.excerpt}</p><div className="space-y-7 text-lg leading-8 text-gray-700">{(blocks.length ? blocks : [blog.excerpt]).map((block, index) => <p key={`${block.slice(0, 20)}-${index}`}>{block}</p>)}</div></div><aside className="space-y-6 lg:sticky lg:top-28"><div className="rounded-[22px] bg-[#173c4d] p-6 text-white"><p className="text-xs uppercase tracking-[0.25em] text-[#f5b36a]">Plan your journey</p><h2 className="mt-3 text-2xl font-semibold">See India for yourself</h2><p className="mt-3 text-sm leading-6 text-white/75">Talk with our specialists about a private journey shaped around your interests.</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">Start planning <ArrowRight size={15} /></Link></div><div className="rounded-[22px] border border-gray-200 bg-white p-6"><h2 className="text-xl font-semibold text-[#173c4d]">Featured journeys</h2><div className="mt-5 space-y-4">{packages.slice(0, 2).map((packageItem) => <Link key={packageItem.id} href={packageItem.href} className="flex gap-3"><div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100"><Image src={packageItem.image} alt={packageItem.title} fill className="object-cover" sizes="64px" /></div><div><h3 className="text-sm font-semibold leading-5 text-[#173c4d]">{packageItem.title}</h3><p className="mt-1 text-xs text-gray-500">{packageItem.duration} days</p></div></Link>)}</div></div></aside></div>
      </article>
      {relatedBlogs.length ? <section className="border-t border-gray-200 bg-white py-20"><div className="container-custom"><div className="flex items-end justify-between gap-5"><div><p className="text-xs uppercase tracking-[0.25em] text-gray-500">Keep exploring</p><h2 className="mt-3 text-4xl font-semibold text-[#173c4d]">Other journal entries</h2></div><Link href="/blog" className="hidden items-center gap-2 text-sm font-semibold text-[#e8461a] sm:inline-flex">View all <ArrowRight size={15} /></Link></div><div className="mt-8 grid gap-6 md:grid-cols-3">{relatedBlogs.map((item) => <Link key={item.id} href={`/blog/${item.slug}`} className="group overflow-hidden rounded-[22px] border border-gray-200"><div className="relative aspect-[1.4] bg-[#e9e2d8]">{item.image ? <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" /> : null}</div><div className="p-5"><p className="text-xs uppercase tracking-[0.2em] text-gray-500">{formatDate(item.publishedAt)}</p><h3 className="mt-3 text-xl font-semibold leading-tight text-[#173c4d]">{item.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#e8461a]">Read more <ArrowRight size={14} /></span></div></Link>)}</div></div></section> : null}
    </main><Footer />

  </div>;
}

