# 🖼️ Card Images Test

## Übersicht

Dieser Test überprüft automatisch alle Card-Images der CV-Website auf:

- **Vorhandensein**: Sind alle erwarteten Bilder vorhanden?
- **Korrekte Benennung**: Entsprechen die Dateinamen den Erwartungen?
- **Korrekte Darstellung**: Werden die Bilder erfolgreich geladen?

## Test ausführen

### Lokaler Server

```bash
# Im Hauptverzeichnis der CV-Website
python -m http.server 8000
```

### Browser öffnen

```
http://localhost:8000/tests/card-images-test.html
```

## Was wird getestet?

### 1. Theme-spezifische Bilder

- **Standard Theme**: SVG-Fallbacks + Pixel Art ComfyUI
- **Pixel Art Theme**: 4 PNG-Bilder (`cv-about.png`, `github-projects.png`, `comfyui-workflows.png`, `portfolio.png`)
- **Modern Theme**: 3 PNG-Bilder + Bauhaus ComfyUI Fallback
- **Bauhaus Theme**: 4 PNG-Bilder (`cv-about.png`, `github-projects.png`, `comfyui-workflows.png`, `portfolio.png`)
- **Manga Theme**: 4 PNG-Bilder (`cv-about.png`, `github-projects.png`, `comfyui-workflow.png`, `portfolio.png`)

### 2. Spezielle ComfyUI-Tests

- **Pixel Art + Bauhaus**: `comfyui-workflows.png` (mit 's')
- **Manga**: `comfyui-workflow.png` (ohne 's')
- **Standard + Modern**: Fallback-Bilder aus anderen Themes

### 3. Bildqualität

- Ladezeiten messen
- Bildgrößen anzeigen
- Fehlerbehandlung testen

## Test-Ergebnisse

### Dashboard

- **Total Tests**: Anzahl aller durchgeführten Tests
- **Success**: Erfolgreich geladene Bilder
- **Errors**: Fehlende oder defekte Bilder
- **Warnings**: Potenzielle Probleme (z.B. falsche Dateinamen)

### Detaillierte Ansicht

- **Theme-Sektionen**: Gruppiert nach Themes
- **Bild-Vorschau**: Zeigt geladene Bilder an
- **Status-Informationen**: Erfolg/Fehler mit Details
- **Pfad-Anzeige**: Zeigt verwendete Bildpfade

### Live-Log

- Chronologische Liste aller Test-Ereignisse
- Farbcodiert nach Ereignistyp
- Zeitstemper für jeden Eintrag

## Erwartete Ergebnisse

### ✅ Erfolgreich

- Alle SVG-Data-URLs werden erkannt
- PNG-Bilder werden korrekt geladen
- ComfyUI-Dateinamen sind korrekt

### ⚠️ Warnungen

- Unerwartete Dateinamen
- Langsame Ladezeiten (>500ms)
- Fallback-Verwendung

### ❌ Fehler

- Fehlende Bilddateien
- Defekte Bildpfade
- Netzwerkfehler

## Fehlerbehebung

### Häufige Probleme

1. **404 Fehler**: Bildpfad überprüfen
2. **Langsame Ladezeiten**: Bildgröße optimieren
3. **Falsche Dateinamen**: Konfiguration in `index.html` korrigieren

### Debugging

```javascript
// In der Browser-Konsole
console.log(themes); // Zeigt Theme-Konfiguration
```

## Automatisierung

### CI/CD Integration

```bash
# Beispiel für GitHub Actions
npm test -- --headless
```

### Batch-Testing

```bash
# Alle Theme-Bilder testen
for theme in pixel-art modern bauhaus manga; do
    echo "Testing $theme theme..."
    # Test-Logik hier
done
```

## Konfiguration

### Theme-Pfade anpassen

```javascript
// In card-images-test.html
const themes = {
  "custom-theme": {
    name: "Custom Theme",
    cardImages: {
      cv: "../assets/themes/custom/cards/cv-about.png",
      // ...
    },
  },
};
```

### Neue Tests hinzufügen

```javascript
// Spezielle Validierungen
const customTests = [{ theme: "custom", expectedFile: "custom-image.png" }];
```

---

**Hinweis**: Dieser Test sollte nach jeder Änderung an den Theme-Bildern oder der Theme-Konfiguration ausgeführt werden.
