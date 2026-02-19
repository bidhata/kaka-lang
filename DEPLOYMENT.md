# Kaka Lang - Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the root directory:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the configuration from `vercel.json`
6. Click "Deploy"

## Configuration Details

The project is configured with:
- **Build Command**: `cd web && npm install && npm run build`
- **Output Directory**: `web/dist`
- **Framework**: Vite + React

## Environment Variables

No environment variables are required for basic deployment.

## Custom Domain

After deployment, you can add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain

## Local Testing

Before deploying, test the build locally:

```bash
# Build the project
npm run build

# Preview the build (from web directory)
cd web
npm run preview
```

## Troubleshooting

If deployment fails:
1. Check that `web/package.json` has all dependencies
2. Ensure `npm run build` works locally in the `web` directory
3. Check Vercel build logs for specific errors

## Project Structure

```
kaka-lang/
├── web/              # React web application
│   ├── src/          # Source files
│   ├── dist/         # Build output (generated)
│   └── package.json  # Web dependencies
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```
