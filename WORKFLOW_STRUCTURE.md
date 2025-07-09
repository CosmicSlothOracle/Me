# ComfyUI Workflows - Ordnerstruktur & Benennungskonvention

## 📁 Ordnerstruktur

```
cv-website/
├── assets/
│   ├── videos/
│   │   └── comfyui/                    # Legacy Pixel Art Workflow
│   │       ├── source1.gif             # Energyblast Original
│   │       ├── result1.gif             # Energyblast Pixel Art
│   │       ├── source2.gif             # Lightning Original
│   │       ├── result2.gif             # Lightning Pixel Art
│   │       ├── source3.gif             # Tornado Original
│   │       ├── result3.gif             # Tornado Pixel Art
│   │       ├── source4.gif             # Pink Smoke Original
│   │       └── result4.gif             # Pink Smoke Pixel Art
│   │
│   └── workflows/                      # Neue Workflow-Struktur
│       ├── spriteframe/                # SpriteFrame-Workflow (Iteration 3)
│       │   └── comparisons/
│       │       ├── main_source.png     # Hauptvergleich Input
│       │       ├── main_result.gif     # Hauptvergleich Output
│       │       ├── source_1.png        # Qualitätsfilterung Input
│       │       ├── result_1.gif        # Qualitätsfilterung Output
│       │       ├── source_2.png        # Stilkorrektur Input
│       │       └── result_2.gif        # Stilkorrektur Output
│       │
│       └── [workflow-name]/            # Template für weitere Workflows
│           └── comparisons/
│               ├── main_source.[ext]   # Landing Page Vorher
│               ├── main_result.[ext]   # Landing Page Nachher
│               ├── source_1.[ext]      # Vergleich 1 Vorher
│               ├── result_1.[ext]      # Vergleich 1 Nachher
│               ├── source_2.[ext]      # Vergleich 2 Vorher
│               └── result_2.[ext]      # Vergleich 2 Nachher
└── comfyui.html                        # Hauptseite
```

## 🎯 Benennungskonvention

### Workflow-Ordner

- **Format**: `assets/workflows/[workflow-slug]/`
- **Beispiele**:
  - `spriteframe` (SpriteFrame-Workflow)
  - `pixelart` (Pixel Art Transformation)
  - `upscaling` (AI Upscaling Workflow)
  - `colorization` (Colorization Workflow)

### Comparison-Dateien

#### Landing Page (Hauptvergleich)

- **Vorher**: `main_source.[ext]`
- **Nachher**: `main_result.[ext]`

#### Detail-Vergleiche (Modal)

- **Format**: `source_[nummer].[ext]` und `result_[nummer].[ext]`
- **Beispiele**:
  - `source_1.png` / `result_1.gif` (Vergleich 1)
  - `source_2.png` / `result_2.gif` (Vergleich 2)
  - `source_3.png` / `result_3.gif` (Vergleich 3)
  - `source_4.png` / `result_4.gif` (Vergleich 4)

### Dateiformate

- **PNG**: Statische Bilder (automatische Anzeige)
- **GIF**: Animationen (automatisches Loop-Playback)
- **JPG**: Alternative für statische Bilder (kleinere Dateigröße)

## 🔧 SpriteFrame-Workflow Dateien

### Benötigte Dateien für vollständige Darstellung:

```
assets/workflows/spriteframe/comparisons/
├── main_source.png          # Rohes Sprite-Sheet (Landing Page)
├── main_result.gif          # Optimierte Animation (Landing Page)
├── source_1.png             # Ungefilterte Frames
├── result_1.gif             # Qualitätsgefilterte Frames
├── source_2.png             # Vaporwave-Overload
└── result_2.gif             # Cartoon-Stil Korrektur
```

### Beschreibungen der Vergleiche:

1. **Hauptvergleich** (`main_*`):

   - Zeigt Transformation von rohem Sprite-Sheet zu finaler optimierter Animation
   - Wird auf Landing Page angezeigt

2. **Qualitätsfilterung** (`quality_*`):

   - Demonstriert Outlier-Detection und anatomische Korrekturen
   - 79.2% Filter-Effizienz (1309 von 6279 Frames entfernt)

3. **Stilkorrektur** (`style_*`):
   - Vaporwave-Intensitätsreduktion (45% Intensität)
   - Konsistente Cartoon-Ästhetik (Archer TV Show Stil)

## 🎨 Neue Workflows hinzufügen

### 1. Ordnerstruktur erstellen

```bash
mkdir assets\workflows\[workflow-name]
mkdir assets\workflows\[workflow-name]\comparisons
```

### 2. Dateien hinzufügen

- Mindestens `main_source.[ext]` und `main_result.[ext]`
- Weitere Vergleiche nach Bedarf

### 3. HTML aktualisieren

- Neue Workflow-Karte in `comfyui.html` hinzufügen
- Modal mit Vergleichen erstellen
- Dateipfade korrekt verlinken

### 4. Benennungsbeispiele für verschiedene Workflows:

#### AI Upscaling Workflow:

```
assets/workflows/upscaling/comparisons/
├── main_source.png          # 512x512 Input
├── main_result.png          # 2048x2048 Output
├── source_1.png             # Detail-Vergleich Input
├── result_1.png             # Enhanced Details
├── source_2.png             # Noise Reduction Input
└── result_2.png             # Denoised Output
```

#### Colorization Workflow:

```
assets/workflows/colorization/comparisons/
├── main_source.png          # Grayscale Input
├── main_result.png          # Colorized Output
├── source_1.png             # Portrait Colorization Input
├── result_1.png             # Colored Portrait
├── source_2.png             # Landscape Colorization Input
└── result_2.png             # Colored Landscape
```

## 📋 Checkliste für neuen Workflow

- [ ] Ordner erstellt: `assets/workflows/[name]/comparisons/`
- [ ] Landing-Dateien: `main_source.[ext]` und `main_result.[ext]`
- [ ] Detail-Vergleiche mit aussagekräftigen Namen
- [ ] HTML-Karte hinzugefügt mit korrekten Pfaden
- [ ] Modal mit allen Vergleichen erstellt
- [ ] Beschreibungen und technische Details eingefügt
- [ ] Dateiformate korrekt gewählt (PNG/GIF)
- [ ] Test der Funktionalität im Browser

## 🎯 Technische Hinweise

- **Bildgrößen**: Einheitliche Auflösung innerhalb eines Vergleichs
- **GIF-Optimierung**: Maximale Dateigröße 10MB pro GIF
- **PNG-Kompression**: Verlustfreie Kompression für beste Qualität
- **Responsive Design**: Automatische Anpassung auf verschiedene Bildschirmgrößen
- **Loading Performance**: Lazy Loading für große Dateien implementiert
