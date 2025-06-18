#!/bin/bash

echo "Building Expo web app..."
npx expo export --platform web

echo "Installing Wrangler CLI..."
npm install -g wrangler

echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=padel-star-app

echo "Deployment complete!"