# Cloudflare Pages Deployment Guide

This guide explains how to deploy the Padel Star web app to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed (`npm install -g wrangler`)

## Manual Deployment

### 1. Build the web app
```bash
npm run build:web
```

### 2. Deploy to Cloudflare Pages
```bash
npm run deploy:preview
```

Or use the deployment script:
```bash
npm run deploy
```

## Automatic Deployment (GitHub Actions)

### 1. Get Cloudflare credentials

1. Go to your Cloudflare dashboard
2. Navigate to "My Profile" → "API Tokens"
3. Create a new API Token with these permissions:
   - Account: Cloudflare Pages:Edit
   - Zone: Zone:Read
4. Copy the API token

### 2. Get your Account ID

1. Go to any domain in your Cloudflare dashboard
2. In the right sidebar, copy your Account ID

### 3. Add secrets to GitHub

In your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Add these secrets:
   - `CLOUDFLARE_API_TOKEN`: Your API token from step 1
   - `CLOUDFLARE_ACCOUNT_ID`: Your account ID from step 2

### 4. Push to main branch

Now whenever you push to the `main` branch, the app will automatically deploy to Cloudflare Pages.

## First-time Setup with Wrangler

If you haven't used Wrangler before:

```bash
# Login to Cloudflare
npx wrangler login

# Deploy for the first time
npx wrangler pages deploy dist --project-name=padel-star-app
```

## Environment Variables

If your app needs environment variables, you can set them in Cloudflare Pages:

1. Go to your Cloudflare Pages project
2. Settings → Environment variables
3. Add your variables (e.g., API endpoints)

## Custom Domain

To add a custom domain:

1. Go to your Cloudflare Pages project
2. Custom domains → Set up a custom domain
3. Follow the instructions to add your domain

## Build Configuration

The app is configured for single-page application (SPA) routing. All routes will be redirected to `index.html` as configured in `wrangler.toml`.

## Troubleshooting

### Build fails
- Check that all dependencies are installed
- Ensure you're using Node.js 18 or later
- Check the build logs for specific errors

### 404 errors on routes
- Make sure the `wrangler.toml` file includes the redirect rule
- Verify that the build output is in the `dist` directory

### Authentication issues on web
- The app uses localStorage for token storage on web
- Make sure your API supports CORS for your Cloudflare Pages domain