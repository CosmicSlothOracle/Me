# 🎮 Pixel Assistant - Integrated Background System

Das **Integrated Background System** ermöglicht es, den Pixel Assistant perfekt in ein Hintergrundbild zu integrieren, sodass er exakt über einer statischen Charakterversion positioniert wird.

## 📁 Ordnerstruktur

```
assets/themes/integrated/
├── background/
│   ├── background-with-character.png    # Haupthintergrund mit statischem Charakter
│   ├── background-mobile.png           # Mobile Version (optional)
│   └── background-tablet.png           # Tablet Version (optional)
└── README.md                           # Diese Datei
```

## 🎯 Funktionsweise

### 1. **Hintergrundvorbereitung**

- Erstellen Sie ein Hintergrundbild mit bereits positioniertem (statischem) Charakter
- Der statische Charakter sollte in der gleichen Größe wie die Sprites (256x256px) sein
- Notieren Sie sich die exakte Position des Charakters in Prozent (X% und Y%)

### 2. **Integration**

- Der animierte Charakter wird transparent über dem statischen Charakter positioniert
- Die Positionierung erfolgt prozentual für perfekte Responsive-Anpassung
- Debug-Modus hilft bei der exakten Positionierung

## 🛠️ Verwendung

### Basic Setup

```javascript
const pixelAssistant = new PixelAssistantIntegrated({
  characterXPercent: 85, // Position von links (0-100%)
  characterYPercent: 75, // Position von oben (0-100%)
  backgroundImage:
    "assets/themes/integrated/background/background-with-character.png",
  debugMode: false,
  greetingText: "Salve amenakoi.",
  apiEndpoint: "/.netlify/functions/chat",
});
```

### Position zur Laufzeit ändern

```javascript
// Position dynamisch anpassen
pixelAssistant.updatePosition(90, 80);

// Debug-Modus umschalten
pixelAssistant.toggleDebugMode();
```

### Erweiterte Konfiguration

```javascript
const pixelAssistant = new PixelAssistantIntegrated({
  // Charakter-Eigenschaften
  canvasWidth: 256,
  canvasHeight: 256,
  animationSpeed: 120,

  // Positionierung
  characterXPercent: 85,
  characterYPercent: 75,
  backgroundImage:
    "assets/themes/integrated/background/background-with-character.png",

  // Debug-Optionen
  debugMode: false,
  debugGridSize: 10, // Raster-Größe in %

  // UI-Optionen
  speechBubbleMaxWidth: 350,
  speechBubbleMaxHeight: 180,
  typingSpeed: 40,

  // API-Konfiguration
  apiEndpoint: "/.netlify/functions/chat",

  // Animations-Timing
  inactivityTimeout: 2 * 60 * 1000, // 2 Minuten

  // Auto-Begrüßung
  autoGreeting: true,
  greetingText: "Salve amenakoi.",
  greetingDelay: 3000,
});
```

## 🎨 Hintergrundbilderstellung

### Anforderungen

- **Format:** PNG mit Transparenz-Unterstützung
- **Mindestgröße:** 1920x1080px (Full HD)
- **Empfohlene Größe:** 2560x1440px (für 4K-Displays)
- **Charakter-Größe:** 256x256px (entspricht den Sprite-Dimensionen)

### Positionierungsrichtlinien

1. **Desktop:** Charakter sollte nicht zu nah am Rand sein (min. 5% Abstand)
2. **Mobile:** Bedenken Sie, dass der Charakter auf kleineren Bildschirmen skaliert wird
3. **Responsive:** Testen Sie verschiedene Bildschirmgrößen

### Beispiel-Positionierung

```
Desktop (1920x1080):
- Charakter bei ca. 85% von links = 1632px
- Charakter bei ca. 75% von oben = 810px

Mobile (375x667):
- Automatische Skalierung auf ca. 85% = 318px
- Automatische Skalierung auf ca. 75% = 500px
```

## 🔧 Debug-Modus

### Aktivierung

- **Tastenkürzel:** `Ctrl+Shift+D`
- **Programmgesteuert:** `pixelAssistant.toggleDebugMode()`

### Debug-Features

- **Raster-Overlay:** Zeigt prozentuale Positionierung
- **Positions-Marker:** Roter Kreis markiert exakte Charakter-Position
- **Console-Logging:** Ausführliche Informationen über Positionierung

### Debug-Workflow

1. Debug-Modus aktivieren
2. Position mit Slidern anpassen
3. Visuelle Überprüfung der Ausrichtung
4. Werte in Code übernehmen
5. Debug-Modus deaktivieren

## 📱 Responsive Design

### Automatische Anpassungen

- **Desktop (>1024px):** Volle Charakter-Größe (256px)
- **Tablet (768-1024px):** 80% Skalierung (ca. 200px)
- **Mobile (<768px):** 70% Skalierung (ca. 180px)

### Positionierung bleibt relativ

- Prozentuale Werte bleiben auf allen Geräten gleich
- Charakter passt sich proportional an
- Speech Bubble wird entsprechend skaliert

## 🎪 Demo und Test

### Demo-Seite

Öffnen Sie `assets/chatbot/character/pixel-assistant-integrated-demo.html` für:

- Interaktive Positionierung
- Debug-Tools
- Live-Vorschau
- Code-Beispiele

### Test-Funktionen

- **Position-Slider:** Echtzeit-Anpassung der Charakter-Position
- **Background-Loader:** Dynamisches Laden von Hintergrundbildern
- **Interaktions-Simulation:** Testen der Chat-Funktionalität

## 🚀 Integration in bestehende Seiten

### HTML-Integration

```html
<!-- Skripte laden -->
<script src="assets/chatbot/character/spritesheet-animator.js"></script>
<script src="assets/chatbot/character/speech-bubble.js"></script>
<script src="assets/chatbot/character/pixel-assistant-integrated.js"></script>

<!-- Initialisierung -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    window.pixelAssistant = new PixelAssistantIntegrated({
      characterXPercent: 85,
      characterYPercent: 75,
      backgroundImage:
        "assets/themes/integrated/background/background-with-character.png",
      apiEndpoint: "/.netlify/functions/chat",
    });
  });
</script>
```

### CSS-Überlegungen

- Bestehende Regen-Effekte werden automatisch deaktiviert
- Hintergrund wird auf `document.body` angewendet
- Z-Index wird automatisch verwaltet

## 🐛 Troubleshooting

### Häufige Probleme

**Problem:** Charakter erscheint nicht

- **Lösung:** Überprüfen Sie die Spritesheet-Pfade
- **Debug:** Konsole auf Ladezeiten prüfen

**Problem:** Falsche Positionierung

- **Lösung:** Debug-Modus aktivieren und visuell anpassen
- **Tipp:** Verwenden Sie das Raster zur Orientierung

**Problem:** Hintergrund wird nicht geladen

- **Lösung:** Bildpfad überprüfen, Netzwerk-Tab in DevTools checken
- **Format:** PNG mit korrekter Größe verwenden

**Problem:** Responsive Probleme

- **Lösung:** Testen Sie verschiedene Bildschirmgrößen
- **Anpassung:** Eventuell separate Mobile-Hintergründe verwenden

### Performance-Optimierung

- **Hintergrundbilder:** Optimieren Sie für Web (WebP-Format wenn möglich)
- **Sprites:** Verwenden Sie optimierte PNG-Dateien
- **Lazy Loading:** Implementieren Sie bei großen Hintergrundbildern

## 📞 Support

Bei Fragen oder Problemen:

1. Überprüfen Sie die Browser-Konsole auf Fehlermeldungen
2. Testen Sie mit der Demo-Seite
3. Aktivieren Sie den Debug-Modus für detaillierte Informationen

## 🔄 Updates

### Version 1.0

- ✅ Grundlegende prozentuale Positionierung
- ✅ Debug-Modus mit Raster-Overlay
- ✅ Responsive Design
- ✅ Automatische Hintergrund-Integration

### Geplante Features

- 🔄 Multi-Charakter-Support
- 🔄 Animations-Synchronisation mit Hintergrund
- 🔄 Erweiterte Mobile-Optimierungen
- 🔄 Theme-System Integration
