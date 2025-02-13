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

const News = () => {
  useEffect(() => {
    // Load Instagram Embed Script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  }, []);

  return (


    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
     

      {/* News Section */}
      <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 my-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h2>

        {/* Instagram Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Replace POST_ID_X with actual Instagram post URLs */}
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DF-hVTUqdkh/" data-instgrm-version="14"></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DF708gxqM4U/" data-instgrm-version="14"></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DF0e5H1q9ug/?img_index=1" data-instgrm-version="14"></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DDtmKTlKVap/" data-instgrm-version="14"></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DDesr6oqmko/?img_index=1" data-instgrm-version="14"></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DCrZIHHqHq9/" data-instgrm-version="14"></blockquote>
        </div>
      </main>

      
    </div>
  );
};

export default News;
