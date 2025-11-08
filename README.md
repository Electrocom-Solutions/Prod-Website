# Electrocom Portfolio Website

A modern, responsive portfolio website for Electrocom built with Next.js and Tailwind CSS.

## Features

- **Hero Section** with compelling headline and CTAs
- **About Us** section with company information, vision, and mission
- **Our Expertise** showcasing 4 main service categories
- **How We Work** process-driven approach
- **Past Projects** portfolio showcase
- **Industries We Serve** section
- **Contact Us** with contact information and social links
- **MSME Certified** badge in header
- Fully responsive design
- Modern UI with smooth transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Django backend API running (see WebsiteBackendAPI/README.md)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create a .env.local file in the Website directory
touch .env.local
```

Edit `.env.local` and set your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Note:** The `/api` path is automatically appended, so you only need to provide the base URL.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** Make sure your Django backend is running on `http://localhost:8000` for the API integration to work. The API client automatically appends `/api` to the base URL.

## Environment Variables

The application uses `NEXT_PUBLIC_API_URL` to determine the backend API URL. 

- **Local Development:** Set to `http://localhost:8000` (defaults to this if not set)
- **Production:** Set to your production API URL (e.g., `https://api.electrocomsolutions.in`)

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed configuration instructions.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with Header and Footer
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header with MSME badge
│   ├── Hero.tsx         # Hero section
│   ├── AboutUs.tsx      # About section
│   ├── OurExpertise.tsx # Services section
│   ├── HowWeWork.tsx    # Process section
│   ├── PastProjects.tsx # Projects showcase
│   ├── IndustriesWeServe.tsx # Industries section
│   ├── ContactUs.tsx    # Contact section (integrated with backend API)
│   └── Footer.tsx       # Footer component
├── lib/
│   └── api.ts           # API utility for backend communication
├── contexts/
│   ├── AuthContext.tsx  # Authentication context
│   └── ThemeContext.tsx # Theme context
└── package.json
```

## API Integration

The website is integrated with a Django REST Framework backend API. The Contact Us form sends data to the backend API endpoint at `/api/portfolio/contact-us/`.

### Backend API Setup

1. Ensure the Django backend is running on `http://localhost:8000`
2. The backend API should have CORS enabled for `http://localhost:3000`
3. API endpoints are configured in `lib/api.ts`

### Contact Us Form

The Contact Us form (`components/ContactUs.tsx`) is fully integrated with the backend:
- Sends form data to `/api/portfolio/contact-us/` endpoint
- Displays success/error messages
- Validates form fields with backend response
- Handles network errors gracefully

## Customization

- Update contact information in `components/ContactUs.tsx`
- Modify company details in `components/AboutUs.tsx`
- Add/remove projects in `components/PastProjects.tsx`
- Update social media links in `components/ContactUs.tsx` and `components/Footer.tsx`

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

