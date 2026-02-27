# PlaceAI Repository Sync Script (Universal)
# Run this to get the absolute latest code and clear any local conflicts.

Write-Host "🚀 Starting repository sync..." -ForegroundColor Cyan

# 1. Verify we are in a git repo
if (!(Test-Path .git)) {
    Write-Host "❌ Error: This script must be run from the root of the Placementt folder." -ForegroundColor Red
    exit
}

# 2. Configure Remote (Ensures we are pointing to the right place)
$correctUrl = "https://github.com/roddasasidhar5-cmyk/placement.git"
$currentUrl = git remote get-url origin 2>$null
if ($currentUrl -ne $correctUrl) {
    Write-Host "🔧 Updating remote origin to the latest URL..." -ForegroundColor Yellow
    git remote set-url origin $correctUrl
}

# 3. Fetch latest
Write-Host "📡 Fetching latest updates from GitHub..." -ForegroundColor Blue
git fetch origin

# 4. Force Switch to Main
Write-Host "🌿 Switching to 'main' branch..." -ForegroundColor Blue
git checkout main 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Branch 'main' not found locally, creating it..." -ForegroundColor Yellow
    git checkout -b main origin/main
}

# 5. Reset to match remote exactly
Write-Host "🔄 Resetting local code to match remote exactly (Overwriting any old code)..." -ForegroundColor Magenta
git reset --hard origin/main

# 6. Update dependencies
Write-Host "📦 Updating Backend dependencies..." -ForegroundColor Gray
cd backend
npm install
cd ..

Write-Host "📦 Updating Frontend dependencies..." -ForegroundColor Gray
cd frontend
npm install
cd ..

Write-Host "✅ Sync Complete! You now have the absolute latest code with all NVIDIA AI features." -ForegroundColor Green
Write-Host "💡 Note: Please restart your servers (npm start / npm run dev) to see the changes." -ForegroundColor Yellow
