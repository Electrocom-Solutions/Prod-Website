# Vercel Deployment Guide

This guide explains how to configure your Next.js frontend for production deployment on Vercel.

## Required Environment Variables

### `NEXT_PUBLIC_API_URL`

**IMPORTANT:** This environment variable **MUST** be set in Vercel before deploying, otherwise the frontend will try to connect to `http://localhost:8000` which will fail in production.

#### Setting the Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New** or **Edit** if it already exists
4. Set the following:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://api.electrocomsolutions.in`
   - **Environment:** Select all environments (Production, Preview, Development) or at least **Production**
5. Click **Save**

#### Important Notes

- The `/api` path will be automatically appended, so you should **NOT** include it in the URL
- Set it to: `https://api.electrocomsolutions.in` (NOT `https://api.electrocomsolutions.in/api`)
- After setting the environment variable, you **MUST** redeploy your application for the changes to take effect
- In Vercel, go to **Deployments** → Click the three dots (⋯) on your latest deployment → **Redeploy**

## Backend CORS Configuration

Make sure your Django backend includes the following in its CORS settings:

- `https://www.electrocomsolutions.in`
- `https://electrocomsolutions.in`

The backend's `settings.py` should have these URLs in:
- `CORS_ALLOWED_ORIGINS`
- `CSRF_TRUSTED_ORIGINS`

## Verification

After setting the environment variable and redeploying:

1. Open your production website: `https://www.electrocomsolutions.in`
2. Open the browser's Developer Console (F12)
3. Check the console for API logs:
   - You should see: `[API] Using API URL from environment: https://api.electrocomsolutions.in/api`
   - You should **NOT** see: `[API] ERROR: NEXT_PUBLIC_API_URL is not set in production!`
4. Try logging in or accessing API-dependent features
5. Check the Network tab to verify API requests are going to `https://api.electrocomsolutions.in/api` and not `http://localhost:8000`

## Troubleshooting

### Error: "Access to fetch at 'http://localhost:8000/api/...' has been blocked by CORS policy"

**Cause:** The `NEXT_PUBLIC_API_URL` environment variable is not set in Vercel, so it's defaulting to localhost.

**Solution:**
1. Set `NEXT_PUBLIC_API_URL=https://api.electrocomsolutions.in` in Vercel
2. Redeploy your application

### Error: "No 'Access-Control-Allow-Origin' header is present"

**Cause:** The backend CORS settings don't include your production frontend URL.

**Solution:**
1. Update your Django backend's `settings.py` to include:
   - `https://www.electrocomsolutions.in`
   - `https://electrocomsolutions.in`
2. Restart your Django backend server
3. If using environment variables, update your backend's `.env` file or hosting environment variables

### API requests still going to localhost after setting environment variable

**Cause:** The environment variable was set after the build, or the deployment wasn't redeployed.

**Solution:**
1. Verify the environment variable is set in Vercel (Settings → Environment Variables)
2. Make sure it's set for the correct environment (Production)
3. **Redeploy** your application:
   - Go to Deployments
   - Click the three dots (⋯) on your latest deployment
   - Click **Redeploy**
4. Wait for the redeployment to complete
5. Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Environment Variable Summary

| Variable | Value | Required | Description |
|----------|-------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://api.electrocomsolutions.in` | ✅ Yes | Base URL for the Django backend API (without `/api` path) |

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)




