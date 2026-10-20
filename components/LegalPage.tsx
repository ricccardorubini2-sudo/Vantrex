import type { ReactNode } from "react";
import { formatPolicyDate, siteConfig } from "@/lib/config";
import type { LegalDocument } from "@/lib/legal";

/**
 * Shared layout for the supporting legal/privacy pages: title band,
 * revision information, anchored table of contents, numbered sections,
 * and a print-friendly article column.
 */
export function LegalPage({
  document,
  children,
  showRevision = true,
}: {
  document: LegalDocument;
  children?: ReactNode;
  showRevision?: boolean;
}) {
  return (
    <>
      <section className="border-b border-line bg-offwhite">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium text-blue">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {document.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.15] text-navy">
            {document.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink">{document.introduction}</p>
          {showRevision ? (
            <p className="mt-6 text-sm text-muted">
              Version {siteConfig.policies.version} · Effective {formatPolicyDate(siteConfig.policies.effectiveDate)} ·
              Last revised {formatPolicyDate(siteConfig.policies.lastRevised)}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] print:block">
          <aside className="print:hidden">
            <nav aria-label="On this page" className="lg:sticky lg:top-24">
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-blue">On this page</p>
              <ol className="mt-4 space-y-2.5">
                {document.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[15px] leading-6 text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      <span className="mr-2 text-sm text-silver">{index + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-[46rem]">
            {document.sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24 border-t border-line py-10 first:border-t-0 first:pt-0">
                <h2 id={`${section.id}-heading`} className="text-[1.55rem] leading-8 text-navy">
                  <span className="mr-3 text-base text-silver">{index + 1}.</span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-base leading-7 text-ink">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2.5 pl-6 marker:text-accent">
                      {section.bullets.map((item) => (
                        <li key={item.slice(0, 48)} className="text-base leading-7 text-ink">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {children && section.id === document.sections[1]?.id ? children : null}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
