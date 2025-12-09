# 🔧 Gemini API Quota Exceeded - Fix Guide

**Issue**: "API quota exceeded" error in chat

---

## 🚨 Immediate Solutions

### Solution 1: Get a New API Key (Recommended)

Your current API key may have reached its quota. Get a fresh one:

1. **Go to Google AI Studio**:
   - Visit: https://aistudio.google.com/app/apikey
   - Sign in with your Google account

2. **Create New API Key**:
   - Click "Create API Key"
   - Select "Create API key in new project" (or use existing project)
   - Copy the new key

3. **Update Your .env File**:
   ```bash
   # Replace the old key with the new one
   VITE_GEMINI_API_KEY="your_new_api_key_here"
   ```

4. **Restart Dev Server**:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

---

### Solution 2: Check Your API Quota

1. **Visit**: https://aistudio.google.com/app/apikey
2. Click on your API key
3. Check:
   - **Requests per minute (RPM)**: 15 (free tier)
   - **Requests per day (RPD)**: 1,500 (free tier)
   - **Tokens per minute (TPM)**: 1 million (free tier)

4. If exceeded:
   - **Wait**: Quota resets daily (midnight PT)
   - **Upgrade**: Enable billing for higher limits
   - **Create new project**: Get separate quota

---

### Solution 3: Use gemini-1.5-flash (Done ✅)

I've already updated your code to:
- ✅ Use `gemini-1.5-flash` (more stable, higher quota)
- ✅ Limit chat history to last 6 messages (saves tokens)
- ✅ Reduce maxOutputTokens to 300 (saves quota)
- ✅ Better error messages with links

---

## 🔍 Why This Happened

### Free Tier Limits:
- **15 requests per minute**
- **1,500 requests per day**
- **1 million tokens per minute**

### Common Causes:
1. Too many requests in short time
2. Daily quota exceeded
3. Large chat history consuming tokens
4. Multiple users testing simultaneously
5. Old/invalid API key

---

## ⚡ Optimizations Applied

### 1. Changed Model
```typescript
// Before
model: "gemini-2.5-flash-lite"

// After (More stable)
model: "gemini-1.5-flash"
```

### 2. Limited Chat History
```typescript
// Only keep last 6 messages (saves ~80% tokens)
const recentMessages = messages.slice(-6);
```

### 3. Reduced Output Tokens
```typescript
maxOutputTokens: 300  // Down from 512
```

### 4. Better Error Handling
- Shows link to check quota
- Suggests waiting time
- Clearer error messages

---

## 🎯 Best Practices

### For Development:
1. **Use separate API key** for development and production
2. **Clear chat history** after testing
3. **Wait 1-2 seconds** between requests
4. **Don't spam** the chatbot during testing

### For Production (Vercel):
1. **Enable billing** in Google Cloud (optional)
2. **Monitor usage** regularly
3. **Add rate limiting** on your backend
4. **Cache common responses**

---

## 🔄 Alternative: Upgrade to Paid Plan

If you need higher limits:

### Google Cloud Console:
1. Go to: https://console.cloud.google.com
2. Enable billing for your project
3. Enable Gemini API
4. Get higher quotas:
   - **360 RPM** (vs 15 free)
   - **Unlimited RPD** (vs 1,500 free)
   - **4 million TPM** (vs 1 million free)

---

## 🧪 Test Your New API Key

After updating the API key:

```bash
# 1. Restart dev server
npm run dev

# 2. Test chat with simple question
"Hi, what is RGUKT?"

# 3. Check if response works
```

---

## ⚠️ Important Notes

1. **Free API Keys**:
   - Reset daily at midnight PT
   - Good for development and testing
   - May hit limits with multiple users

2. **Production Deployment**:
   - Consider paid plan for production
   - Or add backend to manage rate limiting
   - Or implement response caching

3. **Security**:
   - Never commit API keys to git
   - Use environment variables
   - Rotate keys regularly

---

## 📊 Current Optimizations

| Optimization | Before | After | Savings |
|-------------|--------|-------|---------|
| Model | gemini-2.5-flash-lite | gemini-1.5-flash | More stable |
| Chat History | All messages | Last 6 only | ~80% tokens |
| Max Tokens | 512 | 300 | ~40% quota |
| Error Handling | Basic | Detailed + links | Better UX |

---

## ✅ Quick Checklist

- [ ] Get new API key from Google AI Studio
- [ ] Update `.env` file with new key
- [ ] Restart development server
- [ ] Test chat functionality
- [ ] Check quota usage
- [ ] Consider enabling billing for production

---

## 🆘 Still Having Issues?

### Error: "API key not valid"
- Create a new API key
- Make sure it's enabled for Gemini API
- Check for typos in .env file

### Error: "429 Too Many Requests"
- Wait 1 minute and try again
- Check daily quota hasn't exceeded
- Consider enabling billing

### Error: "503 Service Unavailable"
- Google's servers are down
- Wait a few minutes and retry
- Check status: https://status.cloud.google.com

---

## 📝 Next Steps for Production

When deploying to Vercel:

1. **Create production API key** (separate from dev)
2. **Enable billing** for higher limits
3. **Add to Vercel environment variables**
4. **Monitor usage** in Google Cloud Console
5. **Set up alerts** for quota limits

---

**Quick Fix**: Get new API key → Update .env → Restart server → Test! 🚀
