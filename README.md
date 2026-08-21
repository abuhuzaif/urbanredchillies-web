# Urban Red Chillies — Website

Full restaurant website (Home, About, Menu, Gallery, Contact) built with
Next.js 15 (App Router) + CSS Modules. Standalone project, separate from
`moaappsdevelopers-web`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy (Vercel)

1. Push this folder to a **new GitHub repo**.
2. Go to vercel.com → New Project → import the repo.
3. No environment variables needed for the current version.
4. Deploy — Vercel auto-detects Next.js.
5. Once you have the restaurant's domain, add it under
   Project → Settings → Domains.

## Things to fill in before going live

- **Gallery** (`app/gallery/page.tsx`): replace placeholder tiles with real
  food photos. Drop images into `public/gallery/` and set each tile's
  `img` field to the path, e.g. `/gallery/boti-afghani.jpg`.
- **Contact** (`app/contact/page.tsx`): add real address, phone number,
  email, and a Google Maps embed link.
- **Menu** (`lib/menu-data.ts`): this is a condensed highlight menu. Full
  menu lives in the QR-code menu page — link the two once that page's
  final domain is ready.
- **Order Now button** (`components/Navbar.tsx`): currently links to
  `/menu`. Update to the live ordering flow once that's built.

## Structure

```
app/
  layout.tsx        Root layout (Navbar + Footer wrapper)
  page.tsx           Home
  about/page.tsx      About
  menu/page.tsx       Menu
  gallery/page.tsx    Gallery
  contact/page.tsx    Contact
components/
  Navbar.tsx / Footer.tsx
lib/
  menu-data.ts        Shared menu data
public/
  urc-logo.png         Logo
  gallery/              Drop real food photos here
```
