# 🔖 Smart Bookmark App

A full-stack bookmark management web application built with:

- Next.js (App Router)
- TypeScript
- Supabase (Auth + Database + Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## 🚀 Live Demo
https://smart-bookmark-app-chi-dusky.vercel.app

---

## ✨ Features

- 🔐 Google Authentication
- ➕ Add bookmarks
- ✏️ Edit bookmarks
- 🗑 Delete bookmarks (Optimistic UI)
- 🔍 Search bookmarks
- ⚡ Real-time updates (Supabase Realtime)
- 🎨 Clean modern UI

---

## 🛠 Tech Stack

Frontend:
- Next.js 14
- TypeScript
- Tailwind CSS

Backend:
- Supabase (Postgres + Auth)

Deployment:
- Vercel

---

## 🧠 What I Learned

- Authentication flow with Supabase
- Protected routes in Next.js
- Realtime database subscriptions
- Optimistic UI updates
- Production deployment with Vercel

---

## ⚡ Challenges Faced & How I Solved Them

### 1️⃣ OAuth Redirect Issues (Google Login)
**Problem:**  
After login, the app kept redirecting back to `/login`.

**Cause:**  
Incorrect redirect URL configuration in Supabase and Vercel environment mismatch.

**Solution:**  
- Updated Supabase Auth settings with correct Production URL  
- Verified Site URL and Redirect URLs  
- Redeployed after environment variable fix  

---

### 2️⃣ Module Not Found Error (`supabaseClient`)
**Problem:**  
Build failed in Vercel with module resolution error.

**Cause:**  
Incorrect import path / file naming mismatch between local and production.

**Solution:**  
- Standardized import path: `@/lib/supabaseClient`
- Ensured file existed in GitHub
- Verified alias config in `tsconfig.json`

---

### 3️⃣ Realtime Sync Not Updating UI
**Problem:**  
Bookmarks were not reflecting immediately after insert/delete without refresh.

**Cause:**  
State was not being updated optimistically and realtime subscription logic was incomplete.

**Solution:**  
- Implemented Supabase Realtime subscription on `postgres_changes`
- Added optimistic UI updates for DELETE
- Ensured proper cleanup using `removeChannel`

---

### 4️⃣ Production Deployment Failed (Vercel Build Error)
**Problem:**  
Deployment showed "Failed to compile" during `npm run build`.

**Cause:**  
TypeScript strict mode detected prop mismatch between components.

**Solution:**  
- Properly typed component props
- Fixed `onEdit` and `onDelete` definitions
- Tested locally with `npm run build` before redeploying

---

### 5️⃣ Environment Variables Not Working in Production
**Problem:**  
App worked locally but failed in production.

**Cause:**  
Supabase environment variables were not added in Vercel project settings.

**Solution:**  
- Added `NEXT_PUBLIC_SUPABASE_URL`
- Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Triggered fresh redeploy

---

### 6️⃣ Duplicate Bookmark Entries
**Problem:**  
Bookmarks were appearing twice after adding.

**Cause:**  
Both manual state update and Supabase realtime listener were updating state.

**Solution:**  
Removed manual state update for INSERT and relied only on realtime subscription.

---

### 7️⃣ Strict TypeScript Errors Blocking Production
**Problem:**  
Type errors appeared during production build but not during development.

**Cause:**  
Next.js production build enforces stricter checks.

**Solution:**  
- Explicitly defined `Bookmark` type
- Avoided implicit `any`
- Ensured all component props were typed correctly

---

### 8️⃣ UI Visibility & Contrast Issues
**Problem:**  
Input text and placeholders were too light and not clearly visible.

**Cause:**  
Default Tailwind styles lacked sufficient contrast for the chosen background.

**Solution:**  
- Improved text contrast (`text-gray-900`)
- Added proper placeholder styling
- Refined shadows, spacing, and focus states


