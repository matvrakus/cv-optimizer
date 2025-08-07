// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Aktivera statisk optimering för bättre prestanda
  experimental: {
    optimizeCss: true,
  },
  // Lägg till säkerhetsheaders
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

// .env.local (exempel)
/*
# Base URL för applikationen
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# OpenAI API Key (om du använder OpenAI för AI-optimering)
OPENAI_API_KEY=your_openai_api_key_here

# Claude API Key (om du använder Anthropic Claude)  
CLAUDE_API_KEY=your_claude_api_key_here

# Andra AI-tjänster
HUGGINGFACE_API_KEY=your_huggingface_key
*/
