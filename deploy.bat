@echo off
echo.
echo 🚀 AI Specialist Portfolio - Netlify Deployment Script
echo Repository: https://github.com/CosmicSlothOracle/Me.git
echo.

REM Git Repository initialisieren falls noch nicht vorhanden
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
)

REM Remote Repository hinzufügen/aktualisieren
echo 🔗 Setting up remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/CosmicSlothOracle/Me.git

REM Alle Dateien hinzufügen
echo 📄 Adding all files...
git add .

REM Commit erstellen mit Timestamp
echo 💾 Creating commit...
for /f "tokens=1-6 delims=:. " %%a in ('echo %date% %time%') do (
    set timestamp=%%a %%b %%c %%d:%%e:%%f
)
git commit -m "🚀 Deploy AI Specialist Portfolio - %timestamp%

Features:
- ComfyUI Workflows with technical guides
- Pixel Art & Sprite Frame workflows
- Professional responsive design
- Netlify optimized configuration
- Performance optimizations"

REM Branch setzen und pushen
echo 🌐 Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Deployment completed successfully!
echo.
echo 🎯 Next steps:
echo 1. Go to netlify.com and log in
echo 2. Click 'New site from Git'
echo 3. Select GitHub provider
echo 4. Choose repository: CosmicSlothOracle/Me
echo 5. Deploy settings:
echo    - Branch: main
echo    - Build command: (leave empty)
echo    - Publish directory: ./
echo 6. Click 'Deploy site'
echo.
echo 📱 Your site will be live at: https://random-name-123.netlify.app
echo 🔄 Automatic deployment: Every git push triggers new deployment
echo.
echo 🚀 Ready for professional use!
echo.
pause