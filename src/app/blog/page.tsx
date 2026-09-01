import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogHub from "@/components/blog/BlogHub";
import { getBlogs, getDestinations } from "@/lib/content";

export default async function BlogPage() {
  const blogs = await getBlogs();
  const destinations = await getDestinations();
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1 bg-[#f8f7f4]"><BlogHub blogs={blogs} destinations={destinations} /></main><Footer /></div>;
}