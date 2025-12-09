# 🔑 URGENT: Fix Gemini API Key Issue

## ⚠️ Problem
Your Gemini API key has been **leaked** and is now **blocked** by Google.

**Error Message:**
```
[403] Your API key was reported as leaked. Please use another API key.
```

---

## ✅ Solution Steps

### 1. Get a New API Key

1. **Go to Google AI Studio:**
   - Visit: https://aistudio.google.com/app/apikey

2. **Sign in** with your Google account

3. **Delete the old (leaked) API key:**
   - Find your leaked key in the list
   - Click "Delete" or "Revoke"

4. **Create a new API key:**
   - Click "Create API Key"
   - Select "Create API key in new project" or use existing project
   - **Copy the new API key immediately**

---

### 2. Update Your Project

#### Option A: Using `.env` file (Recommended)

1. **Open or create** `.env` file in project root:
   ```bash
   /home/a-raghavendra/Desktop/hack the problem/rgukt-guide-ai-cafc7c9d/.env
   ```

2. **Add your new API key:**
   ```env
   VITE_GEMINI_API_KEY=YOUR_NEW_API_KEY_HERE
   ```
   
   Replace `YOUR_NEW_API_KEY_HERE` with your actual new key.

3. **Save the file**

4. **Restart the dev server:**
   ```bash
   # Press Ctrl+C to stop current server
   npm run dev
   # or
   bun run dev
   ```

#### Option B: Using Environment Variables Directly

```bash
export VITE_GEMINI_API_KEY="your_new_api_key_here"
npm run dev
```

---

### 3. Secure Your API Key

#### ✅ DO:
- Store API keys in `.env` file
- Add `.env` to `.gitignore`
- Never commit API keys to Git
- Use environment variables
- Keep keys private

#### ❌ DON'T:
- Hardcode API keys in source code
- Share API keys publicly
- Commit `.env` to Git repositories
- Post API keys in screenshots/videos
- Share API keys in chat/forums

---

### 4. Check `.gitignore`

Make sure your `.gitignore` includes:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# API Keys
*.key
secrets/
```

---

### 5. Verify It Works

1. **Restart the dev server**
2. **Go to chat page:** http://localhost:5173/chat
3. **Send a test message:** "Hello, who are you?"
4. **Check for response** - should work now!

---

## 🔧 Quick Fix Commands

```bash
# Stop the current dev server
# Press Ctrl+C

# Create/edit .env file
nano .env
# or
code .env

# Add this line (replace with your actual key):
VITE_GEMINI_API_KEY=YOUR_NEW_API_KEY_HERE

# Save and exit (Ctrl+X, then Y, then Enter for nano)

# Restart dev server
npm run dev
```

---

## 📋 Checklist

- [ ] Deleted old (leaked) API key from Google AI Studio
- [ ] Created new API key
- [ ] Added new key to `.env` file
- [ ] Verified `.env` is in `.gitignore`
- [ ] Restarted dev server
- [ ] Tested chat functionality
- [ ] API key working correctly

---

## 🚨 If Still Not Working

### Check Environment Variable is Loaded:

Add this temporary code to `src/lib/gemini-api.ts`:

```typescript
function getGenAI() {
  if (!genAI) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // Temporary debug log
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    
    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}
```

**If it shows "API Key exists: false":**
- Your `.env` file is not being read
- Make sure `.env` is in project root
- Restart the dev server completely

**Remove the debug logs after fixing!**

---

## 🔗 Useful Links

- **Get API Key:** https://aistudio.google.com/app/apikey
- **Gemini API Docs:** https://ai.google.dev/docs
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html

---

## 💡 Alternative: Use Mock Responses (Temporary)

If you want to test without API key temporarily, you can modify `gemini-api.ts`:

```typescript
export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    // TEMPORARY: Mock response for testing
    const mockResponse = `Hello! I'm Medha AI, your RGUKT campus assistant. 

I can help you with:
• Academic information
• Exam schedules
• Fee details
• Hostel information

Please note: This is a demo response. Get a Gemini API key to enable full AI features.`;

    // Simulate streaming
    for (let i = 0; i < mockResponse.length; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 50));
      onDelta(mockResponse.slice(i, i + 5));
    }
    
    onDone();
  } catch (error: any) {
    onError(error?.message || "Failed to get response");
  }
}
```

**Remember:** This is just for testing. Replace with real API implementation once you have a new key!

---

## ✅ Expected Result

After fixing:
1. ✅ No 403 errors in console
2. ✅ Chat responds to messages
3. ✅ AI generates proper responses
4. ✅ All features working

---

**Need Help?**
- Check Google AI Studio for API key status
- Verify `.env` file format
- Make sure dev server is restarted
- Check browser console for errors

**Status:** 🔴 API Key Blocked → 🟢 Fixed with New Key
