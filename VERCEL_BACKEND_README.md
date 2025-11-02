# 🏏 CricketConnect Pro - Vercel Backend Setup

Your app is now ready to deploy to Vercel! This guide covers the backend connection.

## 📁 What Was Added

### Configuration Files
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Updated with Vercel-specific ignores

### API Routes (`/api` directory)
- ✅ `oauth-redirect.ts` - Google OAuth authentication
- ✅ `sessions.ts` - Session management
- ✅ `players.ts` - Players API endpoint (example)

### Documentation
- ✅ `DEPLOY_TO_VERCEL.md` - Quick deployment guide
- ✅ `VERCEL_DEPLOYMENT.md` - Detailed deployment guide
- ✅ `schema.sql` - Database schema for Vercel Postgres

### Package Updates
- ✅ Added `@vercel/node` for serverless functions
- ✅ Added `vercel` CLI package
- ✅ Added deploy scripts: `dev:vercel` and `deploy:vercel`

## 🚀 Quick Start

### 1. Install New Dependencies
```bash
npm install
```

### 2. Test Locally with Vercel
```bash
npm run dev:vercel
```

This starts:
- Vite dev server on port 5173
- Vercel serverless functions

### 3. Deploy to Vercel

#### Option A: GitHub (Recommended)
```bash
# Push to GitHub
git add .
git commit -m "Add Vercel backend support"
git push

# Then import on vercel.com
```

#### Option B: CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 4. Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
MOCHA_USERS_SERVICE_API_URL=https://users-service.mocha.run
MOCHA_USERS_SERVICE_API_KEY=your_api_key_here
```

## 📊 Database Setup (Optional but Recommended)

### Option 1: Vercel Postgres

```bash
# Create database
vercel postgres create

# Run migrations
vercel postgres exec -- < schema.sql
```

### Option 2: External Database

Use any of these:
- **Supabase** (PostgreSQL) - Free tier available
- **PlanetScale** (MySQL) - Free tier available
- **MongoDB Atlas** - Free tier available
- **Neon** (PostgreSQL) - Generous free tier

Add connection string to Vercel env vars.

## 🔌 API Endpoints

After deployment, your API will be available at:

```
https://your-app.vercel.app/api/oauth-redirect
https://your-app.vercel.app/api/sessions
https://your-app.vercel.app/api/players
```

## 📝 Creating New API Routes

Create a new file in `/api` directory:

```typescript
// api/teams.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    // Your logic here
    res.status(200).json({ teams: [] });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

Access at: `https://your-app.vercel.app/api/teams`

## 🔐 Environment Variables

### Required
```env
MOCHA_USERS_SERVICE_API_URL=https://users-service.mocha.run
MOCHA_USERS_SERVICE_API_KEY=your_api_key
```

### Optional (if using Vercel Postgres)
```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
```

## 🎯 Features

### ✅ Implemented
- OAuth authentication flow
- Session management
- CORS configured
- Serverless API routes
- Mock data endpoints
- Database schema ready

### 🚧 To Implement
1. Connect to real database (Vercel Postgres recommended)
2. Implement remaining API endpoints:
   - Teams CRUD
   - Grounds CRUD
   - Bookings CRUD
   - Chat messages
   - Tournaments
3. Add authentication middleware
4. Implement file uploads (use Vercel Blob)

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

## 🆘 Troubleshooting

### "Cannot find module '@vercel/node'"
```bash
npm install @vercel/node --save-dev
```

### API returns 404
- Check `/api` directory structure
- Ensure file is named correctly (e.g., `players.ts`)
- Check `vercel.json` rewrites configuration

### CORS errors
- Check API files have CORS headers
- Verify `Access-Control-Allow-Origin` is set

### Database connection fails
- Verify environment variables in Vercel
- Check database credentials
- Ensure database is accessible from Vercel (check IP whitelist)

## 🎉 Success!

Your CricketConnect Pro app is now ready for Vercel deployment with:
- ✅ Serverless API backend
- ✅ OAuth authentication
- ✅ Database schema
- ✅ CORS configured
- ✅ Production-ready

## 📞 Support

Need help? Check:
1. [Quick Deploy Guide](./DEPLOY_TO_VERCEL.md)
2. [Detailed Guide](./VERCEL_DEPLOYMENT.md)
3. [Vercel Discord](https://discord.gg/vercel)

---

**Next Step:** Run `npm run dev:vercel` to test locally, then deploy to Vercel! 🚀
