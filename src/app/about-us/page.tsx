import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

const featureCards = [
  {
    title: "Bespoke touring experiance",
    description:
      "Every journey is thoughtfully tailored to your interests, combining authentic local experiences, carefully selected accommodations, and seamless travel designed around your preferred pace.",
    image: "/images/dest-india.jpg",
  },
  {
    title: "So Much Included",
    description:
      "Enjoy exceptional value with handpicked hotels, private transport, experienced local guides, selected meals, sightseeing, and dedicated support included throughout your holiday.",
    image: "/images/dest-japan.jpg",
  },
  {
    title: "Freedom & Flexibility",
    description:
      "Travel with the confidence of a well-planned itinerary while enjoying the flexibility to personalise experiences and explore destinations at your own pace.",
    image: "/images/dest-srilanka.jpg",
  },
];

const awardsCards = [
  {
    title: "Dedicated travel expert",
    description:
      "From your first enquiry until you return home, your personal travel specialist provides expert advice, personalised planning, and dedicated support every step of the way.",
    image: "/images/dest-australia.jpg",
  },
  {
    title: "Trusted service ",
    description:
      "With recognised industry affiliations, excellent traveller reviews, and years of local expertise, we deliver reliable, transparent, and personalised service you can trust.",
    image: "/images/dest-china.jpg",
  },
  {
    title: "Travel with locals",
    description:
      "Experience India through local eyes with destination experts, trusted guides, and genuine cultural encounters that reveal the country's authentic beauty beyond the guidebooks.",
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

        <section className="py-10 bg-white">
          <div className="container-custom max-w-7xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Why we exist</p>
            <h2 className="cs-section-heading">Who We Are</h2>
            <div className="mt-8 space-y-6 text-gray-600 text-base leading-relaxed">
              <p>
                India Escapes is a locally owned and operated destination specialist, creating exceptional journeys across India for travellers from around the world. Based in the Himalayas of Himachal Pradesh, we design carefully curated holidays that combine authentic experiences, comfortable accommodation, and seamless travel.
                Unlike many international tour operators, we don't simply sell destinations—we live them. Every itinerary is built from first-hand knowledge, trusted local partnerships, and years of on-ground experience, allowing you to discover India with confidence, comfort, and authenticity. Whether you're exploring the vibrant cities of Rajasthan, the peaceful Himalayan foothills, or the dramatic landscapes of SpitiValley, our experienced team is committed to creating journeys that are personal, meaningful, and unforgettable.
              </p>
            </div>
          </div>
        </section>

        <section className="container-custom py-10">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-8">
              {/* <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Our story</p> */}
              <h2 className="cs-section-heading">Our story</h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  India Escapes was founded with one simple vision—to help travellers experience the real India through the eyes of local experts. What began as a passion for showcasing the beauty of Himachal Pradesh has grown into a trusted travel company designing tailor-made and small group journeys across the country. We believe the best travel experiences come from genuine local knowledge, honest advice, and carefully selected partners.
                  Today, we work directly with hotels, experienced guides, transport providers, and local communities throughout India. By removing unnecessary middlemen, we maintain higher service standards, better value, and greater flexibility for our guests.
                  Our success is built on trust, long-term relationships, and a genauine passion for sharing India's incredible culture, history landscapes, and hospitality.
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
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/95 p-5 shadow-lg border border-white/70">
                  <div className="w-16 h-16 rounded-full bg-[#e8461a] flex items-center justify-center text-white text-2xl">
                    ▶
                  </div>
                </div>
              </div> */}
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
              Behind every India Escapes holiday is a passionate team
of travel specialists dedicated to creating exceptional
experiences.

Based in Himachal Pradesh, our team has personally
travelled the destinations we recommend. From designing
itineraries and selecting hotels to providing support
throughout your holiday, we combine local expertise with
personalised service to ensure every journey runs
smoothly.

When you travel with India Escapes, you're not speaking
to a call centre—you are working directly with destination
specialists who know India inside and out.
              </p>
              {/* <Link href="/about-us/meet-the-team" className="btn-primary inline-flex mt-2">
                Meet the team
              </Link> */}
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
          <div className="container-custom max-w-7xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Specialists in the extraordinary</p>
            <h2 className="cs-section-heading">Crafting journeys that feel effortless and unforgettable.</h2>
            <p className="mt-6 text-gray-700 leading-relaxed text-base">
              We specialise in journeys that go beyond the ordinary.

Whether it's exploring the remote monasteries of Spiti Valley, travelling aboard the UNESCO-listed Kalka–Shimla Toy Train,
staying in heritage hotels, or discovering hidden villages in the Himalayas, we create experiences that reveal the true character
of India.

Every journey is carefully designed to balance iconic landmarks with authentic local experiences, giving you the opportunity to
connect with India's culture, people, and landscapes in a meaningful way.

Through trusted local partnerships, personalised planning, and dedicated on-ground support, we transform great holidays into
unforgettable memories.
            </p>
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Refer a friend</p>
              <h2 className="cs-section-heading">Share the joy of travel and receive rewards.</h2>
              <p className="text-gray-600 leading-relaxed text-base max-w-2xl">
               Behind every India Escapes holiday is a passionate team
of travel specialists dedicated to creating exceptional
experiences.

Based in Himachal Pradesh, our team has personally
travelled the destinations we recommend. From designing
itineraries and selecting hotels to providing support
throughout your holiday, we combine local expertise with
personalised service to ensure every journey runs
smoothly.

When you travel with India Escapes, you're not speaking
to a call centre—you are working directly with destination
specialists who know India inside and out.
              </p>
              {/* <Link href="/refer-a-friend" className="btn-outline inline-flex">
                Learn more
              </Link> */}
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
{/* 
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
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
