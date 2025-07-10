# 🚀 NETLIFY DEPLOYMENT - STEP BY STEP

## TASK 2: ✅ API-Key in Netlify Environment Variables

### **Netlify Dashboard Setup:**

1. **Gehe zu [Netlify Dashboard](https://app.netlify.com/)**
2. **Wähle deine Site/Repository**
3. **Navigiere zu: Site Settings → Environment Variables**
4. **Klicke "Add Variable"**
5. **Setze:**
   ```
   Key: OPENAI_API_KEY
   Value: sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
6. **Klicke "Save"**

### **Alternative: Netlify CLI (falls installiert):**

```bash
netlify env:set OPENAI_API_KEY "sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

---

## TASK 3: 🚀 Deployment triggern

### **Option A: Automatisches Deployment (empfohlen)**

```bash
git add .
git commit -m "🤖 Add AI Chatbot with Netlify Functions"
git push origin main
```

**→ Netlify deployed automatisch nach Push**

### **Option B: Manuelles Deployment**

```bash
# Falls netlify-cli installiert:
netlify deploy --prod

# Oder im Netlify Dashboard:
# "Deploys" → "Trigger deploy" → "Deploy site"
```

---

## TASK 4: 🧪 Funktionalität testen

### **Nach erfolgreichem Deployment:**

1. **✅ Chat-Widget sichtbar?**

   - Purple Button rechts unten sollte erscheinen
   - Hover-Effekt funktioniert

2. **✅ Chat öffnet sich?**

   - Klick auf Button öffnet Chat-Fenster
   - Glasmorphismus-Design korrekt

3. **✅ API-Kommunikation funktioniert?**

   - Test-Nachricht: "Erkläre mir den Pixel Art Workflow"
   - Loading-Animation erscheint
   - GPT-4 Antwort kommt zurück

4. **✅ Error-Handling?**
   - Bei ungültiger Eingabe: Freundliche Fehlermeldung
   - Bei API-Problemen: Generische Fehlermeldung

### **Test-Nachrichten:**

```
"Was ist ComfyUI?"
"Erkläre den Pixel Art Transformation Workflow"
"Wie funktioniert AI Spritesheet Extraction?"
"Welche Workflows sind verfügbar?"
```

---

## 🔧 TROUBLESHOOTING

### **Chat-Button erscheint nicht:**

- Prüfe: `chatbot.js` wird geladen
- Console-Errors checken (F12)
- Cache leeren und neu laden

### **API-Fehler 401:**

- Environment Variable OPENAI_API_KEY prüfen
- API-Key Gültigkeit bei OpenAI checken

### **API-Fehler 500:**

- Netlify Function-Logs prüfen
- CORS-Header korrekt?

### **Deployment-Fehler:**

- `package.json` Dependencies korrekt?
- `netlify.toml` Syntax prüfen
- Build-Logs in Netlify Dashboard anschauen

---

## ✅ SUCCESS CRITERIA

**Deployment erfolgreich wenn:**

- ✅ Site lädt ohne Fehler
- ✅ Purple Chat-Button sichtbar
- ✅ Chat öffnet sich smooth
- ✅ API-Antworten funktionieren
- ✅ Design passt perfekt zur Website

**🎯 Ready für Production!**
