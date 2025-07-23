# Chat-UI-Asset-System

## Übersicht

Das Chat-UI-Asset-System ermöglicht es, das Chatfenster mit eigenen Assets zu gestalten. Das System unterstützt verschiedene UI-Elemente und Themes.

## Asset-Struktur

### UI-Elemente

- `chat-window/` - Hauptfenster-Assets

  - `frame.png` - Rahmen des Chatfensters
  - `background.png` - Hintergrund des Chatfensters
  - `header.png` - Header-Bereich
  - `input-field.png` - Eingabefeld-Styling

- `buttons/` - Button-Assets

  - `send-button.png` - Send-Button
  - `close-button.png` - Close-Button
  - `quick-reply.png` - Quick-Reply-Buttons

- `icons/` - Icon-Assets

  - `ai-avatar.png` - AI-Avatar-Icon
  - `user-avatar.png` - User-Avatar-Icon
  - `send-icon.png` - Send-Icon

- `themes/` - Theme-spezifische Assets
  - `default/` - Standard-Theme
  - `pixel-art/` - Pixel-Art-Theme
  - `modern/` - Modern-Theme
  - `custom/` - Benutzerdefinierte Assets

## Verwendung

### Asset-Konfiguration

```javascript
const chatUIConfig = {
  theme: "custom",
  assets: {
    chatWindow: {
      frame: "assets/chatbot/character/ui/chat-window/frame.png",
      background: "assets/chatbot/character/ui/chat-window/background.png",
      header: "assets/chatbot/character/ui/chat-window/header.png",
    },
    buttons: {
      send: "assets/chatbot/character/ui/buttons/send-button.png",
      close: "assets/chatbot/character/ui/buttons/close-button.png",
    },
    icons: {
      aiAvatar: "assets/chatbot/character/ui/icons/ai-avatar.png",
      userAvatar: "assets/chatbot/character/ui/icons/user-avatar.png",
    },
  },
};
```

### Direkte Anzeige

Das Chatfenster wird standardmäßig direkt angezeigt ohne Toggle-Button.

## Asset-Spezifikationen

### Empfohlene Größen

- Chat-Window Frame: 400x600px
- Buttons: 40x40px
- Icons: 32x32px oder 64x64px
- Header: 400x60px
- Input-Field: 320x40px

### Unterstützte Formate

- PNG (empfohlen für Transparenz)
- JPG (für Hintergründe)
- SVG (für Icons)

## Beispiel-Implementation

Siehe `custom-chat-ui.js` für eine vollständige Implementierung.
