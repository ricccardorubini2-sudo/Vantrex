import Link from "next/link";
import { company, nav } from "@/lib/content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-offwhite">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#d7e0ea]">{company.overview}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-[#d7e0ea]">{nav.solutionsLabel}</p>
          <ul className="mt-4 space-y-3">
            {nav.products.map((product) => (
              <li key={product.href}>
                <Link href={product.href} className="text-[15px] text-offwhite underline decoration-transparent underline-offset-4 hover:decoration-silver">
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-[#d7e0ea]">Company</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href={nav.partnerships.href} className="text-[15px] text-offwhite underline decoration-transparent underline-offset-4 hover:decoration-silver">
                {nav.partnerships.label}
              </Link>
            </li>
            <li>
              <Link href={nav.contact.href} className="text-[15px] text-offwhite underline decoration-transparent underline-offset-4 hover:decoration-silver">
                {nav.contact.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-[1200px] px-5 py-5 text-sm text-[#d7e0ea] sm:px-8">
          © {new Date().getFullYear()} Vantrex
        </p>
      </div>
    </footer>
  );
}
