import { GoogleGenAI } from "@google/genai";
import { SCHEMES, Scheme } from "../data/schemes";

const GENAI_API_KEY = process.env.GEMINI_API_KEY!;

const ai = new GoogleGenAI({ apiKey: GENAI_API_KEY });

const SYSTEM_PROMPT_BASE = `
You are a highly intelligent and empathetic Multilingual Civic Assistant for the Indian government's social welfare schemes.
Your goal is to help citizens discover schemes they are eligible for, understand complex policy details, and provide guidance on how to apply.

CORE KNOWLEDGE:
You have access to a database of Indian schemes including Central and State-specific ones (Karnataka, Tamil Nadu, Haryana, etc.).
I will provide a RELEVANT SUBSET of the database based on the user's query.

STRICT RAG GUIDELINES:
1. NEVER hallucinate eligibility criteria. Use the data provided.
2. If the user's profile (income, age, state, gender) clearly disqualifies them, state it truthfully but kindly, and suggest alternatives.
3. Use the provided language context.
4. Support the full spectrum of Indian diversity: farmers, students, senior citizens, women, differently-abled, etc.

INTERACTION STYLE:
- Professional yet warm.
- Keep responses concise as they may be read aloud.
- Use bullet points for benefits and application steps.
- CRITICAL: When discussing a specific scheme, always include the official portal link from the 'portal_url' field in markdown format (e.g., [Apply for PM-Kisan here](https://pmkisan.gov.in/)).
- If the query is about eligibility, ask for missing details like "What is your annual household income?" or "Which state do you reside in?".
`;

function getRelevantSchemes(query: string): Scheme[] {
  const normalizedQuery = query.toLowerCase();
  
  // Simple scoring based on matches
  const scored = SCHEMES.map(scheme => {
    let score = 0;
    const searchStr = `${scheme.name} ${scheme.category} ${scheme.state} ${scheme.tags.join(' ')} ${scheme.description}`.toLowerCase();
    
    // Exact word matches
    const keywords = normalizedQuery.split(/\s+/);
    keywords.forEach(kw => {
      if (kw.length > 2 && searchStr.includes(kw)) score += 1;
    });
    
    // Prioritize name matches
    if (scheme.name.toLowerCase().includes(normalizedQuery)) score += 5;
    
    return { scheme, score };
  });

  // Sort by score and take top 10
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(s => s.scheme);
}

export async function getChatResponse(
  messages: { role: 'user' | 'model', content: string }[], 
  currentLanguage: string,
  onChunk?: (chunk: string) => void
) {
  try {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || "";
    
    const relevantSchemes = getRelevantSchemes(lastUserMessage);
    
    const schemesContext = relevantSchemes.length > 0 
      ? `\n\nRELEVANT SCHEME DATABASE SUBSET:\n${JSON.stringify(relevantSchemes, null, 2)}`
      : `\n\nNote: No specific schemes matched your recent search. Ask for more details if needed.`;

    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT_BASE + schemesContext + `\n\nCRITICAL: You MUST respond in the current language selected by the user: ${currentLanguage}. If the language is Hindi, your entire response must be in Hindi. If it is Tamil, respond in Tamil, and so on.`
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        if (onChunk) onChunk(chunkText);
      }
    }

    return fullText || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The copilot is experiencing some technical difficulties. Please try again soon.";
  }
}

export async function translateText(text: string, targetLang: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}. Only return the translated text.\n\nText: ${text}`,
    });
    return response.text || text;
  } catch (error) {
    return text;
  }
}
