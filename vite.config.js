import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { GET as getEvents } from './api/events.js'

// Serves the Vercel function at /api/events during `npm run dev`
function apiDevServer() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/events', async (req, res) => {
        const response = await getEvents(new Request(new URL(req.originalUrl, 'http://localhost')));
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Server-only secrets (no VITE_ prefix, so they never reach the bundle)
  const env = loadEnv(mode, process.cwd(), '');
  // Skip unset keys: assigning undefined to process.env stores the string "undefined"
  for (const key of ['CALENDAR_API_KEY', 'GOOGLE_CALENDAR_ID']) {
    if (env[key] !== undefined) process.env[key] ??= env[key];
  }

  return {
    plugins: [react(), tailwindcss(), apiDevServer()],
  };
})
