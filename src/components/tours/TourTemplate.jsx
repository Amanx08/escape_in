"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "./TourTemplate.css";
import HeroSection from "../hero/HeroSection";
import { truncateWords } from "../../utils/truncateWords.js";

export default function TourPage({ tour }) {

  // const itineraryDays = (tour?.itinerary?.length ? tour.itinerary : [{ day: "Overview", description: tour?.overview || "This itinerary will be updated soon." }]).map((item, index) => ({
  //   id: String(index + 1),
  //   title: item.day || `Day ${index + 1}`,
  //   description: item.description || tour?.overview || "This itinerary will be updated soon.",
  // }));

  const itineraryDays = (
    tour?.itinerary?.length
      ? tour.itinerary
      : []
  ).map((item, index) => {
    let parsed = {};

    try {
      parsed = JSON.parse(item.description);
    } catch {
      parsed = {};
    }

    return {
      ...item,
      ...parsed,
      id: String(index + 1),
    };
  });



  const galleryItems = (tour?.gallery?.length ? tour.gallery : [tour?.image, tour?.image, tour?.image]).filter(Boolean);
  const heroImage = tour?.image || galleryItems[0] || "";
  const firstDeparture = tour?.departureDates?.[0] || tour?.departing || "Flexible departures";
  const summary = tour?.summary || "";
  const offerText =
    summary || "Special pricing available for selected departures.";

  const { truncated, isTruncated } = truncateWords(
    offerText,
    60
  );
  const title = tour?.title || "Tour";

  const [showFullSummary, setShowFullSummary] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("Request a brochure");
  const [freedom, setFreedom] = useState("Hanoi");

  const activeDay = itineraryDays[selectedDay] ?? itineraryDays[0];

  const freedomMap = {
    Hanoi: {
      title: "Discover Ninh Binh",
      image:
        "https://cdn.distantjourneys.co.uk/3af5d31c-2dc7-4ac6-b9e2-b39900d02c4f_Original%20file.jpg?apr_optimization=true&quality=75&width=416&height=234&fit=crop&format=webp&precrop=true",
    },
    "Hoi An": {
      title: "Hoi An Cookery Class",
      image:
        "https://cdn.distantjourneys.co.uk/165514d5-b69c-4a8b-b23c-b21100da7a3d/AdobeStock_342808573_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true",
    },
    Hue: {
      title: "Royal Palace discovery",
      image:
        "https://cdn.distantjourneys.co.uk/14273df1-bb3c-4392-8f59-b20b00c988fa/AdobeStock_119603331_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true",
    },
    "Siem Reap": {
      title: "Angkor temple experience",
      image:
        "https://cdn.distantjourneys.co.uk/18b3c8c3-8c0f-4f2f-a4b6-b20b00dc0d0f/AdobeStock_199989342_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true",
    },
  };

  const openModal = (label) => {
    setModalLabel(label);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main id="top" className="wrap">

        <section style={{ minHeight: 520 }}>
          <div className="flex items-center relative overflow-hidden text-white m-5 rounded-[20px]" style={{ minHeight: 520 }}>
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src='https://cdn.distantjourneys.co.uk/2f2e5929-e030-4c9f-a2dc-b21100d15a31/AdobeStock_182963760_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true'
                alt="India Escapes - For life's greatest journeys"
                fill
                priority
                quality={90}
                className="object-cover cs-hero-bg rounded-[20px]"
                style={{ objectPosition: "center 60%" }}
              // sizes="100vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-hero-gradient" />
            </div>

            {/* Content */}

            <div className="relative h-full flex flex-col items-center justify-center lg:justify-center container-custom text-center text-white gap-10" style={{ minHeight: 520 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-4xl w-full mx-auto "
              >
                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-[64px] font-medium text-white mb-2 lg:mb-4 leading-tight drop-shadow-lg"
                >
                  {title}
                </h1>

                <div className="hero-actions">
                  <button type="button" className="btn fill" onClick={() => openModal("Request a brochure")}>
                    Request a brochure <b>→</b>
                  </button>
                  <button type="button" className="btn dark" onClick={() => document.getElementById("prices")?.scrollIntoView({ behavior: "smooth" })}>
                    Dates &amp; Prices <b>→</b>
                  </button>
                </div>
              </motion.div>


            </div>

          </div>

        </section>


        <div className="offerbar m-5">
          <b className="text-md">Special Offers: </b>

          {showFullSummary ? offerText : truncated}

          {isTruncated && (
            <button
              type="button"
              onClick={() => setShowFullSummary((prev) => !prev)}
              className="ml-2 text-[#d84d1f] font-semibold underline cursor-pointer"
            >
              {showFullSummary ? "Show Less" : "Learn More"}
            </button>
          )}

          {/* <br />

          <b className="text-md">
            Book early for the best departure dates.
          </b> */}
        </div>

        <nav className="jumpnav mx-5">
          <label className="text-[16px]">Navigate to:</label>
          <button type="button" onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })}>Overview</button>
          <button type="button" onClick={() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" })}>Itinerary</button>
          <button type="button" onClick={() => document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" })}>Offers</button>
          <button type="button" onClick={() => document.getElementById("prices")?.scrollIntoView({ behavior: "smooth" })}>Dates &amp; prices</button>
          <button type="button" onClick={() => document.getElementById("extensions")?.scrollIntoView({ behavior: "smooth" })}>Extensions</button>
          <button type="button" onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}>Gallery</button>
          <button type="button" onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}>Reviews</button>
        </nav>

        <section className="section mx-5" id="overview">
          <div className="intro-grid">
            <div className="intro-copy">
              <h2>{title}</h2>
              <div className="meta">
                <div className="meta-item">
                  <span className="meta-icon">◷</span>
                  <b>{tour?.duration || "Flexible duration"} from {tour?.priceFrom || "On request"}</b>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">◉</span>
                  <b>Departing: {firstDeparture}</b>
                </div>
              </div>
              <p>{summary}</p>
              <p>{tour?.overview || summary}</p>
              {/* <button type="button" className="pill" onClick={() => document.getElementById("extensions")?.scrollIntoView({ behavior: "smooth" })}>
                Extensions: <b>{tour?.destinations?.length ? `${tour.destinations.length} destinations` : "Tailor-made options"}</b> →
              </button> */}
            </div>

            <div className="intro-sidebar">
              <div className="extension-box">
                <b>Extensions</b>
                <span>3 extensions available</span>
                <span style={{ float: "right", color: "var(--coral)" }}>→</span>
              </div>
              <div className="map-card">
                <img src="https://cdn.distantjourneys.co.uk/270fe5b2-9432-4200-b414-b31c00b0a944_Original%20file.jpg?apr_optimization=true&quality=75&width=600&height=600&fit=crop&format=webp&precrop=true" alt="Tour map" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-cream" id="highlights">
          <div className="section">
            <div className="section-title">
              <div>
                <div className="eyebrow">Tour highlights</div>
                <h2>Moments that stay with you</h2>
              </div>
            </div>
            <div className="highlights">
              <article className="highlight">
                <img src="https://cdn.distantjourneys.co.uk/a517dbdf-c632-4263-bf27-b36800852e32_Original%20file.jpg?apr_optimization=true&quality=75&width=416&height=234&fit=crop&format=webp&precrop=true" alt="Mekong River cruise" />
                <h3>Four-night Mekong River cruise from Vietnam to Cambodia</h3>
              </article>
              <article className="highlight">
                <img src="https://cdn.distantjourneys.co.uk/3af5d31c-2dc7-4ac6-b9e2-b39900d02c4f_Original%20file.jpg?apr_optimization=true&quality=75&width=416&height=234&fit=crop&format=webp&precrop=true" alt="Ha Long Bay cruise" />
                <h3>Two-night cruise around Ha Long Bay and Lan Ha Bay</h3>
              </article>
              <article className="highlight">
                <img src="https://cdn.distantjourneys.co.uk/21c4ccc2-837b-4a6d-9698-b39900d0c9c5_Original%20file.jpg?apr_optimization=true&quality=75&width=416&height=234&fit=crop&format=webp&precrop=true" alt="Angkor Wat" />
                <h3>Explore the temples of Angkor Wat</h3>
              </article>
            </div>
          </div>
        </section>

        <section className="section mx-5" id="inclusions">
          <div className="section-title">
            <div>
              <div className="eyebrow">Your holiday includes</div>
              <h2>Everything carefully arranged</h2>
            </div>
          </div>
          <div className="inclusion-grid">
            {[
              ["✦", "Unforgettable experiences", "City sightseeing in Hanoi, Hoi An, Hue, Ho Chi Minh City and Phnom Penh; Vietnamese cookery, Cu Chi Tunnels and Angkor Wat."],
              ["✈", "Flights with leading scheduled airlines", "Return economy flights with Singapore Airlines plus all domestic flights within Vietnam and Cambodia."],
              ["⌂", "Carefully selected hotels", "Hotels in great locations with porterage and applicable taxes."],
              ["♨", "Meals worth £669 per person", "Daily breakfasts, selected lunches and dinners, plus all cruise meals."],
              ["≋", "All-inclusive cruises", "Two-night Ha Long Bay cruise and four-night Mekong Navigator cruise."],
              ["✓", "Experienced Tour Manager", "Services of an experienced Tour Manager throughout the journey."],
              ["↗", "On the ground", "All overseas transfers and modern, air-conditioned coaches."],
              ["◎", "ATOL protected", "Your holiday is covered by our Price Promise and fully protected."],
            ].map(([icon, title, text]) => (
              <div key={title} className="include">
                <div className="include-icon">{icon}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-cream">
          <div className="section mx-5" id="itinerary">
            <div className="section-title">
              <div>
                <div className="eyebrow">Tour itinerary</div>
                <h2>Day by day</h2>
              </div>
              <button type="button" className="pill" onClick={() => openModal("Download itinerary")}>
                Download itinerary →
              </button>
            </div>

            <div className="itinerary-layout">
              <aside className="dayrail " id="dayrail">
                {itineraryDays.map((day, index) => (
                  <button
                    key={day.id}
                    type="button"
                    className={index === selectedDay ? "active" : ""}
                    onClick={() => setSelectedDay(index)}
                  >
                    <span className="num">{day.id}</span>
                    <span className="day-title">{day.title}</span>
                  </button>
                ))}
              </aside>

              <article className="daypane">

                <div>

                  <h2>{activeDay.title}</h2>

                  <p>{activeDay.description}</p>

                  {activeDay.location_metadata?.map((location) => (
                    <div key={location.id}>
                      <h5 className="text-2xl  mt-5 mb-2">{location.name}</h5>
                      <p>{location.description}</p>
                      <img className="mt-5" src={location.img} alt={location.name} />
                    </div>
                  ))}

                </div>



                <div className="meal-row">♨ &nbsp; Included meals: breakfast and selected meals throughout the itinerary</div>

                <div className="hotel">
                  <img src="https://cdn.distantjourneys.co.uk/6a47b46e-593f-436e-8f71-b21101033dc7/Pan%20Pacific%20Hanoi%20Deluxe%20Room%20Twin_Original%20file.jpg?apr_optimization=true&quality=75&width=360&height=202&fit=crop&format=webp&precrop=true" alt="Selected hotel" />
                  <div>
                    <strong>Selected hotel</strong>
                    <div className="stars">★★★★★</div>
                    <p>Comfortable accommodation in a convenient location.</p>
                    <button type="button" className="pill">More details →</button>
                  </div>
                </div>

                <div className="day-controls">
                  <button type="button" onClick={() => setSelectedDay((prev) => Math.max(0, prev - 1))}>← Previous day</button>
                  <button type="button" onClick={() => setSelectedDay((prev) => Math.min(itineraryDays.length - 1, prev + 1))}>Next day →</button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* <section className="section" id="offers">
          <div className="eyebrow">Offers</div>
          <h2>Make the most of your journey</h2>
          <div className="info-box">
            <b>Special Offers:</b> SAVE £100 per person on Vietnam &amp; Cambodia tours departing from September 2026 to August 2027. <b>Book by 30th September 2026.</b>
          </div>
        </section> */}

        <section className="section mx-5" id="prices">
          <div className="eyebrow">Dates and prices</div>
          <h2>Choose your departure</h2>
          <div className="price-note">
            <span>ⓘ &nbsp; Please note, alternative itineraries operate on selected departure dates</span>
            <a href="#">Find out more →</a>
          </div>
          <div className="price-layout">
            <div className="price-table">
              <div className="price-group">
                <h3>2026 departures from only £5,895 per person</h3>
                <p>Prices and offers are per person based on two people sharing a twin or double room.</p>
                <div className="price-head">
                  <span>Departing</span>
                  <span>Availability</span>
                  <span>Price (per person)</span>
                  <span>Offer (per person)</span>
                  <span></span>
                </div>
                <div className="price-row">
                  <span>28th October 2026</span>
                  <span>6 Rooms</span>
                  <span><span className="old">£5,995</span><strong>£5,895</strong></span>
                  <span className="save">Save £100</span>
                  <button type="button" className="pill" onClick={() => openModal("Enquire now")}>Enquire now →</button>
                </div>
              </div>
            </div>

            <aside className="enquiry">
              <h3>Make an enquiry</h3>
              <div>☎ &nbsp; <b>Call us today</b><strong>0800 141 3667</strong></div>
              <div style={{ marginTop: "18px" }}>✉ &nbsp; <b>Email us</b><p style={{ color: "#fff" }}>If you have a question about our holidays or travel arrangements.</p></div>
              <button type="button" className="pill white" onClick={() => openModal("Send us a message")}>Send us a message →</button>
            </aside>
          </div>
        </section>

        <section className="section-cream">
          <div className="section mx-5" id="further">
            <div className="eyebrow">Further information</div>
            <h2>Good to know</h2>
            <div className="accordion-list">
              {[
                ["Deposit", "Speak to our travel specialists for the latest deposit information."],
                ["Flight upgrades", "Ask us about cabin upgrades and regional departure options."],
                ["Visa information", "We will provide practical advice for your chosen departure."],
              ].map(([title, content]) => (
                <div key={title} className="accordion">
                  <button type="button" onClick={(event) => {
                    const panel = event.currentTarget.nextElementSibling;
                    const isHidden = panel.style.display === "none";
                    panel.style.display = isHidden ? "block" : "none";
                    event.currentTarget.querySelector("span").textContent = isHidden ? "−" : "+";
                  }}>
                    {title} <span>+</span>
                  </button>
                  <div style={{ display: "none" }}>{content}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="reviews">
          <h2 className="cs-section-heading text-center">From our customers</h2>
          <div className="review-quote">
            <p>Verified customer feedback is displayed here through the connected review service.</p>
            <small>Feefo reviews</small>
          </div>
        </section>

        {/* 
        <section className="section" id="freedom-days">
          <div className="eyebrow">Freedom Days</div>
          <h2>Make the most of your free time</h2>
          <p>Optional excursions can be arranged while you are on tour, while some require pre-booking.</p>
          <select className="select" value={freedom} onChange={(event) => setFreedom(event.target.value)}>
            <option value="Hanoi">Hanoi</option>
            <option value="Hoi An">Hoi An</option>
            <option value="Hue">Hue</option>
            <option value="Siem Reap">Siem Reap</option>
          </select>
          <div className="freedom-cards">
            <div className="freedom-card">
              <img id="freedomImg" src={freedomMap[freedom].image} alt={freedomMap[freedom].title} />
              <h3 id="freedomTitle">{freedomMap[freedom].title}</h3>
              <span className="round">→</span>
            </div>
            <div className="freedom-card">
              <img src="https://cdn.distantjourneys.co.uk/165514d5-b69c-4a8b-b23c-b21100da7a3d/AdobeStock_342808573_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true" alt="Local flavours and markets" />
              <h3>Local flavours and markets</h3>
              <span className="round">→</span>
            </div>
          </div>
        </section> */}

        <section className="full-section mx-5" id="gallery">
          <div className="eyebrow">Gallery</div>
          <h2>See the journey in pictures</h2>
          <div className="gallery-grid">
            {[
              ["https://cdn.distantjourneys.co.uk/2f2e5929-e030-4c9f-a2dc-b21100d15a31/AdobeStock_182963760_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true", "Vietnam"],
              ["https://cdn.distantjourneys.co.uk/165514d5-b69c-4a8b-b23c-b21100da7a3d/AdobeStock_342808573_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true", "Tra Que village, Vietnam"],
              ["https://cdn.distantjourneys.co.uk/18b3c8c3-8c0f-4f2f-a4b6-b20b00dc0d0f/AdobeStock_199989342_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true", "Angkor Wat, Cambodia"],
              ["https://cdn.distantjourneys.co.uk/d2da132b-891d-4de9-9244-b21100daa072/AdobeStock_408191610_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true", "Ha Long Bay, Vietnam"],
              ["https://cdn.distantjourneys.co.uk/14273df1-bb3c-4392-8f59-b20b00c988fa/AdobeStock_119603331_Original%20file.jpeg?apr_optimization=true&quality=75&width=720&height=405&fit=crop&format=webp&precrop=true", "The Royal Palace, Phnom Penh, Cambodia"],
            ].map(([image, caption]) => (
              <div key={caption} className="gallery-item">
                <img src={image} alt={caption} />
                <p>{caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <section className="difference mx-5" id="difference">
          <div>
            <h2>The Distant Journeys difference…</h2>
            <div style={{ color: "var(--coral)", fontSize: "27px" }}>◉ ◉ ◉</div>
          </div>
          <div className="trust">
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <div>
                <h3>Specialists in the extraordinary</h3>
                <p>We craft extraordinary award-winning tours to the world’s most iconic places, backed by British Travel Awards and Feefo’s trusted status.</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <div>
                <h3>Our price promise to you</h3>
                <p>You can relax knowing you are paying the best price for your holiday with our Price Promise.</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <div>
                <h3>100% financial protection</h3>
                <p>Book with confidence knowing your holiday is fully protected.</p>
              </div>
            </div>
          </div>
        </section> */}

        <section className="full-section mx-5" id="feefo">
          <h2>Customer reviews</h2>
          <div className="reviews">
            <div className="reviews-image">
              <div className="score"><span>★</span> 5/5</div>
            </div>
            <div className="review-feed">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="review-card">
                  <div className="stars">★★★★★</div>
                  <p>Verified review content will appear here when the review service is connected.</p>
                  <b>Verified traveller</b>
                  <small> Reviewed through Feefo</small>
                </div>
              ))}
            </div>
          </div>
          <div className="center">
            <button type="button" className="pill pill-dark">View all reviews on Feefo →</button>
          </div>
        </section>

      </main>

      <div className={`modal-bg ${isModalOpen ? "open" : ""}`} id="modal" style={{ display: isModalOpen ? "grid" : "none" }}>
        <div className="modal">
          <button type="button" className="modal-close" onClick={closeModal}>×</button>
          <div className="eyebrow" id="modalKicker">{modalLabel}</div>
          <h2>How can we help?</h2>
          <p>Tell us a little about yourself and one of our travel specialists will be in touch.</p>
          <div className="form">
            <input placeholder="First name" />
            <input placeholder="Last name" />
            <input placeholder="Email address" type="email" />
            <input placeholder="Telephone number" />
            <select>
              <option>What can we help with?</option>
              <option>Book this tour</option>
              <option>Request a brochure</option>
              <option>Ask a question</option>
            </select>
            <button type="button" className="btn fill" onClick={closeModal}>Send enquiry</button>
          </div>
        </div>
      </div>
    </>
  );
}
