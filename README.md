# WorldWise

WorldWise is a React app for tracking cities you have visited on an interactive map.
It uses a local `json-server` API for city data, Leaflet for map rendering, and React Router for multi-page navigation.

## Tech Stack

- React 18
- Vite
- React Router DOM (v6)
- React Leaflet + Leaflet
- React Datepicker
- json-server
- CSS Modules

## Features

- Public marketing pages: Home, Product, Pricing
- Login flow with route protection for the app area
- Interactive map with city markers loaded from API
- Click-to-add flow (`/app/form?lat=...&lng=...`)
- Geolocation button to center map on your current position
- Cities view to list cities, open city details, and delete cities
- Countries view with unique countries derived from visited cities
- City form with reverse geocoding using BigDataCloud API
- Add visit date and trip notes per city
- Flag rendering with image fallback to emoji

## Demo Credentials

Authentication is intentionally fake for learning purposes.

- Email: `jack@example.com`
- Password: `qwerty`

These credentials are hardcoded in `src/contexts/FakeAuthContext.jsx`.

## Routes

- `/` -> Homepage
- `/pricing` -> Pricing page
- `/product` -> Product page
- `/login` -> Login
- `/app` -> Protected area (redirects to `/app/cities`)
- `/app/cities` -> Cities list
- `/app/cities/:id` -> City details
- `/app/countries` -> Countries list
- `/app/form` -> Add new city form (expects `lat` and `lng` query params)
- `*` -> Page not found

## Project Structure

```txt
src/
  components/      # UI and map/list/form components
  contexts/        # Cities state and fake auth state
  hooks/           # Reusable hooks (geolocation, URL lat/lng)
  pages/           # Route-level pages and layout
  utils/           # Helper utilities (flag emoji/image conversion)
data/
  cities.json      # json-server data source
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the API server

```bash
npm run server
```

This starts `json-server` at `http://localhost:8000` using `data/cities.json`.

### 3. Start the Vite dev server

In another terminal:

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` -> start Vite development server
- `npm run build` -> create production build
- `npm run preview` -> preview production build locally
- `npm run lint` -> run ESLint
- `npm run server` -> run local JSON API at port `8000`

## Data Model (`cities`)

The app expects records with this shape:

```json
{
  "id": 123,
  "cityName": "Lisbon",
  "country": "Portugal",
  "emoji": "flag-emoji",
  "date": "2027-10-31T15:59:59.138Z",
  "notes": "My favorite city so far!",
  "position": {
    "lat": 38.727881642324164,
    "lng": -9.140900099907554
  }
}
```

## API Endpoints Used

Local API (`json-server`):

- `GET /cities`
- `GET /cities/:id`
- `POST /cities`
- `DELETE /cities/:id`

External geocoding API:

- `GET https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lng}`

## Notes and Limitations

- `BASE_URL` for city data is hardcoded as `http://localhost:8000` in `src/contexts/CitiesContext.jsx`.
- Auth is not persistent across page refreshes.
- Some seed entries in `data/cities.json` store `position.lat/lng` as strings; numeric values are preferred.
- If your browser blocks geolocation or location permission is denied, the map still works via manual map click.
- Geocoding depends on external API availability.

## Troubleshooting

- Empty city list or fetch errors: ensure `npm run server` is running on port `8000` and `data/cities.json` is valid JSON.
- Map not rendering correctly: verify internet access to the Leaflet tile server (`openstreetmap.fr`).
- Login not working: use the exact demo credentials listed above.
- Form opens with "Start by clicking somewhere on the map": open the form via map click so `lat` and `lng` exist in the URL.
