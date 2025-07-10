# NETLIFY CHATBOT IMPLEMENTATION – GPT-Backend mit Serverless Functions

Sicherer GPT-gestützter Chatbot auf Portfolio-Webseite mit Netlify Serverless Functions.

## 🎯 Ziel:

Netlify Functions als sicherer Proxy für OpenAI GPT API. Frontend sendet Anfragen an `/api/chat` Function, API-Key bleibt server-seitig geschützt.

## 🧩 Implementierung:

### 🔧 1. Dependencies installieren:

```bash
npm install @netlify/functions openai dotenv
```

### 📂 2. Netlify-optimierte Projektstruktur:

```
project/
├── netlify/
│   └── functions/
│       └── chat.js           // Serverless Function
├── .env                      // API-Key (lokal)
├── .gitignore               // ignoriert .env + node_modules
├── netlify.toml             // Netlify-Konfiguration
├── package.json             // Dependencies
├── index.html               // Frontend (existiert bereits)
└── chatbot.js               // Chat-Frontend-Integration
```

### 🧠 3. Netlify Function Implementation:

**netlify/functions/chat.js:**

- Nutzt @netlify/functions Handler
- Lädt Environment Variables aus Netlify
- OpenAI SDK Integration mit GPT-4
- Systemprompt für AI-Portfolio-Assistance

### 🛡 4. Security & Environment:

- API-Key in Netlify Environment Variables
- CORS für Frontend-Domain
- Rate Limiting über Netlify

### 💬 5. Frontend Integration:

**chatbot.js:**

- Fetch zu `/.netlify/functions/chat`
- Glasmorphismus-Design passend zur Website
- Error Handling & Loading States

### 🚀 6. Deployment:

- `netlify deploy --prod`
- Environment Variables in Netlify Dashboard
- Domain-Konfiguration automatisch

## ✅ Vorteile Netlify:

- ✅ Serverless = kosteneffizient
- ✅ Automatisches HTTPS
- ✅ Edge-Funktionen weltweit
- ✅ GitHub Integration
- ✅ Environment Variables Management
