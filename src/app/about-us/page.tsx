import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const featureCards = [
  {
    title: "Escorted Touring Experience",
    description:
      "Every tour is led by an expert travel director, with local guides and seamless logistics arranged so you can enjoy the journey rather than manage it.",
    image: "/images/dest-india.jpg",
  },
  {
    title: "So Much Included",
    description:
      "From premium coach travel and hand-picked hotels to authentic meals and immersive excursions, we include more of the moments that matter.",
    image: "/images/dest-japan.jpg",
  },
  {
    title: "Freedom & Flexibility",
    description:
      "Carefully planned itineraries let you explore with confidence, while optional freedom days give you time to discover at your own pace.",
    image: "/images/dest-srilanka.jpg",
  },
];

const awardsCards = [
  {
    title: "Award-winning service",
    description:
      "Recognised across the travel industry for quality and personal care, our awards reflect our dedication to exceptional holidays.",
    image: "/images/dest-australia.jpg",
  },
  {
    title: "Trusted by travellers",
    description:
      "Our guests return year after year because they know every detail will be taken care of with warmth and expertise.",
    image: "/images/dest-china.jpg",
  },
  {
    title: "Experienced travel experts",
    description:
      "Our team combines global knowledge with local insight so you can explore beautiful destinations with confidence.",
    image: "/images/dest-india.jpg",
  },
];

const videoQuote = [
  {
    label: "Founded with a vision",
    text: "We started with one simple belief: escorted touring could be more personal, more rewarding and more memorable.",
  },
  {
    label: "Travel with care",
    text: "Our team plans every holiday with handpicked guides, authentic experiences and thoughtful service from start to finish.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-black text-white m-5 rounded-[20px] flex items-center" style={{ minHeight: 420 }}>
          <Image
            src="/images/hero-bg.jpg"
            alt="About India Escapes"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/95" />

          <div className="relative container-custom h-full flex flex-col justify-center text-center py-24">
            {/* <p className="text-sm uppercase tracking-[0.35em] text-orange-300 mb-5"></p> */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white mb-2 lg:mb-4 leading-tight drop-shadow-lg">
              About us
            </h1>
            <p className="mt-2 max-w-3xl mx-auto text-base sm:text-lg text-gray-200 leading-relaxed">
              At India Escapes, we design once-in-a-lifetime escorted tours that connect you to iconic places, local people and unforgettable moments.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-custom max-w-5xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Why we exist</p>
            <h2 className="cs-section-heading">Meaningful travel, thoughtfully designed.</h2>
            <div className="mt-8 space-y-6 text-gray-600 text-base leading-relaxed">
              <p>
                At India Escapes, we believe life’s greatest journeys deserve to be done properly. We create once-in-a-lifetime tours that inspire, connect and stay with you forever.
                Each itinerary is carefully designed to reveal the world’s most iconic destinations, brought to life by expert tour managers and local partners who understand every detail matters.
                Our customers enjoy more than a holiday. They experience meaningful travel that builds connections, celebrates discovery and leaves lasting memories.
              </p>
            </div>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Our story</p>
              <h2 className="cs-section-heading">Built by people who love guiding holidays.</h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Our story began with a simple belief: escorted touring should be more flexible, more personal and more rewarding. We wanted to create journeys that feel curated and effortless from the moment you book.
                </p>
                <p>
                  Today, our values remain unchanged. We bring together thoughtful service, expert local knowledge and meaningful experiences so that every trip feels both memorable and easy.
                </p>
                <p>
                  From inspirational Freedom Days to carefully chosen hotels and immersive cultural experiences, we design every detail around what makes travel truly special.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
              <Image
                src="/images/dest-srilanka.jpg"
                alt="Our story video"
                width={1200}
                height={900}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/95 p-5 shadow-lg border border-white/70">
                  <div className="w-16 h-16 rounded-full bg-[#e8461a] flex items-center justify-center text-white text-2xl">
                    ▶
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-300 mb-2">Watch our story</p>
                <h3 className="text-3xl font-semibold text-white">Discover how we create extraordinary journeys.</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f9f7f3]">
          <div className="container-custom">
            <div className="grid gap-6 lg:grid-cols-3">
              {featureCards.map((card) => (
                <div key={card.title} className="relative overflow-hidden rounded-[28px] shadow-[0_18px_70px_rgba(15,23,42,0.08)] bg-white">
                  <div className="relative h-72">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h3 className="text-2xl font-semibold text-white mb-3">{card.title}</h3>
                      <p className="text-sm text-gray-100 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Meet the team</p>
              <h2 className="cs-section-heading">We are travel specialists, not just operators.</h2>
              <p className="text-gray-600 leading-relaxed text-base max-w-2xl">
                Our team of travel experts work behind the scenes to create unforgettable holidays. Every itinerary is supported by passionate consultants, knowledgeable managers and trusted local partners.
              </p>
              <p className="text-gray-600 leading-relaxed text-base max-w-2xl">
                From planning to departure, we are here to make your journey seamless, inspiring and genuinely memorable.
              </p>
              <Link href="/about-us/meet-the-team" className="btn-primary inline-flex mt-2">
                Meet the team
              </Link>
            </div>
            <div className="overflow-hidden rounded-[32px] shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
              <Image
                src="/images/dest-australia.jpg"
                alt="Meet the team"
                width={1200}
                height={900}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f4f1eb]">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Specialists in the extraordinary</p>
            <h2 className="cs-section-heading">Crafting journeys that feel effortless and unforgettable.</h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-base">
              Great customer service is at the heart of everything we do. Our holidays are carefully designed to exceed expectations while letting you travel with freedom and confidence.
            </p>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Refer a friend</p>
              <h2 className="cs-section-heading">Share the joy of travel and receive rewards.</h2>
              <p className="text-gray-600 leading-relaxed text-base max-w-2xl">
                As a thank you to our valued customers, our Refer a Friend programme rewards both you and your friend when they book with India Escapes.
              </p>
              <p className="text-gray-600 leading-relaxed text-base max-w-2xl">
                There’s no limit to how many friends you can refer — we’re happy to send as many gift cards as required to make your next holiday even better.
              </p>
              <Link href="/refer-a-friend" className="btn-outline inline-flex">
                Learn more
              </Link>
            </div>

            <div className="overflow-hidden rounded-[32px] relative shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
              <Image
                src="/images/dest-china.jpg"
                alt="Refer a friend"
                width={1200}
                height={900}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-2">Rewards for you</p>
                <h3 className="text-2xl font-semibold text-white">Create future holiday memories together.</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-3">
              {awardsCards.map((award) => (
                <div key={award.title} className="relative overflow-hidden rounded-[32px] shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                  <div className="relative h-72">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-8 bg-white">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{award.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Our impact</p>
              <h2 className="cs-section-heading">Travel that gives back to communities and the planet.</h2>
              <p className="text-gray-600 leading-relaxed text-base max-w-3xl">
                At India Escapes, we are passionate about travel and aim to take you far beyond expectations — not only through unforgettable experiences, but through the positive impact we create together.
              </p>
              <p className="text-gray-600 leading-relaxed text-base max-w-3xl">
                We believe meaningful journeys go hand in hand with supporting local communities, protecting cultural heritage and giving back — both in the destinations we visit and at home.
              </p>
            </div>

            <div className="overflow-hidden rounded-[32px] shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
              <Image
                src="/images/dest-australia.jpg"
                alt="Our impact"
                width={1200}
                height={900}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#1a2332] text-white py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-300 mb-3">Order your FREE India Escapes brochure now</p>
              <h2 className="text-4xl font-semibold max-w-3xl">Get our latest brochure sent straight to you free of charge.</h2>
              <p className="mt-5 max-w-3xl text-gray-300 leading-relaxed">
                Discover our most popular escorted tours, inspirational destinations and flexible booking options in one beautifully designed brochure.
              </p>
            </div>

            <form className="flex flex-col gap-4 sm:flex-row items-stretch sm:items-end">
              <div className="grid gap-4 sm:grid-cols-2 flex-1">
                <label className="block">
                  <span className="text-sm text-gray-300">First name</span>
                  <input
                    type="text"
                    placeholder="First name"
                    className="mt-2 w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-orange-300 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-300">Email address</span>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="mt-2 w-full rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-orange-300 focus:outline-none"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="btn-primary bg-orange-500 hover:bg-orange-600 text-white min-w-[180px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
