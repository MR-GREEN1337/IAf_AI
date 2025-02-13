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
import ChatBubble from '@/components/global/ChatBubble';
import { useRouter } from 'next/navigation';
import Header from '@/components/global/Header';


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
          © 2025 Ingénieur-e Au Féminin. {t.allRights}
        </p>
      </div>
    </footer>
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
  const router = useRouter();
  const handleRouteMessage = () => {
    router.push('/chat');
  };
  return (
    <>
          <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 -z-10" />

          <div className="relative min-h-screen overflow-x-hidden">
      
      <Header language={language} handleLanguageChange={handleLanguageChange} />

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
              onClick={() => router.push('/chat')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></span>
              <span className="relative flex items-center gap-2">
                {t.chatWithUs}
                <MessageCircle className="w-5 h-5 animate-bounce group-hover:animate-none group-hover:scale-110 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/50 to-pink-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
    </>

  );
};

export default LandingPage;