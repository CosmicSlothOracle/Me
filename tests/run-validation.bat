@echo off
echo.
echo 🎮 SPRITESHEET ANIMATION VALIDATION
echo ====================================
echo.

echo Starte automatisierte Validierung...
echo.

REM Prüfe ob Node.js verfügbar ist
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js nicht gefunden!
    echo Bitte installiere Node.js um den Test ausführen zu können.
    pause
    exit /b 1
)

REM Prüfe ob Canvas-Modul installiert ist
echo Prüfe Dependencies...
npm list canvas >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Canvas-Modul nicht installiert. Installiere...
    npm install canvas
    if errorlevel 1 (
        echo ❌ Installation fehlgeschlagen!
        echo Versuche: npm install canvas
        pause
        exit /b 1
    )
)

echo.
echo 🚀 Führe Validierung aus...
echo.

REM Validierung ausführen
node spritesheet-validation.js

REM Ergebnis auswerten
if errorlevel 1 (
    echo.
    echo ❌ VALIDATION FEHLGESCHLAGEN!
    echo Siehe Output oben für Details.
) else (
    echo.
    echo ✅ VALIDATION ERFOLGREICH!
    echo Alle Tests bestanden.
)

echo.
echo Drücke eine Taste zum Beenden...
pause >nul