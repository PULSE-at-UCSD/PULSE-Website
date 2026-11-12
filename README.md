# PULSE Website

The website for PULSE at UC San Diego. Built with React, Vite, and Tailwind CSS, and deployed on Vercel.

## Getting started

Requires Node.js 20.19 or newer (needed by Vite 8).

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173.

### Environment variables

The events calendar pulls from Google Calendar. Create a `.env` file in the project root:

```
CALENDAR_API_KEY=your-google-api-key
GOOGLE_CALENDAR_ID=your-calendar-id
```

These stay server-side and are never sent to the browser. Without them, the rest of the site works but the calendar won't load events. On Vercel, set the same variables in the project settings.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the dev server               |
| `npm run build`   | Build for production into `dist/`  |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## Project structure

```
api/              Vercel serverless function (Google Calendar proxy)
public/           Static files (favicon, icons)
src/
  Pages/          One component per page (Home, Mission, Events, Board, 404)
  Components/     Shared UI pieces and hooks
  Assets/         Images
```
