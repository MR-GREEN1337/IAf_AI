import { NextResponse } from 'next/server';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatGroq } from '@langchain/groq';

// Ensure you have GROQ_API_KEY in your environment variables
const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "mixtral-8x7b-32768", // Using Mixtral for better multilingual support
});

const explainTemplate = ChatPromptTemplate.fromMessages([
  ["system", `You are a helpful AI assistant that explains text clearly and concisely.
  If the text is technical, provide a simple explanation.
  If the text contains multiple concepts, break them down.
  Keep explanations brief but informative.`],
  ["user", "Please explain the following text: {text}"]
]);

const translateTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are a translator. Translate the given text to French, maintaining the same tone and style."],
  ["user", "{text}"]
]);

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Create the explanation chain
    const chain = RunnableSequence.from([
      explainTemplate,
      groq,
      (response) => response.content
    ]);

    // Get the explanation
    let explanation = await chain.invoke({
      text
    });

    // If French is requested, translate the explanation
    //console.log(language)
    if (language === 'fr') {
      const translateChain = RunnableSequence.from([
        translateTemplate,
        groq,
        (response) => response.content
      ]);

      explanation = await translateChain.invoke({
        text: explanation
      });
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Error in explain route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}