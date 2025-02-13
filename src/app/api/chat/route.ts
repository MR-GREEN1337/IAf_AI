import { NextResponse } from 'next/server';
import { ChatGroq } from "@langchain/groq";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { partners, translations } from '@/lib/types';

// Core type definitions
export type Language = 'fr' | 'en';
export type LinkType = 'website' | 'linkedin' | 'twitter' | 'other';

export interface LinkData {
  url: string;
  type: LinkType;
  title: string;
}

export interface LocalizedField {
  fr: string;
  en: string;
}

export interface BaseEntity {
  name: LocalizedField;
  description: LocalizedField;
  imageUrl?: string;
  links: LinkData[];
}

export interface PartnerEntity extends BaseEntity {
  type: 'partner';
  expertise?: string[];
  website?: string;
  industry?: string[];
  collaborations?: {
    events?: Array<LocalizedField>;
    initiatives?: Array<LocalizedField>;
  };
}

export interface TeamMemberEntity extends BaseEntity {
  type: 'member';
  role: LocalizedField;
  task?: string;
  year?: string;
  expertise?: string[];
}

export interface EventEntity {
  date: string;
  title: LocalizedField;
  description: LocalizedField;
}

export interface AssociationInfo {
  name: LocalizedField;
  mission: LocalizedField;
  events: EventEntity[];
  teamMembers: any;
}

export type EntityData = PartnerEntity | TeamMemberEntity;

export interface RichResponseData {
  message: string;
  hasEnoughContext: boolean;
  suggestedQuestions: string[];
  confidence: number;
  relatedPartners: PartnerEntity[];
  relatedMembers: TeamMemberEntity[];
  relevantLinks: LinkData[];
  events?: EventEntity[];
  searchResults?: unknown;
}

export interface ChatResponse extends RichResponseData {
  success: boolean;
}

export interface RequestBody {
  message: string;
  language: Language;
  isInitialMessage?: boolean;
}

// Association data
const associationInfo: AssociationInfo = {
  name: {
    fr: "Ingénieure au Féminin - Polytech Annecy-Chambéry",
    en: "Engineer in Feminine - Polytech Annecy-Chambery"
  },
  mission: {
    fr: "Promotion des métiers d'ingénieurs auprès de lycéennes, collégiennes et élèves de primaire.",
    en: "Promoting engineering careers to high school, middle school and primary school students."
  },
  events: [
    {
      date: "15/02",
      title: {
        fr: "Évènement à Chambéry",
        en: "Event in Chambery"
      },
      description: {
        fr: "Organisation d'un évènement sur le site de Chambéry.",
        en: "Organization of an event at the Chambery site."
      }
    },
    {
      date: "N/A",
      title: {
        fr: "Visite de l'école par des lycéen·ne·s",
        en: "School visit by high school students"
      },
      description: {
        fr: "Visite de l'école par 60 lycéen·ne·s des lycées Louis Armand à Chambéry et de l'Albanais à Rumilly. Des étudiantes, 3 enseignantes et un enseignant ont présenté les équipements utilisés pour les enseignements et la recherche.",
        en: "School visit by 60 high school students from Louis Armand High School in Chambery and Albanais High School in Rumilly. Students, three female teachers and one male teacher presented the equipment used for teaching and research."
      }
    },
    {
      date: "N/A",
      title: {
        fr: "Table ronde sur les métiers d'ingénieur·e",
        en: "Round table on engineering careers"
      },
      description: {
        fr: "Organisation d'une table ronde sur le regard des femmes sur les métiers d'ingénieur·e dans la construction et l'industrie, avec la participation de 4 ingénieures d'entreprises et 2 étudiantes. 80 participant·e·s dont 60 lycéen·ne·s.",
        en: "Organization of a round table on women's perspective on engineering careers in construction and industry, with the participation of 4 corporate engineers and 2 students. 80 participants including 60 high school students."
      }
    },
    {
      date: "Avril",
      title: {
        fr: "Visite de lycéen·ne·s sur le site d'Annecy",
        en: "High school students visit to Annecy site"
      },
      description: {
        fr: "Des lycéen·ne·s ont visité le site de Polytech Annecy pour découvrir le monde de l'ingénierie.",
        en: "High school students visited the Polytech Annecy site to discover the world of engineering."
      }
    },
    {
      date: "01/02",
      title: {
        fr: "Création d'une fresque interactive",
        en: "Creation of an interactive mural"
      },
      description: {
        fr: "Participation à la création d'une fresque interactive sur le métier d'ingénieur·e avec Caroline Ligot du lycée Berthollet pour l'évènement FIRST, avec la participation de 130 lycéennes de seconde.",
        en: "Participation in creating an interactive mural about engineering careers with Caroline Ligot from Berthollet High School for the FIRST event, with the participation of 130 sophomore high school girls."
      }
    },
    {
      date: "01/12/2023",
      title: {
        fr: "Présentation aux lycéennes sur les métiers scientifiques",
        en: "Presentation to high school girls about scientific careers"
      },
      description: {
        fr: "Présentation du parcours de deux étudiant·e·s à l'évènement « Les métiers scientifiques et industriels, c'est aussi pour les filles » auprès de 200 lycéennes de seconde au lycée Charles Poncet de Cluses.",
        en: "Presentation of two students' career paths at the event 'Scientific and Industrial Careers are also for Girls' to 200 sophomore high school girls at Charles Poncet High School in Cluses."
      }
    },
    {
      date: "07/12/2023",
      title: {
        fr: "Visite de collèges pour l'orientation",
        en: "College visits for orientation"
      },
      description: {
        fr: "Intervention dans 2 collèges (Les Barattes à Annecy et Collège Jean Jacques Perret) pour l'édition 2023 de « Elles Bougent pour l'orientation ».",
        en: "Intervention in 2 middle schools (Les Barattes in Annecy and Collège Jean Jacques Perret) for the 2023 edition of 'Elles Bougent pour l'orientation'."
      }
    },
    {
      date: "N/A",
      title: {
        fr: "Visite de lycées et collèges par initiative étudiante",
        en: "Student-initiated visits to high schools and colleges"
      },
      description: {
        fr: "Visite de 2 lycées (Jean Moulin à Albertville et Lachenal à Argonay) et 1 collège (Louis Armand Cruseilles) sur initiative des étudiant·e·s et enseignants.",
        en: "Visit to 2 high schools (Jean Moulin in Albertville and Lachenal in Argonay) and 1 middle school (Louis Armand Cruseilles) on student and teacher initiative."
      }
    },
    {
      date: "N/A",
      title: {
        fr: "Création d'une présence en ligne",
        en: "Creation of online presence"
      },
      description: {
        fr: "Réalisation d'une page LinkedIn et Instagram pour partager les actualités et sensibiliser à l'égalité femme-homme.",
        en: "Creation of LinkedIn and Instagram pages to share news and raise awareness about gender equality."
      }
    },
    {
      date: "03/02",
      title: {
        fr: "Journée portes ouvertes",
        en: "Open house day"
      },
      description: {
        fr: "Tenue d'un stand par l'association lors des journées portes ouvertes de l'école pour promouvoir les métiers d'ingénieur·e auprès des filles.",
        en: "Association booth at the school's open house days to promote engineering careers to girls."
      }
    }
  ],
  teamMembers: {
    "Bureau Restreint": [
      {
        name: "RECHON-REGUET Emma",
        role: {
          fr: "Présidente",
          en: "President"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/emma-rechon-reguet-27964120a/"
      },
      {
        name: "FABRE Julie",
        role: {
          fr: "Vice-Présidente",
          en: "Vice-President"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/julie-fabre3/"
      },
      {
        name: "BELLEVILLE Alyssa",
        role: {
          fr: "Secrétaire",
          en: "Secretary"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/alyssa-belleville"
      },
      {
        name: "CAMAS Louna",
        role: {
          fr: "Trésorière",
          en: "Treasurer"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/louna-camas-2aa2452b0/"
      }
    ],
    "Bureau Élargi": [
      {
        name: "DA SILVA Carla Marie",
        role: {
          fr: "Pôle Conférences",
          en: "Conferences Division"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/carla-marie-dasilva/"
      },
      {
        name: "LOMPRET-BRYCH Juliette",
        role: {
          fr: "Pôle Conférences",
          en: "Conferences Division"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/juliette-lompret-brych"
      },
      {
        name: "GUITTON Cyprien",
        role: {
          fr: "Pôle Communication",
          en: "Communication Division"
        },
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/cyprien-guitton/"
      }
    ],
    "Membres Actifs": [
      {
        name: "BILLET Alise",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "DESPEYROUX Louna",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "RUBOLINI Justine",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "JOLY Maxime",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "RAULIN Marie",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "CORNET Sophie",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "FELIX Elsa",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "TIRARD Marine",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      },
      {
        name: "DESSAGNE Salome",
        role: {
          fr: "Membre Actif",
          en: "Active Member"
        },
        year: "2023-2024"
      }
    ],
    "Alumni": [
      {
        name: "CABATON Estelle",
        role: {
          fr: "Coordinateur",
          en: "Coordinator"
        },
        year: "2021-2022"
      },
      {
        name: "SALOMON Clemence",
        role: {
          fr: "Resp Conférences",
          en: "Conferences Manager"
        },
        year: "2020-2021"
      },
      {
        name: "PELLOUX Camille",
        role: {
          fr: "Coordinateur",
          en: "Coordinator"
        },
        year: "2020-2021"
      },
      {
        name: "DUTHOIT Alix",
        role: {
          fr: "Coordinateur",
          en: "Coordinator"
        },
        year: "2019-2020"
      }
    ]
  }
};

// Type guards and utility functions
function isValidLanguage(lang: unknown): lang is Language {
  return typeof lang === 'string' && ['fr', 'en'].includes(lang);
}

function isValidRequestBody(body: unknown): body is RequestBody {
  if (!body || typeof body !== 'object') return false;
  const { message, language, isInitialMessage } = body as RequestBody;
  return (
    typeof message === 'string' &&
    isValidLanguage(language) &&
    (isInitialMessage === undefined || typeof isInitialMessage === 'boolean')
  );
}

// Initialize services
const chatModel = new ChatGroq({
  modelName: "llama-3.2-90b-vision-preview",
  temperature: 0.7,
});

const searchTool = new TavilySearchResults({
  apiKey: process.env.TAVILY_API_KEY!,
});

// Enhanced context creation
function createEnhancedContext(lang: Language): string {
  const t = translations[lang];
  
  const partnersContext = Object.entries(partners)
    .map(([_, partner]) => {
      const events = partner.collaborations?.events?.map(event => event[lang]).join(', ') || '';
      const initiatives = partner.collaborations?.initiatives?.map(init => init[lang]).join(', ') || '';
      
      return `
        Partner: ${partner.name[lang]}
        Description: ${partner.description[lang]}
        Website: ${partner.website || 'N/A'}
        Expertise: ${partner.expertise?.join(', ') || 'N/A'}
        Industry: ${partner.industry?.join(', ') || 'N/A'}
        Events: ${events}
        Initiatives: ${initiatives}
      `;
    }).join('\n');

  const teamContext = Object.entries(associationInfo.teamMembers)
    .flatMap(([_, members]) => members)
    .map(member => `
      Member: ${member.name}
      Role: ${member.role[lang]}
      LinkedIn: ${member.linkedin || 'N/A'}
    `).join('\n');

  const eventsContext = associationInfo.events
    .map(event => `
      Event: ${event.title[lang]}
      Date: ${event.date}
      Description: ${event.description[lang]}
    `).join('\n');

  return `
    Organization: ${associationInfo.name[lang]}
    Mission: ${associationInfo.mission[lang]}
    Description: ${t.description}

    Partners Information:
    ${partnersContext}

    Team Information:
    ${teamContext}

    Events Information:
    ${eventsContext}
  `;
}

// Enhanced system prompt
function getEnhancedSystemPrompt(lang: Language, isInitialMessage: boolean = false): string {
  const basePrompt = lang === 'fr' 
    ? `Tu es l'assistant virtuel d'Ingénieur-e Au Féminin (IAF).`
    : `You are the virtual assistant for Engineer in Feminine (IAF).`;

  const responseFormat = `
  ALWAYS return a strict JSON response with:
  {
    "message": string (the response message),
    "hasEnoughContext": boolean (indicates if you have enough information),
    "suggestedQuestions": array (3 relevant questions) what might user enter as follow-up questions,
    "confidence": number (0 to 1),
    "relatedPartners": array (relevant partner entities),
    "relatedMembers": array (relevant member entities),
    "relevantLinks": array (relevant links),
    "events": array (relevant events if applicable)
  }`;

  return `
    ${basePrompt}
    ${isInitialMessage 
      ? "Start with a warm welcome and suggest relevant conversation starters." 
      : "Analyze the question and provide a comprehensive response."}
    
    ${responseFormat}

    Organization context:
    ${createEnhancedContext(lang)}

    RETURN JSON OF DESIRED FORMAT, NO OTHER TEXT.
  `;
}

// Enhanced entity mapping functions
function mapPartnerToEntity(partner: any): PartnerEntity {
  return {
    type: 'partner',
    name: partner.name,
    description: partner.description,
    links: [
      { url: partner.website || '', type: 'website', title: 'Website' },
      { url: partner.socialMedia?.linkedin || '', type: 'linkedin', title: 'LinkedIn' },
      { url: partner.socialMedia?.twitter || '', type: 'twitter', title: 'Twitter' }
    ].filter(link => link.url),
    expertise: partner.expertise,
    industry: partner.industry,
    collaborations: partner.collaborations
  };
}

function mapTeamMemberToEntity(member: any): TeamMemberEntity {
  return {
    type: 'member',
    name: {
      fr: member.name,
      en: member.name
    },
    description: {
      fr: member.task || '',
      en: member.task || ''
    },
    role: member.role,
    links: member.linkedin ? [
      { url: member.linkedin, type: 'linkedin' as LinkType, title: 'LinkedIn' }
    ] : [],
    task: member.task,
    year: member.year
  };
}
// Enhanced entity finding function
function findRelevantEntities(query: string, lang: Language) {
  const relatedPartners = Object.entries(partners)
    .filter(([_, partner]) => {
      const searchText = `
        ${partner.name[lang]} 
        ${partner.description[lang]} 
        ${partner.expertise?.join(' ')}
        ${partner.industry?.join(' ')}
        ${partner.collaborations?.events?.map(e => e[lang]).join(' ')}
        ${partner.collaborations?.initiatives?.map(i => i[lang]).join(' ')}
      `.toLowerCase();
      
      return query.toLowerCase().split(' ').some(word => searchText.includes(word));
    })
    .map(([_, partner]) => mapPartnerToEntity(partner));

  const allMembers = Object.values(associationInfo.teamMembers).flat();

  const relatedMembers = allMembers
    .filter(member => {
      const searchText = `${member.name} ${member.role[lang]}`.toLowerCase();
      return query.toLowerCase().split(' ').some(word => searchText.includes(word));
    })
    .map(member => mapTeamMemberToEntity(member));

  return { relatedPartners, relatedMembers };
}

// Error response creation
function createErrorResponse(language: Language): ChatResponse {
  return {
    message: language === 'fr' 
      ? "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer." 
      : "Sorry, I couldn't process your request. Please try again.",
    hasEnoughContext: false,
    suggestedQuestions: [
      language === 'fr' ? "Pouvez-vous reformuler votre question ?" : "Can you rephrase your question?",
      language === 'fr' ? "Que souhaitez-vous savoir sur IAF ?" : "What would you like to know about IAF?",
      language === 'fr' ? "Puis-je vous aider autrement ?" : "Can I help you with something else?"
    ],
    confidence: 0,
    relatedPartners: [],
    relatedMembers: [],
    relevantLinks: [],
    success: false
  };
}

// Main handler
export async function POST(req: Request): Promise<NextResponse<ChatResponse>> {
  let userLanguage: Language = 'fr';

  try {
    const body = await req.json();
    
    if (!isValidRequestBody(body)) {
      throw new Error('Invalid request body');
    }

    const { message, language, isInitialMessage = false } = body;
    userLanguage = language;

    const [searchResults, entities] = await Promise.all([
      searchTool.invoke(`Ingénieur-e Au Féminin ${message}`),
      Promise.resolve(findRelevantEntities(message, userLanguage))
    ]);

    const messages = [
      new SystemMessage(getEnhancedSystemPrompt(userLanguage, isInitialMessage)),
      new SystemMessage(`Additional context from search: ${JSON.stringify(searchResults)}`),
      new HumanMessage(message)
    ];

    const result = await chatModel.invoke(messages);
    
    let parsedResponse: RichResponseData;
    try {
      parsedResponse = JSON.parse(result.content as string) as RichResponseData;
    } catch (parseError) {
      console.error('Failed to parse LLM response:', parseError);
      throw new Error('Invalid response format from LLM');
    }

    const enhancedResponse: ChatResponse = {
      ...parsedResponse,
      relatedPartners: entities.relatedPartners,
      relatedMembers: entities.relatedMembers,
      success: true,
      searchResults
    };

    return NextResponse.json(enhancedResponse);

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(createErrorResponse(userLanguage), { status: 500 });
  }
}