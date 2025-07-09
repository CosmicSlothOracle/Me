#!/bin/bash

# 🚀 AI Specialist Portfolio - Netlify Deployment Script
# Automatisches Deployment zu GitHub für Netlify

echo "🚀 Starting deployment to GitHub Repository..."
echo "Repository: https://github.com/CosmicSlothOracle/Me.git"
echo ""

# Git Repository initialisieren falls noch nicht vorhanden
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Remote Repository hinzufügen/aktualisieren
echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/CosmicSlothOracle/Me.git

# Alle Dateien hinzufügen
echo "📄 Adding all files..."
git add .

# Commit erstellen mit Timestamp
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo "💾 Creating commit..."
git commit -m "🚀 Deploy AI Specialist Portfolio - $timestamp

Features:
- ComfyUI Workflows with technical guides
- Pixel Art & Sprite Frame workflows
- Professional responsive design
- Netlify optimized configuration
- Performance optimizations"

# Branch setzen und pushen
echo "🌐 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Go to netlify.com and log in"
echo "2. Click 'New site from Git'"
echo "3. Select GitHub provider"
echo "4. Choose repository: CosmicSlothOracle/Me"
echo "5. Deploy settings:"
echo "   - Branch: main"
echo "   - Build command: (leave empty)"
echo "   - Publish directory: ./"
echo "6. Click 'Deploy site'"
echo ""
echo "📱 Your site will be live at: https://random-name-123.netlify.app"
echo "🔄 Automatic deployment: Every git push triggers new deployment"
echo ""
echo "🚀 Ready for professional use!"