/**
 * CustomChatUI - Asset-basierte Chat-UI-Gestaltung
 *
 * Dieses System ermöglicht es, das Chatfenster mit eigenen Assets zu gestalten
 * und direkt anzuzeigen ohne Toggle-Button.
 */

class CustomChatUI {
    constructor(config = {}) {
        this.config = {
            theme: 'default',
            directDisplay: true,
            position: { bottom: '20px', right: '20px' },
            size: { width: '400px', height: '600px' },
            assets: {
                chatWindow: {
                    frame: null,
                    background: null,
                    header: null,
                    inputField: null
                },
                buttons: {
                    send: null,
                    close: null,
                    quickReply: null
                },
                icons: {
                    aiAvatar: null,
                    userAvatar: null,
                    sendIcon: null
                }
            },
            ...config
        };

        this.isLoaded = false;
        this.conversation = [];
        this.init();
    }

    init() {
        this.createCustomChatHTML();
        this.attachEventListeners();
        this.loadAssets();

        if (this.config.directDisplay) {
            this.showChat();
        }
    }

    createCustomChatHTML() {
        // Hauptcontainer für Custom Chat
        const chatContainer = document.createElement('div');
        chatContainer.id = 'custom-chat-container';
        chatContainer.className = 'custom-chat-container';

        chatContainer.innerHTML = `
            <div class="custom-chat-frame" id="custom-chat-frame">
                <div class="custom-chat-header" id="custom-chat-header">
                    <div class="custom-avatar-container">
                        <img class="custom-ai-avatar" id="custom-ai-avatar" src="" alt="AI Avatar">
                        <span class="custom-chat-title">AI Assistant</span>
                    </div>
                    <button class="custom-close-btn" id="custom-close-btn">×</button>
                </div>

                <div class="custom-chat-background" id="custom-chat-background">
                    <div class="custom-chat-messages" id="custom-chat-messages">
                        <div class="custom-message custom-bot-message">
                            <div class="custom-message-avatar">
                                <img class="custom-message-ai-avatar" src="" alt="AI">
                            </div>
                            <div class="custom-message-content">
                                Hallo! Ich bin dein AI-Assistent. Wie kann ich dir helfen?
                            </div>
                        </div>
                    </div>
                </div>

                <div class="custom-input-area" id="custom-input-area">
                    <div class="custom-input-field" id="custom-input-field">
                        <input type="text" id="custom-chat-input" placeholder="Schreibe eine Nachricht..." maxlength="1000">
                        <button class="custom-send-btn" id="custom-send-btn">
                            <img class="custom-send-icon" id="custom-send-icon" src="" alt="Send">
                        </button>
                    </div>
                </div>

                <div class="custom-quick-replies" id="custom-quick-replies">
                    <button class="custom-quick-reply-btn">Was kann ich dich fragen?</button>
                    <button class="custom-quick-reply-btn">Zeige mir Beispiele</button>
                    <button class="custom-quick-reply-btn">Hilfe</button>
                </div>
            </div>
        `;

        this.addCustomStyles();
        document.body.appendChild(chatContainer);
    }

    addCustomStyles() {
        const style = document.createElement('style');
        style.id = 'custom-chat-ui-styles';
        style.textContent = `
            .custom-chat-container {
                position: fixed;
                bottom: ${this.config.position.bottom};
                right: ${this.config.position.right};
                width: ${this.config.size.width};
                height: ${this.config.size.height};
                z-index: 1000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: none;
                transition: all 0.3s ease;
            }

            .custom-chat-container.active {
                display: block;
                animation: slideInUp 0.3s ease;
            }

            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .custom-chat-frame {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                border: 2px solid #e0e0e0;
            }

            /* Asset-basierte Styles werden dynamisch hinzugefügt */
            .custom-chat-frame.has-frame-asset {
                background: transparent;
                border: none;
            }

            .custom-chat-header {
                padding: 16px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 16px 16px 0 0;
                min-height: 60px;
            }

            .custom-avatar-container {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .custom-ai-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }

            .custom-chat-title {
                font-size: 16px;
                font-weight: 600;
            }

            .custom-close-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .custom-close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .custom-chat-background {
                flex: 1;
                display: flex;
                flex-direction: column;
                background: #f8f9fa;
                overflow: hidden;
            }

            .custom-chat-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                scroll-behavior: smooth;
            }

            .custom-message {
                display: flex;
                margin-bottom: 16px;
                gap: 12px;
            }

            .custom-message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #667eea;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: bold;
                flex-shrink: 0;
            }

            .custom-message-ai-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            .custom-message-content {
                background: white;
                padding: 12px 16px;
                border-radius: 18px;
                max-width: 280px;
                line-height: 1.4;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .custom-user-message {
                flex-direction: row-reverse;
            }

            .custom-user-message .custom-message-content {
                background: #667eea;
                color: white;
            }

            .custom-input-area {
                padding: 16px;
                background: white;
                border-top: 1px solid #e0e0e0;
            }

            .custom-input-field {
                display: flex;
                align-items: center;
                background: #f8f9fa;
                border-radius: 24px;
                padding: 8px 16px;
                gap: 8px;
                border: 1px solid #e0e0e0;
            }

            #custom-chat-input {
                flex: 1;
                border: none;
                background: transparent;
                outline: none;
                font-size: 14px;
                padding: 8px 0;
            }

            .custom-send-btn {
                background: #667eea;
                border: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .custom-send-btn:hover {
                background: #5a6fd8;
            }

            .custom-send-icon {
                width: 16px;
                height: 16px;
                filter: invert(1);
            }

            .custom-quick-replies {
                padding: 0 16px 16px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .custom-quick-reply-btn {
                background: #f8f9fa;
                border: 1px solid #e0e0e0;
                padding: 8px 12px;
                border-radius: 16px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.2s;
            }

            .custom-quick-reply-btn:hover {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .custom-chat-container {
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                }

                .custom-chat-frame {
                    border-radius: 0;
                }

                .custom-chat-header {
                    border-radius: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    async loadAssets() {
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

        // Lade Button-Assets
        if (assets.buttons.send) {
            await this.loadButtonAsset('send', assets.buttons.send);
        }

        this.isLoaded = true;
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

    async loadButtonAsset(type, assetPath) {
        try {
            const img = new Image();
            img.onload = () => {
                this.applyButtonAsset(type, assetPath);
            };
            img.onerror = () => {
                console.warn(`Failed to load button asset: ${assetPath}`);
            };
            img.src = assetPath;
        } catch (error) {
            console.warn(`Error loading button asset: ${error.message}`);
        }
    }

    applyChatWindowAsset(type, assetPath) {
        const frame = document.getElementById('custom-chat-frame');
        const header = document.getElementById('custom-chat-header');
        const background = document.getElementById('custom-chat-background');

        switch (type) {
            case 'frame':
                frame.style.backgroundImage = `url(${assetPath})`;
                frame.style.backgroundSize = 'cover';
                frame.style.backgroundRepeat = 'no-repeat';
                frame.classList.add('has-frame-asset');
                break;
            case 'background':
                background.style.backgroundImage = `url(${assetPath})`;
                background.style.backgroundSize = 'cover';
                background.style.backgroundRepeat = 'no-repeat';
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
                const aiAvatars = document.querySelectorAll('.custom-ai-avatar, .custom-message-ai-avatar');
                aiAvatars.forEach(avatar => {
                    avatar.src = assetPath;
                    avatar.style.display = 'block';
                });
                break;
            case 'sendIcon':
                const sendIcon = document.getElementById('custom-send-icon');
                sendIcon.src = assetPath;
                sendIcon.style.display = 'block';
                break;
        }
    }

    applyButtonAsset(type, assetPath) {
        switch (type) {
            case 'send':
                const sendBtn = document.getElementById('custom-send-btn');
                sendBtn.style.backgroundImage = `url(${assetPath})`;
                sendBtn.style.backgroundSize = 'contain';
                sendBtn.style.backgroundRepeat = 'no-repeat';
                sendBtn.style.backgroundPosition = 'center';
                break;
        }
    }

    attachEventListeners() {
        // Close Button
        document.getElementById('custom-close-btn').addEventListener('click', () => {
            this.hideChat();
        });

        // Send Button
        document.getElementById('custom-send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter Key
        document.getElementById('custom-chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick Reply Buttons
        document.querySelectorAll('.custom-quick-reply-btn').forEach(button => {
            button.addEventListener('click', () => {
                const message = button.textContent;
                document.getElementById('custom-chat-input').value = message;
                this.sendMessage();
            });
        });
    }

    showChat() {
        const container = document.getElementById('custom-chat-container');
        container.classList.add('active');
        document.getElementById('custom-chat-input').focus();
    }

    hideChat() {
        const container = document.getElementById('custom-chat-container');
        container.classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('custom-chat-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessageToChat(message, 'user');
        input.value = '';

        // Simuliere AI-Antwort
        setTimeout(() => {
            this.addMessageToChat('Das ist eine Beispiel-Antwort des AI-Assistenten.', 'bot');
        }, 1000);
    }

    addMessageToChat(message, sender) {
        const messagesContainer = document.getElementById('custom-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `custom-message ${sender === 'user' ? 'custom-user-message' : 'custom-bot-message'}`;

        messageDiv.innerHTML = `
            <div class="custom-message-avatar">
                ${sender === 'bot' ?
                    '<img class="custom-message-ai-avatar" src="" alt="AI">' :
                    '<div style="background: #4A90E2; color: white; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px;">Du</div>'
                }
            </div>
            <div class="custom-message-content">
                ${message}
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Aktualisiere AI-Avatar falls Asset geladen
        if (sender === 'bot' && this.config.assets.icons.aiAvatar) {
            const aiAvatar = messageDiv.querySelector('.custom-message-ai-avatar');
            if (aiAvatar) {
                aiAvatar.src = this.config.assets.icons.aiAvatar;
            }
        }
    }

    // Konfiguration zur Laufzeit ändern
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.loadAssets();
    }

    // Chat-Position ändern
    updatePosition(position) {
        const container = document.getElementById('custom-chat-container');
        container.style.bottom = position.bottom || this.config.position.bottom;
        container.style.right = position.right || this.config.position.right;
    }

    // Chat-Größe ändern
    updateSize(size) {
        const container = document.getElementById('custom-chat-container');
        container.style.width = size.width || this.config.size.width;
        container.style.height = size.height || this.config.size.height;
    }

    // Cleanup
    destroy() {
        const container = document.getElementById('custom-chat-container');
        const styles = document.getElementById('custom-chat-ui-styles');

        if (container) container.remove();
        if (styles) styles.remove();
    }
}

// Export für Verwendung in anderen Modulen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomChatUI;
}