# SafeX - Women Safety App

SafeX is a women safety and emergency response web app built to help users react quickly during unsafe situations. The app combines emergency SOS functionality, trusted contact management, quick emergency calls, nearby help discovery, route safety suggestions, and a fake-call feature for safe exits.

## Created by
Team CodeSherlox

- Janvi
- Mansi
- Suhani

## Key features implemented

- User login and sign-up experience
- Local session persistence using browser storage so users do not need to log in repeatedly
- Emergency SOS flow with countdown and alert-style interaction
- Trusted emergency contacts management
- Quick emergency calls to 112 and saved contact numbers using phone dial links
- Nearby help section for police, hospitals, and emergency services
- Safety route suggestions and route planning UI
- Fake call feature designed to look like a real Android incoming call for a safe exit scenario
- Incident reporting form
- Settings and account controls
- Responsive mobile-friendly dashboard layout
- Branded SafeX interface with custom styling and icons

## Tech stack

- React.js
- Vite
- JavaScript
- Tailwind CSS
- Lucide React icons
- GitHub Pages deployment via gh-pages
- Browser localStorage for saved user state

## Project structure

- Frontend app built with React and Vite
- Reusable UI sections for dashboard, contacts, location, help, route, fake call, and settings
- Styling handled with custom CSS and Tailwind utility classes
- Deployment configured for GitHub Pages

## How it was implemented

1. Built the app using React + Vite for a fast single-page experience.
2. Designed the dashboard with a women safety focus, including SOS, live location styling, and emergency cards.
3. Added user auth screens and session persistence in the browser.
4. Implemented emergency contact management and emergency dial actions.
5. Created nearby help and route modules to simulate safety guidance.
6. Added a realistic fake-call UI to help users create a safe exit situation.
7. Configured GitHub Pages deployment so the project can be hosted and shared online.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Note

This project is designed as a frontend safety app prototype and uses browser-based flows for simulation and UI experience. Real backend services, Twilio verification, and Google Maps APIs would require external credentials and server integration.
