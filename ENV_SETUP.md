# Environment Variables Setup

This document explains how to configure environment variables for the Next.js frontend.

## Required Environment Variables

### `NEXT_PUBLIC_API_URL`

The base URL for the Django backend API. This should be the domain/URL without the `/api` path, as the `/api` path will be automatically appended.

**Default:** `http://localhost:8000/api` (if not set)

**Setup:**

1. Create a `.env.local` file in the `Website` directory:
```bash
cd Website
touch .env.local
```

2. Add the following content to `.env.local`:
```env
# For local development
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production (e.g., Vercel)
# NEXT_PUBLIC_API_URL=https://api.electrocomsolutions.in
```

3. The `/api` path will be automatically appended to the URL, so:
   - `http://localhost:8000` → `http://localhost:8000/api`
   - `https://api.electrocomsolutions.in` → `https://api.electrocomsolutions.in/api`
   - If you provide a URL that already ends with `/api`, it will be used as-is

## Development vs Production

- **Development:** Use `http://localhost:8000` (the `/api` path is automatically appended)
- **Production:** Set to your production API domain (e.g., `https://api.electrocomsolutions.in`)

## Vercel Deployment

When deploying to Vercel, set the environment variable in your Vercel project settings:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `NEXT_PUBLIC_API_URL` with your production API URL (e.g., `https://api.electrocomsolutions.in`)
4. Redeploy your application

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Restart the Next.js dev server after changing environment variables
- The API client automatically appends `/api` to the base URL, so don't include it in `NEXT_PUBLIC_API_URL` unless your API is served from a different path

