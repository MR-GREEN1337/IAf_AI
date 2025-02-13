"use client";

import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface TextWrapperProps {
  children: React.ReactNode;
  language?: 'fr' | 'en';
}

const TextWrapper: React.FC<TextWrapperProps> = ({ children}) => {
  const [selectedText, setSelectedText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const language = localStorage.getItem('language') as 'fr' | 'en' || 'fr';

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectedText(selection.toString().trim());
        setPosition({
          x: rect.x + rect.width / 2,
          y: rect.y + window.scrollY - 10
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleExplain = async () => {
    if (!selectedText) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedText,
          language
        }),
      });
      
      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Failed to get explanation:', error);
      setExplanation(language === 'fr' 
        ? "Désolé, une erreur s'est produite."
        : "Sorry, an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {children}
      
      {isVisible && (
        <div
          className="fixed z-50"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Expliquer' : 'Explain'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              {!explanation ? (
                <Button
                  onClick={handleExplain}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (language === 'fr' ? 'Chargement...' : 'Loading...') 
                    : (language === 'fr' ? 'Obtenir une explication' : 'Get explanation')}
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm">{explanation}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExplanation('')}
                    className="w-full"
                  >
                    {language === 'fr' ? 'Réinitialiser' : 'Reset'}
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default TextWrapper;