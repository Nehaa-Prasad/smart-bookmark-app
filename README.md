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

### 3️⃣ Duplicate Bookmarks Appearing
**Problem:**  
Bookmarks were added twice.

**Cause:**  
Using both:
- Realtime subscription
- Manual state update

**Solution:**  
Removed manual state update for INSERT and relied only on Supabase Realtime.

---

### 4️⃣ TypeScript Build Errors in Production
**Problem:**  
Property mismatch errors (`onEdit`, component not a module).

**Cause:**  
Props were not properly defined in components.

**Solution:**  
Defined strict TypeScript types for all components.

---

### 5️⃣ UI Visibility Issues
**Problem:**  
Input placeholders and text were too light and not visible.

**Solution:**  
Improved Tailwind styling:
- Increased text contrast
- Added better focus states
- Improved shadows and spacing

