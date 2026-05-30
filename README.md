# KiddoTour – Preschool Tour Booking Platform

KiddoTour is a modern preschool discovery and tour booking platform that helps parents explore early learning centres, compare options, and schedule visits seamlessly.

This project was originally designed as a UI prototype and later converted into a fully functional React application using Vite, React Router, Tailwind CSS, and Context API while preserving the original premium user experience and visual design.

---

## Features

### Home Page

* Premium landing page with modern UI
* Featured preschool listings
* Smooth section navigation
* Mobile-first responsive design

### Booking Flow

* Select a preschool centre
* Choose an available tour date
* Pick a preferred time slot
* Enter parent and child details
* Review booking information
* Receive booking confirmation

### State Persistence

* Booking information persists using localStorage
* User selections remain available after page refresh

### Responsive Design

* Optimized for:

  * Mobile devices
  * Tablets
  * Desktop screens

### Accessibility

* Keyboard-friendly navigation
* Semantic HTML structure
* ARIA labels for interactive elements

---

## Tech Stack

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Context API
* Framer Motion

---

## Project Structure

```text
src/
├── components/
├── pages/
├── context/
├── hooks/
├── routes/
├── assets/
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Routes

| Route         | Description          |
| ------------- | -------------------- |
| /             | Landing Page         |
| /booking      | Tour Booking         |
| /details      | Parent Details       |
| /confirmation | Booking Confirmation |

---

## Deployment

This project is deployment-ready and can be hosted on:

* Vercel
* Netlify
* GitHub Pages

Build output directory:

```text
dist/
```

---

## Project Goal

The objective of this project was to create a polished frontend experience for a preschool tour booking workflow while demonstrating modern React development practices, responsive design, component architecture, routing, state management, and deployment readiness.

---
