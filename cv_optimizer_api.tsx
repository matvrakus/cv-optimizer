// pages/api/optimize-cv.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface OptimizeCVRequest {
  cvText: string;
  jobDescription: string;
}

interface OptimizeCVResponse {
  redirect_url?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OptimizeCVResponse>
) {
  // Endast POST-requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cvText, jobDescription }: OptimizeCVRequest = req.body;

    // Validering
    if (!cvText || !cvText.trim()) {
      return res.status(400).json({ error: 'CV text is required' });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Simulera AI-bearbetning (i verkliga applikationen skulle detta vara ett anrop till OpenAI/Claude API)
    const optimizedCV = await optimizeCV(cvText.trim(), jobDescription.trim());

    // Koda resultatet för URL
    const encodedResult = encodeURIComponent(optimizedCV);
    
    // Skapa redirect URL med resultat
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/output?result=${encodedResult}`;

    // Returnera redirect URL
    return res.status(200).json({
      redirect_url: redirectUrl
    });

  } catch (error) {
    console.error('Error optimizing CV:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

/**
 * Simulerad AI-optimering av CV
 * I en riktig applikation skulle detta vara ett API-anrop till OpenAI, Claude eller liknande
 */
async function optimizeCV(cvText: string, jobDescription: string): Promise<string> {
  // Simulera bearbetningstid
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Skapa ett optimerat CV baserat på input
  const optimizedCV = `OPTIMERAT CV
${'='.repeat(50)}

ORIGINAL CV:
${cvText}

${'='.repeat(50)}

JOBBBESKRIVNING SOM ANPASSNINGEN BASERAS PÅ:
${jobDescription}

${'='.repeat(50)}

AI-OPTIMERINGAR GJORDA:
• Anpassade nyckelord för att matcha jobbeskrivningen
• Förstärkte relevanta färdigheter och erfarenheter  
• Omstrukturerade meningar för bättre läsbarhet
• Lade till branschspecifika termer
• Optimerade för ATS-system (Applicant Tracking Systems)

${'='.repeat(50)}

REKOMMENDATIONER:
• Använd detta optimerade CV för liknande roller inom samma bransch
• Anpassa ytterligare för specifika företag om möjligt  
• Komplettera med ett skräddarsytt personligt brev
• Granska och justera efter dina personliga preferenser

Skapad av Jobhelp AI • ${new Date().toLocaleDateString('sv-SE')}`;

  return optimizedCV;
}

// Alternativ implementation för externa AI-tjänster:
/**
 * Exempel på hur man skulle integrera med OpenAI API
 */
/*
async function optimizeWithOpenAI(cvText: string, jobDescription: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Du är en expert på CV-optimering. Analysera det givna CV:t och jobbeskrivningen, och skapa ett optimerat CV som matchar jobbet bättre."
      },
      {
        role: "user",
        content: `CV att optimera:\n${cvText}\n\nJobbeskrivning:\n${jobDescription}\n\nSkapa ett optimerat CV som passar denna specifika roll.`
      }
    ],
    max_tokens: 2000,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content || 'Error: Could not generate optimized CV';
}
*/