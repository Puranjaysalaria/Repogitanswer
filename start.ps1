# AnswerGit Startup Script
# This script starts both the GitIngest API and the Next.js development server

Write-Host "🚀 Starting AnswerGit..." -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Error: .env.local file not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your API keys." -ForegroundColor Yellow
    Write-Host "See README.md for instructions." -ForegroundColor Yellow
    exit 1
}

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.8 or later." -ForegroundColor Red
    exit 1
}

# Check if Node is installed
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 16 or later." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan

# Install Python dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
Set-Location gitingest-api
pip install -r requirements.txt -q
Set-Location ..
Write-Host "✅ Python dependencies installed" -ForegroundColor Green

# Install Node dependencies (if needed)
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Node dependencies..." -ForegroundColor Yellow
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        pnpm install
    } elseif (Get-Command npm -ErrorAction SilentlyContinue) {
        npm install
    } else {
        Write-Host "❌ Neither pnpm nor npm found!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Node dependencies installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting services..." -ForegroundColor Cyan
Write-Host ""

# Start GitIngest API in background
Write-Host "▶️  Starting GitIngest API on http://localhost:8000..." -ForegroundColor Yellow
$gitingestJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    Set-Location gitingest-api
    python main.py
}

# Wait a bit for GitIngest to start
Start-Sleep -Seconds 3

# Check if GitIngest is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/ping" -Method GET -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ GitIngest API is running!" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  GitIngest API might not be responding yet..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "▶️  Starting Next.js development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Start Next.js (this will run in foreground)
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm dev
} else {
    npm run dev
}

# Cleanup on exit
Write-Host ""
Write-Host "🛑 Shutting down services..." -ForegroundColor Yellow
Stop-Job -Job $gitingestJob
Remove-Job -Job $gitingestJob
Write-Host "✅ Services stopped" -ForegroundColor Green
