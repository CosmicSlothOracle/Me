# AI Specialist Portfolio-Website

Eine minimalistische, Apple-inspirierte Portfolio-Website für einen AI-Specialist mit einer Pinterest-ähnlichen Portfolioseite und einer ComfyUI-Workflow-Übersicht.

## Dateistruktur

```
cv-website/
│
├── index.html                # Hauptseite mit Navigation zu allen Bereichen
├── portfolio.html            # Pinterest-ähnliche Portfolio-Seite
├── comfyui.html              # ComfyUI Workflows Vergleichsseite
│
└── assets/                   # Medien-Assets
    ├── images/               # Bilder für Portfolios und Slideshows
    │   ├── slide1-1.jpg      # Beispiel: Erstes Bild der ersten Slideshow
    │   ├── slide1-2.jpg
    │   ├── ...
    │   │
    │   └── comfyui/          # Bilder für ComfyUI-Vergleiche
    │       ├── source2.jpg   # Quellbilder
    │       ├── result2.jpg   # Ergebnisbilder
    │       └── ...
    │
    └── videos/               # Video- und GIF-Dateien
        ├── video1.mp4        # Beispiel: Erstes Video für Portfolio
        ├── video2.mp4
        ├── ...
        │
        └── comfyui/          # Videos für ComfyUI-Vergleiche
            ├── source1.mp4   # Quellvideos
            ├── result1.mp4   # Ergebnisvideos
            └── ...
```

## Hinzufügen von Medien

### Portfolio-Seite

#### Bilder für Slideshows

1. Lege deine Bilder im Ordner `assets/images/` ab
2. Benenne sie nach dem Schema `slideX-Y.jpg`, wobei:
   - `X` die Nummer der Slideshow ist (1, 2, 3)
   - `Y` die Position des Bildes in der Slideshow ist (1, 2, 3)
3. Beispiel: `slide2-3.jpg` ist das dritte Bild in der zweiten Slideshow

#### Videos/GIFs

1. Lege deine Videos oder GIFs im Ordner `assets/videos/` ab
2. Benenne sie nach dem Schema `videoX.mp4` (oder .gif), wobei `X` die Nummer des Videos ist (1, 2, 3)
3. Beispiel: `video1.mp4` ist das erste Video auf der Portfolio-Seite

### ComfyUI-Seite

#### Quell- und Ergebnisbilder

1. Lege Quellbilder im Ordner `assets/images/comfyui/` ab und benenne sie als `sourceX.jpg`
2. Lege die entsprechenden Ergebnisbilder im selben Ordner ab und benenne sie als `resultX.jpg`
3. Verwende die gleiche Nummer für zusammengehörige Quell- und Ergebnisbilder

#### Quell- und Ergebnisvideos

1. Lege Quellvideos im Ordner `assets/videos/comfyui/` ab und benenne sie als `sourceX.mp4`
2. Lege die entsprechenden Ergebnisvideos im selben Ordner ab und benenne sie als `resultX.mp4`
3. Verwende die gleiche Nummer für zusammengehörige Quell- und Ergebnisvideos

## Anpassen der Beschreibungen

### Portfolio-Seite

Um die Beschreibungen der Projekte zu ändern, bearbeite die entsprechenden `<div class="caption">` Elemente in der `portfolio.html` Datei:

```html
<div class="caption">
  <h3 class="text-lg font-medium">Video Projekt 1</h3>
  <p class="text-sm">KI-generierte Animation</p>
</div>
```

### ComfyUI-Seite

Um die Workflow-Beschreibungen zu ändern, bearbeite die entsprechenden `<div class="workflow-description">` Elemente in der `comfyui.html` Datei:

```html
<div class="workflow-description">
  <h3>Stil-Transfer mit ControlNet</h3>
  <p>Dieser Workflow verwendet ControlNet mit Canny Edge Detection...</p>
  <div class="mt-4 flex justify-between items-center">
    <span class="text-sm text-gray-500">Modelle: SD 1.5, ControlNet Canny</span>
    <a href="#" class="text-blue-600 hover:underline text-sm"
      >Workflow herunterladen</a
    >
  </div>
</div>
```

## Unterstützte Dateiformate

- Bilder: JPG, PNG, WebP, SVG
- Videos: MP4, WebM
- Animationen: GIF

## Hinweise

- Die Seiten verwenden Platzhalderbilder, wenn die eigentlichen Medien nicht gefunden werden können
- Videos werden automatisch beim Hovern abgespielt (stumm)
- Beim Klicken auf ein Medium öffnet sich ein Modal mit erweiterter Ansicht
- Slideshows wechseln automatisch alle 3 Sekunden zum nächsten Bild
