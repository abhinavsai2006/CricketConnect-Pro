# 🚀 Vercel Deployment Checklist

Use this checklist to ensure smooth deployment:

## Pre-Deployment

- [ ] All dependencies installed (`npm install`)
- [ ] App builds successfully (`npm run build`)
- [ ] App runs locally (`npm run dev`)
- [ ] Environment variables documented in `.env.example`
- [ ] Code committed to Git
- [ ] Code pushed to GitHub/GitLab/Bitbucket

## Vercel Setup

- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] Project imported from Git repository
- [ ] Framework preset: **Vite** (should auto-detect)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `npm install`

## Environment Variables

Configure in Vercel Dashboard → Settings → Environment Variables:

- [ ] `MOCHA_USERS_SERVICE_API_URL` set to `https://users-service.mocha.run`
- [ ] `MOCHA_USERS_SERVICE_API_KEY` set (get from Mocha dashboard)
- [ ] Variables applied to: **Production**, **Preview**, **Development**

## First Deployment

- [ ] Click "Deploy" button
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Check deployment logs for errors
- [ ] Visit deployment URL
- [ ] Test homepage loads

## Post-Deployment Testing

- [ ] Homepage loads correctly ✅
- [ ] Navigation works ✅
- [ ] API endpoints respond:
  - [ ] `/api/oauth-redirect` returns redirect URL
  - [ ] `/api/players` returns mock data
- [ ] OAuth flow works (if configured)
- [ ] No console errors in browser
- [ ] Mobile view looks good
- [ ] Desktop view looks good

## Database Setup (Optional)

If using Vercel Postgres:
- [ ] Create Vercel Postgres database
- [ ] Note connection string
- [ ] Run `schema.sql` migrations
- [ ] Add `POSTGRES_URL` to environment variables
- [ ] Redeploy

## Domain Setup (Optional)

- [ ] Custom domain added in Project Settings
- [ ] DNS configured (CNAME or A record)
- [ ] SSL certificate generated (automatic)
- [ ] Domain verified and active

## Production Optimization

- [ ] Enable Analytics in Project Settings
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure caching headers (if needed)
- [ ] Test performance (Lighthouse, WebPageTest)
- [ ] Enable Speed Insights
- [ ] Review Function logs

## OAuth Configuration

Update OAuth redirect URLs in your provider:
- [ ] Google Cloud Console → Credentials
- [ ] Add authorized redirect URI: `https://your-app.vercel.app/auth/callback`
- [ ] For custom domain: `https://your-domain.com/auth/callback`
- [ ] Save changes
- [ ] Test OAuth flow

## Continuous Deployment

- [ ] Automatic deployments enabled for `main` branch
- [ ] Preview deployments enabled for PRs
- [ ] Branch deployments configured (optional)
- [ ] Deployment notifications configured (Slack, Discord, Email)

## Security

- [ ] Environment variables are secure (not in code)
- [ ] CORS configured correctly
- [ ] API authentication implemented
- [ ] Rate limiting considered (Vercel Edge Middleware)
- [ ] Input validation on all endpoints

## Monitoring

- [ ] Set up Vercel Analytics
- [ ] Configure deployment notifications
- [ ] Monitor function execution times
- [ ] Check error rates in dashboard
- [ ] Set up uptime monitoring (optional: UptimeRobot, Pingdom)

## Documentation

- [ ] Update README with production URL
- [ ] Document API endpoints
- [ ] Update OAuth redirect URLs in docs
- [ ] Share app with team/users

## Final Checks

- [ ] All features working in production
- [ ] No breaking console errors
- [ ] Performance is acceptable (< 3s load time)
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing done (Chrome, Firefox, Safari)

## 🎉 Deployment Complete!

Your app is live at: `https://your-app.vercel.app`

### Next Steps:
1. Share with users
2. Monitor analytics and errors
3. Iterate based on feedback
4. Scale as needed

---

## Quick Commands

```bash
# Local development with Vercel
npm run dev:vercel

# Deploy to production
npm run deploy:vercel

# View logs
vercel logs

# Check domains
vercel domains ls

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME
vercel env rm VARIABLE_NAME
```

---

**Congratulations!** 🎊 Your CricketConnect Pro app is now live on Vercel!
