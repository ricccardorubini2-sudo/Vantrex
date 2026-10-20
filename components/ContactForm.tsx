"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { inquiryCategories } from "@/lib/content";
import { fieldLimits, inquiryFields, resolveInquiryParam } from "@/lib/inquiry";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

const initialErrors = {
  company: "",
  contactName: "",
  email: "",
  category: "",
  message: "",
};

export function ContactForm() {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const sending = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function apply(value: string | null) {
      if (value === null) return;
      setCategory(resolveInquiryParam(value) ?? "");
    }

    function onInquiry(event: Event) {
      apply((event as CustomEvent<string | null>).detail ?? null);
    }

    function onPopState() {
      const params = new URLSearchParams(window.location.search);
      if (params.has("inquiry")) apply(params.get("inquiry"));
    }

    const params = new URLSearchParams(window.location.search);
    if (params.has("inquiry")) apply(params.get("inquiry"));
    window.addEventListener("vantrex-inquiry", onInquiry);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("vantrex-inquiry", onInquiry);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (status === "idle" || status === "submitting" || !feedback) return;
    statusRef.current?.focus();
  }, [status, feedback]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;

    const nextErrors = { ...initialErrors };
    if (!company.trim()) nextErrors.company = "Enter your company name.";
    if (!contactName.trim()) nextErrors.contactName = "Enter the contact name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > fieldLimits.email) {
      nextErrors.email = "Enter a valid business email.";
    }
    if (!inquiryCategories.includes(category as (typeof inquiryCategories)[number])) {
      nextErrors.category = "Select an inquiry category.";
    }
    if (!message.trim()) nextErrors.message = "Enter a message.";
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus("error");
      setFeedback("Review the highlighted fields. Your inquiry was not sent.");
      const first = Object.entries(nextErrors).find(([, value]) => value)?.[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }

    sending.current = true;
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          [inquiryFields.company]: company,
          [inquiryFields.contactName]: contactName,
          [inquiryFields.email]: email,
          [inquiryFields.category]: category,
          [inquiryFields.message]: message,
          [inquiryFields.honeypot]: honeypot,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        message?: string;
        delivery?: string;
        errors?: Partial<typeof initialErrors>;
      } | null;

      if (response.ok && data?.ok && data.delivery === "smtp") {
        setStatus("success");
        setFeedback(
          data.message ??
            "Your inquiry has been sent. Vantrex will review it and respond using the business email you provided.",
        );
        setMessage("");
        return;
      }

      if (data?.code === "unconfigured") {
        setStatus("unavailable");
        setFeedback(data.message ?? "Inquiry delivery is not available yet. Your message was not sent.");
        return;
      }

      if (data?.code === "validation" && data.errors) {
        setErrors({ ...initialErrors, ...data.errors });
        setStatus("error");
        setFeedback(data.message ?? "Review the highlighted fields. Your inquiry was not sent.");
        return;
      }

      setStatus("error");
      setFeedback(data?.message ?? "Your inquiry could not be sent. Please try again later.");
    } catch {
      setStatus("error");
      setFeedback("Your inquiry could not be sent. Please try again later.");
    } finally {
      sending.current = false;
    }
  }

  const feedbackClass =
    status === "success"
      ? "border-l-accent"
      : status === "unavailable"
        ? "border-l-blue"
        : "border-l-[#8e2f2f]";

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} className="relative">
      <p className="text-sm text-muted">All fields are required.</p>
      <div className="hp" aria-hidden="true">
        <label htmlFor={inquiryFields.honeypot}>Leave this field empty</label>
        <input
          id={inquiryFields.honeypot}
          name={inquiryFields.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          id={inquiryFields.company}
          label="Company name"
          value={company}
          maxLength={fieldLimits.company}
          autoComplete="organization"
          error={errors.company}
          onChange={setCompany}
        />
        <Field
          id={inquiryFields.contactName}
          label="Contact name"
          value={contactName}
          maxLength={fieldLimits.contactName}
          autoComplete="name"
          error={errors.contactName}
          onChange={setContactName}
        />
        <Field
          id={inquiryFields.email}
          label="Business email"
          type="email"
          value={email}
          maxLength={fieldLimits.email}
          autoComplete="email"
          error={errors.email}
          onChange={setEmail}
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label htmlFor={inquiryFields.category} className="mb-2 block text-sm font-medium text-ink">
            Inquiry category
          </label>
          <select
            id={inquiryFields.category}
            name={inquiryFields.category}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={errors.category ? "category-error" : undefined}
            className={`field-input ${errors.category ? "field-error" : ""}`}
            required
          >
            <option value="">Select an inquiry category</option>
            {inquiryCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p id="category-error" className="mt-2 text-sm text-[#8e2f2f]">
              {errors.category}
            </p>
          ) : null}
        </div>
        <Field
          id={inquiryFields.message}
          label="Message"
          value={message}
          maxLength={fieldLimits.message}
          error={errors.message}
          onChange={setMessage}
          multiline
          className="sm:col-span-2"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-7 text-xl font-medium text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send Inquiry"}
        </button>
      </div>
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={feedback ? `mt-5 border-l-4 bg-white px-4 py-3 text-[16px] text-ink outline-none ${feedbackClass}` : "sr-only"}
      >
        {feedback}
      </div>
      {process.env.NODE_ENV === "development" && status === "unavailable" ? (
        <p className="mt-3 text-sm text-muted">
          Local setup: add the SMTP values in `.env.local`. This note is omitted from production builds.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  maxLength,
  autoComplete,
  type = "text",
  multiline = false,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string;
  maxLength: number;
  autoComplete?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    maxLength,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `field-input ${error ? "field-error" : ""}`,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} />
      )}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-[#8e2f2f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
