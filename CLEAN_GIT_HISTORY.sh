#!/bin/bash
# Script to clean .env from git history

echo "🔒 Cleaning .env from git history..."
echo ""

# Step 1: Remove .env from all commits
echo "Step 1: Removing .env from all commits..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

echo ""
echo "Step 2: Cleaning up refs..."
# Step 2: Clean up refs
rm -rf .git/refs/original/
git reflog expire --expire=now --all

echo ""
echo "Step 3: Garbage collection..."
# Step 3: Force garbage collection
git gc --prune=now --aggressive

echo ""
echo "✅ Git history cleaned!"
echo ""
echo "Verification:"
echo "Checking if .env still exists in history..."
git log --all --oneline -- .env

echo ""
echo "If no results above, .env has been successfully removed from history!"
echo ""
echo "⚠️  IMPORTANT: If you already pushed to GitHub, you MUST:"
echo "   1. Delete the GitHub repository"
echo "   2. Create a new repository"
echo "   3. Push the cleaned code to the new repository"
