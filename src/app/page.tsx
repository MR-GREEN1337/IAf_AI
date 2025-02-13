"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { partners, translations } from '@/lib/types';


const Footer = ({ language }: { language: string }) => {
  const t = translations[language as keyof typeof translations];
  
  return (
    <footer className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{t.contactUs}</h3>
          <div className="flex flex-col space-y-2">
            <a href="mailto:contact@iaf.fr" className="flex items-center space-x-2 hover:text-pink-300 transition-colors">
              <Mail size={20} />
              <span>inge.feminin.polytech.ac@gmail.com</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-pink-300 transition-colors">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-pink-300 transition-colors">
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">{t.quickLinks}</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-pink-300 transition-colors">{t.about}</a></li>
            <li><a href="#events" className="hover:text-pink-300 transition-colors">{t.events}</a></li>
            <li><a href="#partners" className="hover:text-pink-300 transition-colors">{t.partners}</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">{t.newsletter}</h3>
          <p className="mb-4">{t.stayUpdated}</p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-pink-400 flex-grow"
            />
            <Button className="bg-pink-600 hover:bg-pink-700">
              {t.subscribe}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10">
        <p className="text-center text-sm text-white/60">
          © 2024 Ingénieur-e Au Féminin. {t.allRights}
        </p>
      </div>
    </footer>
  );
};

// Update the ChatBubble component
const ChatBubble = ({ language }: { language: 'fr' | 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: language === 'fr' 
        ? "Bonjour! Je suis IAF Bot, comment puis-je vous aider?"
        : "Hello! I'm IAF Bot, how can I help you?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
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

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { type: 'bot', text: data.message }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: language === 'fr'
            ? "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer."
            : "Sorry, I couldn't process your request. Please try again."
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: language === 'fr'
          ? "Une erreur s'est produite. Veuillez réessayer plus tard."
          : "An error occurred. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
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
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg mb-4 w-[320px] sm:w-[380px] overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h3 className="text-white font-semibold">
                {language === 'fr' ? 'Assistant IAF' : 'IAF Assistant'}
              </h3>
            </div>

            {/* Messages Container */}
            <div className="h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-purple-50 to-pink-50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none'
                          : 'bg-white shadow-sm rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
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
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-150" />
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-300" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
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

      {/* Chat Button */}
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

const LandingPage = () => {
  const [language, setLanguage] = useState('fr');
  const [t, setT] = useState(translations.fr);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
    setT(translations[newLanguage]);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-x-hidden">
      
      {/* Navigation - Now more responsive */}
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
          >
            <img
              src="Logo_IAF.png"
              alt="IAF Logo"
              className="h-8 sm:h-12 w-auto"
            />
          </motion.div>
          
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>

      {/* Hero Section - Improved responsiveness */}
      <main className="pt-24 sm:pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full filter blur-3xl opacity-30 -z-10"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 px-4">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-600 mb-8 px-4">
              {t.subtitle}
            </p>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 px-4">
              {t.description}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {t.learnMore}
            </Button>
          </motion.div>

          {/* Partners Grid - Responsive improvements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">
              {t.partners}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {Object.keys(partners).map((logo, index) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedPartner(logo)}
                >
                  <Card className="overflow-hidden bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <img
                        src={logo}
                        alt={partners[logo as keyof typeof partners].name[language as keyof typeof translations]}
                        className="w-full h-16 sm:h-24 object-contain"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Partner Dialog - Now responsive */}
          <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
            <DialogContent className="bg-gradient-to-br from-white to-pink-50 max-w-[90vw] sm:max-w-2xl mx-4">
              {selectedPartner && (
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {partners[selectedPartner as keyof typeof partners].name[language as keyof typeof translations]}
                  </DialogTitle>
                  <DialogDescription className="mt-4 text-base sm:text-lg">
                    {partners[selectedPartner as keyof typeof partners].description[language as keyof typeof translations]}
                  </DialogDescription>
                  <div className="mt-6 flex justify-center">
                    <img
                      src={selectedPartner}
                      alt={partners[selectedPartner as keyof typeof partners].name[language as keyof typeof translations]}
                      className="max-h-32 sm:max-h-48 object-contain"
                    />
                  </div>
                </DialogHeader>
              )}
            </DialogContent>
          </Dialog>

          {/* Chatbot Button - Responsive positioning */}
          <ChatBubble language={language as any} />
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default LandingPage;