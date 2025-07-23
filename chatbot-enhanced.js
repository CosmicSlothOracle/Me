// Enhanced AI Chatbot Integration mit direkter Anzeige und Asset-Unterstützung
// Erweiterte Version des ursprünglichen Chatbots

class EnhancedAIChatbot {
  constructor(config = {}) {
    this.config = {
      // Neue Optionen für direkte Anzeige
      directDisplay: true,
      showToggleButton: false,

      // Asset-Unterstützung
      useCustomAssets: false,
      assets: {
        chatWindow: {
          frame: null,
          background: null,
          header: null
        },
        buttons: {
          send: null,
          close: null
        },
        icons: {
          aiAvatar: null,
          userAvatar: null,
          sendIcon: null
        }
      },

      // Position und Größe
      position: { bottom: '30px', right: '30px' },
      size: { width: '400px', height: '600px' },

      // Erweiterte Optionen
      animation: true,
      autoOpen: true,
      theme: 'default',

      // Überschreibe mit User-Config
      ...config
    };

    this.isOpen = false;
    this.isLoading = false;
    this.conversation = [];
    this.maxHistoryLength = 6;
    this.isInitialized = false;

    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.loadAssets();

    // Direkte Anzeige wenn konfiguriert
    if (this.config.directDisplay && this.config.autoOpen) {
      this.openChatbot();
    }

    this.isInitialized = true;
  }

  createChatbotHTML() {
    // Toggle Button nur erstellen wenn konfiguriert
    if (this.config.showToggleButton) {
      this.createToggleButton();
    }

    // Chatbot Container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'enhanced-chatbot-container';
    chatContainer.className = 'enhanced-chatbot-container';

    // Direkte Anzeige-Klasse hinzufügen
    if (this.config.directDisplay) {
      chatContainer.classList.add('direct-display');
    }

    chatContainer.innerHTML = `
      <div class="enhanced-chatbot-frame" id="enhanced-chatbot-frame">
        <div class="enhanced-chatbot-header" id="enhanced-chatbot-header">
          <div class="enhanced-avatar-container">
            <div class="enhanced-ai-avatar" id="enhanced-ai-avatar">
              <img class="enhanced-ai-avatar-img" id="enhanced-ai-avatar-img" src="" alt="AI" style="display: none;">
              <div class="enhanced-ai-icon" id="enhanced-ai-icon">AI</div>
            </div>
            <span class="enhanced-chat-title">AI Assistant</span>
          </div>
          <button class="enhanced-close-btn" id="enhanced-close-btn" ${this.config.directDisplay ? 'style="display: none;"' : ''}>×</button>
        </div>

        <div class="enhanced-chat-messages" id="enhanced-chat-messages">
          <div class="enhanced-message enhanced-bot-message">
            <div class="enhanced-message-avatar">
              <img class="enhanced-message-ai-avatar" src="" alt="AI" style="display: none;">
              <div class="enhanced-message-ai-icon">AI</div>
            </div>
            <div class="enhanced-message-content">
              Hallo! Ich bin dein AI-Assistent für ComfyUI-Workflows.
              Frag mich gerne nach den Pixel Art Transformations oder AI Spritesheet Extraction Workflows! 🎨
            </div>
          </div>
        </div>

        <div class="enhanced-input-area">
          <input type="text" id="enhanced-chatbot-input" placeholder="Stelle deine Frage..." maxlength="1000">
          <button id="enhanced-chatbot-send" class="enhanced-send-btn">
            <img class="enhanced-send-icon" id="enhanced-send-icon" src="" alt="Send" style="display: none;">
            <svg class="enhanced-send-svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div class="enhanced-quick-replies" id="enhanced-quick-replies">
          <button class="enhanced-quick-reply-btn">Was ist Pixel Art Transformation?</button>
          <button class="enhanced-quick-reply-btn">Erkläre AI Spritesheet Extraction</button>
          <button class="enhanced-quick-reply-btn">Wie funktioniert ComfyUI?</button>
        </div>
      </div>
    `;

    this.addEnhancedStyles();
    document.body.appendChild(chatContainer);

    // Erste Nachricht zur Konversation hinzufügen
    this.conversation.push({
      role: 'assistant',
      content: 'Hallo! Ich bin dein AI-Assistent für ComfyUI-Workflows. Frag mich gerne nach den Pixel Art Transformations oder AI Spritesheet Extraction Workflows! 🎨'
    });
  }

  createToggleButton() {
    const toggleButton = document.createElement('div');
    toggleButton.id = 'enhanced-chatbot-toggle';
    toggleButton.innerHTML = `
      <div class="enhanced-chatbot-avatar-container">
        <div class="enhanced-ai-avatar-static" id="enhanced-chatbot-avatar">
          <img class="enhanced-toggle-avatar-img" src="" alt="AI" style="display: none;">
          <div class="enhanced-ai-icon">AI</div>
        </div>
        <div class="enhanced-speech-bubble" id="enhanced-speech-bubble">
          <p>Hallo! Frag mich etwas zu ComfyUI-Workflows!</p>
        </div>
      </div>
    `;

    document.body.appendChild(toggleButton);
  }

  addEnhancedStyles() {
    const style = document.createElement('style');
    style.id = 'enhanced-chatbot-styles';
    style.textContent = `
      /* Enhanced Chatbot Styles */
      .enhanced-chatbot-container {
        position: fixed;
        bottom: ${this.config.position.bottom};
        right: ${this.config.position.right};
        width: ${this.config.size.width};
        height: ${this.config.size.height};
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transform: translateY(100%);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
      }

      .enhanced-chatbot-container.direct-display {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      .enhanced-chatbot-container.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      .enhanced-chatbot-frame {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border: 2px solid #e0e0e0;
      }

      /* Asset-basierte Styles */
      .enhanced-chatbot-frame.has-frame-asset {
        background: transparent;
        border: none;
      }

      .enhanced-chatbot-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 20px 20px 0 0;
        min-height: 70px;
      }

      .enhanced-avatar-container {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .enhanced-ai-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .enhanced-ai-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .enhanced-ai-icon {
        font-size: 14px;
        font-weight: bold;
        color: white;
      }

      .enhanced-chat-title {
        font-size: 18px;
        font-weight: 600;
      }

      .enhanced-close-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .enhanced-close-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
      }

      .enhanced-chat-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background: #f8f9fa;
        scroll-behavior: smooth;
      }

      .enhanced-message {
        display: flex;
        margin-bottom: 20px;
        gap: 12px;
        animation: slideInMessage 0.3s ease;
      }

      @keyframes slideInMessage {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .enhanced-message-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #667eea;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
      }

      .enhanced-message-ai-avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .enhanced-message-ai-icon {
        font-size: 12px;
        font-weight: bold;
        color: white;
      }

      .enhanced-message-content {
        background: white;
        padding: 15px 20px;
        border-radius: 20px;
        max-width: 300px;
        line-height: 1.5;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        word-wrap: break-word;
      }

      .enhanced-user-message {
        flex-direction: row-reverse;
      }

      .enhanced-user-message .enhanced-message-content {
        background: #667eea;
        color: white;
      }

      .enhanced-user-message .enhanced-message-avatar {
        background: #4A90E2;
      }

      .enhanced-input-area {
        padding: 20px;
        background: white;
        border-top: 1px solid #e9ecef;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      #enhanced-chatbot-input {
        flex: 1;
        border: 2px solid #e9ecef;
        border-radius: 25px;
        padding: 12px 20px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s ease;
      }

      #enhanced-chatbot-input:focus {
        border-color: #667eea;
      }

      .enhanced-send-btn {
        background: #667eea;
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }

      .enhanced-send-btn:hover {
        background: #5a6fd8;
        transform: scale(1.1);
      }

      .enhanced-send-icon {
        width: 18px;
        height: 18px;
        object-fit: contain;
      }

      .enhanced-send-svg {
        color: white;
      }

      .enhanced-quick-replies {
        padding: 0 20px 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .enhanced-quick-reply-btn {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        padding: 10px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .enhanced-quick-reply-btn:hover {
        background: #667eea;
        color: white;
        border-color: #667eea;
        transform: translateY(-2px);
      }

      /* Toggle Button Styles (wenn aktiviert) */
      #enhanced-chatbot-toggle {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1001;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      #enhanced-chatbot-toggle:hover {
        transform: translateY(-5px);
      }

      .enhanced-chatbot-avatar-container {
        position: relative;
        width: 80px;
        height: 80px;
      }

      .enhanced-ai-avatar-static {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        position: relative;
        overflow: hidden;
      }

      .enhanced-toggle-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .enhanced-speech-bubble {
        position: absolute;
        top: -80px;
        right: 0;
        background: white;
        border-radius: 20px;
        padding: 12px 18px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
        max-width: 250px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .enhanced-speech-bubble:after {
        content: '';
        position: absolute;
        bottom: -8px;
        right: 30px;
        width: 16px;
        height: 16px;
        background: white;
        transform: rotate(45deg);
      }

      .enhanced-speech-bubble p {
        margin: 0;
        font-size: 13px;
        color: #333;
        line-height: 1.4;
      }

      #enhanced-chatbot-toggle:hover .enhanced-speech-bubble {
        opacity: 1;
        transform: translateY(0);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .enhanced-chatbot-container {
          width: 100%;
          height: 100%;
          bottom: 0;
          right: 0;
          border-radius: 0;
        }

        .enhanced-chatbot-frame {
          border-radius: 0;
        }

        .enhanced-chatbot-header {
          border-radius: 0;
        }

        .enhanced-message-content {
          max-width: 250px;
        }

        #enhanced-chatbot-toggle {
          bottom: 20px;
          right: 20px;
        }

        .enhanced-chatbot-avatar-container {
          width: 60px;
          height: 60px;
        }
      }

      /* Loading Animation */
      .enhanced-loading {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 15px;
      }

      .enhanced-loading-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #667eea;
        animation: loadingDot 1.4s infinite ease-in-out;
      }

      .enhanced-loading-dot:nth-child(1) { animation-delay: -0.32s; }
      .enhanced-loading-dot:nth-child(2) { animation-delay: -0.16s; }

      @keyframes loadingDot {
        0%, 80%, 100% {
          transform: scale(0);
        } 40% {
          transform: scale(1);
        }
      }
    `;

    document.head.appendChild(style);
  }

  async loadAssets() {
    if (!this.config.useCustomAssets) return;

    const assets = this.config.assets;

    // Lade Chat-Window-Assets
    if (assets.chatWindow.frame) {
      await this.loadChatWindowAsset('frame', assets.chatWindow.frame);
    }

    if (assets.chatWindow.background) {
      await this.loadChatWindowAsset('background', assets.chatWindow.background);
    }

    if (assets.chatWindow.header) {
      await this.loadChatWindowAsset('header', assets.chatWindow.header);
    }

    // Lade Icon-Assets
    if (assets.icons.aiAvatar) {
      await this.loadIconAsset('aiAvatar', assets.icons.aiAvatar);
    }

    if (assets.icons.sendIcon) {
      await this.loadIconAsset('sendIcon', assets.icons.sendIcon);
    }
  }

  async loadChatWindowAsset(type, assetPath) {
    try {
      const img = new Image();
      img.onload = () => {
        this.applyChatWindowAsset(type, assetPath);
      };
      img.onerror = () => {
        console.warn(`Failed to load chat window asset: ${assetPath}`);
      };
      img.src = assetPath;
    } catch (error) {
      console.warn(`Error loading chat window asset: ${error.message}`);
    }
  }

  async loadIconAsset(type, assetPath) {
    try {
      const img = new Image();
      img.onload = () => {
        this.applyIconAsset(type, assetPath);
      };
      img.onerror = () => {
        console.warn(`Failed to load icon asset: ${assetPath}`);
      };
      img.src = assetPath;
    } catch (error) {
      console.warn(`Error loading icon asset: ${error.message}`);
    }
  }

  applyChatWindowAsset(type, assetPath) {
    const frame = document.getElementById('enhanced-chatbot-frame');
    const header = document.getElementById('enhanced-chatbot-header');
    const messages = document.getElementById('enhanced-chat-messages');

    switch (type) {
      case 'frame':
        frame.style.backgroundImage = `url(${assetPath})`;
        frame.style.backgroundSize = 'cover';
        frame.style.backgroundRepeat = 'no-repeat';
        frame.classList.add('has-frame-asset');
        break;
      case 'background':
        messages.style.backgroundImage = `url(${assetPath})`;
        messages.style.backgroundSize = 'cover';
        messages.style.backgroundRepeat = 'no-repeat';
        break;
      case 'header':
        header.style.backgroundImage = `url(${assetPath})`;
        header.style.backgroundSize = 'cover';
        header.style.backgroundRepeat = 'no-repeat';
        break;
    }
  }

  applyIconAsset(type, assetPath) {
    switch (type) {
      case 'aiAvatar':
        // Header Avatar
        const headerAvatar = document.getElementById('enhanced-ai-avatar-img');
        const headerIcon = document.getElementById('enhanced-ai-icon');
        if (headerAvatar && headerIcon) {
          headerAvatar.src = assetPath;
          headerAvatar.style.display = 'block';
          headerIcon.style.display = 'none';
        }

        // Toggle Avatar (wenn vorhanden)
        const toggleAvatar = document.querySelector('.enhanced-toggle-avatar-img');
        if (toggleAvatar) {
          toggleAvatar.src = assetPath;
          toggleAvatar.style.display = 'block';
        }

        // Message Avatars
        const messageAvatars = document.querySelectorAll('.enhanced-message-ai-avatar');
        const messageIcons = document.querySelectorAll('.enhanced-message-ai-icon');
        messageAvatars.forEach(avatar => {
          avatar.src = assetPath;
          avatar.style.display = 'block';
        });
        messageIcons.forEach(icon => {
          icon.style.display = 'none';
        });
        break;
      case 'sendIcon':
        const sendIcon = document.getElementById('enhanced-send-icon');
        const sendSvg = document.querySelector('.enhanced-send-svg');
        if (sendIcon && sendSvg) {
          sendIcon.src = assetPath;
          sendIcon.style.display = 'block';
          sendSvg.style.display = 'none';
        }
        break;
    }
  }

  attachEventListeners() {
    // Toggle Button (wenn vorhanden)
    const toggleButton = document.getElementById('enhanced-chatbot-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggleChatbot();
      });
    }

    // Close Button
    const closeButton = document.getElementById('enhanced-close-btn');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeChatbot();
      });
    }

    // Send Button
    document.getElementById('enhanced-chatbot-send').addEventListener('click', () => {
      this.sendMessage();
    });

    // Enter Key
    document.getElementById('enhanced-chatbot-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isLoading) {
        this.sendMessage();
      }
    });

    // Quick Reply Buttons
    document.querySelectorAll('.enhanced-quick-reply-btn').forEach(button => {
      button.addEventListener('click', () => {
        const message = button.textContent;
        document.getElementById('enhanced-chatbot-input').value = message;
        this.sendMessage();
      });
    });
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const container = document.getElementById('enhanced-chatbot-container');

    if (this.isOpen) {
      this.openChatbot();
    } else {
      this.closeChatbot();
    }
  }

  openChatbot() {
    const container = document.getElementById('enhanced-chatbot-container');
    container.classList.add('open');
    this.isOpen = true;
    document.getElementById('enhanced-chatbot-input').focus();
  }

  closeChatbot() {
    if (this.config.directDisplay) {
      // Bei direkter Anzeige nicht schließen
      return;
    }

    const container = document.getElementById('enhanced-chatbot-container');
    container.classList.remove('open');
    this.isOpen = false;
  }

  async sendMessage() {
    const input = document.getElementById('enhanced-chatbot-input');
    const message = input.value.trim();

    if (!message || this.isLoading) return;

    this.addMessageToChat(message, 'user');
    input.value = '';

    // Zeige Loading-Animation
    this.showLoading();

    try {
      // Hier kann die echte API-Integration eingefügt werden
      const response = await this.getAIResponse(message);
      this.hideLoading();
      this.addMessageToChat(response, 'bot');
    } catch (error) {
      this.hideLoading();
      this.addMessageToChat('Entschuldigung, es gab ein Problem bei der Verarbeitung deiner Nachricht.', 'bot');
    }
  }

  async getAIResponse(message) {
    // Placeholder für AI-Integration
    // Hier kann die Groq/OpenAI API Integration eingefügt werden
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Das ist eine Beispiel-Antwort auf deine Frage: "' + message + '"');
      }, 1000);
    });
  }

  addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('enhanced-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `enhanced-message ${sender === 'user' ? 'enhanced-user-message' : 'enhanced-bot-message'}`;

    const avatarContent = sender === 'bot' ?
      `<img class="enhanced-message-ai-avatar" src="${this.config.assets.icons.aiAvatar || ''}" alt="AI" style="display: ${this.config.assets.icons.aiAvatar ? 'block' : 'none'};">
       <div class="enhanced-message-ai-icon" style="display: ${this.config.assets.icons.aiAvatar ? 'none' : 'block'};">AI</div>` :
      `<div class="enhanced-message-ai-icon">Du</div>`;

    messageDiv.innerHTML = `
      <div class="enhanced-message-avatar">
        ${avatarContent}
      </div>
      <div class="enhanced-message-content">
        ${message}
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Konversation zur Historie hinzufügen
    this.conversation.push({
      role: sender === 'user' ? 'user' : 'assistant',
      content: message
    });

    // Historie begrenzen
    if (this.conversation.length > this.maxHistoryLength) {
      this.conversation = this.conversation.slice(-this.maxHistoryLength);
    }
  }

  showLoading() {
    this.isLoading = true;
    const messagesContainer = document.getElementById('enhanced-chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'enhanced-message enhanced-bot-message enhanced-loading-message';
    loadingDiv.id = 'enhanced-loading-message';
    loadingDiv.innerHTML = `
      <div class="enhanced-message-avatar">
        <img class="enhanced-message-ai-avatar" src="${this.config.assets.icons.aiAvatar || ''}" alt="AI" style="display: ${this.config.assets.icons.aiAvatar ? 'block' : 'none'};">
        <div class="enhanced-message-ai-icon" style="display: ${this.config.assets.icons.aiAvatar ? 'none' : 'block'};">AI</div>
      </div>
      <div class="enhanced-message-content">
        <div class="enhanced-loading">
          <div class="enhanced-loading-dot"></div>
          <div class="enhanced-loading-dot"></div>
          <div class="enhanced-loading-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideLoading() {
    this.isLoading = false;
    const loadingMessage = document.getElementById('enhanced-loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  // Konfiguration zur Laufzeit ändern
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.loadAssets();
  }

  // Position ändern
  updatePosition(position) {
    this.config.position = { ...this.config.position, ...position };
    const container = document.getElementById('enhanced-chatbot-container');
    Object.keys(position).forEach(key => {
      container.style[key] = position[key];
    });
  }

  // Größe ändern
  updateSize(size) {
    this.config.size = { ...this.config.size, ...size };
    const container = document.getElementById('enhanced-chatbot-container');
    if (size.width) container.style.width = size.width;
    if (size.height) container.style.height = size.height;
  }

  // Cleanup
  destroy() {
    const container = document.getElementById('enhanced-chatbot-container');
    const toggleButton = document.getElementById('enhanced-chatbot-toggle');
    const styles = document.getElementById('enhanced-chatbot-styles');

    if (container) container.remove();
    if (toggleButton) toggleButton.remove();
    if (styles) styles.remove();
  }
}

// Globale Instanz erstellen (für Rückwärtskompatibilität)
let enhancedChatbot = null;

// Automatische Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  // Prüfe ob Custom Chat UI verwendet werden soll
  if (window.useCustomChatUI) {
    console.log('Custom Chat UI wird verwendet');
    return;
  }

  // Standard Enhanced Chatbot initialisieren
  enhancedChatbot = new EnhancedAIChatbot({
    directDisplay: true,
    autoOpen: true,
    showToggleButton: false
  });
});

// Export für Modulverwendung
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedAIChatbot;
}