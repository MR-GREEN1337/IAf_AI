"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Header from '@/components/global/Header';
import { translations } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

const EventsPage = () => {
  const [language, setLanguage] = useState('fr');
  const [eventsData, setEventsData] = useState([]);
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    fetch('/insta.json')
      .then((res) => res.json())
      .then((data) => setEventsData(data.posts))
      .catch((error) => console.error("Error loading events:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <Header language={language} handleLanguageChange={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          {t.events}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <Card key={event.id} className="overflow-hidden bg-white shadow-lg rounded-lg">
              <CardContent className="p-4">
                <div className="w-full relative" style={{ height: 'auto' }}>
                  {event.image_url.endsWith('.mp4') || event.image_url.endsWith('.webm') ? (
                    <video controls className="w-full rounded-lg">
                      <source src={`/${event.image_url}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={`/${event.image_url}`}
                      alt="Event Media"
                      layout="intrinsic"
                      width={800}
                      height={600}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <ReactMarkdown className="mt-4 text-gray-700">{event.caption}</ReactMarkdown>
                <Button
                  className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={() => window.open(event.lien, '_blank')}
                >
                  {t.learnMore}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
