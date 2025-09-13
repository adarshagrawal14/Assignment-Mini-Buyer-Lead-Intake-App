# Buyer Lead Intake App

A mini-app built with Next.js and Supabase to capture, list, and manage buyer leads for a real estate business.

## 🚀 Live Demo

[Link to your Vercel deployment]

## ✨ Features

- **Lead Management**: Full CRUD (Create, Read, Update, Delete) functionality for buyer leads.
- **SSR Listing**: Server-side rendered and paginated list of all leads.
- **Advanced Filtering & Search**: Filter by city, status, property type, and more. Search by name, email, or phone. All state is synced with the URL.
- **Transactional CSV Import**: Bulk import leads from a CSV file. Invalid rows are reported back without blocking valid ones.
- **Filtered CSV Export**: Export the current view (respecting all active filters and search queries) to a CSV file.
- **Auth**: Secure authentication using Supabase Auth (Magic Link). Users can only edit leads they own.
- **Lead History**: Tracks all changes made to a lead over time.
- **Robust Validation**: End-to-end validation using Zod on both the client and server.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Postgres (via Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **UI**: Tailwind CSS (+ shadcn/ui for components)
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
    -   Create a new project on Supabase.
    -   Copy `.env.example` to `.env`.
    -   Fill in your Supabase Project URL, Anon Key, and Database Connection URI in the `.env` file.

4.  **Run database migrations:**
    This will sync the Drizzle schema with your Supabase database.
    ```bash
    npm run drizzle-kit:generate
    npm run drizzle-kit:push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 🏛️ Design Notes

### Validation Strategy

Validation logic is defined once using **Zod** in `lib/db/schema.ts`. This single source of truth is used across the application:
1.  **Client-Side**: In forms, via `@hookform/resolvers/zod`, providing instant feedback to the user.
2.  **Server-Side**: In all Server Actions, ensuring data integrity before it hits the database. This prevents malicious or malformed API requests.

### SSR vs. Client Components

The application follows the Next.js App Router paradigm:
-   **Server Components (`/buyers/page.tsx`)**: Used for data fetching (reading `searchParams`, querying the DB) and rendering the initial HTML. This makes the initial page load fast and SEO-friendly.
-   **Client Components (`/buyers/_components/search-filter.tsx`)**: Used for interactive UI elements like search inputs, dropdown filters, and forms. They interact with the router to update URL search params without full page reloads.

### Ownership & Security

-   **Authentication**: Handled by Supabase Auth and enforced by Next.js middleware.
-   **Ownership**: All leads have an `ownerId`. Server Actions for updating or deleting a lead contain an explicit check to ensure the logged-in user's ID matches the lead's `ownerId`. This prevents unauthorized modifications.
-   **Rate Limiting**: Critical server actions (create, update) are rate-limited by IP using `@upstash/ratelimit` to prevent abuse.

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
