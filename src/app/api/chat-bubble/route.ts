import { NextResponse } from 'next/server';
import { ChatGroq } from "@langchain/groq";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { partners, translations } from '@/lib/types';

// Type definitions
type Language = 'fr' | 'en';

interface RequestBody {
  message: string;
  language: Language;
  isInitialMessage?: boolean;
}

interface ChatResponse {
  message: string;
  hasEnoughContext: boolean;
  suggestedQuestions: string[];
  confidence: number;
  searchResults?: any;
  success: boolean;
}

// Initialize the chat model and search tool
const chatModel = new ChatGroq({
  modelName: "llama-3.2-90b-vision-preview",
  temperature: 0.7,
});

const searchTool = new TavilySearchResults({
  apiKey: process.env.TAVILY_API_KEY!,
});

// Create context from our data
const createContext = (lang: Language): string => {
  const t = translations[lang];
  
  const partnersContext = Object.entries(partners)
    .map(([key, partner]) => `
      Partner: ${partner.name[lang]}
      Description: ${partner.description[lang]}
      Website: ${partner.website || 'N/A'}
    `).join('\n');

  return `
    Organization: ${t.title}
    Mission: ${t.subtitle}
    Description: ${t.description}

    Partners Information:
    ${partnersContext}
  `;
};

const getSystemPrompt = (lang: Language, isInitialMessage: boolean = false): string => {
  if (lang === 'fr') {
    return `Tu es l'assistant virtuel d'Ingénieur-e Au Féminin (IAF).
    ${isInitialMessage 
      ? "Commence par un message d'accueil chaleureux et professionnel. Propose ensuite des questions pertinentes pour démarrer la conversation." 
      : "Analyse la question et fournis une réponse utile et pertinente."}
    
    Retourne TOUJOURS une réponse au format JSON strict avec:
    {
      "message": string (${isInitialMessage ? "message d'accueil" : "ta réponse"}),
      "hasEnoughContext": boolean (indique si tu as assez d'informations pour répondre de façon précise),
      "suggestedQuestions": array (3 questions pertinentes ${isInitialMessage ? "pour démarrer la conversation" : "de suivi"}),
      "confidence": number (niveau de confiance de 0 à 1)
    }

    Contexte sur l'organisation:
    ${createContext('fr')}`;
  }

  return `You are the virtual assistant for Engineer in Feminine (IAF).
  ${isInitialMessage 
    ? "Start with a warm and professional welcome message. Then suggest relevant questions to start the conversation." 
    : "Analyze the question and provide a helpful and relevant response."}
  
  ALWAYS return a strict JSON response with:
  {
    "message": string (${isInitialMessage ? "welcome message" : "your response"}),
    "hasEnoughContext": boolean (indicates if you have enough information to provide an accurate response),
    "suggestedQuestions": array (3 relevant ${isInitialMessage ? "conversation starter" : "follow-up"} questions that user might enter),
    "confidence": number (confidence level from 0 to 1)
  }

  Organization context:
  ${createContext('en')}`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json() as RequestBody;
    const { message, language = 'fr', isInitialMessage = false } = body;

    // Search for relevant information
    const searchResults = await searchTool.invoke(
      `Ingénieur-e Au Féminin ${message}`
    );

    // Create messages array with system prompt and search results
    const messages = [
      new SystemMessage(getSystemPrompt(language, isInitialMessage)),
      new SystemMessage(`Additional context from search: ${JSON.stringify(searchResults)}`),
      new HumanMessage(message)
    ];

    // Get response from chat model
    const result = await chatModel.invoke(messages);
    
    // Parse the response as JSON
    let parsedResponse: ChatResponse;
    try {
      parsedResponse = JSON.parse(result.content as any);
    } catch (parseError) {
      console.error('Failed to parse LLM response:', parseError);
      throw new Error('Invalid response format from LLM');
    }

    // Validate response structure
    if (!parsedResponse.message || !Array.isArray(parsedResponse.suggestedQuestions)) {
      throw new Error('Invalid response structure from LLM');
    }

    // Ensure suggested questions is exactly 3 items
    parsedResponse.suggestedQuestions = parsedResponse.suggestedQuestions.slice(0, 3);
    while (parsedResponse.suggestedQuestions.length < 3) {
      parsedResponse.suggestedQuestions.push(
        language === 'fr' 
          ? "Avez-vous d'autres questions ?" 
          : "Do you have any other questions?"
      );
    }

    return NextResponse.json({
      ...parsedResponse,
      success: true,
      searchResults
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    const errorResponse: ChatResponse = {
        //@ts-ignore
      message: language === 'fr' 
        ? "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer." 
        : "Sorry, I couldn't process your request. Please try again.",
      hasEnoughContext: false,
      suggestedQuestions: [
        //@ts-ignore
        language === 'fr' ? "Pouvez-vous reformuler votre question ?" : "Can you rephrase your question?",
        //@ts-ignore
        language === 'fr' ? "Que souhaitez-vous savoir sur IAF ?" : "What would you like to know about IAF?",
        //@ts-ignore
        language === 'fr' ? "Puis-je vous aider autrement ?" : "Can I help you with something else?"
      ],
      confidence: 0,
      success: false
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}