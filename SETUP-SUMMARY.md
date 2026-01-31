# AnswerGit - Complete Setup Summary

## ✅ Current Status

Your AnswerGit is now configured and ready to use!

### What's Running:
- ✅ GitIngest API: http://localhost:8000
- ⏳ Next.js App: You need to start this separately

### Configuration Files:
- ✅ `.env.local` - Contains your API keys and configuration
- ✅ `TROUBLESHOOTING.md` - Comprehensive troubleshooting guide
- ✅ `start.bat` / `start.ps1` - Quick startup scripts

---

## 🚀 How to Start AnswerGit

### Option 1: Quick Start (Easiest)
Just double-click `start.bat` in File Explorer!

Or from PowerShell:
```powershell
.\start.bat
```

### Option 2: Manual Start
You need TWO terminals:

**Terminal 1:**
```bash
cd gitingest-api
python main.py
```
Keep this running! You should see:
```
Uvicorn running on http://0.0.0.0:8000
```

**Terminal 2:**
```bash
pnpm dev
# or: npm run dev
```
Keep this running! You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Then open: http://localhost:3000

---

## 🎯 Quick Test

Try analyzing this small repository first:
- **Username:** `octocat`
- **Repository:** `Hello-World`

If this works, you know your setup is correct!

---

## ❓ Understanding the Errors You Saw

### 1. "REDIS_URL environment variable not configured"
- **Status:** ⚠️ Warning (not an error)
- **Impact:** None - app uses file-based cache instead
- **Fix:** Not needed, but you can add Redis if you want caching

### 2. "RPC failed; curl 56 Recv failure: Connection was reset"
- **Status:** ❌ Network error during git clone
- **Cause:** The app downloads repos temporarily to analyze them
- **Impact:** Analysis fails for that repository
- **Common Reasons:**
  - Unstable internet connection
  - Repository is too large
  - GitHub rate limiting
  - Timeout during clone

### 3. "Does it use my laptop's storage?"
- **Answer:** YES, but temporarily
- **Location:** `C:\Users\Croma\AppData\Local\Temp\gitingest\`
- **Cleanup:** Automatic after analysis
- **Manual cleanup:** Delete the temp folder if needed

---

## 🔧 Why Some Repos Work and Others Don't

**Why `answergit` repo worked:**
1. It's relatively small
2. Good network conditions at that moment
3. Might have been cached from a previous attempt

**Why other repos fail:**
1. **Network issues:** Connection drops during clone
2. **Size issues:** Repo is too large (>50MB per file)
3. **Rate limiting:** Too many requests to GitHub
4. **Timeout:** Clone takes too long

**Solution:**
- Use a stable internet connection
- Try smaller repositories first
- Ensure both servers (GitIngest + Next.js) are running
- Check that your GitHub token is valid

---

## 📊 System Architecture

```
User Browser (localhost:3000)
         ↓
Next.js App (Frontend + API Routes)
         ↓
GitIngest API (Python - localhost:8000)
         ↓
Git Clone (Temporary storage in %TEMP%)
         ↓
Analysis & Cleanup
         ↓
Return results to user
```

**Key Points:**
- Next.js handles the UI and user interaction
- GitIngest API clones and analyzes repositories
- Files are stored temporarily only during analysis
- Everything runs locally on your machine

---

## 🛡️ Security & Privacy

✅ **All processing happens locally** on your computer
✅ **No data is sent to external servers** (except GitHub/Gemini API)
✅ **Your API keys stay in `.env.local`** (never committed to git)
✅ **Temporary files are auto-deleted** after analysis

---

## 📝 API Keys Explained

### GitHub Token (`GITHUB_TOKEN`)
- **Purpose:** Access GitHub repositories with higher rate limits
- **Rate Limits:**
  - With token: 5,000 requests/hour
  - Without token: 60 requests/hour
- **Permissions needed:** `public_repo`, `read:user`
- **Get it:** https://github.com/settings/tokens

### Gemini API Key (`GEMINI_API_KEY`)
- **Purpose:** AI-powered code analysis and chat
- **Free Tier:**
  - 15 requests/minute
  - 1,500 requests/day
- **Get it:** https://aistudio.google.com/app/apikey

### GitIngest API URL (`GITINGEST_API_URL`)
- **Purpose:** Points to your local Python service
- **Value:** `http://localhost:8000`
- **Required:** Yes (must be running)

---

## 🚨 If Something Goes Wrong

### 1. Check Both Services Are Running
```bash
# Check GitIngest API
curl http://localhost:8000/ping
# Should return: {"message":"pong"}

# Check Next.js
# Should see it in browser at http://localhost:3000
```

### 2. Check the Logs
- Look at both terminal windows
- GitIngest shows: clone progress, errors
- Next.js shows: API requests, errors

### 3. Restart Everything
```bash
# Stop both services (Ctrl+C in terminals)
# Then restart:
.\start.bat
```

### 4. Clear Cache/Temp Files
```powershell
# Clear temp files
Remove-Item -Path "$env:TEMP\gitingest" -Recurse -Force

# Restart your browser
```

### 5. Still Not Working?
See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions!

---

## 💡 Pro Tips

1. **Start with small repos** - Test with `octocat/Hello-World`
2. **Keep terminals open** - Don't close the service terminals
3. **Check your connection** - Stable internet is important
4. **Monitor disk space** - Large repos need temporary storage
5. **Use valid API keys** - Verify they work before using

---

## 📚 Useful Commands

### Check Services Status
```bash
# Check if GitIngest is running
curl http://localhost:8000/ping

# Check if Next.js is running
curl http://localhost:3000
```

### Clean Up
```bash
# Clear temp files
Remove-Item -Path "$env:TEMP\gitingest" -Recurse -Force

# Clear Next.js cache
Remove-Item -Path ".next" -Recurse -Force
pnpm dev
```

### Update Dependencies
```bash
# Update Python packages
cd gitingest-api
pip install -r requirements.txt --upgrade

# Update Node packages
pnpm update
```

---

## 🎉 You're All Set!

Your AnswerGit installation is complete and ready to use. Just run `start.bat` and start exploring repositories!

**Quick Start Checklist:**
- ✅ Python installed
- ✅ Node.js installed
- ✅ Dependencies installed
- ✅ `.env.local` configured
- ✅ GitIngest API can start
- ✅ Ready to run!

**Next Steps:**
1. Run `start.bat`
2. Open http://localhost:3000
3. Try analyzing `octocat/Hello-World`
4. Enjoy exploring codebases with AI! 🚀

---

**Need Help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or open an issue on GitHub!
