// AI Chatbot Integration für Portfolio-Website
// Glasmorphismus-Design passend zur bestehenden Purple-Theme

class AIChatbot {
  constructor() {
    this.isOpen = false;
    this.isLoading = false;
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
  }

  createChatbotHTML() {
    // Chatbot Toggle Button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'chatbot-toggle';
    toggleButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/>
        <circle cx="9" cy="12" r="1" fill="white"/>
        <circle cx="15" cy="12" r="1" fill="white"/>
        <circle cx="12" cy="12" r="1" fill="white"/>
      </svg>
    `;

    // Chatbot Container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chatbot-container';
    chatContainer.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-title">
          <div class="ai-icon">🤖</div>
          <span>AI Assistant</span>
        </div>
        <button id="chatbot-close" class="close-btn">×</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="message bot-message">
          <div class="message-content">
            Hallo! Ich bin dein AI-Assistent für ComfyUI-Workflows.
            Frag mich gerne nach den Pixel Art Transformations oder AI Spritesheet Extraction Workflows! 🎨
          </div>
        </div>
      </div>
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Stelle deine Frage..." maxlength="1000">
        <button id="chatbot-send" class="send-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;

    // CSS Styles hinzufügen
    this.addChatbotStyles();

    // Elements zum DOM hinzufügen
    document.body.appendChild(toggleButton);
    document.body.appendChild(chatContainer);
  }

  addChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Chatbot Toggle Button */
      #chatbot-toggle {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        color: white;
        cursor: pointer;
        box-shadow:
          0 8px 32px rgba(139, 92, 246, 0.3),
          0 0 0 1px rgba(139, 92, 246, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #chatbot-toggle:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow:
          0 12px 40px rgba(139, 92, 246, 0.4),
          0 0 0 1px rgba(139, 92, 246, 0.2);
        background: linear-gradient(135deg, rgba(147, 107, 251, 0.95) 0%, rgba(134, 73, 242, 0.95) 100%);
      }

      /* Chatbot Container */
      #chatbot-container {
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 400px;
        height: 500px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(250, 245, 255, 0.5) 100%);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 20px;
        box-shadow:
          0 25px 50px rgba(139, 92, 246, 0.15),
          0 0 0 1px rgba(139, 92, 246, 0.1);
        display: none;
        flex-direction: column;
        z-index: 1001;
        overflow: hidden;
        animation: chatbotSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      #chatbot-container.open {
        display: flex;
      }

      @keyframes chatbotSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* Chatbot Header */
      .chatbot-header {
        padding: 20px;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%);
        border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chatbot-title {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #333;
        font-weight: 600;
      }

      .ai-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }

      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        color: #666;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
      }

      .close-btn:hover {
        background: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
      }

      /* Messages Area */
      .chatbot-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
        scroll-behavior: smooth;
      }

      .chatbot-messages::-webkit-scrollbar {
        width: 4px;
      }

      .chatbot-messages::-webkit-scrollbar-track {
        background: rgba(139, 92, 246, 0.05);
        border-radius: 2px;
      }

      .chatbot-messages::-webkit-scrollbar-thumb {
        background: rgba(139, 92, 246, 0.3);
        border-radius: 2px;
      }

      /* Message Bubbles */
      .message {
        max-width: 85%;
        margin-bottom: 8px;
      }

      .user-message {
        align-self: flex-end;
      }

      .bot-message {
        align-self: flex-start;
      }

      .message-content {
        padding: 12px 16px;
        border-radius: 18px;
        line-height: 1.4;
        font-size: 14px;
      }

      .user-message .message-content {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%);
        color: white;
        border-bottom-right-radius: 6px;
      }

      .bot-message .message-content {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(250, 245, 255, 0.8) 100%);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(139, 92, 246, 0.1);
        color: #333;
        border-bottom-left-radius: 6px;
      }

      /* Input Area */
      .chatbot-input-area {
        padding: 20px;
        border-top: 1px solid rgba(139, 92, 246, 0.1);
        display: flex;
        gap: 10px;
        align-items: center;
      }

      #chatbot-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        outline: none;
        font-size: 14px;
        transition: all 0.2s ease;
      }

      #chatbot-input:focus {
        border-color: rgba(139, 92, 246, 0.5);
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
      }

      .send-btn {
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .send-btn:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
      }

      .send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Loading Animation */
      .loading-message .message-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .loading-dots {
        display: flex;
        gap: 4px;
      }

      .loading-dots span {
        width: 6px;
        height: 6px;
        background: rgba(139, 92, 246, 0.6);
        border-radius: 50%;
        animation: loadingPulse 1.4s infinite ease-in-out;
      }

      .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
      .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
      .loading-dots span:nth-child(3) { animation-delay: 0s; }

      @keyframes loadingPulse {
        0%, 80%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        #chatbot-container {
          width: 90vw;
          height: 70vh;
          bottom: 20px;
          right: 5vw;
        }

        #chatbot-toggle {
          bottom: 20px;
          right: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  attachEventListeners() {
    // Toggle Button
    document.getElementById('chatbot-toggle').addEventListener('click', () => {
      this.toggleChatbot();
    });

    // Close Button
    document.getElementById('chatbot-close').addEventListener('click', () => {
      this.closeChatbot();
    });

    // Send Button
    document.getElementById('chatbot-send').addEventListener('click', () => {
      this.sendMessage();
    });

    // Enter Key
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isLoading) {
        this.sendMessage();
      }
    });
  }

  toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      container.classList.add('open');
      document.getElementById('chatbot-input').focus();
    } else {
      container.classList.remove('open');
    }
  }

  closeChatbot() {
    document.getElementById('chatbot-container').classList.remove('open');
    this.isOpen = false;
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message || this.isLoading) return;

    // User Message hinzufügen
    this.addMessage(message, 'user');
    input.value = '';

    // Loading Indicator
    this.showLoading();

    try {
      // API Request an Netlify Function
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      // Prüfe ob Response gültig ist
      if (!response.ok) {
        let errorMessage = 'Request failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.warn('Failed to parse error response:', parseError);
        }
        throw new Error(`${response.status}: ${errorMessage}`);
      }

      const data = await response.json();

      // Validiere Response-Daten
      if (!data || !data.reply) {
        throw new Error('Invalid response format');
      }

      // Bot Response hinzufügen
      this.addMessage(data.reply, 'bot');

    } catch (error) {
      console.error('Chatbot Error Details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });

      // Benutzerfreundliche Error-Messages basierend auf Fehlertyp
      let userMessage = 'Entschuldigung, es ist ein Fehler aufgetreten. 🤖';

      if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
        userMessage = 'Verbindungsproblem. Bitte prüfe deine Internetverbindung. 🌐';
      } else if (error.message.includes('429')) {
        userMessage = 'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut. ⏳';
      } else if (error.message.includes('401') || error.message.includes('403')) {
        userMessage = 'Authentifizierungsfehler. Bitte lade die Seite neu. 🔑';
      } else if (error.message.includes('500')) {
        userMessage = 'Server-Fehler. Bitte versuche es in ein paar Minuten erneut. ⚙️';
      } else if (error.message.includes('503')) {
        userMessage = 'Service temporär nicht verfügbar. Bitte versuche es später erneut. 🔧';
      }

      this.addMessage(userMessage, 'bot');
    } finally {
      this.hideLoading();
    }
  }

  addMessage(content, type) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    messageDiv.innerHTML = `
      <div class="message-content">${this.escapeHtml(content)}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showLoading() {
    this.isLoading = true;
    const messagesContainer = document.getElementById('chatbot-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-message loading-message';
    loadingDiv.innerHTML = `
      <div class="message-content">
        <span>Denke nach</span>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Send Button deaktivieren
    document.getElementById('chatbot-send').disabled = true;
  }

  hideLoading() {
    this.isLoading = false;
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }

    // Send Button aktivieren
    document.getElementById('chatbot-send').disabled = false;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Chatbot initialisieren wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
  new AIChatbot();
});