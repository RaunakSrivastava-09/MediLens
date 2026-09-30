# MediLens — Smart Medication Companion

AI-powered prescription decoder and medication reminder app built with
Next.js (App Router), MongoDB, and a multimodal AI API.

## Features

1. Prescription/medicine photo upload (camera or gallery)
2. AI-powered medicine extraction (structured JSON, with confidence score)
3. Plain-language explanation (purpose, side effects, timing)
4. Automatic explanation in the user's saved preferred language
5. Voice output via the browser's Web Speech API
6. Medicine history dashboard, grouped by month
7. Medicine reminders (email-based, via Vercel Cron)
8. Adherence tracker (streak, percentage, missed doses)
9. Automatic drug interaction warnings on new uploads
10. Refill alerts for fixed-length courses
11. Doctor visit summary export
12. Family/dependent profiles with caregiver notifications
13. Medicine info caching (reduces repeat AI calls)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

You will need:
- A **MongoDB Atlas** connection string (free tier is enough) → `MONGODB_URI`
- A random secret for NextAuth → `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- An **AI API key** with vision support (Grok, GPT-4o, etc.) → `AI_API_KEY`, `AI_API_URL`, `AI_MODEL`
- A free **Cloudinary** account for image storage → `CLOUDINARY_*`
- An email account (Gmail with an App Password works) for reminder emails → `EMAIL_*`
- A random secret to protect the cron endpoint → `CRON_SECRET`

### 3. Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000

### 4. Deploy

Deploy to Vercel and add the same environment variables in the Vercel
dashboard. The `vercel.json` file already configures the reminder-check
cron job to run every 5 minutes.

## Project structure

See the folder tree below — organized by Next.js App Router convention:
`app/` for pages and API routes, `components/` for UI, `lib/` for
integrations (DB, auth, AI, email, image storage), `models/` for Mongoose
schemas.

## Notes

- This is a student/college project. The AI-generated medical information
  is informational only and is not a substitute for professional medical
  advice — this is reflected throughout the UI via disclaimer banners.
- The interaction checker and explanations rely on the AI model's
  training knowledge. For a production system, cross-checking against a
  verified drug database (e.g. OpenFDA) before generating the explanation
  is recommended.
