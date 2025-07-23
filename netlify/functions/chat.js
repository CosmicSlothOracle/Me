// Groq Client für Netlify Functions - Schneller und kostengünstiger als OpenAI
// Kompatibel mit Serverless Environment
const { Groq } = require('groq-sdk');

exports.handler = async (event, context) => {
  // CORS Headers für Frontend-Zugriff
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Nur POST-Requests erlauben
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // API Key prüfen
    if (!process.env.GROQ_API_KEY) {
      console.error('Groq API Key not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // Groq Client initialisieren
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // System-Prompt für AI-Portfolio-Assistance
    const SYSTEM_PROMPT = `Du bist ein technischer Assistent für eine AI-Portfolio-Webseite.
Beantworte präzise Fragen zu den Workflows 'Pixel Art Transformation' und 'AI Spritesheet Extraction'.
Du hilfst Besuchern dabei, die verschiedenen ComfyUI-Workflows und AI-Technologien zu verstehen.
Sei professionell, hilfsbereit und technisch versiert. Antworte auf Deutsch.`;

    // Parse Request Body
    let requestData;
    try {
      requestData = JSON.parse(event.body);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    // Unterstütze sowohl altes Format (message) als auch neues Format (messages)
    let messages = [];

    if (requestData.messages && Array.isArray(requestData.messages)) {
      // Neues Format: Konversationshistorie als Array
      messages = requestData.messages;

      // Validiere das Format der Nachrichten
      const isValid = messages.every(msg =>
        msg && typeof msg === 'object' &&
        (msg.role === 'user' || msg.role === 'assistant') &&
        typeof msg.content === 'string'
      );

      if (!isValid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid message format in conversation history' }),
        };
      }
    } else if (requestData.message && typeof requestData.message === 'string') {
      // Altes Format: Einzelne Nachricht
      messages = [{ role: 'user', content: requestData.message.trim() }];
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message or messages array is required' }),
      };
    }

    // Prüfe ob mindestens eine Nachricht vorhanden ist
    if (messages.length === 0 || messages[messages.length - 1].content.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Empty message content' }),
      };
    }

    // Rate Limiting (einfache Implementierung)
    const lastMessage = messages[messages.length - 1].content;
    if (lastMessage.length > 1000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too long (max 1000 characters)' }),
      };
    }

    console.log('Processing conversation with', messages.length, 'messages');

    // System-Prompt als erste Nachricht hinzufügen
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    // Groq API Anfrage - Sehr schnell mit llama3-8b-8192
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: apiMessages,
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    console.log('Groq response received, length:', reply.length);

    // Erfolgreiche Antwort
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: reply
      }),
    };

  } catch (error) {
    console.error('Function Error Details:', {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack
    });

    // Spezifische Fehlerbehandlung für Groq API
    if (error.status === 429) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: 60
        }),
      };
    }

    if (error.status === 401) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'API authentication failed'
        }),
      };
    }

    if (error.status >= 400 && error.status < 500) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid request to AI service'
        }),
      };
    }

    // Allgemeine Server-Fehler
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error. Please try again later.'
      }),
    };
  }
};