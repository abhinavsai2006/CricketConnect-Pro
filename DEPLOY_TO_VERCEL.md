# 🚀 Quick Deploy to Vercel

Follow these simple steps to deploy CricketConnect Pro to Vercel:

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Deploy to Vercel

### Option A: One-Click Deploy (Easiest)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite settings ✅
6. Add environment variables (see below)
7. Click "Deploy" 🚀

### Option B: CLI Deploy (Advanced)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

## 3️⃣ Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `MOCHA_USERS_SERVICE_API_URL` | `https://users-service.mocha.run` |
| `MOCHA_USERS_SERVICE_API_KEY` | Your API key |

## 4️⃣ Redeploy (if you added env vars after first deploy)

```bash
vercel --prod
```

Or trigger redeploy in Vercel Dashboard.

## ✅ That's It!

Your app will be live at: `https://your-app.vercel.app`

## 🔧 Local Development with Vercel

Test serverless functions locally:

```bash
npm run dev:vercel
```

This runs both Vite and Vercel serverless functions locally.

## 📝 What Was Created

✅ `vercel.json` - Vercel configuration
✅ `/api` directory - Serverless API routes
  - `oauth-redirect.ts` - OAuth authentication
  - `sessions.ts` - Session management  
  - `players.ts` - Example API endpoint
✅ `.env.example` - Environment variables template
✅ `VERCEL_DEPLOYMENT.md` - Detailed deployment guide

## 🆘 Troubleshooting

**Build fails?**
- Check Node.js version (should be 18+)
- Run `npm install` again
- Check build logs in Vercel Dashboard

**API not working?**
- Verify environment variables are set in Vercel
- Check function logs in Vercel Dashboard
- Test API endpoints: `https://your-app.vercel.app/api/players`

**OAuth issues?**
- Update OAuth redirect URL in your OAuth provider settings
- Format: `https://your-app.vercel.app/auth/callback`

## 📚 Next Steps

1. **Add Database**: Connect Vercel Postgres or external DB
2. **Custom Domain**: Add your domain in Project Settings
3. **Analytics**: Enable Vercel Analytics
4. **Monitoring**: Set up error tracking

## 🎉 Success!

Once deployed, share your app:
- Production URL: `https://your-app.vercel.app`
- Custom domain: `https://your-domain.com`

---

Need help? Check the detailed guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
