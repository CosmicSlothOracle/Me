// AI Chatbot Integration für Portfolio-Website
// Glasmorphismus-Design passend zur bestehenden Purple-Theme

class AIChatbot {
  constructor() {
    this.isOpen = false;
    this.isLoading = false;
    this.conversation = []; // Konversationshistorie speichern
    this.maxHistoryLength = 6; // Maximale Anzahl der gespeicherten Nachrichten
    this.currentAnimation = 'idle'; // Aktuelle Animation des Chatbot-Avatars
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
  }

  createChatbotHTML() {
    // Chatbot Toggle Button (Floating Avatar)
    const toggleButton = document.createElement('div');
    toggleButton.id = 'chatbot-toggle';
    toggleButton.innerHTML = `
      <div class="chatbot-avatar-container">
        <img src="assets/chatbot/idle.gif" alt="AI Assistant" id="chatbot-avatar" />
        <div class="speech-bubble" id="speech-bubble">
          <p>Hallo! Frag mich etwas zu ComfyUI-Workflows!</p>
        </div>
      </div>
    `;

    // Chatbot Container (Dialog)
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chatbot-container';
    chatContainer.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-title">
          <div class="ai-icon">
            <img src="assets/chatbot/talk.gif" alt="AI Assistant" class="header-avatar" />
          </div>
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
      <div class="quick-replies" id="quick-replies">
        <button class="quick-reply-btn">Was ist Pixel Art Transformation?</button>
        <button class="quick-reply-btn">Erkläre AI Spritesheet Extraction</button>
        <button class="quick-reply-btn">Wie funktioniert ComfyUI?</button>
      </div>
    `;

    // CSS Styles hinzufügen
    this.addChatbotStyles();

    // Elements zum DOM hinzufügen
    document.body.appendChild(toggleButton);
    document.body.appendChild(chatContainer);

    // Erste Nachricht zur Konversationshistorie hinzufügen
    this.conversation.push({
      role: 'assistant',
      content: 'Hallo! Ich bin dein AI-Assistent für ComfyUI-Workflows. Frag mich gerne nach den Pixel Art Transformations oder AI Spritesheet Extraction Workflows! 🎨'
    });
  }

  addChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Chatbot Avatar und Sprechblase */
      #chatbot-toggle {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      #chatbot-toggle:hover {
        transform: translateY(-5px);
      }

      .chatbot-avatar-container {
        position: relative;
        width: 100px;
        height: 100px;
      }

      #chatbot-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
        backdrop-filter: blur(10px);
        border: 2px solid rgba(139, 92, 246, 0.5);
        transition: all 0.3s ease;
      }

      .speech-bubble {
        position: absolute;
        top: -80px;
        right: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(250, 245, 255, 0.8) 100%);
        backdrop-filter: blur(10px);
        border-radius: 18px;
        padding: 12px 16px;
        box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
        max-width: 250px;
        border: 1px solid rgba(139, 92, 246, 0.3);
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .speech-bubble:after {
        content: '';
        position: absolute;
        bottom: -10px;
        right: 30px;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(250, 245, 255, 0.8) 100%);
        transform: rotate(45deg);
        border-right: 1px solid rgba(139, 92, 246, 0.3);
        border-bottom: 1px solid rgba(139, 92, 246, 0.3);
      }

      .speech-bubble p {
        margin: 0;
        font-size: 14px;
        color: #4B5563;
        line-height: 1.4;
      }

      #chatbot-toggle:hover .speech-bubble {
        opacity: 1;
        transform: translateY(0);
      }

      .header-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      /* Chatbot Container */
      #chatbot-container {
        position: fixed;
        bottom: 150px;
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

      /* Quick Replies Styling */
      .quick-replies {
        padding: 10px 15px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        border-top: 1px solid rgba(139, 92, 246, 0.1);
        background: rgba(255, 255, 255, 0.5);
      }

      .quick-reply-btn {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%);
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 16px;
        padding: 6px 12px;
        font-size: 12px;
        color: #6b46c1;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .quick-reply-btn:hover {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%);
        transform: translateY(-1px);
      }

      /* Chatbot Input Area */
      .chatbot-input-area {
        display: flex;
        padding: 15px;
        border-top: 1px solid rgba(139, 92, 246, 0.1);
      }

      #chatbot-input {
        flex: 1;
        padding: 12px 15px;
        border-radius: 18px;
        border: 1px solid rgba(139, 92, 246, 0.2);
        background: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        color: #333;
        transition: all 0.2s ease;
      }

      #chatbot-input:focus {
        outline: none;
        border-color: rgba(139, 92, 246, 0.5);
        box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
      }

      .send-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%);
        color: white;
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .send-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
      }

      /* Message Styling */
      .message {
        display: flex;
        flex-direction: column;
        max-width: 85%;
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
        font-size: 14px;
        line-height: 1.5;
        position: relative;
      }

      .user-message .message-content {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%);
        color: white;
        border-bottom-right-radius: 4px;
      }

      .bot-message .message-content {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(250, 245, 255, 0.7) 100%);
        color: #333;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 10px rgba(139, 92, 246, 0.1);
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
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgba(139, 92, 246, 0.5);
        animation: loadingDots 1.4s infinite ease-in-out both;
      }

      .loading-dots span:nth-child(1) {
        animation-delay: -0.32s;
      }

      .loading-dots span:nth-child(2) {
        animation-delay: -0.16s;
      }

      @keyframes loadingDots {
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
          bottom: 120px;
          right: 5vw;
        }

        #chatbot-toggle {
          bottom: 20px;
          right: 20px;
        }

        .chatbot-avatar-container {
          width: 80px;
          height: 80px;
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

    // Quick Reply Buttons
    document.querySelectorAll('.quick-reply-btn').forEach(button => {
      button.addEventListener('click', () => {
        const message = button.textContent;
        document.getElementById('chatbot-input').value = message;
        this.sendMessage();
      });
    });
  }

  toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      container.classList.add('open');
      document.getElementById('chatbot-input').focus();
      this.setAnimation('talk');
    } else {
      container.classList.remove('open');
      this.setAnimation('idle');
    }
  }

  closeChatbot() {
    document.getElementById('chatbot-container').classList.remove('open');
    this.isOpen = false;
    this.setAnimation('idle');
  }

  // Neue Methode für Animation-Wechsel
  setAnimation(animation) {
    if (this.currentAnimation === animation) return;

    this.currentAnimation = animation;
    const avatar = document.getElementById('chatbot-avatar');

    if (avatar) {
      avatar.src = `assets/chatbot/${animation}.gif`;
    }

    const headerAvatar = document.querySelector('.header-avatar');
    if (headerAvatar) {
      headerAvatar.src = `assets/chatbot/${animation === 'idle' ? 'talk' : animation}.gif`;
    }
  }

  // Methode für Sprechblase
  updateSpeechBubble(text) {
    const speechBubble = document.getElementById('speech-bubble');
    if (speechBubble) {
      speechBubble.innerHTML = `<p>${this.truncateText(text, 100)}</p>`;

      // Sprechblase kurz anzeigen
      speechBubble.style.opacity = '1';
      speechBubble.style.transform = 'translateY(0)';

      setTimeout(() => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translateY(10px)';
      }, 5000);
    }
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message || this.isLoading) return;

    // User Message hinzufügen
    this.addMessage(message, 'user');

    // Zur Konversationshistorie hinzufügen
    this.conversation.push({ role: 'user', content: message });

    // Konversationshistorie auf maximale Länge begrenzen
    if (this.conversation.length > this.maxHistoryLength * 2) {
      // Behalte den ersten Eintrag (Begrüßung) und die letzten maxHistoryLength Einträge
      this.conversation = [
        this.conversation[0],
        ...this.conversation.slice(-(this.maxHistoryLength * 2) + 1)
      ];
    }

    input.value = '';

    // Loading Indicator und Animation ändern
    this.showLoading();
    this.setAnimation('talk');

    try {
      // Konversationshistorie für API vorbereiten
      const messages = this.conversation.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // API Request an Netlify Function
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
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

      // Zur Konversationshistorie hinzufügen
      this.conversation.push({ role: 'assistant', content: data.reply });

      // Animation und Sprechblase aktualisieren
      this.updateSpeechBubble(data.reply);

      // Animation basierend auf Antwort wählen
      this.chooseAnimationBasedOnReply(data.reply);

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

      // Fehlermeldung zur Konversationshistorie hinzufügen
      this.conversation.push({ role: 'assistant', content: userMessage });

      // Animation für Fehler
      this.setAnimation('sleep');
      this.updateSpeechBubble(userMessage);

    } finally {
      this.hideLoading();
    }
  }

  // Neue Methode zur Auswahl der Animation basierend auf der Antwort
  chooseAnimationBasedOnReply(reply) {
    // Standardmäßig zurück zu idle
    let animation = 'idle';

    // Prüfe auf Schlüsselwörter für verschiedene Animationen
    if (reply.toLowerCase().includes('zeig') ||
        reply.toLowerCase().includes('schau') ||
        reply.toLowerCase().includes('hier')) {
      animation = 'point';
    } else if (reply.toLowerCase().includes('teleport') ||
               reply.toLowerCase().includes('bewegen') ||
               reply.toLowerCase().includes('verschieben')) {
      animation = 'teleport';
    } else if (reply.toLowerCase().includes('nicht sicher') ||
               reply.toLowerCase().includes('weiß nicht') ||
               reply.toLowerCase().includes('kann ich nicht')) {
      animation = 'sleep';
    } else {
      animation = 'talk';
    }

    this.setAnimation(animation);

    // Nach einiger Zeit zurück zu idle
    setTimeout(() => {
      this.setAnimation('idle');
    }, 5000);
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