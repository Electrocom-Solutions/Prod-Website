# Environment Variables Setup

This document explains how to configure environment variables for the Next.js frontend.

## Required Environment Variables

### `NEXT_PUBLIC_API_BASE_URL`

The base URL for the Django backend API.

**Default:** `http://localhost:8000/api`

**Setup:**

1. Create a `.env.local` file in the `Website` directory:
```bash
cd Website
touch .env.local
```

2. Add the following content to `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

3. Update the URL if your backend runs on a different host or port.

## Development vs Production

- **Development:** Use `http://localhost:8000/api` (local Django server)
- **Production:** Update to your production API URL (e.g., `https://api.yourdomain.com/api`)

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Restart the Next.js dev server after changing environment variables

