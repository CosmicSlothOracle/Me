# 🚀 GitHub Pages Deployment Anleitung

## Schritt 1: GitHub Repository erstellen

1. **Gehen Sie zu [GitHub.com](https://github.com)** und loggen Sie sich ein
2. **Klicken Sie auf "New"** (grüner Button) oder das "+" Symbol → "New repository"
3. **Repository-Name:** `cv-website` (oder einen Namen Ihrer Wahl)
4. **Beschreibung:** `Professional IT CV Website - Modern responsive resume`
5. **Einstellungen:**
   - ✅ Public (damit GitHub Pages kostenlos funktioniert)
   - ❌ Add a README file (wir haben bereits eine)
   - ❌ Add .gitignore (bereits vorhanden)
   - ❌ Choose a license (optional)
6. **Klicken Sie auf "Create repository"**

## Schritt 2: Repository mit GitHub verbinden

Führen Sie diese Befehle in Ihrem Terminal aus (im cv-website Ordner):

```bash
# GitHub Repository als Remote hinzufügen (ersetzen Sie USERNAME mit Ihrem GitHub-Username)
git remote add origin https://github.com/USERNAME/cv-website.git

# Branch auf 'main' umbenennen (falls nötig)
git branch -M main

# Code zu GitHub hochladen
git push -u origin main
```

## Schritt 3: GitHub Pages aktivieren

1. **Gehen Sie zu Ihrem Repository** auf GitHub.com
2. **Klicken Sie auf "Settings"** (oben rechts im Repository)
3. **Scrollen Sie zu "Pages"** (im linken Menü)
4. **Source auswählen:** "Deploy from a branch"
5. **Branch auswählen:** `main` (oder `master`)
6. **Folder:** `/ (root)`
7. **Klicken Sie auf "Save"**

## Schritt 4: Website-URL erhalten

- Nach wenigen Minuten ist Ihre Website verfügbar unter:
  `https://USERNAME.github.io/cv-website/`
- Die URL wird Ihnen in den Pages-Einstellungen angezeigt

## 📋 Checkliste für Arbeitgeber-Ready Website

Vor der Veröffentlichung sollten Sie folgende Dinge anpassen:

### ✏️ Persönliche Daten einfügen:
- [ ] **Name** im Header (aktuell: "IT Professional")
- [ ] **E-Mail-Adresse** (aktuell: "ihre.email@domain.de")
- [ ] **Telefonnummer** (aktuell: "+49 XXX XXXXXXX")
- [ ] **Standort** (aktuell: "Ihr Standort")
- [ ] **GitHub/LinkedIn URLs** in der Kontakt-Sektion

### 🔗 Links aktualisieren:
- [ ] GitHub-Profil-Link hinzufügen
- [ ] LinkedIn-Profil-Link hinzufügen
- [ ] Weitere Projekt-Links ergänzen

### 📊 SEO optimieren:
- [ ] Meta-Description in `index.html` anpassen
- [ ] Keywords aktualisieren
- [ ] OpenGraph-Tags für Social Media

## 🎯 Verwendung für Bewerbungen

### Für Arbeitgeber:
1. **Online-Link senden:** `https://USERNAME.github.io/cv-website/`
2. **PDF-Download:** Über den "🖨️ PDF" Button
3. **Professioneller Eindruck:** Moderne Webentwicklung-Skills demonstriert

### Vorteile:
- ✅ **Immer aktuell:** Änderungen sofort online
- ✅ **Responsive:** Funktioniert auf allen Geräten
- ✅ **Professionell:** Zeigt technische Kompetenz
- ✅ **Kostenlos:** GitHub Pages ist kostenfrei
- ✅ **Schnell:** Keine Ladezeiten durch externe Frameworks

## 🔄 Updates veröffentlichen

Bei Änderungen an Ihrer Website:

```bash
# Änderungen hinzufügen
git add .

# Commit mit Beschreibung
git commit -m "Update: Kontaktdaten aktualisiert"

# Zu GitHub hochladen
git push
```

Die Website wird automatisch innerhalb von 1-2 Minuten aktualisiert!

## 🆘 Problemlösung

### Website lädt nicht:
- Warten Sie 5-10 Minuten nach der ersten Aktivierung
- Überprüfen Sie die GitHub Pages Einstellungen
- Stellen Sie sicher, dass `index.html` im Root-Verzeichnis liegt

### PDF-Download funktioniert nicht:
- Das ist eine Browser-Funktion (Strg+P oder Cmd+P)
- Funktioniert in allen modernen Browsern
- Mobile Geräte: Über Menü → Drucken/PDF

### Styling-Probleme:
- Alle CSS ist inline - keine externen Abhängigkeiten
- Bei Problemen: Browser-Cache leeren (Strg+Shift+R)

---

## 🎉 Fertig!

Nach diesem Setup haben Sie:
- ✅ Eine professionelle Online-CV-Website
- ✅ PDF-Download-Funktionalität
- ✅ Moderne, responsive Darstellung
- ✅ Optimiert für IT-Bewerbungen
- ✅ Bereit für Portfolio-Erweiterungen

**Viel Erfolg bei Ihren Bewerbungen! 🚀**