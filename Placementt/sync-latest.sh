#!/bin/bash
# PlaceAI Repository Sync Script (Bash/Linux/macOS)

echo -e "\033[0;36m🚀 Starting repository sync...\033[0m"

if [ ! -d ".git" ]; then
    echo -e "\033[0;31m❌ Error: This script must be run from the root of the Placementt folder.\033[0m"
    exit 1
fi

CORRECT_URL="https://github.com/roddasasidhar5-cmyk/placement.git"
git remote set-url origin "$CORRECT_URL"

echo -e "\033[0;34m📡 Fetching latest updates...\033[0m"
git fetch origin

echo -e "\033[0;34m🌿 Switching to 'main' branch...\033[0m"
git checkout main || git checkout -b main origin/main

echo -e "\033[0;35m🔄 Overwriting local code with latest remote code...\033[0m"
git reset --hard origin/main

echo -e "\033[0;37m📦 Updating dependencies...\033[0m"
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

echo -e "\033[0;32m✅ Sync Complete!\033[0m"
