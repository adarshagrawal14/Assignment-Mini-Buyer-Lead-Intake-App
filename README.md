# Buyer Lead Intake App

A mini-app built with Next.js and Supabase/Postgres to capture, list, and manage buyer leads for a real estate business.

## 🚀 Live Demo

[Link to your Vercel deployment]

## ✨ Features

- **Lead Management**: Create leads (view and basic edit pages included).
- **Fresh SSR Listing**: Server-rendered list that always fetches fresh data and shows recent updates.
- **Validation**: End-to-end validation using Zod on both the client and server.
- **Duplicate Guard**: Server-side duplicate phone check prevents accidental duplicates.
- **UI/UX**: Tailwind-based UI with improved contrast, a global top-nav, and a redesigned homepage hero.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase Postgres (pooled port 6543)
- **ORM**: Drizzle ORM (`node-postgres` driver)
- **UI**: Tailwind CSS
- **Validation**: Zod
- **Forms**: React Hook Form

---

## 💻 Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- pnpm (or npm/yarn)
- A free Supabase account

### 2. Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/buyer-lead-app.git](https://github.com/your-username/buyer-lead-app.git)
    cd buyer-lead-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a new project on Supabase.
    - Create a `.env` file in the repo root with:
      ```bash
      DATABASE_URL=postgres://postgres:YOUR_DB_PASSWORD@db.<PROJECT_REF>.supabase.co:6543/postgres
      NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
      NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
      ```
      - Use the Pooling (port 6543) connection string from Supabase → Database → Connection string.
      - Ensure `<PROJECT_REF>` matches your project reference exactly.

4.  **Database schema:**
    - The schema is managed with Drizzle. This template does not include migration scripts; tables are created on first use in Supabase by pushing SQL if you add migrations later.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 🏛️ Design Notes

### Validation Strategy

Validation logic is defined once using **Zod** in `lib/db/schema.ts`. Highlights:
1.  **Client-Side**: In forms, via `@hookform/resolvers/zod`, providing instant feedback to the user.
2.  **Server-Side**: In all Server Actions, ensuring data integrity before it hits the database. This prevents malicious or malformed API requests.
3.  Optional numeric budgets are safely coerced and allow empty values; BHK is required only for Apartment/Villa.

### Pages & Routing

- `/` Home (hero + CTAs)
- `/buyers` Server-rendered list (fresh data; revalidate=0)
- `/buyers/new` Client form with Zod + RHF
- `/buyers/[id]` Detail page
- `/buyers/[id]/edit` Edit page (basic)

### Notes

- A mock `ownerId` is used for demo purposes. Replace with real auth when integrating.
- Duplicate phone numbers are blocked with a server-side check and DB unique index.

## ✅ Scope & Status

### Completed

-   [x] All core CRUD flows for buyer leads.
-   [x] Server-side pagination, filtering, and searching.
-   [x] URL state synchronization for filters.
-   [x] Zod validation on client and server.
-   [x] Transactional CSV Import with row-level error reporting.
-   [x] Filtered CSV Export.
-   [x] Concurrency check on edit to prevent stale data overwrites.
-   [x] Ownership rules for editing.
-   [x] Basic unit test for validation logic.
-   [x] Accessibility basics (labels, keyboard focus).

### Skipped (and Why)

-   **Full Admin Role**: An admin role was not implemented to keep the ownership logic simple and focused on the core user flow as per the assignment.
-   **File Uploads**: Skipped to maintain focus on the primary data model. Supabase Storage could be easily integrated for this in the future.
