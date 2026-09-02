"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";

type EnquiryType = "quote" | "callback";

type EnquiryFormProps = {
  destination?: string;
  type?: EnquiryType;
  modal?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
};

type EnquiryState = {
  name: string;
  email: string;
  mobile: string;
  destination: string;
  message: string;
  query_type: EnquiryType;
};

const destinations = [
  "Any destination",
  "North India",
  "South India",
  "West & Central India",
  "Himalayan escapes",
  "Kerala",
  "Rajasthan",
  "Other",
];

export default function EnquiryForm({
  destination = "",
  type = "quote",
  modal = false,
  onClose,
  onSuccess,
}: EnquiryFormProps) {
  const [form, setForm] = useState<EnquiryState>({
    name: "",
    email: "",
    mobile: "",
    destination,
    message: "",
    query_type: type,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!modal || !onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modal, onClose]);

  const updateField = (field: keyof EnquiryState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (!form.name.trim() || !form.mobile.trim()) {
      setErrorMessage("Please enter your name and telephone number.");
      setStatus("error");
      return;
    }

    if (form.query_type === "quote" && !form.email.trim()) {
      setErrorMessage("Please enter your email address so we can send your quote.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/query-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We could not submit your enquiry.");
      setStatus("success");
      onSuccess?.();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not submit your enquiry. Please try again.");
      setStatus("error");
    }
  };

  const formContent = (
    <div className={modal ? "w-full max-w-xl rounded-[28px] bg-[#FFF0EB] p-6 shadow-2xl sm:p-9" : "rounded-[28px] bg-[#FFF0EB] p-6 sm:p-9"}>
      <div className="mb-7 flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D84524]">India Escapes</p>
          <h2 className="heading-h2 mt-2 text-[#3C3C3A]">
            {form.query_type === "quote" ? "Request a quote" : "Request a call back"}
          </h2>
          <p className="body-md mt-3 max-w-md text-[#3C3C3A]/75">
            Tell us a little about your journey and our travel specialists will be in touch.
          </p>
        </div>
        {modal && onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
            className="rounded-full p-2 text-[#3C3C3A]/70 transition hover:bg-white hover:text-[#3C3C3A] focus:outline-none focus:ring-2 focus:ring-[#D84524]"
          >
            <X size={22} />
          </button>
        ) : null}
      </div>

      {status === "success" ? (
        <div className="rounded-2xl bg-white p-7 text-center" aria-live="polite">
          <CheckCircle2 className="mx-auto text-[#3F8C57]" size={46} />
          <h3 className="heading-h3 mt-4 text-[#3C3C3A]">Thank you for getting in touch</h3>
          <p className="body-md mx-auto mt-3 max-w-sm text-[#3C3C3A]/75">
            Your enquiry has been received. A member of our team will contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm((current) => ({ ...current, name: "", email: "", mobile: "", message: "" }));
              setStatus("idle");
            }}
            className="mt-6 rounded-full border border-[#D84524] px-6 py-3 text-sm font-semibold text-[#D84524] transition hover:bg-[#D84524] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D84524]"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-white p-1" role="tablist" aria-label="Enquiry type">
            {(["quote", "callback"] as const).map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={form.query_type === option}
                onClick={() => updateField("query_type", option)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#D84524] ${form.query_type === option ? "bg-[#D84524] text-white" : "text-[#3C3C3A]/70 hover:text-[#3C3C3A]"}`}
              >
                {option === "quote" ? "Get a quote" : "Call me back"}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#3C3C3A]">
              Name <span className="text-[#D84524]">*</span>
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#3C3C3A]/15 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#D84524] focus:ring-2 focus:ring-[#D84524]/20"
                autoComplete="name"
              />
            </label>
            <label className="text-sm font-semibold text-[#3C3C3A]">
              Telephone <span className="text-[#D84524]">*</span>
              <input
                required
                type="tel"
                value={form.mobile}
                onChange={(event) => updateField("mobile", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#3C3C3A]/15 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#D84524] focus:ring-2 focus:ring-[#D84524]/20"
                autoComplete="tel"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#3C3C3A]">
              Email {form.query_type === "quote" ? <span className="text-[#D84524]">*</span> : null}
              <input
                required={form.query_type === "quote"}
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#3C3C3A]/15 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#D84524] focus:ring-2 focus:ring-[#D84524]/20"
                autoComplete="email"
              />
            </label>
            <label className="text-sm font-semibold text-[#3C3C3A]">
              Destination
              <select
                value={form.destination}
                onChange={(event) => updateField("destination", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#3C3C3A]/15 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#D84524] focus:ring-2 focus:ring-[#D84524]/20"
              >
                <option value="">Choose a destination</option>
                {destinations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <label className="mt-4 block text-sm font-semibold text-[#3C3C3A]">
            Tell us about your journey
            <textarea
              rows={4}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="mt-2 w-full resize-none rounded-2xl border border-[#3C3C3A]/15 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#D84524] focus:ring-2 focus:ring-[#D84524]/20"
              placeholder="Preferred dates, number of travellers, or anything else we should know"
            />
          </label>

          {status === "error" ? <p className="mt-4 text-sm font-medium text-[#B42318]" role="alert">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F24822] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#D84524] focus:outline-none focus:ring-2 focus:ring-[#D84524] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : "Submit enquiry"}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-[#3C3C3A]/60">We will only use your details to respond to this enquiry.</p>
        </form>
      )}
    </div>
  );

  if (!modal) return formContent;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#3C3C3A]/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-form-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div id="enquiry-form-title" className="sr-only">India Escapes enquiry form</div>
      {formContent}
    </div>
  );
}
