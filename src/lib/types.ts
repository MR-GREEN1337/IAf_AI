export interface Partner {
  name: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  website?: string;
  detaille?: {
    fr: string;
    en: string;
  };
}

export interface Partners {
  [key: string]: Partner;
}

export interface Translations {
  title: string;
  subtitle: string;
  description: string;
  learnMore: string;
  partners: string;
  chatbot: string;
  close: string;
  learnMoreAbout: string;
  contactUs: string;
  quickLinks: string;
  newsletter: string;
  stayUpdated: string;
  emailPlaceholder: string;
  subscribe: string;
  about: string;
  events: string;
  allRights: string;
  joinUs: string;
  ourMission: string;
  followUs: string;
  chatWithUs: string;
  news: string;
  contact: string;
}

// translations.ts
export const translations: Record<'en' | 'fr', Translations> = {
  en: {
    title: "Engineer in Feminine",
    subtitle: "Promoting women in engineering",
    description: "Empowering the next generation of female engineers through mentorship, education, and community building. Join us in creating a more diverse and inclusive engineering future.",
    learnMore: "Learn More",
    partners: "Our Partners",
    chatbot: "Chat with us",
    close: "Close",
    learnMoreAbout: "Learn more about",
    contactUs: "Contact Us",
    quickLinks: "Quick Links",
    newsletter: "Newsletter",
    stayUpdated: "Stay updated with our latest news and events",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    about: "About Us",
    events: "Events",
    allRights: "All rights reserved.",
    joinUs: "Join Our Community",
    ourMission: "Our Mission",
    followUs: "Follow Us",
    chatWithUs: "Chat with Us",
    news: "News",
    contact: "Contact Us"
  },
  fr: {
    title: "Ingénieur-e Au Féminin",
    subtitle: "Promouvoir les femmes dans l'ingénierie",
    description: "Accompagner la prochaine génération d'ingénieures à travers le mentorat, l'éducation et la construction communautaire. Rejoignez-nous pour créer un avenir plus diversifié et inclusif dans l'ingénierie.",
    learnMore: "En savoir plus",
    partners: "Nos Partenaires",
    chatbot: "Discuter avec nous",
    close: "Fermer",
    learnMoreAbout: "En savoir plus sur",
    contactUs: "Contactez-nous",
    quickLinks: "Liens Rapides",
    newsletter: "Newsletter",
    stayUpdated: "Restez informé(e) de nos dernières actualités",
    emailPlaceholder: "Votre email",
    subscribe: "S'abonner",
    about: "À Propos",
    events: "Événements",
    allRights: "Tous droits réservés.",
    joinUs: "Rejoignez-nous",
    ourMission: "Notre Mission",
    followUs: "Suivez-nous",
    chatWithUs: "Discuter avec nous",
    news: "Actualités",
    contact: "Contactez-nous"
  }
};

// partners.ts
export const partners: Partners = {
  "Logo_CVEC.png": {
    name: {
      fr: "CVEC",
      en: "CVEC"
    },
    description: {
      fr: "La Contribution de vie étudiante et de campus (CVEC) est destinée à favoriser l'accueil et l'accompagnement social, sanitaire, culturel et sportif des étudiants. Elle soutient les initiatives visant à améliorer les conditions de vie sur les campus.",
      en: "The Student and Campus Life Contribution (CVEC) is intended to promote social, health, cultural and sports support for students. It supports initiatives aimed at improving living conditions on campuses."
    },
    website: "https://cvec.etudiant.gouv.fr/",
    detaille: {
      fr: "La Contribution de Vie Étudiante et de Campus finance des initiatives étudiantes favorisant l'égalité des sexes, notamment dans les formations scientifiques et techniques.",
      en: "The Student and Campus Life Contribution funds student initiatives promoting gender equality, particularly in scientific and technical education."
    }
  },
  "Logo_Credit_Agricol_Technologies_Services.jpg": {
    name: {
      fr: "Crédit Agricole Technologies & Services",
      en: "Credit Agricole Technologies & Services"
    },
    description: {
      fr: "CATS est l'entité technologique du groupe Crédit Agricole, fournissant des solutions IT innovantes pour répondre aux besoins de transformation digitale du groupe et de ses clients. Leader dans le développement de solutions bancaires numériques.",
      en: "CATS is the technological entity of the Credit Agricole group, providing innovative IT solutions to meet the digital transformation needs of the group and its clients. Leader in the development of digital banking solutions."
    },
    
    website: "https://www.credit-agricole.fr/",
    detaille: {
      fr: "À travers sa fondation et divers partenariats, la banque finance des projets visant à promouvoir la diversité et l'inclusion dans les professions techniques, y compris l'ingénierie.",
      en: "Through its foundation and various partnerships, the bank funds projects aimed at promoting diversity and inclusion in technical professions, including engineering."
    }
  },
  "Logo_LISTIC.jpg": {
    name: {
      fr: "LISTIC",
      en: "LISTIC"
    },
    description: {
      fr: "Le Laboratoire d'Informatique, Systèmes, Traitement de l'Information et de la Connaissance (LISTIC) est une unité de recherche de l'Université Savoie Mont Blanc, spécialisée dans les domaines de l'intelligence artificielle et du traitement des données.",
      en: "The Laboratory of Computer Science, Systems, Information and Knowledge Processing (LISTIC) is a research unit of Savoie Mont Blanc University, specialized in artificial intelligence and data processing."
    },
    website: "https://www.univ-smb.fr/listic/",
    detaille: {
      fr: " Le laboratoire promeut l'égalité des genres en encourageant la participation des femmes aux projets de recherche en ingénierie et en attirant davantage de chercheuses dans le domaine des sciences de l'information.",
      en: "The laboratory promotes gender equality by encouraging women's participation in engineering research projects and attracting more female researchers in the field of information sciences."
    }
  },
  "Logo_NTN.png": {
    name: {
      fr: "NTN-SNR",
      en: "NTN-SNR"
    },
    description: {
      fr: "Leader mondial dans la conception, le développement et la fabrication de roulements, solutions linéaires, et composants automobiles. NTN-SNR innove constamment pour répondre aux défis de l'industrie moderne.",
      en: "Global leader in the design, development and manufacture of bearings, linear solutions, and automotive components. NTN-SNR constantly innovates to meet the challenges of modern industry."
    },
    website: "https://www.ntn-snr.com/",
    detaille: {
      fr: "Le groupe soutient des initiatives favorisant la mixité dans les métiers techniques, notamment par des programmes de mentorat et de sensibilisation encourageant les femmes à poursuivre des carrières en ingénierie.",
      en: "The group supports initiatives promoting gender diversity in technical professions, notably through mentoring and awareness programs encouraging women to pursue engineering careers."
    }
  },
  "Logo_Polytech_Annecy_Chambery.svg.png": {
    name: {
      fr: "Polytech Annecy-Chambéry",
      en: "Polytech Annecy-Chambery"
    },
    description: {
      fr: "École d'ingénieurs publique membre du réseau Polytech, formant des ingénieurs dans divers domaines technologiques. Reconnue pour son excellence académique et ses liens étroits avec l'industrie.",
      en: "Public engineering school member of the Polytech network, training engineers in various technological fields. Recognized for its academic excellence and close ties with industry."
    },
    website: "https://www.polytech.univ-smb.fr/",
    detaille: {
      fr: " L'association étudiante 'Ingénieure au féminin' promeut l'égalité des genres en organisant des événements pour déconstruire les stéréotypes et encourager les jeunes femmes à s'orienter vers des carrières scientifiques.",
      en: "The student association 'Ingénieure au féminin' promotes gender equality by organizing events to dismantle stereotypes and encourage young women to pursue scientific careers. "
    }
  },
  "Logo_Sopra_Steria.png": {
    name: {
      fr: "Sopra Steria",
      en: "Sopra Steria"
    },
    description: {
      fr: "Leader européen de la transformation digitale, proposant des services de conseil, solutions digitales et édition de logiciels. Sopra Steria accompagne ses clients dans leur transformation numérique et leur développement durable.",
      en: "European leader in digital transformation, offering consulting services, digital solutions and software publishing. Sopra Steria supports its clients in their digital transformation and sustainable development."
    },
    website: "https://www.soprasteria.com/",
    detaille: {
      fr: "L'entreprise a lancé le programme 'TogetHER For Greater Balance' pour promouvoir l'égalité professionnelle, incluant des actions de sensibilisation et de mentorat pour attirer davantage de femmes dans les métiers du numérique",
      en: "The company has launched the 'TogetHER For Greater Balance' program to promote professional equality, including awareness and mentoring actions to attract more women to digital professions."
    }
  },
  "Logo_Ville_Annecy.png": {
    name: {
      fr: "Ville d'Annecy",
      en: "City of Annecy"
    },
    description: {
      fr: "Capitale de la Haute-Savoie, ville dynamique soutenant l'innovation et l'éducation. Annecy s'engage activement dans le développement des compétences et l'égalité des chances dans les domaines technologiques.",
      en: "Capital of Haute-Savoie, a dynamic city supporting innovation and education. Annecy is actively involved in skills development and equal opportunities in technological fields."
    },
    website: "https://www.annecy.fr/",
    detaille: {
      fr: "La municipalité soutient des programmes éducatifs et des événements encourageant les jeunes filles à s'intéresser aux carrières scientifiques et techniques, contribuant ainsi à l'égalité des sexes dans l'ingénierie.",
      en: "The municipality supports educational programs and events encouraging young girls to take an interest in scientific and technical careers, thus contributing to gender equality in engineering."
    }
  }
};