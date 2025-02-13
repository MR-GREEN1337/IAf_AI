"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  suggestedQuestions?: string[];
  confidence?: number;
  hasEnoughContext?: boolean;
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

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Get language from localStorage
    const storedLanguage = localStorage.getItem('language') as 'fr' | 'en' || 'fr';
    setLanguage(storedLanguage);

    // Initialize chat
    const initializeChat = async () => {
      try {
        const response = await fetch('/api/chat-bubble', {
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

        const data = await response.json();
        
        if (data.success) {
          setMessages([{
            id: Date.now().toString(),
            type: 'bot',
            text: data.message,
            suggestedQuestions: data.suggestedQuestions,
            confidence: data.confidence,
            hasEnoughContext: data.hasEnoughContext
          }]);
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        // Set default message if API fails
        setMessages([{
          id: Date.now().toString(),
          type: 'bot',
          text: defaultMessage[storedLanguage],
          suggestedQuestions: defaultSuggestions[storedLanguage]
        }]);
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSubmit(question);
  };

  const handleSubmit = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text;
    const messageId = Date.now().toString();
    setInput('');
    setMessages(prev => [...prev, { id: messageId, type: 'user', text: userMessage }]);
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
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text: language === 'fr'
          ? "Une erreur s'est produite. Veuillez réessayer plus tard."
          : "An error occurred. Please try again later.",
        suggestedQuestions: defaultSuggestions[language]
      }]);
    } finally {
      setIsLoading(false);
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
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
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
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="mb-4 text-purple-600 hover:text-purple-800"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'fr' ? 'Retour' : 'Back'}
          </Button>
          
          <Card className="bg-white/80 backdrop-blur-lg border-purple-200">
            <CardContent className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                {language === 'fr' ? 'Chat avec IAF Assistant' : 'Chat with IAF Assistant'}
              </h1>
              <p className="text-gray-600 mt-2">
                {language === 'fr' 
                  ? 'Posez vos questions sur les carrières d ingénieur au féminin'
                  : 'Ask your questions about engineering careers for women'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-lg rounded-lg shadow-lg mb-4 h-[60vh] overflow-y-auto p-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                custom={message.type}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-2 mb-4"
              >
                <div className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <Avatar className={`${
                    message.type === 'user'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-pink-100 text-pink-600'
                  }`}>
                    <AvatarFallback>
                      {message.type === 'user' ? <User /> : <Bot />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <motion.div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none'
                        : 'bg-white shadow-sm rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                </div>

                {message.type === 'bot' && message.suggestedQuestions && (
                  <motion.div
                    className="flex flex-wrap gap-2 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {message.suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
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
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 p-3"
            >
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
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === 'fr' ? 'Tapez votre message...' : 'Type your message...'}
            className="flex-grow bg-white/80 backdrop-blur-lg border-purple-200"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default ChatPage;