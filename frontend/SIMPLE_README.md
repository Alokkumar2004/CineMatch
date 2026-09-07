# 🎬 CineMatch - Movie Discovery & Streaming App

CineMatch is a modern, Netflix-inspired web application that lets users search for movies, filter them by genre and release year, discover films based on their current mood, and save movies to a personal watchlist.

---

## 🌟 What We Built & Why (Phase-by-Phase)

### **Phase 1: Foundation & Design**
* **What we did:** Created the core React layout and set up navigation pages (Home, Movies, Discover, Watchlist, Profile) with a dark-mode Netflix style.
* **Why we did it:** To give users a clean, professional, and structured streaming-app interface.

### **Phase 2: Live API Connection**
* **What we did:** Connected the app to the OMDb movie database to fetch real-time movie posters, titles, ratings, and plots.
* **Why we did it:** To replace fake test data with real movies so users always see live, accurate content.

### **Phase 3: Interactive Home Rows ("See More / See Less")**
* **What we did:** Organized the homepage into categories (Trending, Recommendations, Blockbusters) with buttons to expand or collapse movie lists.
* **Why we did it:** To keep the homepage tidy while letting users easily reveal more movies without cluttering the screen.

### **Phase 4: Watchlist & State Sync**
* **What we did:** Built a global watchlist system that saves favorite movies to browser storage, complete with dynamic Add/Remove buttons.
* **Why we did it:** So users can save movies they like and ensure their list stays saved even if they refresh the page.

### **Phase 5: Cinematic User Profile**
* **What we did:** Designed a card-style user dashboard featuring a circular avatar (`Hi, Alok`), live statistics, editable profile info, and an interactive VIP badge.
* **Why we did it:** To provide a personalized account space that makes the platform feel like a real production-grade streaming service.

### **Phase 6: Guest Security & Auth Modal**
* **What we did:** Added a cinematic popup card that intercepts restricted actions for unauthenticated guests.
* **Why we did it:** To let guests browse freely while gently prompting them to log in or sign up whenever they try to search, change moods, or save movies.

---

## 🛠️ Technologies Used
* **Frontend:** React, React Router, Custom CSS (Glassmorphism, Flexbox, Grid)
* **Backend & Database:** Node.js, Express.js, MongoDB (for full-stack architecture)
* **API:** OMDb API (Live Movie Database)

---

## 🚀 How This Improves the Project
1. **Real-World Experience:** Combines live external API fetching with robust local state management.
2. **Polished UX/UI:** Uses progressive disclosure (expanding rows) and glassmorphism styling to avoid cluttered layouts.
3. **Smart Access Control:** Protects key interactive features with clean, non-intrusive login prompts to drive user registration.