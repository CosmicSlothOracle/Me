# 🤖 Chatbot Test Suite

Umfassende Testvalidierung der AI-Chatbot Funktionalität für das Portfolio-Website Projekt.

## 📋 Übersicht

Diese Test-Suite implementiert das [CHATBOT_TEST_PROTOCOL.md](../CHATBOT_TEST_PROTOCOL.md) und bietet automatisierte sowie interaktive Tests für:

- **Frontend UI-Komponenten** - Chatbot-Interface und Benutzerinteraktionen
- **Backend API-Endpoints** - Netlify Functions und OpenAI Integration
- **Integration Tests** - End-to-End Workflows
- **Performance Tests** - Response-Zeiten und UI-Performance
- **Security Tests** - Input-Sanitization und XSS-Schutz
- **Error-Handling** - Robustheit bei Fehlerzuständen

## 🚀 Schnellstart

### Voraussetzungen

```bash
# Dependencies installieren
npm install

# OpenAI API Key konfigurieren
echo "OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE" > .env

# Server starten (für Tests erforderlich)
npm run dev
```

### Alle Tests ausführen

```bash
# Komplette Test-Suite (empfohlen)
npm run test:chatbot

# Oder einzelne Test-Kategorien
npm run test:backend
npm run test:frontend
```

## 📁 Test-Struktur

```
tests/
├── README.md                     # Diese Datei
├── CHATBOT_TEST_PROTOCOL.md      # Detailliertes Test-Protokoll (Hauptverzeichnis)
├── frontend-tests.html           # Interaktive Frontend-Tests
├── backend-api-tests.js          # Automatisierte Backend-Tests
├── run-all-tests.js              # Master Test-Runner
├── TEST_EXECUTION_LOG.md         # Template für Test-Dokumentation
└── [generierte Reports]
    ├── backend-test-report.json
    ├── master-test-report.json
    └── frontend-test-results.html
```

## 🔧 Ausführungsanleitung

### 1. Backend API Tests

**Automatisiert** - Testet die Netlify Functions und OpenAI Integration:

```bash
# Vollständige Backend-Tests
npm run test:backend

# Stille Ausführung
npm run test:quick

# Mit spezifischen Optionen
node tests/backend-api-tests.js --quiet --timeout 15000
```

**Getestete Bereiche:**

- CORS-Header Validierung
- HTTP-Method Validation
- Request Body Validation
- OpenAI API Integration
- Input Sanitization
- Rate Limiting
- Response Performance

### 2. Frontend UI Tests

**Interaktiv** - Öffne im Browser für detaillierte UI-Tests:

```bash
# Hinweis anzeigen
npm run test:frontend

# Manuell öffnen
open tests/frontend-tests.html
# oder für Windows:
start tests/frontend-tests.html
```

**Getestete Bereiche:**

- Toggle-Button Design und Verhalten
- Chatbot Container (Glasmorphismus)
- Message Display und Styling
- Input-Validierung
- Loading-State Management
- Performance Rendering

### 3. Master Test Runner

**Orchestriert** - Führt alle Tests systematisch aus:

```bash
npm run test:chatbot
```

**Inkludiert:**

- Server-Verfügbarkeit prüfen
- Backend API Tests
- Frontend Tests (Mock)
- Integration Tests
- Performance Tests
- Finaler Report

## 📊 Test-Reports

### Automatische Report-Generierung

Nach jedem Test-Durchlauf werden detaillierte Reports generiert:

```bash
tests/
├── backend-test-report.json      # Backend-Test Ergebnisse
├── master-test-report.json       # Gesamtübersicht aller Tests
└── performance-metrics.json      # Performance-Daten
```

### Report-Struktur

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "summary": {
    "totalTests": 25,
    "passedTests": 23,
    "failedTests": 2,
    "totalDuration": 5420
  },
  "tests": [
    {
      "name": "CORS Headers Validation",
      "passed": true,
      "duration": 245,
      "details": [...]
    }
  ]
}
```

## 🎯 Test-Kategorien im Detail

### Frontend Unit Tests (2.1 - 2.2)

| Test  | Beschreibung             | Automatisiert |
| ----- | ------------------------ | ------------- |
| 2.1.1 | Toggle-Button Validation | ✅            |
| 2.1.2 | Container Display        | ✅            |
| 2.1.3 | Message Display          | ✅            |
| 2.2.1 | Input Validation         | ✅            |
| 2.2.2 | Loading State Management | ✅            |

### Backend Unit Tests (3.1 - 3.2)

| Test  | Beschreibung            | Automatisiert |
| ----- | ----------------------- | ------------- |
| 3.1.1 | CORS Headers            | ✅            |
| 3.1.2 | HTTP Method Validation  | ✅            |
| 3.1.3 | Request Body Validation | ✅            |
| 3.2.1 | API Key Validation      | ✅            |
| 3.2.2 | Valid OpenAI Request    | ✅            |

### Integration Tests (4.1 - 4.2)

| Test  | Beschreibung            | Automatisiert |
| ----- | ----------------------- | ------------- |
| 4.1.1 | End-to-End Message Flow | ✅            |
| 4.1.2 | Error Response Handling | ✅            |
| 4.2.1 | Context Awareness       | ✅            |

### Performance Tests (6.1 - 6.2)

| Test  | Beschreibung         | Automatisiert |
| ----- | -------------------- | ------------- |
| 6.1.1 | API Response Times   | ✅            |
| 6.1.2 | Frontend Performance | ✅            |

## ⚡ Performance-Benchmarks

### Zielwerte

| Metrik                            | Zielwert | Kritischer Wert |
| --------------------------------- | -------- | --------------- |
| Durchschnittliche API-Antwortzeit | < 5s     | < 10s           |
| 95%-Perzentil API-Antwortzeit     | < 10s    | < 15s           |
| Frontend-Rendering Zeit           | < 16ms   | < 32ms          |
| Memory-Usage Peak                 | < 100MB  | < 200MB         |

### Interpretation

- **GRÜN**: Alle Werte unter Zielwert ✅
- **GELB**: Über Zielwert, unter kritischem Wert ⚠️
- **ROT**: Über kritischem Wert ❌

## 🔒 Security-Tests

### Input Sanitization

Automatisierte Tests für gefährliche Inputs:

```javascript
const maliciousInputs = [
  '<script>alert("XSS")</script>',
  'javascript:alert("XSS")',
  '"; DROP TABLE users; --',
  '<img src=x onerror=alert("XSS")>',
  "../../etc/passwd",
];
```

### API Security

- **Environment Variable Security**: API-Keys niemals im Frontend
- **CORS Configuration**: Korrekte Header-Konfiguration
- **Error Information Leakage**: Keine sensiblen Daten in Fehlermeldungen

## 🐛 Troubleshooting

### Häufige Probleme

#### "Server configuration error"

```bash
# Ursache: Fehlende OPENAI_API_KEY
# Lösung:
cat .env  # Prüfen
export OPENAI_API_KEY="sk-proj-..."
netlify dev  # Neu starten
```

#### "CORS-Fehler im Browser"

```bash
# Ursache: Direkter HTML-Aufruf
# Lösung:
netlify dev  # Immer Netlify Dev Server verwenden
# Nicht: file:// URLs
```

#### "Tests schlagen fehl"

```bash
# Server-Status prüfen
curl http://localhost:8888/.netlify/functions/chat

# Dependencies aktualisieren
npm install

# Environment prüfen
node --version  # >= 18.0.0
netlify --version  # Latest
```

### Debug-Modi

#### Verbose Logging

```bash
# Backend-Tests mit detailliertem Output
node tests/backend-api-tests.js --verbose

# Frontend-Tests Debug-Modus
# In Browser Console:
localStorage.setItem('chatbot-debug', 'true');
```

#### Network-Monitoring

```bash
# Performance-Analyse
node tests/backend-api-tests.js --timeout 30000

# Response-Zeit-Details
# Siehe Console-Output oder test-report.json
```

## 📋 Dokumentation und Reporting

### Test-Execution Log

Für jeden Test-Durchlauf sollte ein Execution Log erstellt werden:

```bash
# Template kopieren
cp tests/TEST_EXECUTION_LOG.md "test-log-$(date +%Y%m%d-%H%M).md"
```

### Continuous Integration

Die Tests können in CI/CD-Pipelines integriert werden:

```yaml
# .github/workflows/test-chatbot.yml
name: Chatbot Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm run test:backend
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## 🎨 Frontend-Test Interface

Die Frontend-Tests bieten eine moderne, interaktive Benutzeroberfläche:

### Features

- **Real-time Test-Ausführung** mit visuellen Indikatoren
- **Detaillierte Einzeltest-Ergebnisse** mit expandierbaren Details
- **Performance-Metriken Dashboard** mit Echtzeit-Updates
- **Test-Log Konsole** für Debug-Informationen
- **Glasmorphismus-Design** passend zum Chatbot-Theme

### Bedienung

1. **Alle Tests ausführen**: Komplette Testsuite
2. **Kategorien einzeln**: UI Tests, JavaScript Tests, Performance Tests
3. **Ergebnisse anzeigen**: Expandierbare Test-Details
4. **Report speichern**: Automatischer Export der Ergebnisse

## 🔄 Wartung und Updates

### Regelmäßige Wartung

```bash
# Wöchentlich: Vollständiger Test-Durchlauf
npm run test:chatbot

# Täglich: Schnelle Backend-Tests
npm run test:quick

# Bei Code-Änderungen: Spezifische Tests
npm run test:backend  # Nach API-Änderungen
npm run test:frontend  # Nach UI-Änderungen
```

### Test-Suite Updates

Die Test-Suite sollte erweitert werden bei:

- **Neuen Features**: Zusätzliche Test-Cases
- **Bug-Fixes**: Regression-Tests
- **Performance-Optimierungen**: Benchmark-Updates
- **Security-Updates**: Erweiterte Security-Tests

## 📞 Support und Kontakt

Bei Problemen mit der Test-Suite:

1. **README durchlesen**: Troubleshooting-Sektion
2. **Test-Protokoll prüfen**: CHATBOT_TEST_PROTOCOL.md
3. **Logs analysieren**: Generierte Report-Files
4. **Issue erstellen**: Mit detailliertem Problem-Report

---

## 🏆 Quality Gates

Für Production-Deployment müssen erfüllt sein:

- [ ] **Alle kritischen Tests bestanden** (100%)
- [ ] **Performance-Metriken innerhalb Limits**
- [ ] **Security-Tests ohne kritische Findings**
- [ ] **Cross-Browser Compatibility bestätigt**
- [ ] **Mobile Responsiveness validiert**

---

_Diese Test-Suite gewährleistet höchste Qualitätsstandards für den AI-Chatbot und stellt sicher, dass alle Funktionen robust und sicher implementiert sind._
