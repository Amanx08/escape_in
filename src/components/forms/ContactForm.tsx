"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const inputClass = "mt-2 w-full rounded-2xl border border-[#3C3C3A]/15 bg-white px-4 py-3 text-[#3C3C3A] outline-none transition focus:border-[#D84524] focus:ring-2 focus:ring-[#D84524]/20";

const destinations = ["Any destination", "North India", "South India", "West & Central India", "Himalayan escapes", "Kerala", "Rajasthan"];
const tourTypes = ["Any tour", "Classic escorted tour", "Luxury journey", "Private tour", "Solo traveller tour"];
const departureMonths = ["Any date", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const passengerOptions = ["Select number of passengers", "1", "2", "3", "4+"];
const contactMethods = ["Select a contact method", "Email", "Phone"];

export default function ContactForm() {
  const [form, setForm] = useState({
    enquiryReason: "Discuss a new booking",
    destination: "",
    tour: "",
    departureDate: "",
    passengers: "",
    contactMethod: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
    subscribe: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const name = `${form.firstName} ${form.lastName}`.trim();
    if (!form.firstName.trim() || !form.email.trim() || !form.mobile.trim() || !form.message.trim()) {
      setErrorMessage("Please complete your first name, email, telephone number, and message.");
      setStatus("error");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/query-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        ...form,
        name,
        mobile: form.mobile,
        destination: form.destination,
        message: form.message,
        query_type: "contact_form",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We could not submit your message.");
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your message.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-[28px] bg-[#FFF0EB] p-8 text-center sm:p-12" aria-live="polite">
        <CheckCircle2 className="mx-auto text-[#3F8C57]" size={52} />
        <h2 className="heading-h2 mt-5 text-[#3C3C3A]">Thank you for getting in touch</h2>
        <p className="body-md mx-auto mt-4 max-w-lg text-[#3C3C3A]/75">Your message has been received. Our travel specialists will contact you shortly.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-[#D84524] px-7 py-3 text-sm font-semibold text-[#D84524] transition hover:bg-[#D84524] hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] bg-[#FFF0EB] p-6 sm:p-9" noValidate>
      <div className="grid gap-5">
        <label className="text-sm font-semibold text-[#3C3C3A]">
          What would you like help with?
          <select value={form.enquiryReason} onChange={(event) => update("enquiryReason", event.target.value)} className={inputClass}>
            <option>Discuss a new booking</option>
            <option>Request a brochure</option>
            <option>Ask about a tour</option>
            <option>Something else</option>
          </select>
        </label>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-[#3C3C3A]">Destination<select value={form.destination} onChange={(event) => update("destination", event.target.value)} className={inputClass}><option value="">Choose a destination</option>{destinations.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-semibold text-[#3C3C3A]">Tour type<select value={form.tour} onChange={(event) => update("tour", event.target.value)} className={inputClass}><option value="">Choose a tour type</option>{tourTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-semibold text-[#3C3C3A]">Departure month<select value={form.departureDate} onChange={(event) => update("departureDate", event.target.value)} className={inputClass}><option value="">Choose a month</option>{departureMonths.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-[#3C3C3A]">Passengers<select value={form.passengers} onChange={(event) => update("passengers", event.target.value)} className={inputClass}>{passengerOptions.map((item) => <option key={item} value={item === passengerOptions[0] ? "" : item}>{item}</option>)}</select></label>
          <label className="text-sm font-semibold text-[#3C3C3A]">Preferred contact method<select value={form.contactMethod} onChange={(event) => update("contactMethod", event.target.value)} className={inputClass}>{contactMethods.map((item) => <option key={item} value={item === contactMethods[0] ? "" : item}>{item}</option>)}</select></label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-[#3C3C3A]">First name <span className="text-[#D84524]">*</span><input required value={form.firstName} onChange={(event) => update("firstName", event.target.value)} className={inputClass} autoComplete="given-name" /></label>
          <label className="text-sm font-semibold text-[#3C3C3A]">Last name<input value={form.lastName} onChange={(event) => update("lastName", event.target.value)} className={inputClass} autoComplete="family-name" /></label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-[#3C3C3A]">Email address <span className="text-[#D84524]">*</span><input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className={inputClass} autoComplete="email" /></label>
          <label className="text-sm font-semibold text-[#3C3C3A]">Telephone number <span className="text-[#D84524]">*</span><input required type="tel" value={form.mobile} onChange={(event) => update("mobile", event.target.value)} className={inputClass} autoComplete="tel" /></label>
        </div>

        <label className="text-sm font-semibold text-[#3C3C3A]">Message <span className="text-[#D84524]">*</span><textarea required rows={7} value={form.message} onChange={(event) => update("message", event.target.value)} className={`${inputClass} resize-none`} /></label>

        <label className="flex items-start gap-3 text-sm leading-6 text-[#3C3C3A]/75"><input type="checkbox" checked={form.subscribe} onChange={(event) => update("subscribe", event.target.checked)} className="mt-1 h-4 w-4 accent-[#D84524]" /> <span>I would like to subscribe to your email newsletter to stay updated on the latest news and offers.</span></label>

        {status === "error" ? <p className="text-sm font-medium text-[#B42318]" role="alert">{errorMessage}</p> : null}

        <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F24822] px-9 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#D84524] focus:outline-none focus:ring-2 focus:ring-[#D84524] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : "Submit enquiry"}</button>
        <p className="text-xs leading-5 text-[#3C3C3A]/60">In accordance with data protection regulations, you can unsubscribe from our emails at any time. Please see our privacy policy for more information.</p>
      </div>
    </form>
  );
}
