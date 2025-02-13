"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  suggestedQuestions?: string[];
  confidence?: number;
  hasEnoughContext?: boolean;
  isRouteMessage?: boolean;
}

interface ChatBubbleProps {
  language: 'fr' | 'en';
}

const defaultMessage = {
  fr: "Bonjour! 👋 Je suis l'assistant virtuel d'IAF. Comment puis-je vous aider aujourd'hui?",
  en: "Hello! 👋 I'm the IAF virtual assistant. How can I help you today?"
};

const defaultSuggestions = {
  fr: [
    "Qu'est-ce que IAF ?",
    "Quels sont vos événements à venir ?",
    "Comment puis-je rejoindre IAF ?"
  ],
  en: [
    "What is IAF?",
    "What are your upcoming events?",
    "How can I join IAF?"
  ]
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    text: defaultMessage[language],
    suggestedQuestions: defaultSuggestions[language]
  } as any]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await fetch('/api/chat-bubble', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'initialize chat',
            language,
            isInitialMessage: true
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setMessages([{
            type: 'bot',
            text: data.message,
            suggestedQuestions: data.suggestedQuestions,
            confidence: data.confidence,
            hasEnoughContext: data.hasEnoughContext
          } as any]);
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };

    if (isOpen) {
      initializeChat();
    }
  }, [language, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    handleSubmit(question);
  };

  const handleSubmit = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text;
    const messageId = Date.now().toString();
    setInputValue('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage, id: messageId }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-bubble', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          language
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response from server");
      }

      const data = await response.json();

      if (data.success) {
        const botMessageId = Date.now().toString();
        const botMessage: Message = {
          id: botMessageId,
          type: 'bot',
          text: data.message,
          suggestedQuestions: data.suggestedQuestions,
          confidence: data.confidence,
          hasEnoughContext: data.hasEnoughContext
        };

        setMessages(prev => [...prev, botMessage]);

        if (!data.hasEnoughContext) {
          const routeMessageId = (Date.now() + 1).toString();
          setMessages(prev => [...prev, {
            id: routeMessageId,
            type: 'bot',
            text: language === 'fr'
              ? "Pour une assistance plus détaillée, vous pouvez:"
              : "For more detailed assistance, you can:",
            isRouteMessage: true
          }]);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: language === 'fr'
          ? "Une erreur s'est produite. Veuillez réessayer plus tard."
          : "An error occurred. Please try again later.",
        suggestedQuestions: defaultSuggestions[language]
      } as any]);
    } finally {
      setIsLoading(false);
    }
  };

  const messageVariants = {
    initial: (type: string) => ({
      opacity: 0,
      x: type === 'user' ? 20 : -20,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const suggestionVariants = {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex flex-col items-end"
      initial={false}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="bg-white rounded-lg shadow-lg mb-4 w-[320px] sm:w-[380px] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {language === 'fr' ? 'Assistant IAF' : 'IAF Assistant'}
              </h3>
            </div>

            <div className="h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-purple-50 to-pink-50">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    custom={message.type}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-2 mb-4"
                  >
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <motion.div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none'
                            : 'bg-white shadow-sm rounded-bl-none'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {message.text}
                      </motion.div>
                    </div>

                    {message.type === 'bot' && message.suggestedQuestions && (
                      <motion.div 
                        className="flex flex-wrap gap-2 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {message.suggestedQuestions.map((question, qIndex) => (
                          <motion.button
                            key={qIndex}
                            variants={suggestionVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-sm px-4 py-2 rounded-full bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm"
                          >
                            {question}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {message.type === 'bot' && message.isRouteMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mt-2"
                      >
                        <Button
                          onClick={() => window.location.href = '/chat'}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg transition-shadow"
                        >
                          {language === 'fr' ? 'Discuter avec un expert' : 'Chat with an expert'}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white shadow-sm rounded-lg rounded-bl-none p-3">
                      <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-600 rounded-full"
                            animate={{
                              y: ["0%", "-50%", "0%"],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                handleSubmit(inputValue); 
              }} 
              className="p-4 bg-white border-t"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={language === 'fr' ? 'Tapez votre message...' : 'Type your message...'}
                  className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg flex items-center gap-2"
        >
          <motion.div
            initial={false}
            animate={{ width: isOpen ? 'auto' : '20px' }}
            className="flex items-center gap-2"
          >
            <MessageCircle size={20} />
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0
              }}
              className="hidden sm:inline whitespace-nowrap overflow-hidden"
            >
              {isOpen 
                ? (language === 'fr' ? 'Fermer' : 'Close')
                : (language === 'fr' ? 'Discuter avec nous' : 'Chat with us')
              }
            </motion.span>
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ChatBubble;

export function ChatBubbleWrapper() {
    const pathname = usePathname();
    // Don't show ChatBubble on the chat page
    if (pathname === '/chat') return null;
    
    // Get language from localStorage if available, default to 'fr'
    const language = typeof window !== 'undefined' 
      ? localStorage.getItem('language') || 'fr'
      : 'fr';
      
    return <ChatBubble language={language as any} />;
  }