# 🚨 CRITICAL SECURITY STEPS BEFORE PUSHING TO GITHUB 🚨

## ⚠️ EXPOSED API KEYS DETECTED

Your API keys were found in git history and MUST be rotated before pushing to GitHub.

### 🔴 EXPOSED KEYS (Found in git commits):
1. **Gemini API Key**: `AIzaSyCrwSdMDGfnCF3FriYelednEuj_uAhaUtM`
2. **Supabase URL**: `https://ihpnjkisoxjdcjkxkzfx.supabase.co`

---

## 📋 MANDATORY STEPS (DO IN ORDER):

### Step 1: Rotate Your API Keys (DO THIS FIRST!)

#### A. Rotate Gemini API Key
1. Go to: https://makersuite.google.com/app/apikey
2. **DELETE** the old key: `AIzaSyCrwSdMDGfnCF3FriYelednEuj_uAhaUtM`
3. Create a **NEW** API key
4. Copy the new key

#### B. Check Supabase Security
1. Go to your Supabase project: https://app.supabase.com/project/ihpnjkisoxjdcjkxkzfx
2. Check if you're using the **anon/public key** (safe to expose) or **service role key** (NEVER expose)
3. If using service role key, rotate it in Supabase settings

---

### Step 2: Clean Git History (Remove Exposed Keys from All Commits)

Run these commands to remove .env from ALL git history:

```bash
cd "/home/a-raghavendra/Desktop/hack the problem/rgukt-guide-ai-cafc7c9d"

# Remove .env from all git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force garbage collection
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Verify .env is removed from history
git log --all --full-history --oneline -- .env
# (This should return empty)
```

**WARNING**: This rewrites git history. If you've already pushed to a public repository, you MUST:
1. Delete the repository immediately
2. Create a new repository after completing these steps

---

### Step 3: Update Your .env File with NEW Keys

```bash
# Edit your .env file with the NEW keys
nano .env
```

Add:
```
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_new_anon_key"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"

VITE_GEMINI_API_KEY="your_NEW_gemini_api_key"
```

---

### Step 4: Verify .env is Ignored

```bash
# Verify .env is in .gitignore
grep "^\.env$" .gitignore

# Check git status - .env should NOT appear
git status

# Try to add .env (should fail)
git add .env
# Expected: "The following paths are ignored by one of your .gitignore files"
```

---

### Step 5: Final Security Check

```bash
# Search for any hardcoded secrets in code
grep -r "AIzaSyC" src/
grep -r "ihpnjkisoxjdcjkxkzfx" src/

# Should only find import.meta.env references, no hardcoded keys
```

---

### Step 6: Commit the Changes

```bash
# Stage all changes (except .env which is ignored)
git add .

# Commit
git commit -m "Security: Remove API keys and sensitive data"

# Verify .env is NOT in the commit
git show --name-only
```

---

## ✅ CHECKLIST BEFORE PUSHING:

- [ ] OLD Gemini API key DELETED from Google Cloud
- [ ] NEW Gemini API key created and added to .env
- [ ] Supabase keys verified (only using anon/public key)
- [ ] Git history cleaned (filter-branch completed)
- [ ] .env removed from ALL git history (verified with git log)
- [ ] .env file contains ONLY new keys (not old ones)
- [ ] .env is in .gitignore and NOT tracked by git
- [ ] No hardcoded API keys in source code (grep verified)
- [ ] .env.example exists with placeholder values
- [ ] All commits verified (no .env file present)

---

## 🔐 IF REPOSITORY IS ALREADY PUBLIC:

If you've already pushed this repository to GitHub (public or private), you MUST:

1. **DELETE the repository immediately** from GitHub
2. Complete ALL steps above
3. Create a **NEW** repository with a different name
4. Push the cleaned code to the new repository

**Reason**: Git history is permanent. Anyone who cloned your repo still has the old keys.

---

## 📝 Safe to Push When:

✅ All old API keys are deleted/rotated
✅ Git history is completely clean
✅ .env is ignored and not tracked
✅ Only .env.example is committed
✅ All code uses import.meta.env (no hardcoded keys)

---

## 🆘 Need Help?

If you're unsure about any step, **STOP** and ask for help before pushing to GitHub.

**Remember**: Once pushed to GitHub, assume all keys in git history are compromised permanently.
