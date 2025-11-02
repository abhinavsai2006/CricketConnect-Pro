# Deploy CricketConnect Pro to Vercel

## Prerequisites
1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional)
3. Git repository with your code

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Vite framework

3. **Configure Environment Variables**
   In Vercel project settings, add these environment variables:
   - `AUTH_SERVICE_API_URL` - Your Authentication Service URL
   - `AUTH_SERVICE_API_KEY` - Your Authentication API Key

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add AUTH_SERVICE_API_URL
   vercel env add AUTH_SERVICE_API_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Configuration Files

### `vercel.json`
- Configures API routes
- Sets up rewrites for SPA routing
- Configures CORS headers
- Maps environment variables

### `/api` Directory
Serverless functions for backend:
- `oauth-redirect.ts` - OAuth authentication
- `sessions.ts` - Session management
- `players.ts` - Players API (example)

## Database Options

Currently using mock data. For production, choose one:

### 1. Vercel Postgres (Recommended)
```bash
vercel postgres create
```

### 2. Vercel KV (Redis)
```bash
vercel kv create
```

### 3. External Database
- MongoDB Atlas
- PlanetScale
- Supabase
- Neon

## Environment Variables Required

```env
AUTH_SERVICE_API_URL=https://users-service.mocha.run
AUTH_SERVICE_API_KEY=your_api_key_here
```

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Test Your Deployment**
   - Visit your Vercel URL
   - Test authentication flow
   - Verify API endpoints work

3. **Monitor Logs**
   - View deployment logs in Vercel Dashboard
   - Monitor function execution

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Push to `main` branch
- **Preview**: Push to other branches or PRs

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Verify all dependencies are in `package.json`
- Check Node.js version compatibility

### API Not Working
- Verify environment variables are set
- Check function logs in Vercel Dashboard
- Ensure CORS headers are configured

### Database Connection Issues
- For Vercel Postgres, use `@vercel/postgres`
- Check connection string environment variable
- Verify database is in same region

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connected (if using)
- [ ] Custom domain added (optional)
- [ ] OAuth redirect URLs updated
- [ ] CORS configured correctly
- [ ] Error monitoring setup
- [ ] Analytics configured

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vite Documentation](https://vitejs.dev)

## Local Development

To test locally with Vercel:
```bash
vercel dev
```

This will:
- Run Vite dev server
- Emulate Vercel serverless functions
- Use local environment variables
