"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CookieSettingsButton } from "./CookieSettingsButton";
import {
  immediateChoiceType,
  privacyFieldLimits,
  privacyRequestFields,
  privacyRequestTypes,
  resolvePrivacyRequestParam,
} from "@/lib/privacy-request";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

export function PrivacyRequestForm() {
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ email?: string; requestType?: string; details?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const sending = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const resolved = resolvePrivacyRequestParam(params.get("type"));
      if (resolved) setRequestType(resolved);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (status === "idle" || status === "submitting" || !feedback) return;
    statusRef.current?.focus();
  }, [status, feedback]);

  const isImmediateChoice = requestType === immediateChoiceType;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || isImmediateChoice) return;

    const nextErrors: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > privacyFieldLimits.email) {
      nextErrors.email = "Enter a valid contact email.";
    }
    if (!privacyRequestTypes.includes(requestType as (typeof privacyRequestTypes)[number])) {
      nextErrors.requestType = "Select a request type.";
    }
    if (details.trim().length > privacyFieldLimits.details) nextErrors.details = "Details are too long.";
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setStatus("error");
      setFeedback("Review the highlighted fields. Your request was not sent.");
      return;
    }

    sending.current = true;
    setStatus("submitting");
    setFeedback("");
    try {
      const response = await fetch("/api/privacy-request", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          [privacyRequestFields.email]: email,
          [privacyRequestFields.requestType]: requestType,
          [privacyRequestFields.name]: name,
          [privacyRequestFields.company]: company,
          [privacyRequestFields.region]: region,
          [privacyRequestFields.details]: details,
          [privacyRequestFields.honeypot]: honeypot,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        message?: string;
        delivery?: string;
        errors?: typeof errors;
      } | null;

      if (response.ok && data?.ok && data.delivery === "smtp") {
        setStatus("success");
        setFeedback(
          data.message ??
            "Your privacy request has been received. We will review it and may contact you if further information is needed.",
        );
        return;
      }
      if (data?.code === "unconfigured") {
        setStatus("unavailable");
        setFeedback(data.message ?? "Privacy-request delivery is not available yet. Your request was not sent.");
        return;
      }
      if (data?.code === "validation" && data.errors) {
        setErrors(data.errors);
        setStatus("error");
        setFeedback(data.message ?? "Review the highlighted fields. Your request was not sent.");
        return;
      }
      setStatus("error");
      setFeedback(data?.message ?? "Your request could not be sent. Please try again later.");
    } catch {
      setStatus("error");
      setFeedback("Your request could not be sent. Please try again later.");
    } finally {
      sending.current = false;
    }
  }

  const inputClass = (invalid?: string) => `field-input ${invalid ? "field-error" : ""}`;

  return (
    <form method="post" action="/api/privacy-request" onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} className="relative">
      <div className="hp" aria-hidden="true">
        <label htmlFor={privacyRequestFields.honeypot}>Leave this field empty</label>
        <input
          id={privacyRequestFields.honeypot}
          name={privacyRequestFields.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor={privacyRequestFields.requestType} className="mb-2 block text-sm font-medium text-ink">
          Request type <span aria-hidden="true">*</span>
        </label>
        <select
          id={privacyRequestFields.requestType}
          name={privacyRequestFields.requestType}
          value={requestType}
          onChange={(event) => setRequestType(event.target.value)}
          aria-invalid={errors.requestType ? true : undefined}
          aria-describedby={errors.requestType ? "requestType-error" : undefined}
          className={inputClass(errors.requestType)}
          required
        >
          <option value="">Select a request type</option>
          {privacyRequestTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.requestType ? (
          <p id="requestType-error" className="mt-2 text-sm text-[#8e2f2f]">
            {errors.requestType}
          </p>
        ) : null}
      </div>

      {isImmediateChoice ? (
        <div className="mt-6 border-l-4 border-accent bg-offwhite px-4 py-4">
          <p className="text-base leading-7 text-ink">
            This choice takes effect directly in this browser — no email, account, or identity verification is needed.
            Use Cookie settings to review and re-save your preferences. This website does not run optional analytics
            or advertising technologies, and it does not sell or share personal information for targeted advertising.
          </p>
          <p className="mt-4">
            <CookieSettingsButton className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-display text-[15px] font-medium text-white transition-colors hover:bg-accent-hover" />
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor={privacyRequestFields.email} className="mb-2 block text-sm font-medium text-ink">
                Contact email <span aria-hidden="true">*</span>
              </label>
              <input
                id={privacyRequestFields.email}
                name={privacyRequestFields.email}
                type="email"
                autoComplete="email"
                required
                maxLength={privacyFieldLimits.email}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(errors.email)}
              />
              {errors.email ? (
                <p id="email-error" className="mt-2 text-sm text-[#8e2f2f]">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor={privacyRequestFields.name} className="mb-2 block text-sm font-medium text-ink">
                Name <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={privacyRequestFields.name}
                name={privacyRequestFields.name}
                type="text"
                autoComplete="name"
                maxLength={privacyFieldLimits.name}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass()}
              />
            </div>
            <div>
              <label htmlFor={privacyRequestFields.company} className="mb-2 block text-sm font-medium text-ink">
                Company <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={privacyRequestFields.company}
                name={privacyRequestFields.company}
                type="text"
                autoComplete="organization"
                maxLength={privacyFieldLimits.company}
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className={inputClass()}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={privacyRequestFields.region} className="mb-2 block text-sm font-medium text-ink">
                Country / region <span className="font-normal text-muted">(optional — helps us route applicable rights)</span>
              </label>
              <input
                id={privacyRequestFields.region}
                name={privacyRequestFields.region}
                type="text"
                autoComplete="country-name"
                maxLength={privacyFieldLimits.region}
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                className={inputClass()}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={privacyRequestFields.details} className="mb-2 block text-sm font-medium text-ink">
                Details <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id={privacyRequestFields.details}
                name={privacyRequestFields.details}
                rows={5}
                maxLength={privacyFieldLimits.details}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                aria-invalid={errors.details ? true : undefined}
                aria-describedby={errors.details ? "details-error" : "details-hint"}
                className={inputClass(errors.details)}
              />
              <p id="details-hint" className="mt-2 text-sm text-muted">
                Do not include passwords, wallet information or private keys, identification documents, or account
                balances.
              </p>
              {errors.details ? (
                <p id="details-error" className="mt-2 text-sm text-[#8e2f2f]">
                  {errors.details}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-7 text-xl font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" ? "Sending…" : "Submit privacy request"}
            </button>
          </div>
        </>
      )}

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={
          feedback
            ? `mt-5 border-l-4 bg-offwhite px-4 py-3 text-[16px] text-ink outline-none ${status === "success" ? "border-l-accent" : status === "unavailable" ? "border-l-blue" : "border-l-[#8e2f2f]"}`
            : "sr-only"
        }
      >
        {feedback}
      </div>
    </form>
  );
}
