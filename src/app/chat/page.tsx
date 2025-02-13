"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, ArrowLeft, Loader2, XCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider 
} from "@/components/ui/tooltip";
import Waves from '@/components/global/Waves';
import Link from 'next/link';
import EnhancedMessage from './_components/ChatMessage';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  suggestedQuestions?: string[];
  confidence?: number;
  hasEnoughContext?: boolean;
  error?: boolean;
  relatedPartners?: string[];
  relatedMembers?: string[];
  relevantLinks?: {
    title: string;
    type?: string;
    url: string;
  }[];
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

const ErrorMessage = {
  fr: "Une erreur s'est produite. Veuillez réessayer plus tard.",
  en: "An error occurred. Please try again later."
};

const MesmerizingChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (!messageContainer) return;

    const isScrolledToBottom = 
      messageContainer.scrollHeight - messageContainer.scrollTop === messageContainer.clientHeight;

    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'fr' | 'en' || 'fr';
    setLanguage(storedLanguage);

    const initializeChat = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'initialize chat',
            language: storedLanguage,
            isInitialMessage: true
          }),
        });

        if (!response.ok) throw new Error('Failed to initialize chat');

        const data = await response.json();
        
        if (data.success) {
          setMessages([{
            id: Date.now().toString(),
            type: 'bot',
            text: data.message,
            suggestedQuestions: data.suggestedQuestions,
            confidence: data.confidence,
            hasEnoughContext: data.hasEnoughContext,
            relatedPartners: data.relatedPartners,
            relatedMembers: data.relatedMembers,
            relevantLinks: data.relevantLinks
          }]);
        } else {
          throw new Error('Chat initialization failed');
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setMessages([{
          id: Date.now().toString(),
          type: 'bot',
          text: defaultMessage[storedLanguage],
          suggestedQuestions: defaultSuggestions[storedLanguage]
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSubmit(question);
  };

  const handleSubmit = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    const messageId = Date.now().toString();
    setInput('');
    setError(null);
    
    setMessages(prev => [...prev, { 
      id: messageId, 
      type: 'user', 
      text: userMessage 
    }]);
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
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

      const data = await response.json();

      if (data.success) {
        const botMessageId = Date.now().toString();
        const botMessage: Message = {
          id: botMessageId,
          type: 'bot',
          text: data.message,
          suggestedQuestions: data.suggestedQuestions,
          confidence: data.confidence,
          hasEnoughContext: data.hasEnoughContext,
          relatedPartners: data.relatedPartners,
          relatedMembers: data.relatedMembers,
          relevantLinks: data.relevantLinks
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: ErrorMessage[language],
        error: true,
        suggestedQuestions: defaultSuggestions[language]
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(ErrorMessage[language]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const messageVariants = {
    hidden: (type: string) => ({
      opacity: 0,
      x: type === 'user' ? 20 : -20,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: (type: string) => ({
      opacity: 0,
      x: type === 'user' ? 20 : -20,
      transition: {
        duration: 0.2
      }
    })
  };

  return (
    <TooltipProvider>
      <div className="relative h-screen w-full overflow-hidden bg-slate-900">
        <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-transparent">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg bg-gray-800/40 hover:bg-gray-800/60"
            aria-label={language === 'fr' ? 'Retourner à la page d\'accueil' : 'Return to home page'}
          >
            <ArrowLeft size={20} />
            <span>{language === 'fr' ? 'Retour' : 'Back'}</span>
          </Link>
        </header>

        <div className="absolute inset-0 z-0">
          <Waves
            lineColor="rgba(255, 20, 147, 0.3)"
            backgroundColor="transparent"
            waveSpeedX={0.008}
            waveSpeedY={0.005}
            waveAmpX={25}
            waveAmpY={15}
            xGap={12}
            yGap={12}
            friction={0.95}
            tension={0.001}
          />
        </div>
      
        <div className="absolute inset-0 flex flex-col p-4 md:p-6">
          {error && (
            <Alert variant="destructive" className="mb-4 mt-16">
              <AlertDescription className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div 
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pt-20"
            role="log"
            aria-live="polite"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  custom={message.type}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-3"
                >
                  <div className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className={`${
                          message.type === 'user'
                            ? 'bg-pink-600/20 text-pink-300'
                            : 'bg-transparent'
                          } w-8 h-8 shrink-0`}
                        >
                          {message.type === 'user' ? (
                            <User size={14} />
                          ) : (
                            <>
                              <AvatarImage 
                                src="/Logo_IAF.jpeg" 
                                alt="IAF Logo"
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-blue-600/20">
                                IAF
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        {message.type === 'user' 
                          ? (language === 'fr' ? 'Vous' : 'You')
                          : 'IAF Assistant'
                        }
                      </TooltipContent>
                    </Tooltip>
                    
                    <motion.div
                      className={`relative max-w-[80%] px-4 py-2 rounded-2xl backdrop-blur-md ${
                        message.type === 'user'
                          ? 'bg-pink-600/30 text-pink-50 ml-auto rounded-tr-none border border-pink-500/20'
                          : 'bg-blue-600/30 text-blue-50 rounded-tl-none border border-blue-500/20'
                      } ${message.error ? 'border-red-500/50 bg-red-900/20' : ''}`}
                    >
                      <EnhancedMessage message={message} language={language} />
                    </motion.div>
                  </div>

                  {message.type === 'bot' && message.suggestedQuestions && (
                    <motion.div
                      className="flex flex-wrap gap-2 pl-11"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {message.suggestedQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="text-sm px-4 py-2 rounded-full bg-blue-900/40 text-blue-200 backdrop-blur-md hover:bg-blue-800/50 transition-all duration-200 border border-blue-500/20 hover:border-blue-400/40"
                          disabled={isLoading}
                        >
                          {question}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 p-3"
              >
                <Avatar className="w-8 h-8 bg-transparent">
                  <AvatarImage 
                    src="/Logo_IAF.jpeg" 
                    alt="IAF Logo"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-600/20">
                    IAF
                  </AvatarFallback>
                </Avatar>
                <div className="px-4 py-2 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-300" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex gap-2 backdrop-blur-md bg-gray-800/40 p-2 rounded-2xl border border-gray-700/30"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'fr' ? 'Tapez votre message...' : 'Type your message...'}
              className="flex-grow bg-transparent border-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
              disabled={isLoading}
              aria-label={language === 'fr' ? 'Message à envoyer' : 'Message to send'}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  aria-label={language === 'fr' ? 'Envoyer le message' : 'Send message'}
                >
                  <Send className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {language === 'fr' ? 'Envoyer' : 'Send'}
              </TooltipContent>
            </Tooltip>
          </motion.form>

          <div className="mt-2 text-center text-sm text-gray-400">
            <span className="px-2 py-1 rounded bg-gray-800/40 text-xs">
              {language === 'fr' ? 'Entrée pour envoyer' : 'Enter to send'}
            </span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MesmerizingChat;