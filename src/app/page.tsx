"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Language translations
const translations = {
  en: {
    title: "Engineer in Feminine",
    subtitle: "Promoting women in engineering",
    description: "Empowering the next generation of female engineers through mentorship, education, and community.",
    learnMore: "Learn More",
    partners: "Our Partners",
    chatbot: "Chat with us",
  },
  fr: {
    title: "Ingénieur-e Au Féminin",
    subtitle: "Promouvoir les femmes dans l'ingénierie",
    description: "Accompagner la prochaine génération d'ingénieures à travers le mentorat, l'éducation et la communauté.",
    learnMore: "En savoir plus",
    partners: "Nos Partenaires",
    chatbot: "Discuter avec nous",
  }
};

const LandingPage = () => {
  const [language, setLanguage] = useState('fr');
  const [t, setT] = useState(translations.fr);

  useEffect(() => {
    // Load language preference from localStorage
    const savedLang = localStorage.getItem('language') || 'fr';
    setLanguage(savedLang);
    setT(translations[savedLang as keyof typeof translations]);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setT(translations[value as keyof typeof translations]);
    localStorage.setItem('language', value);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const logos = [
    "Logo_CVEC.png",
    "Logo_Credit_Agricol_Technologies_Services.jpg",
    "Logo_IAF.png",
    "Logo_LISTIC.jpg",
    "Logo_NTN.png",
    "Logo_Polytech_Annecy_Chambery.svg.png",
    "Logo_Sopra_Steria.png",
    "Logo_Ville_Annecy.png"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-purple-700"
          >
            IAF
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

      {/* Hero Section */}
      <motion.main
        className="pt-24 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-purple-800 mb-4">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-purple-600 mb-8">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t.description}
            </p>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {t.learnMore}
            </Button>
          </motion.div>

          {/* Partners Section */}
          <motion.section
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
              {t.partners}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {logos.map((logo, index) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <img
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        className="w-full h-24 object-contain"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Chatbot Button */}
          <motion.div
            className="fixed bottom-8 right-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
            >
              {t.chatbot}
            </Button>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default LandingPage;