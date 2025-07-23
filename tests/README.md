# CV-Website Test Suite

Dieses Verzeichnis enthält umfassende Tests für die CV-Website.

## 🧪 Verfügbare Tests

### 1. **Spritesheet Animation Test** 🎮

- **Datei**: `spritesheet-animation-test.html`
- **Zweck**: Überprüft die korrekte Darstellung der Spritesheet-Animation
- **Ausführung**: `run-spritesheet-test.bat` oder direkt im Browser öffnen
- **Prüft**:
  - Spritesheet-Laden (2048x256px)
  - Frame-Animation (8 Frames)
  - FPS-Performance (~6 FPS)
  - Canvas-Rendering (192x192px)

### 2. **Character Positioning Test**

- **Datei**: `character-positioning-test.html`
- **Zweck**: Überprüft die korrekte Positionierung des Characters
- **Prüft**: Position, Größe, Responsive-Verhalten

### 3. **Theme Heatmap Test**

- **Datei**: `theme-heatmap-test.html`
- **Zweck**: Überprüft Heatmap-Referenzen für alle Themes
- **Prüft**: Heatmap-Laden, Dimensionen, Positionierung

### 4. **Card Images Test**

- **Datei**: `card-images-test.html`
- **Zweck**: Überprüft Theme-spezifische Card-Assets
- **Prüft**: Asset-Verfügbarkeit, Dimensionen

### 5. **Character Heatmap Generator**

- **Datei**: `character-heatmap-generator.html`
- **Zweck**: Tool zur Erstellung von Heatmap-Referenzen
- **Verwendung**: Generiert B&W Positioning Guides

### 6. **Frontend Tests**

- **Datei**: `frontend-tests.html`
- **Zweck**: Allgemeine Frontend-Funktionalität
- **Prüft**: Theme-Switching, Responsive Design

## 🚀 Schnellstart

### Spritesheet Animation Test ausführen

```bash
cd tests
run-spritesheet-test.bat
```

### Alle Tests ausführen

```bash
node run-all-tests.js
```

## 📋 Test-Workflow

**Nach Änderungen an der Spritesheet-Animation:**

1. Führe `spritesheet-animation-test.html` aus
2. Klicke "Test starten"
3. Warte 5 Sekunden
4. Überprüfe Ergebnisse

**Erfolgskriterien:**

- ✅ Spritesheet lädt (2048x256px)
- ✅ Animation läuft flüssig
- ✅ Alle 8 Frames werden durchlaufen
- ✅ FPS-Rate ist stabil (~6 FPS)

## 📊 Test-Ergebnisse

Tests loggen detaillierte Informationen:

- Ladezeiten
- Frame-Durchläufe
- Performance-Metriken
- Fehlerdiagnose

## 🔧 Wartung

- **Neue Tests hinzufügen**: Erstelle neue `.html` Datei im `tests/` Verzeichnis
- **Test-Konfiguration**: Anpassung der Parameter in den jeweiligen HTML-Dateien
- **Automatisierung**: Ergänze neue Tests in `run-all-tests.js`
