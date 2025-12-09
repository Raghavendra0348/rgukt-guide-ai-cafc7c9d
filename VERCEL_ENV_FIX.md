# 🚨 Vercel Deployment - API Key Error Fix

**Issue**: Chat showing "API key error" after deploying to Vercel  
**Cause**: Environment variables not added to Vercel

---

## ⚡ IMMEDIATE FIX (5 minutes)

### Add Environment Variables to Vercel:

#### Method 1: Via Vercel Dashboard (Easiest)

1. **Go to Your Vercel Project**:
   - Visit: https://vercel.com/dashboard
   - Click on your deployed project: `rgukt-guide-ai-cafc7c9d`

2. **Open Settings**:
   - Click **"Settings"** tab at the top
   - Click **"Environment Variables"** in the left sidebar

3. **Add Each Variable**:
   
   **Variable 1:**
   - Key: `VITE_SUPABASE_PROJECT_ID`
   - Value: `ihpnjkisoxjdcjkxkzfx`
   - Environment: Select **Production, Preview, Development** (all three)
   - Click **"Save"**

   **Variable 2:**
   - Key: `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocG5qa2lzb3hqZGNqa3hremZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNzUyOTQsImV4cCI6MjA4MDc1MTI5NH0.S2-HfT8NsxsIILKRDJuD4kTFNJQAYkARShjjmtICFy4`
   - Environment: **All three**
   - Click **"Save"**

   **Variable 3:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://ihpnjkisoxjdcjkxkzfx.supabase.co`
   - Environment: **All three**
   - Click **"Save"**

   **Variable 4 (MOST IMPORTANT):**
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSyCj9AgIydxmDqcEFKS8teoA68TNhXuzhF4`
   - Environment: **All three**
   - Click **"Save"**

4. **Redeploy**:
   - Go to **"Deployments"** tab
   - Click the **three dots** on the latest deployment
   - Click **"Redeploy"**
   - Wait for redeployment to complete (~2 minutes)

5. **Test Your Site**:
   - Visit your Vercel URL
   - Try chatting
   - Should work now! ✅

---

#### Method 2: Via Vercel CLI (Alternative)

```bash
cd "/home/a-raghavendra/Desktop/hack the problem/rgukt-guide-ai-cafc7c9d"

# Add each environment variable
vercel env add VITE_SUPABASE_PROJECT_ID production
# When prompted, paste: ihpnjkisoxjdcjkxkzfx

vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
# Paste the publishable key

vercel env add VITE_SUPABASE_URL production
# Paste: https://ihpnjkisoxjdcjkxkzfx.supabase.co

vercel env add VITE_GEMINI_API_KEY production
# Paste: AIzaSyCj9AgIydxmDqcEFKS8teoA68TNhXuzhF4

# Redeploy
vercel --prod
```

---

## 📋 Environment Variables Checklist

Copy these to Vercel (Settings → Environment Variables):

```bash
# Variable 1
VITE_SUPABASE_PROJECT_ID
ihpnjkisoxjdcjkxkzfx

# Variable 2
VITE_SUPABASE_PUBLISHABLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocG5qa2lzb3hqZGNqa3hremZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNzUyOTQsImV4cCI6MjA4MDc1MTI5NH0.S2-HfT8NsxsIILKRDJuD4kTFNJQAYkARShjjmtICFy4

# Variable 3
VITE_SUPABASE_URL
https://ihpnjkisoxjdcjkxkzfx.supabase.co

# Variable 4 (CRITICAL)
VITE_GEMINI_API_KEY
AIzaSyCj9AgIydxmDqcEFKS8teoA68TNhXuzhF4
```

---

## 🔍 Why This Happened

### Local vs Production:
- **Local (.env file)**: Works because `.env` is read locally
- **Vercel**: Needs variables added in dashboard
- **`.env` file**: NOT deployed to Vercel (ignored by `.gitignore`)

### Common Mistake:
❌ Thinking `.env` file automatically works on Vercel  
✅ Need to add variables manually in Vercel settings

---

## ⚠️ Important Notes

### 1. VITE_ Prefix Required
All variables MUST start with `VITE_` to be accessible in the browser:
```typescript
// This works:
import.meta.env.VITE_GEMINI_API_KEY

// This doesn't work (undefined):
import.meta.env.GEMINI_API_KEY
```

### 2. Select All Environments
When adding variables, select:
- ✅ Production
- ✅ Preview
- ✅ Development

This ensures variables work in all deployment types.

### 3. Must Redeploy
After adding environment variables:
- Variables don't apply to existing deployments
- You MUST redeploy for changes to take effect

---

## 🧪 How to Verify

### Check Environment Variables in Vercel:

1. **Before Redeploying**:
   - Vercel → Settings → Environment Variables
   - Should see all 4 variables listed

2. **After Redeploying**:
   - Visit your deployed site
   - Open browser console (F12)
   - Type: `import.meta.env.VITE_GEMINI_API_KEY`
   - Should show your key (if in development mode)

3. **Test Chat**:
   - Go to chat page
   - Ask a question
   - Should get AI response ✅

---

## 🎯 Step-by-Step Visual Guide

```
1. Vercel Dashboard
   └─ Your Project (rgukt-guide-ai-cafc7c9d)
      └─ Settings (top tab)
         └─ Environment Variables (left sidebar)
            └─ Add Variable (button)
               ├─ Key: VITE_GEMINI_API_KEY
               ├─ Value: AIzaSy...
               └─ Environments: ✅ All
            └─ Save

2. Deployments Tab
   └─ Latest Deployment
      └─ ... (three dots)
         └─ Redeploy

3. Wait 2 minutes

4. Test your site ✅
```

---

## 🔐 Security Note

The Supabase keys shown are:
- ✅ `PUBLISHABLE_KEY` - Safe to expose (meant for client-side)
- ✅ `ANON_KEY` - Safe to expose (public key)

**Never expose**:
- ❌ `SERVICE_ROLE_KEY` - Keep this secret!
- ❌ Old Gemini keys (use fresh key for production)

---

## 🚀 Production Best Practices

### For Production Deployment:

1. **Create New API Key** (recommended):
   - Go to https://aistudio.google.com/app/apikey
   - Create separate key for production
   - Use in Vercel (not the same as dev key)

2. **Enable Billing** (optional):
   - Higher quota limits
   - Better reliability
   - Unlimited daily requests

3. **Monitor Usage**:
   - Check API quota regularly
   - Set up alerts in Google Cloud

---

## 📊 Common Errors & Solutions

### Error: "API key not configured"
**Solution**: Add `VITE_GEMINI_API_KEY` to Vercel

### Error: "undefined is not a valid API key"
**Solution**: 
1. Check variable name has `VITE_` prefix
2. Redeploy after adding variable
3. Verify in Vercel settings

### Error: Still not working after adding variables
**Solution**:
1. Clear browser cache
2. Do a **full redeploy** (not just refresh)
3. Check browser console for actual error
4. Verify all 4 variables are added

### Chat works locally but not on Vercel
**Solution**: Environment variables not added or not redeployed

---

## ✅ Final Checklist

Before testing:

- [ ] Added `VITE_SUPABASE_PROJECT_ID` to Vercel
- [ ] Added `VITE_SUPABASE_PUBLISHABLE_KEY` to Vercel
- [ ] Added `VITE_SUPABASE_URL` to Vercel
- [ ] Added `VITE_GEMINI_API_KEY` to Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Saved all variables
- [ ] Redeployed the site
- [ ] Waited for deployment to complete
- [ ] Tested chat on deployed site

---

## 🆘 Still Having Issues?

### Check Build Logs:
1. Vercel → Deployments → Latest deployment
2. Click on deployment
3. Check "Build Logs" for errors

### Check Function Logs:
1. Vercel → Deployments → Latest deployment
2. Click "Runtime Logs"
3. Look for API errors

### Verify Variables:
```bash
# In Vercel dashboard
Settings → Environment Variables
# Should see all 4 variables listed
```

---

## 📞 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Add Env Variables**: Your Project → Settings → Environment Variables
- **Get API Key**: https://aistudio.google.com/app/apikey
- **Supabase Dashboard**: https://app.supabase.com

---

**Quick Fix**: Add 4 environment variables to Vercel → Redeploy → Test! 🚀

**Estimated Time**: 5 minutes ⏱️
