// OpenAI Client für Netlify Functions
// Kompatibel mit Serverless Environment
const { OpenAI } = require('openai');

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
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API Key not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // OpenAI Client initialisieren
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
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

    // OpenAI API Anfrage - Kostenoptimiert mit gpt-3.5-turbo
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: apiMessages,
      max_tokens: 300, // Reduziert für Kosteneinsparung
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    console.log('OpenAI response received, length:', reply.length);

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

    // Spezifische Error-Behandlung für OpenAI
    if (error.code === 'insufficient_quota') {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'API quota exceeded. Please try again later.' }),
      };
    }

    if (error.code === 'invalid_api_key') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid API configuration' }),
      };
    }

    if (error.code === 'model_not_found') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'AI model not available' }),
      };
    }

    // Rate limiting von OpenAI
    if (error.code === 'rate_limit_exceeded') {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
      };
    }

    // Network oder andere API Fehler
    if (error.message && error.message.includes('fetch')) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ error: 'Service temporarily unavailable' }),
      };
    }

    // Generischer Server Error (keine sensiblen Daten nach außen)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      }),
    };
  }
};