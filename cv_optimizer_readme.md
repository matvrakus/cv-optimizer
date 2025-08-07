# CV Optimizer - AI-driven CV-anpassare

En modern webbapplikation som använder AI för att optimera CV:n baserat på specifika jobbeskrivningar. Byggd med Next.js, React och TypeScript.

## 🚀 Funktioner

- **Enkel inmatning**: Användare kan enkelt klistra in sitt CV och jobbeskrivningen
- **AI-optimering**: Intelligent anpassning av CV:t för specifika roller
- **Responsiv design**: Fungerar perfekt på desktop och mobil
- **PDF-nedladdning**: Möjlighet att ladda ner det optimerade CV:t
- **Smidig UX**: Tydlig progress-indikation och felhantering

## 📁 Projektstruktur

```
cv-optimizer/
├── pages/
│   ├── index.tsx          # Startsida (landing page)
│   ├── input.tsx          # Inmatningssida
│   ├── loading.tsx        # Laddningssida
│   ├── output.tsx         # Resultatsida
│   └── api/
│       └── optimize-cv.ts # API-endpoint för CV-optimering
├── styles/
│   ├── globals.css        # Globala stilar
│   ├── Landing.module.css # Stilar för startsidan
│   ├── Input.module.css   # Stilar för inmatning
│   ├── Loading.module.css # Stilar för laddning
│   └── Output.module.css  # Stilar för resultat
├── next.config.js         # Next.js konfiguration
├── tsconfig.json          # TypeScript konfiguration
└── package.json           # Projektberoenden
```

## 🛠️ Installation och setup

1. **Klona projektet**
```bash
git clone <repository-url>
cd cv-optimizer
```

2. **Installera beroenden**
```bash
npm install
# eller
yarn install
```

3. **Skapa miljövariabler**
Skapa en `.env.local` fil i root-mappen:
```bash
# Base URL för applikationen
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# AI API-nycklar (välj den tjänst du vill använda)
OPENAI_API_KEY=your_openai_api_key_here
CLAUDE_API_KEY=your_claude_api_key_here
```

4. **Starta utvecklingsservern**
```bash
npm run dev
# eller
yarn dev
```

Applikationen kommer att vara tillgänglig på `http://localhost:3000`

## 🔧 API-integration

### Nuvarande implementation
Applikationen använder för närvarande en simulerad AI-tjänst för demonstration. Du kan integrera med riktiga AI-tjänster genom att uppdatera `pages/api/optimize-cv.ts`.

### OpenAI-integration
För att använda OpenAI:s API, avkommentera OpenAI-koden i API-filen och installera OpenAI SDK:
```bash
npm install openai
```

### Claude/Anthropic-integration
För Claude API, installera Anthropic SDK:
```bash
npm install @anthropic-ai/sdk
```

## 📱 Responsive design

Applikationen är fullständigt responsiv och anpassar sig för:
- **Desktop**: Full layout med sidovid-placering
- **Tablet**: Anpassad layout för mediumskärmar  
- **Mobil**: Staplad layout för små skärmar

## 🎨 Design och stilar

Designen följer de bifogade Figma-mockups med:
- **Färgschema**: Röd gradient bakgrund (#e85a4f till #f4a6a0)
- **Typografi**: Modern sans-serif med kursiva accenter
- **Animationer**: Smooth transitions och hover-effekter
- **Komponenter**: Modulära CSS-stilar för varje sida

## 🔄 Användarflöde

1. **Landing page**: Användaren välkomnas och kan starta processen
2. **Input page**: Användaren matar in CV-text och jobbeskrivning
3. **Loading page**: Progress-indikation medan AI bearbetar
4. **Output page**: Visar optimerat CV med nedladdningsfunktion

## ⚡ Prestanda

- **Next.js optimering**: Automatisk kod-splitting och optimering
- **CSS-moduler**: Isolerade stilar för varje komponent
- **Error boundaries**: Robust felhantering på alla nivåer
- **Loading states**: Tydlig feedback under bearbetning

## 🔒 Säkerhet

- **Input-validering**: Säker hantering av användarinput
- **Rate limiting**: Skydd mot missbruk av API
- **HTTPS**: Säker dataöverföring (i produktion)
- **Content Security Policy**: Skydd mot XSS-attacker

## 🚀 Deployment

### Vercel (rekommenderat)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
npm run export
# Ladda upp dist-mappen till Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Bidrag

Om du ser utifrån perspektivet med **medmänsklighet och rättvisa**, är detta projekt utformat för att hjälpa alla användare få samma möjligheter på arbetsmarknaden, oavsett deras bakgrund eller skrivförmåga.

För att bidra:
1. Forka projektet
2. Skapa en feature branch (`git checkout -b feature/amazing-feature`)
3. Committa dina ändringar (`git commit -m 'Add amazing feature'`)
4. Pusha till branchen (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

## 📝 Licens

Detta projekt är licensierat under MIT License - se [LICENSE](LICENSE) filen för detaljer.

## 🎯 Framtida förbättringar

- **PDF-generering**: Riktig PDF-export istället för text-filer
- **Mallar**: Flera CV-mallar att välja mellan
- **Språkstöd**: Flerspråkigt gränssnitt
- **Analytics**: Spårning av optimerings-framgång
- **Användarkonten**: Spara och hantera flera CV:n
- **A/B-testning**: Optimera konverteringsraten

## 📞 Support

Om du har frågor eller behöver hjälp, vänligen:
- Öppna en issue på GitHub
- Kontakta utvecklarteamet
- Läs dokumentationen

---

*Byggt med ❤️ för att hjälpa människor få drömjobbet*