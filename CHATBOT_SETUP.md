# AI Chatbot Setup Guide

## Environment Configuration

Create a `.env` file in your project root with the following variable:

```
OPENAI_API_KEY=sk-proj-YOUR_OPENAI_API_KEY_HERE
```

### Getting your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key and paste it in your `.env` file

## Netlify Environment Variables

In your Netlify dashboard, add the environment variable:

1. Go to Site Settings > Environment Variables
2. Add `OPENAI_API_KEY` with your API key value
3. Deploy your site

## Testing Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

## Troubleshooting

### Common Issues

1. **500 Error from chatbot**: Check if OPENAI_API_KEY is set correctly
2. **CORS Errors**: Ensure you're using the Netlify dev server locally
3. **Module Import Errors**: Run `npm install` to ensure dependencies are installed

### Error Messages

- `Server configuration error`: Missing OPENAI_API_KEY
- `Invalid API configuration`: Wrong API key format
- `API quota exceeded`: OpenAI usage limits reached

## Dependencies

- `openai`: ^4.62.1 - OpenAI API client
- `@netlify/functions`: ^2.8.1 - Netlify Functions runtime
- `netlify-cli`: ^17.34.2 - Development tools
