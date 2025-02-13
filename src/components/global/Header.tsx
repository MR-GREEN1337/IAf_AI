"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { translations } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactDialog from './ContactDialog';

const Header = ({ language, handleLanguageChange }: any) => {
  const router = useRouter();
  const t = (translations as any)[language];
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      console.log("Submitting contact form:", formData);
  
      const res = await fetch("api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log("API Response:", data);
  
      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Error from API:", data);
        alert(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
            <a href="/">
          <img
            src="Logo_IAF.jpeg"
            alt="IAF Logo"
            className="h-8 sm:h-12 w-auto"
          />
          </a>
        </motion.div>
        
        <div className="flex items-center gap-4 order-last md:order-none w-full md:w-auto justify-center">
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/events')}
          >
            {t.events}
          </Button>

          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/news')}
          >
            {t.news}
          </Button>
          
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/chat')}
          >
            Chat
          </Button>
          
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/a-propos')}
          >
            {t.about}
          </Button>
          <ContactDialog t={t} />
        </div>

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
  );
};

export default Header;