import Link from "next/link";
import { company, nav } from "@/lib/content";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white text-black">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-base leading-6 text-muted">{company.overview}</p>
        </div>
        <div>
          <p className="text-base font-medium text-black">{nav.solutionsLabel}</p>
          <ul className="mt-4 space-y-3">
            {nav.products.map((product) => (
              <li key={product.href}>
                <Link href={product.href} className="text-base text-black underline decoration-transparent underline-offset-4 hover:decoration-black">
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-base font-medium text-black">Company</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href={nav.partnerships.href} className="text-base text-black underline decoration-transparent underline-offset-4 hover:decoration-black">
                {nav.partnerships.label}
              </Link>
            </li>
            <li>
              <Link href={nav.contact.href} className="text-base text-black underline decoration-transparent underline-offset-4 hover:decoration-black">
                {nav.contact.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-[1200px] px-5 py-5 text-sm text-muted sm:px-8">
          © {new Date().getFullYear()} Vantrex
        </p>
      </div>
    </footer>
  );
}
