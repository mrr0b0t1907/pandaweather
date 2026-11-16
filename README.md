# PandaWeather 🐼
1. `npm install`
2. Put your Weatherstack key in `.env.local` (`WEATHERSTACK_API_KEY=...`)
3. `npm run dev` → http://localhost:3000
The key is read only in `app/api/*` route handlers; the browser never sees it.
Free plan: current weather only (forecast, sunrise/sunset and city suggestions need a paid plan and degrade gracefully).
