# Vantrex

Institutional website for Vantrex. The public pages are Home, Liquidity Management, Market Making, and Institutional OTC. Institutional Partnerships and Contact are sections on the homepage.

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` when you have real values. The site builds and runs while those values are blank.

## Edit content

Public copy and structured lists live in `lib/content.ts`. Navigation labels, product routes, partnership rows, and form categories are in that file.

Colors and type tokens are in `app/globals.css`. Headings use Manrope and body text uses Inter, loaded in `app/layout.tsx`.

## Logo

There is no approved logo yet. `components/Logo.tsx` reserves a framed slot next to the Vantrex wordmark in the header and footer. When the logo is ready:

1. Add the file to `public`, for example `public/logo.svg`.
2. Set `logoSrc` in `components/Logo.tsx` to `"/logo.svg"`.

The temporary favicon is the Vantrex wordmark initial in `app/icon.svg`.

## Contact form

The form posts to `POST /api/contact`. Delivery uses SMTP through environment variables:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical URLs, Open Graph, robots, and sitemap host |
| `SMTP_HOST` | Mail server host |
| `SMTP_PORT` | Mail server port. Defaults to 587 when the host is set and this is blank |
| `SMTP_USER` | SMTP username, if the server requires authentication |
| `SMTP_PASS` | SMTP password. Required when `SMTP_USER` is set |
| `SMTP_FROM` | From address |
| `CONTACT_TO` | Inbox that receives inquiries |

If delivery is not configured, the form says the inquiry was not sent. A success message appears only after the mail server accepts the message.

`CONTACT_DELIVERY=mock` works only when `NODE_ENV=test`. Automated tests use that mode. It does not verify a live mailbox.

The endpoint validates and strips control characters, ignores a filled honeypot, and allows five submissions per ten minutes for each client address. That limit is stored in process memory, so it applies per server instance. Do not put visitor names, email addresses, or messages in URLs or application logs.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

## Deployment

Deploy to a Node host that can run the Next.js server. Do not use a fully static export: the contact route has to stay on the server. Set `SITE_URL` and the SMTP variables in the host environment before launch. This project does not publish itself.
