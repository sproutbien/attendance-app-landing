# Sproutbien Attendance Tracker — landing page

Sales page for the white-label attendance app. Vite + React + TypeScript.

## Run locally

```sh
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## Environment variables (also set them in Vercel)

| Variable | What it is |
|---|---|
| `VITE_DEMO_URL` | Address of the live demo app (the demo Vercel deployment). The "Try as Admin / Employee" buttons link to `<url>/login?as=admin` and `?as=employee`. |
| `VITE_SUPABASE_URL` | The **demo** Supabase project URL. |
| `VITE_SUPABASE_ANON_KEY` | The **demo** project's anon key. The contact form saves into its `contact_messages` table (Table Editor → contact_messages to read them). |

## Editing

- Prices, plans, contact details, demo logins and screenshot captions: `src/config.ts`
- Screenshots: `public/screens/*.png` (taken from the demo at 1440×900 @2x, phones at 390×844 @2x). A missing file shows a placeholder.
- Page sections: `src/App.tsx`; styles: `src/styles.css`
