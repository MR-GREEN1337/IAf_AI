import { NextResponse } from 'next/server';
import { ChatGroq } from "@langchain/groq";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { partners, translations } from '@/lib/types';

// Initialize the chat model and search tool
const chatModel = new ChatGroq({
  modelName: "llama-3.2-90b-vision-preview",
  temperature: 0.7,
});

const searchTool = new TavilySearchResults({
  apiKey: process.env.TAVILY_API_KEY!,
});

// Create context from our data
const createContext = (language: 'fr' | 'en') => {
  const t = translations[language];
  
  const partnersContext = Object.entries(partners)
    .map(([key, partner]) => `
      Partner: ${partner.name[language]}
      Description: ${partner.description[language]}
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

const getSystemPrompt = (language: 'fr' | 'en') => {
  return language === 'fr' ? 
    `Tu es l'assistant virtuel d'Ingénieur-e Au Féminin (IAF). 
    Réponds toujours en français de manière professionnelle et amicale.
    Utilise ces informations contextuelles pour répondre aux questions :
    
    ${createContext('fr')}
    
    Si tu ne connais pas la réponse, dis-le poliment et suggère de contacter directement IAF.` 
    :
    `You are the virtual assistant for Engineer in Feminine (IAF).
    Always respond in English in a professional and friendly manner.
    Use this contextual information to answer questions:
    
    ${createContext('en')}
    
    If you don't know the answer, politely say so and suggest contacting IAF directly.`;
};

export async function POST(req: Request) {
  try {
    const { message, language = 'fr' } = await req.json();

    // Search for relevant information
    const searchResults = await searchTool.invoke(
      `Ingénieur-e Au Féminin ${message}`
    );

    console.log(searchResults);

    // Create messages array with system prompt and search results
    const messages = [
      new SystemMessage(getSystemPrompt(language)),
      new SystemMessage(`Additional relevant information from search: ${JSON.stringify(searchResults)}`),
      new HumanMessage(message)
    ];

    // Get response from chat model
    const response = await chatModel.invoke(messages);

    return NextResponse.json({
      message: response.content,
      success: true
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        success: false
      },
      { status: 500 }
    );
  }
}