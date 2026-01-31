# 🔧 AnswerGit Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "REDIS_URL environment variable not configured"
**Symptom:** Warning message about Redis cache (NOW FIXED ✅)

**Status:** **RESOLVED** - Redis is now completely optional!

**What Changed:**
- The app now automatically uses file-based cache if Redis is not available
- No more error messages or warnings
- Works perfectly without Redis

**Solution:** 
- Keep your current `.env.local` with `REDIS_URL=` (empty)
- The app uses file-based caching automatically (stored in `./cache/` folder)
- For production or better performance, see [REDIS-SETUP.md](REDIS-SETUP.md) to optionally install Redis

**Cache Location Without Redis:**
- Files stored in: `./cache/` folder in your project
- Automatic cleanup after 6 hours
- Works perfectly for local development

---

### Issue 2: Git Clone Failures / Network Errors
**Symptom:** 
```
error: RPC failed; curl 56 Recv failure: Connection was reset
fatal: fetch-pack: invalid index-pack output
```

**Root Causes:**
1. Network instability/timeouts
2. Large repositories
3. GitHub rate limiting
4. Firewall/antivirus interference

**Solutions:**

#### A. Increase Git Buffer Size
```bash
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

#### B. Use GitHub Token Authentication
Your `.env.local` should have:
```env
GITHUB_TOKEN=ghp_your_token_here
```

#### C. For Large Repositories
The gitingest library clones repos to your temp folder temporarily:
- **Location:** `C:\Users\Croma\AppData\Local\Temp\gitingest\...`
- **Storage:** Yes, it uses your laptop's storage temporarily
- **Cleanup:** Files are automatically deleted after processing
- **Size limit:** Default is 50MB max file size

If a repo is too large, you'll see: "Repository too large to process"

---

### Issue 3: Repository Analysis Works Only for answergit Repo

**Why it works for answergit:**
- It's a smaller repository
- Better network conditions during that clone
- Already might be cached

**Why it fails for other repos:**
1. Network timeout during git clone
2. Repository size exceeds limits
3. GitHub rate limiting

**Solutions:**

1. **Ensure GitIngest API is Running:**
   ```bash
   cd gitingest-api
   python main.py
   ```
   Should show: `Uvicorn running on http://0.0.0.0:8000`

2. **Verify Configuration:**
   Check `.env.local` has:
   ```env
   GITINGEST_API_URL=http://localhost:8000
   GITHUB_TOKEN=your_token_here
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Test GitIngest API:**
   ```bash
   curl http://localhost:8000/ping
   ```
   Should return: `{"message":"pong"}`

4. **Check Your Internet Connection:**
   - Stable connection needed for cloning repos
   - Try smaller repositories first
   - Check if behind a firewall/proxy

5. **Try a Smaller Repository First:**
   ```
   username: octocat
   repo: Hello-World
   ```

---

### Issue 4: Storage Concerns

**Q: Does it use my laptop's storage?**
**A:** Yes, temporarily:
- Repos are cloned to: `C:\Users\Croma\AppData\Local\Temp\gitingest\`
- Files are deleted after analysis
- Only exists during processing
- Not permanent storage

**To clean up manually:**
```bash
# Windows
Remove-Item -Path "$env:TEMP\gitingest" -Recurse -Force

# Or navigate and delete:
# C:\Users\Croma\AppData\Local\Temp\gitingest\
```

---

## 🚀 Complete Setup Checklist

### 1. **Start GitIngest API** (Required)
```bash
cd gitingest-api
python main.py
```
Keep this terminal running!

### 2. **Start Next.js App** (Required)
```bash
# In a new terminal
pnpm dev
# or npm run dev
```

### 3. **Verify Configuration**
Ensure `.env.local` contains:
```env
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
GITINGEST_API_URL=http://localhost:8000
REDIS_URL=
```

### 4. **Test the Setup**
1. Open http://localhost:3000
2. Try analyzing a small repo first:
   - Username: `octocat`
   - Repo: `Hello-World`

---

## 🐛 Debug Steps

### If Analysis Fails:

1. **Check GitIngest API logs:**
   Look at the terminal running `python main.py`
   - Should show incoming requests
   - Shows clone progress
   - Shows any errors

2. **Check Next.js logs:**
   Look at the terminal running `pnpm dev`
   - Shows API route errors
   - Shows network issues

3. **Check Browser Console:**
   - Press F12
   - Look for error messages
   - Check Network tab for failed requests

4. **Test API directly:**
   ```bash
   curl -X POST http://localhost:8000/ingest/ \
     -H "Content-Type: application/json" \
     -d "{\"github_link\": \"https://github.com/octocat/Hello-World\"}"
   ```

---

## 📊 Rate Limits

### GitHub API:
- **With token:** 5,000 requests/hour
- **Without token:** 60 requests/hour

### Gemini API (Free Tier):
- 15 requests per minute
- 1,500 requests per day

---

## 💡 Tips for Success

1. **Start with small repos** to test your setup
2. **Keep both servers running** (GitIngest + Next.js)
3. **Use a stable internet connection** for cloning
4. **Check logs** when something fails
5. **Clear temp folder** if you run into disk space issues

---

## 🆘 Still Having Issues?

1. Restart both servers (GitIngest API and Next.js)
2. Clear browser cache
3. Delete temp files: `$env:TEMP\gitingest`
4. Try a different repository
5. Check your GitHub token has the right permissions:
   - `public_repo`
   - `read:user`

---

## 📝 System Requirements

- **Python:** 3.8+ (with pip)
- **Node.js:** 16+ (with pnpm/npm)
- **Git:** Must be installed and in PATH
- **Internet:** Stable connection for cloning repos
- **Disk Space:** ~500MB free for temp files

---

Made with ❤️ | [Report Issues](https://github.com/Puranjaysalaria/answergit/issues)
