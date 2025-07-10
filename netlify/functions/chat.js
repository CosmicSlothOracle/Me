const { OpenAI } = require('openai');

// Initialisiere OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System-Prompt für AI-Portfolio-Assistance
const SYSTEM_PROMPT = `Du bist ein technischer Assistent für eine AI-Portfolio-Webseite.
Beantworte präzise Fragen zu den Workflows 'Pixel Art Transformation' und 'AI Spritesheet Extraction'.
Du hilfst Besuchern dabei, die verschiedenen ComfyUI-Workflows und AI-Technologien zu verstehen.
Sei professionell, hilfsbereit und technisch versiert. Antworte auf Deutsch.`;

exports.handler = async (event, context) => {
  // CORS Headers für Frontend-Zugriff
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    // Parse Request Body
    const { message } = JSON.parse(event.body);

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

    // OpenAI API Anfrage
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message.trim() }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Erfolgreiche Antwort
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: completion.choices[0].message.content
      }),
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Spezifische Error-Behandlung
    if (error.code === 'insufficient_quota') {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'API quota exceeded' }),
      };
    }

    if (error.code === 'invalid_api_key') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid API key' }),
      };
    }

    // Generischer Server Error
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};