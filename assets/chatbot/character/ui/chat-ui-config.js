/**
 * Chat UI Configuration System
 *
 * Zentrale Konfiguration für verschiedene Chat-UI-Themes und -Einstellungen
 */

class ChatUIConfig {
    constructor() {
        this.themes = {
            default: {
                name: 'Standard',
                description: 'Klassisches Design mit Glasmorphismus-Effekten',
                config: {
                    theme: 'default',
                    directDisplay: true,
                    showToggleButton: false,
                    position: { bottom: '20px', right: '20px' },
                    size: { width: '400px', height: '600px' },
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
                            sendIcon: null
                        }
                    }
                }
            },

            pixelart: {
                name: 'Pixel Art',
                description: 'Retro-Gaming-Style mit pixeligen Assets',
                config: {
                    theme: 'pixelart',
                    directDisplay: true,
                    showToggleButton: false,
                    position: { bottom: '20px', right: '20px' },
                    size: { width: '420px', height: '600px' },
                    assets: {
                        chatWindow: {
                            frame: 'assets/chatbot/character/ui/themes/pixel-art/frame.png',
                            background: 'assets/chatbot/character/ui/themes/pixel-art/background.png',
                            header: 'assets/chatbot/character/ui/themes/pixel-art/header.png'
                        },
                        buttons: {
                            send: 'assets/chatbot/character/ui/themes/pixel-art/send-button.png',
                            close: 'assets/chatbot/character/ui/themes/pixel-art/close-button.png'
                        },
                        icons: {
                            aiAvatar: 'assets/chatbot/character/ui/themes/pixel-art/ai-avatar.png',
                            sendIcon: 'assets/chatbot/character/ui/themes/pixel-art/send-icon.png'
                        }
                    }
                }
            },

            modern: {
                name: 'Modern',
                description: 'Minimalistisches Design mit klaren Linien',
                config: {
                    theme: 'modern',
                    directDisplay: true,
                    showToggleButton: false,
                    position: { bottom: '20px', right: '20px' },
                    size: { width: '380px', height: '580px' },
                    assets: {
                        chatWindow: {
                            frame: 'assets/chatbot/character/ui/themes/modern/frame.png',
                            background: 'assets/chatbot/character/ui/themes/modern/background.png',
                            header: 'assets/chatbot/character/ui/themes/modern/header.png'
                        },
                        buttons: {
                            send: 'assets/chatbot/character/ui/themes/modern/send-button.png',
                            close: 'assets/chatbot/character/ui/themes/modern/close-button.png'
                        },
                        icons: {
                            aiAvatar: 'assets/chatbot/character/ui/themes/modern/ai-avatar.png',
                            sendIcon: 'assets/chatbot/character/ui/themes/modern/send-icon.png'
                        }
                    }
                }
            },

            custom: {
                name: 'Custom',
                description: 'Benutzerdefinierte Konfiguration',
                config: {
                    theme: 'custom',
                    directDisplay: true,
                    showToggleButton: false,
                    position: { bottom: '20px', right: '20px' },
                    size: { width: '400px', height: '600px' },
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
                            sendIcon: null
                        }
                    }
                }
            }
        };

        this.currentTheme = 'default';
        this.customConfig = null;
    }

    // Theme-Konfiguration abrufen
    getThemeConfig(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Theme "${themeName}" nicht gefunden. Verwende Standard-Theme.`);
            return this.themes.default.config;
        }
        return this.themes[themeName].config;
    }

    // Alle verfügbaren Themes auflisten
    getAvailableThemes() {
        return Object.keys(this.themes).map(key => ({
            id: key,
            name: this.themes[key].name,
            description: this.themes[key].description
        }));
    }

    // Aktuelles Theme setzen
    setCurrentTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
            return this.getThemeConfig(themeName);
        }
        return null;
    }

    // Custom-Konfiguration setzen
    setCustomConfig(config) {
        this.customConfig = config;
        this.themes.custom.config = { ...this.themes.custom.config, ...config };
        return this.themes.custom.config;
    }

    // Konfiguration für spezifische Position/Größe anpassen
    createPositionConfig(position, size = null) {
        const baseConfig = this.getThemeConfig(this.currentTheme);
        return {
            ...baseConfig,
            position: position,
            size: size || baseConfig.size
        };
    }

    // Responsive Konfiguration generieren
    getResponsiveConfig() {
        const isMobile = window.innerWidth <= 768;
        const baseConfig = this.getThemeConfig(this.currentTheme);

        if (isMobile) {
            return {
                ...baseConfig,
                position: { bottom: '0', right: '0' },
                size: { width: '100%', height: '100%' }
            };
        }

        return baseConfig;
    }

    // Konfiguration validieren
    validateConfig(config) {
        const required = ['theme', 'directDisplay', 'position', 'size'];
        const missing = required.filter(key => !(key in config));

        if (missing.length > 0) {
            console.warn(`Missing required config keys: ${missing.join(', ')}`);
            return false;
        }

        // Position validieren
        if (!config.position.bottom && !config.position.top) {
            console.warn('Position must have either bottom or top property');
            return false;
        }

        if (!config.position.right && !config.position.left) {
            console.warn('Position must have either right or left property');
            return false;
        }

        // Größe validieren
        if (!config.size.width || !config.size.height) {
            console.warn('Size must have width and height properties');
            return false;
        }

        return true;
    }

    // Konfiguration aus JSON laden
    loadFromJSON(jsonString) {
        try {
            const config = JSON.parse(jsonString);
            if (this.validateConfig(config)) {
                this.setCustomConfig(config);
                return config;
            }
        } catch (error) {
            console.error('Invalid JSON configuration:', error);
        }
        return null;
    }

    // Konfiguration zu JSON exportieren
    exportToJSON(themeName = null) {
        const config = themeName ? this.getThemeConfig(themeName) : this.getThemeConfig(this.currentTheme);
        return JSON.stringify(config, null, 2);
    }

    // Asset-Pfade generieren
    generateAssetPaths(themeName, customAssets = {}) {
        const theme = this.themes[themeName];
        if (!theme) return {};

        const basePath = `assets/chatbot/character/ui/themes/${themeName}/`;
        const defaultAssets = {
            chatWindow: {
                frame: `${basePath}frame.png`,
                background: `${basePath}background.png`,
                header: `${basePath}header.png`
            },
            buttons: {
                send: `${basePath}send-button.png`,
                close: `${basePath}close-button.png`
            },
            icons: {
                aiAvatar: `${basePath}ai-avatar.png`,
                sendIcon: `${basePath}send-icon.png`
            }
        };

        // Merge mit Custom Assets
        return this.deepMerge(defaultAssets, customAssets);
    }

    // Hilfsfunktion für Deep Merge
    deepMerge(target, source) {
        const result = { ...target };

        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        });

        return result;
    }

    // Preset-Konfigurationen
    getPresetConfigs() {
        return {
            floating: {
                name: 'Floating',
                description: 'Schwebendes Chat-Fenster',
                config: {
                    ...this.getThemeConfig('default'),
                    position: { bottom: '20px', right: '20px' },
                    size: { width: '350px', height: '500px' }
                }
            },

            sidebar: {
                name: 'Sidebar',
                description: 'Seitliche Anzeige',
                config: {
                    ...this.getThemeConfig('default'),
                    position: { top: '0', right: '0' },
                    size: { width: '300px', height: '100%' }
                }
            },

            fullscreen: {
                name: 'Fullscreen',
                description: 'Vollbild-Modus',
                config: {
                    ...this.getThemeConfig('default'),
                    position: { top: '0', left: '0' },
                    size: { width: '100%', height: '100%' }
                }
            },

            compact: {
                name: 'Compact',
                description: 'Kompakte Ansicht',
                config: {
                    ...this.getThemeConfig('default'),
                    position: { bottom: '20px', right: '20px' },
                    size: { width: '300px', height: '400px' }
                }
            }
        };
    }

    // Theme-spezifische CSS-Variablen generieren
    generateThemeCSS(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return '';

        const themeVars = {
            default: {
                '--primary-color': '#667eea',
                '--secondary-color': '#764ba2',
                '--background-color': '#f8f9fa',
                '--text-color': '#333333',
                '--border-radius': '20px',
                '--box-shadow': '0 25px 50px rgba(0, 0, 0, 0.15)'
            },
            pixelart: {
                '--primary-color': '#00ff00',
                '--secondary-color': '#ff0000',
                '--background-color': '#000000',
                '--text-color': '#ffffff',
                '--border-radius': '0px',
                '--box-shadow': '0 0 0 2px #ffffff'
            },
            modern: {
                '--primary-color': '#2196f3',
                '--secondary-color': '#1976d2',
                '--background-color': '#ffffff',
                '--text-color': '#212121',
                '--border-radius': '8px',
                '--box-shadow': '0 4px 20px rgba(0, 0, 0, 0.08)'
            }
        };

        const vars = themeVars[themeName] || themeVars.default;

        return `:root {
            ${Object.entries(vars).map(([key, value]) => `${key}: ${value};`).join('\n    ')}
        }`;
    }

    // Theme-spezifische Animationen
    getThemeAnimations(themeName) {
        const animations = {
            default: {
                slideIn: 'slideInUp 0.3s ease',
                messageIn: 'slideInMessage 0.3s ease',
                hover: 'transform 0.2s ease'
            },
            pixelart: {
                slideIn: 'pixelSlideIn 0.5s steps(10)',
                messageIn: 'pixelMessageIn 0.4s steps(8)',
                hover: 'pixelHover 0.1s steps(2)'
            },
            modern: {
                slideIn: 'modernSlideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                messageIn: 'modernMessageIn 0.15s ease-out',
                hover: 'modernHover 0.1s ease'
            }
        };

        return animations[themeName] || animations.default;
    }
}

// Globale Konfiguration
const chatUIConfig = new ChatUIConfig();

// Hilfsfunktionen
function getChatUIConfig(themeName = 'default') {
    return chatUIConfig.getThemeConfig(themeName);
}

function createCustomChatUI(config = {}) {
    // Prüfe ob CustomChatUI verfügbar ist
    if (typeof CustomChatUI !== 'undefined') {
        return new CustomChatUI(config);
    }

    // Fallback zu EnhancedAIChatbot
    if (typeof EnhancedAIChatbot !== 'undefined') {
        return new EnhancedAIChatbot(config);
    }

    console.error('Keine Chat-UI-Klasse verfügbar');
    return null;
}

function switchChatTheme(themeName) {
    const config = chatUIConfig.setCurrentTheme(themeName);
    if (config && window.activeChatUI) {
        window.activeChatUI.updateConfig(config);
    }
    return config;
}

// Export für Modulverwendung
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ChatUIConfig,
        chatUIConfig,
        getChatUIConfig,
        createCustomChatUI,
        switchChatTheme
    };
}