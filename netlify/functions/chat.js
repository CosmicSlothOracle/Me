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

    const { message } = requestData;

    // Validierung
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Rate Limiting (einfache Implementierung)
    if (message.length > 1000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too long (max 1000 characters)' }),
      };
    }

    console.log('Processing message:', message.substring(0, 50) + '...');

    // OpenAI API Anfrage
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message.trim() }
      ],
      max_tokens: 500,
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