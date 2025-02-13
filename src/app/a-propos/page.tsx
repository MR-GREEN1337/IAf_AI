"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Calendar, Target, Linkedin } from 'lucide-react';
import Image from 'next/image';

export const teamMembers = {
    "Bureau Restreint": [
      {
        name: "RECHON-REGUET Emma",
        task: "Présidente",
        image: "/membres/emma.jpg",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/emma-rechon-reguet-27964120a/"
      },
      {
        name: "FABRE Julie",
        task: "Vice-Présidente",
        image: "/membres/julie.jpg",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/julie-fabre3/"
      },
      {
        name: "BELLEVILLE Alyssa",
        task: "Secrétaire",
        image: "/membres/alyssa.png",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/alyssa-belleville"
      },
      {
        name: "CAMAS Louna",
        task: "Trésorière",
        image: "/membres/Louna.png",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/louna-camas-2aa2452b0/"
      }
    ],
    "Bureau Élargi": [
      {
        name: "DA SILVA Carla Marie",
        task: "Pôle Conférences",
        image: "/membres/carla.jpg",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/carla-marie-dasilva/"
      },
      {
        name: "LOMPRET-BRYCH Juliette",
        task: "Pôle Conférences",
        image: "/membres/juliette.jpg",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/juliette-lompret-brych"
      },
      {
        name: "GUITTON Cyprien",
        task: "Pôle Communication",
        image: "/membres/cyprien.jpg",
        year: "2023-2024",
        linkedin: "https://www.linkedin.com/in/cyprien-guitton/"
      }
    ]
  };

const AboutPage = () => {
  const [selectedYear, setSelectedYear] = useState('2023-2024');

  const achievements = [
    {
      date: "2023",
      title: "Sensibilisation des lycéennes",
      description: "200+ lycéennes sensibilisées aux métiers scientifiques"
    },
    {
      date: "2023",
      title: "Développement digital",
      description: "Lancement des pages LinkedIn et Instagram"
    },
    {
      date: "2023",
      title: "Événements majeurs",
      description: "10+ événements organisés dans l'année"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white pb-20">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          >
            À Propos de Nous
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Découvrez l'histoire et la mission d'Ingénieure au Féminin, une association dédiée à 
            la promotion des métiers d'ingénieur auprès des jeunes générations.
          </motion.p>
        </motion.div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full filter blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-40 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full filter blur-3xl"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mission & Values */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                    <Target className="w-6 h-6" />
                    Notre Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Fondée en 2021, notre association s'engage à promouvoir la diversité dans 
                    l'ingénierie en inspirant la prochaine génération de femmes ingénieures.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="values">
                      <AccordionTrigger>Nos Valeurs</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Badge variant="secondary">Diversité</Badge>
                            Promouvoir l'inclusion dans l'ingénierie
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="secondary">Innovation</Badge>
                            Encourager la créativité et l'innovation
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="secondary">Éducation</Badge>
                            Partager les connaissances et inspirer
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                    <Award className="w-6 h-6" />
                    Nos Réalisations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50"
                      >
                        <h4 className="font-semibold text-purple-700 mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <span className="text-xs text-pink-600 mt-2 block">
                          {achievement.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Team Section */}
          <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mt-12"
      >
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
              <Users className="w-6 h-6" />
              Notre Équipe
            </CardTitle>
            <CardDescription>
              Découvrez les membres qui font vivre notre association
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Object.entries(teamMembers).map(([category, members]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-700">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                          <CardHeader>
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                              <Image
                                src={member.image}
                                alt={member.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                              />
                            </div>
                            <CardTitle className="text-lg font-semibold text-purple-700 text-center">
                              {member.name}
                            </CardTitle>
                            <CardDescription className="text-center">
                              {member.task}
                            </CardDescription>
                            {member.linkedin && (
                              <div className="flex justify-center mt-2">
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                                >
                                  <Linkedin className="w-4 h-4" />
                                  <span className="text-sm">LinkedIn</span>
                                </a>
                              </div>
                            )}
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-12"
          >
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                  <Calendar className="w-6 h-6" />
                  Notre Histoire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600" />
                  <div className="space-y-8 pl-6">
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      <h4 className="font-semibold text-purple-700">2024</h4>
                      <p className="text-gray-600">
                        Expansion des programmes et développement digital
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      <h4 className="font-semibold text-purple-700">2023</h4>
                      <p className="text-gray-600">
                        Plus de 200 lycéennes sensibilisées aux métiers scientifiques
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                      <h4 className="font-semibold text-purple-700">2021</h4>
                      <p className="text-gray-600">
                        Création de l'association
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;