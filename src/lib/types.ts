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
      chatWithUs: "Chat with Our AI"
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
      chatWithUs: "Discuter avec notre IA"
    }
  };
  
  export const partners = {
    "Logo_CVEC.png": {
      id: "cvec-001",
      name: {
        fr: "CVEC",
        en: "CVEC"
      },
      shortDescription: {
        fr: "Contribution de vie étudiante et de campus",
        en: "Student and Campus Life Contribution"
      },
      description: {
        fr: "La Contribution de vie étudiante et de campus (CVEC) est destinée à favoriser l'accueil et l'accompagnement social, sanitaire, culturel et sportif des étudiants. Elle soutient les initiatives visant à améliorer les conditions de vie sur les campus.",
        en: "The Student and Campus Life Contribution (CVEC) is intended to promote social, health, cultural and sports support for students. It supports initiatives aimed at improving living conditions on campuses."
      },
      logo: {
        url: "/partners/Logo_CVEC.png",
        altText: {
          fr: "Logo CVEC",
          en: "CVEC Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://cvec.etudiant.gouv.fr/",
      type: "institutional",
      industry: ["education", "student-services"],
      expertise: ["student-support", "campus-life", "education-funding"],
      
      contacts: [{
        name: "Contact CVEC",
        title: {
          fr: "Responsable des partenariats",
          en: "Partnership Manager"
        },
        email: "contact@cvec.fr"
      }],
      address: {
        street: "69 Quai d'Orsay",
        city: "Paris",
        postalCode: "75007",
        country: "France",
        region: "ile-de-france"
      },
      
      socialMedia: {
        twitter: "https://twitter.com/cvec_fr",
        linkedin: "https://linkedin.com/company/cvec"
      },
      
      partnership: {
        level: "institutional",
        status: "active",
        startDate: "2022-01-01",
        renewalDate: "2024-01-01",
        contributions: [{
          fr: "Soutien financier aux initiatives étudiantes",
          en: "Financial support for student initiatives"
        }]
      },
      
      collaborations: {
        initiatives: [{
          fr: "Programme de soutien aux étudiantes en ingénierie",
          en: "Support program for women engineering students"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 1,
        tags: ["education", "student-support", "institutional"],
        languages: ["fr", "en"]
      }
    },
  
    "Logo_Credit_Agricol_Technologies_Services.jpg": {
      id: "cats-001",
      name: {
        fr: "Crédit Agricole Technologies & Services",
        en: "Credit Agricole Technologies & Services"
      },
      shortDescription: {
        fr: "Leader en solutions IT bancaires",
        en: "Leader in banking IT solutions"
      },
      description: {
        fr: "CATS est l'entité technologique du groupe Crédit Agricole, fournissant des solutions IT innovantes pour répondre aux besoins de transformation digitale du groupe et de ses clients. Leader dans le développement de solutions bancaires numériques.",
        en: "CATS is the technological entity of the Credit Agricole group, providing innovative IT solutions to meet the digital transformation needs of the group and its clients. Leader in the development of digital banking solutions."
      },
      logo: {
        url: "/partners/Logo_Credit_Agricol_Technologies_Services.jpg",
        altText: {
          fr: "Logo Crédit Agricole Technologies & Services",
          en: "Credit Agricole Technologies & Services Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://www.cats.fr/",
      type: "corporate",
      industry: ["banking", "technology", "financial-services"],
      expertise: ["digital-transformation", "banking-solutions", "it-services"],
      size: "enterprise",
      founded: 1885,
      
      contacts: [{
        name: "Marie Dupont",
        title: {
          fr: "Directrice des Partenariats Stratégiques",
          en: "Strategic Partnership Director"
        },
        email: "partnerships@cats.fr",
        linkedin: "https://linkedin.com/in/marie-dupont"
      }],
      address: {
        street: "12 Place des États-Unis",
        city: "Annecy",
        postalCode: "74000",
        country: "France",
        region: "auvergne-rhone-alpes"
      },
      
      socialMedia: {
        linkedin: "https://linkedin.com/company/credit-agricole-technologies-services",
        twitter: "https://twitter.com/CA_Technologies"
      },
      
      partnership: {
        level: "platinum",
        status: "active",
        startDate: "2023-01-01",
        renewalDate: "2025-01-01",
        contributions: [{
          fr: "Mentorat professionnel",
          en: "Professional mentoring"
        }, {
          fr: "Stages et alternances",
          en: "Internships and apprenticeships"
        }]
      },
      
      collaborations: {
        events: [{
          fr: "Tech Talks mensuels",
          en: "Monthly Tech Talks"
        }],
        initiatives: [{
          fr: "Programme de mentorat pour étudiantes",
          en: "Mentoring program for female students"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 1,
        tags: ["technology", "banking", "mentoring", "internships"],
        languages: ["fr", "en"]
      }
    },
  
    "Logo_LISTIC.jpg": {
      id: "listic-001",
      name: {
        fr: "LISTIC",
        en: "LISTIC"
      },
      shortDescription: {
        fr: "Laboratoire d'Informatique, Systèmes, Traitement de l'Information et de la Connaissance",
        en: "Laboratory of Computer Science, Systems, Information and Knowledge Processing"
      },
      description: {
        fr: "Le Laboratoire d'Informatique, Systèmes, Traitement de l'Information et de la Connaissance (LISTIC) est une unité de recherche de l'Université Savoie Mont Blanc, spécialisée dans les domaines de l'intelligence artificielle et du traitement des données.",
        en: "The Laboratory of Computer Science, Systems, Information and Knowledge Processing (LISTIC) is a research unit of Savoie Mont Blanc University, specialized in artificial intelligence and data processing."
      },
      logo: {
        url: "/partners/Logo_LISTIC.jpg",
        altText: {
          fr: "Logo LISTIC",
          en: "LISTIC Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://www.univ-smb.fr/listic/",
      type: "academic",
      industry: ["research", "education", "technology"],
      expertise: ["artificial-intelligence", "data-processing", "computer-science"],
      
      contacts: [{
        name: "Prof. Laurent Martin",
        title: {
          fr: "Directeur du Laboratoire",
          en: "Laboratory Director"
        },
        email: "direction@listic.univ-smb.fr"
      }],
      address: {
        street: "5 chemin de Bellevue",
        city: "Annecy",
        postalCode: "74940",
        country: "France",
        region: "auvergne-rhone-alpes"
      },
      
      socialMedia: {
        linkedin: "https://linkedin.com/company/listic-lab",
        twitter: "https://twitter.com/LISTIC_Lab"
      },
      
      partnership: {
        level: "academic",
        status: "active",
        startDate: "2022-09-01",
        renewalDate: "2024-09-01",
        contributions: [{
          fr: "Collaboration en recherche",
          en: "Research collaboration"
        }, {
          fr: "Supervision de projets étudiants",
          en: "Student project supervision"
        }]
      },
      
      collaborations: {
        events: [{
          fr: "Séminaires de recherche",
          en: "Research seminars"
        }],
        projects: [{
          fr: "Projets de recherche en IA",
          en: "AI research projects"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 2,
        tags: ["research", "ai", "education", "computer-science"],
        languages: ["fr", "en"]
      }
    },
  
    "Logo_NTN.png": {
      id: "ntn-001",
      name: {
        fr: "NTN-SNR",
        en: "NTN-SNR"
      },
      shortDescription: {
        fr: "Leader mondial en roulements et solutions mécaniques",
        en: "Global leader in bearings and mechanical solutions"
      },
      description: {
        fr: "Leader mondial dans la conception, le développement et la fabrication de roulements, solutions linéaires, et composants automobiles. NTN-SNR innove constamment pour répondre aux défis de l'industrie moderne.",
        en: "Global leader in the design, development and manufacture of bearings, linear solutions, and automotive components. NTN-SNR constantly innovates to meet the challenges of modern industry."
      },
      logo: {
        url: "/partners/Logo_NTN.png",
        altText: {
          fr: "Logo NTN-SNR",
          en: "NTN-SNR Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://www.ntn-snr.com/",
      type: "corporate",
      industry: ["manufacturing", "automotive", "engineering"],
      expertise: ["mechanical-engineering", "automotive-solutions", "innovation"],
      size: "enterprise",
      founded: 1916,
      
      contacts: [{
        name: "Sophie Bernard",
        title: {
          fr: "Responsable Relations Écoles",
          en: "School Relations Manager"
        },
        email: "education@ntn-snr.fr",
        linkedin: "https://linkedin.com/in/sophie-bernard"
      }],
      address: {
        street: "1 rue des Usines",
        city: "Annecy",
        postalCode: "74000",
        country: "France",
        region: "auvergne-rhone-alpes"
      },
      
      socialMedia: {
        linkedin: "https://linkedin.com/company/ntn-snr",
        twitter: "https://twitter.com/NTNSNRGroup",
        youtube: "https://youtube.com/NTNSNRGroup"
      },
      
      partnership: {
        level: "gold",
        status: "active",
        startDate: "2023-01-01",
        renewalDate: "2025-01-01",
        contributions: [{
          fr: "Stages en ingénierie",
          en: "Engineering internships"
        }, {
          fr: "Visites d'usine",
          en: "Factory visits"
        }]
      },
      
      collaborations: {
        events: [{
          fr: "Journées portes ouvertes",
          en: "Open house days"
        }],
        initiatives: [{
          fr: "Programme découverte des métiers",
          en: "Career discovery program"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 1,
        tags: ["manufacturing", "engineering", "internships"],
        languages: ["fr", "en", "de", "ja"]
      }
    },
  
    "Logo_Polytech_Annecy_Chambery.svg.png": {
      id: "polytech-001",
      name: {
        fr: "Polytech Annecy-Chambéry",
        en: "Polytech Annecy-Chambery"
      },
      shortDescription: {
        fr: "École d'ingénieurs publique du réseau Polytech",
        en: "Public engineering school of the Polytech network"
      },
      description: {
        fr: "École d'ingénieurs publique membre du réseau Polytech, formant des ingénieurs dans divers domaines technologiques. Reconnue pour son excellence académique et ses liens étroits avec l'industrie.",
        en: "Public engineering school member of the Polytech network, training engineers in various technological fields. Recognized for its academic excellence and close ties with industry."
      },
      logo: {
        url: "/partners/Logo_Polytech_Annecy_Chambery.svg.png",
        altText: {
          fr: "Logo Polytech Annecy-Chambéry",
          en: "Polytech Annecy-Chambery Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://www.polytech.univ-smb.fr/",
      type: "academic",
      industry: ["education", "engineering"],
      expertise: ["engineering-education", "research", "innovation"],
      founded: 1979,
      
      contacts: [{
        name: "Dr. Anne Martin",
        title: {
          fr: "Directrice des Relations Entreprises",
          en: "Corporate Relations Director"
        },
        email: "entreprises@polytech.univ-smb.fr",
        linkedin: "https://linkedin.com/in/anne-martin"
      }],
      address: {
        street: "5 chemin de Bellevue",
        city: "Annecy",
        postalCode: "74940",
        country: "France",
        region: "auvergne-rhone-alpes"
      },
      
      socialMedia: {
        linkedin: "https://linkedin.com/school/polytech-annecy-chambery",
        twitter: "https://twitter.com/PolytechAnnecy",
        facebook: "https://facebook.com/PolytechAnnecyChambery"
      },
      
      partnership: {
        level: "academic",
        status: "active",
        startDate: "2022-09-01",
        renewalDate: "2024-09-01",
        contributions: [{
          fr: "Support académique",
          en: "Academic support"
        }, {
          fr: "Ressources pédagogiques",
          en: "Educational resources"
        }]
      },
      
      collaborations: {
        events: [{
          fr: "Forums carrières",
          en: "Career fairs"
        }],
        initiatives: [{
          fr: "Programme de promotion des femmes en ingénierie",
          en: "Women in engineering promotion program"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 1,
        tags: ["education", "engineering", "research"],
        languages: ["fr", "en"]
      }
    },
  
    "Logo_Sopra_Steria.png": {
      id: "sopra-001",
      name: {
        fr: "Sopra Steria",
        en: "Sopra Steria"
      },
      shortDescription: {
        fr: "Leader européen de la transformation digitale",
        en: "European leader in digital transformation"
      },
      description: {
        fr: "Leader européen de la transformation digitale, proposant des services de conseil, solutions digitales et édition de logiciels. Sopra Steria accompagne ses clients dans leur transformation numérique et leur développement durable.",
        en: "European leader in digital transformation, offering consulting services, digital solutions and software publishing. Sopra Steria supports its clients in their digital transformation and sustainable development."
      },
      logo: {
        url: "/partners/Logo_Sopra_Steria.png",
        altText: {
          fr: "Logo Sopra Steria",
          en: "Sopra Steria Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://www.soprasteria.com/",
      type: "corporate",
      industry: ["consulting", "technology", "software"],
      expertise: ["digital-transformation", "consulting", "software-development"],
      size: "enterprise",
      founded: 1968,
      
      contacts: [{
        name: "Pierre Dubois",
        title: {
          fr: "Responsable Recrutement Campus",
          en: "Campus Recruitment Manager"
        },
        email: "campus@soprasteria.com",
        linkedin: "https://linkedin.com/in/pierre-dubois"
      }],
      address: {
        street: "PAE Les Glaisins",
        city: "Annecy-le-Vieux",
        postalCode: "74940",
        country: "France",
        region: "auvergne-rhone-alpes"
      },
      
      socialMedia: {
        linkedin: "https://linkedin.com/company/soprasteria",
        twitter: "https://twitter.com/soprasteria",
        youtube: "https://youtube.com/SopraSteria"
      },
      
      partnership: {
        level: "gold",
        status: "active",
        startDate: "2023-01-01",
        renewalDate: "2025-01-01",
        contributions: [{
          fr: "Stages et alternances",
          en: "Internships and work-study programs"
        }, {
          fr: "Mentorat technique",
          en: "Technical mentoring"
        }]
      },
      
      collaborations: {
        events: [{
          fr: "Ateliers techniques",
          en: "Technical workshops"
        }],
        initiatives: [{
          fr: "Programme de coaching carrière",
          en: "Career coaching program"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 1,
        tags: ["technology", "consulting", "digital-transformation"],
        languages: ["fr", "en", "es", "de"]
      }
    },
  
    "Logo_Ville_Annecy.png": {
      id: "annecy-001",
      name: {
        fr: "Ville d'Annecy",
        en: "City of Annecy"
      },
      shortDescription: {
        fr: "Capitale de la Haute-Savoie",
        en: "Capital of Haute-Savoie"
      },
      description: {
        fr: "Capitale de la Haute-Savoie, ville dynamique soutenant l'innovation et l'éducation. Annecy s'engage activement dans le développement des compétences et l'égalité des chances dans les domaines technologiques.",
        en: "Capital of Haute-Savoie, a dynamic city supporting innovation and education. Annecy is actively involved in skills development and equal opportunities in technological fields."
      },
      logo: {
        url: "/partners/Logo_Ville_Annecy.png",
        altText: {
          fr: "Logo Ville d'Annecy",
          en: "City of Annecy Logo"
        },
        width: 200,
        height: 100
      },
      website: "https://www.annecy.fr/",
      type: "institutional",
      industry: ["government", "local-authority"],
      expertise: ["urban-development", "education", "innovation-support"],
      
      contacts: [{
        name: "Claire Petit",
        title: {
          fr: "Directrice de l'Innovation et de l'Enseignement Supérieur",
          en: "Director of Innovation and Higher Education"
        },
        email: "innovation@annecy.fr",
        linkedin: "https://linkedin.com/in/claire-petit"
      }],
      address: {
        street: "Esplanade de l'Hôtel de Ville",
        city: "Annecy",
        postalCode: "74000",
        country: "France",
        region: "auvergne-rhone-alpes"
      },
      
      socialMedia: {
        facebook: "https://facebook.com/VilleAnnecy",
        twitter: "https://twitter.com/Annecy_Officiel",
        instagram: "https://instagram.com/villeannecy"
      },
      
      partnership: {
        level: "institutional",
        status: "active",
        startDate: "2023-01-01",
        renewalDate: "2025-01-01",
        contributions: [{
          fr: "Support logistique aux événements",
          en: "Logistical support for events"
        }, {
          fr: "Mise en réseau local",
          en: "Local networking"
        }]
      },
      
      collaborations: {
        events: [{
          fr: "Forum de l'innovation",
          en: "Innovation forum"
        }],
        initiatives: [{
          fr: "Programme ville intelligente",
          en: "Smart city program"
        }]
      },
      
      metadata: {
        lastUpdated: "2024-02-01",
        featured: true,
        priority: 2,
        tags: ["local-government", "innovation", "education-support"],
        languages: ["fr", "en"]
      }
    }
  };