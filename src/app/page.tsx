import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AwardsSection from "@/components/sections/AwardsSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import AboutSection from "@/components/sections/AboutSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import TestimonialSection from "@/components/sections/TestimonialsSection";
import TextBlockSection from "@/components/sections/TextBlockSection";
import RecommendedToursSection from "@/components/sections/RecommendedToursSection";
import { getCategories, getDestinations, getPackages } from "@/lib/content";

export default async function Home() {
  const [categories, destinations, packages] = await Promise.all([getCategories(), getDestinations(), getPackages()]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <AwardsSection />
        <DestinationsSection destinations={destinations} />
        <AboutSection />
        <CollectionsSection categories={categories} />
        <TestimonialSection />
        <TextBlockSection />
        <RecommendedToursSection packages={packages} categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
