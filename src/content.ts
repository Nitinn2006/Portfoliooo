export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  techTags: string[];
  githubUrl: string;
  status?: string;
  isLead?: boolean;
  statCallouts?: {
    value: string;
    label: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  dateOrDetail: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioContent {
  header: {
    name: string;
    role: string;
    location: string;
    subtitle: string;
  };
  navigation: {
    id: 'projects' | 'achievements' | 'about' | 'contact';
    number: string;
    label: string;
  }[];
  hud: {
    statusBadge: string;
    soundLabel: string;
    overviewLabel: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ProjectItem[];
  };
  achievements: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: AchievementItem[];
  };
  about: {
    sectionTitle: string;
    bio: string[];
    education: {
      degree: string;
      institution: string;
      focus: string;
    };
    skillGroups: SkillCategory[];
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    email: string;
    githubUrl: string;
    linkedinUrl: string; // If empty string, UI hides button completely
    cvPath: string;
    cvButtonLabel: string;
  };
}

export const content: PortfolioContent = {
  header: {
    name: 'NITIN KASHYAP',
    role: 'DATA ANALYST',
    location: 'KANPUR',
    subtitle: 'DATA ANALYST • AI/ML • KANPUR',
  },
  navigation: [
    { id: 'projects', number: '01', label: 'PROJECTS' },
    { id: 'achievements', number: '02', label: 'ACHIEVEMENTS' },
    { id: 'about', number: '03', label: 'ABOUT' },
    { id: 'contact', number: '04', label: 'CONTACT' },
  ],
  hud: {
    statusBadge: 'OPEN TO INTERNSHIPS',
    soundLabel: 'AUDIO OFF',
    overviewLabel: 'OVERVIEW',
  },
  projects: {
    sectionTitle: 'Featured Projects',
    sectionSubtitle: 'Selected work in data analytics, computer vision, and systems engineering.',
    items: [
      {
        id: 'netflix-analysis',
        title: 'Netflix Dataset Analysis',
        summary:
          'Cleaned ~8,800 records (text-formatted dates, regional-setting conflicts) and analyzed catalog trends with Excel PivotTables and a pandas notebook.',
        techTags: ['Excel', 'Python', 'pandas', 'matplotlib', 'seaborn'],
        githubUrl: 'https://github.com/Nitinn2006',
        isLead: true,
        statCallouts: [
          { value: '~70%', label: 'Catalog Movies' },
          { value: '2019', label: 'Peak Additions' },
          { value: '46%', label: 'US Presence' },
        ],
      },
      {
        id: 'safar-adas',
        title: 'SAFAR - Advanced Driver Assistance System',
        summary:
          'Driver drowsiness and loss-of-consciousness detection that triggers braking and a safe lane-change response (Smart India Hackathon 2026).',
        techTags: ['MediaPipe', 'Webots', 'CARLA', 'Python'],
        githubUrl: 'https://github.com/Nitinn2006',
        status: 'IN PROGRESS',
      },
      {
        id: 'findit-lendit',
        title: 'FindIt LendIt',
        summary:
          'Campus resource-sharing web app built with AI-assisted coding. Handled DB connectivity, routing, debugging, and improved item auto-matching with a synonym map.',
        techTags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Drizzle ORM'],
        githubUrl: 'https://github.com/Nitinn2006',
      },
      {
        id: 'flower-generator',
        title: 'Hand Gesture Flower Generator',
        summary:
          'Real-time webcam application detecting hand gestures and dynamically generating blooming flower visuals on screen.',
        techTags: ['Computer Vision', 'MediaPipe', 'Python'],
        githubUrl: 'https://github.com/Nitinn2006',
      },
    ],
  },
  achievements: {
    sectionTitle: 'Achievements & Certifications',
    sectionSubtitle: 'Competitions, hackathons, and certified skill milestones.',
    items: [
      {
        id: 'sih-2026',
        title: 'Smart India Hackathon 2026',
        issuerOrEvent: 'Internal Round — 2nd Position',
        dateOrDetail: 'Team SAFAR',
      },
      {
        id: 'kaggle-pandas',
        title: 'Kaggle Certification: Pandas',
        issuerOrEvent: 'Kaggle',
        dateOrDetail: 'Sept 2026',
      },
      {
        id: 'kaggle-intro-ml',
        title: 'Kaggle: Intro to Machine Learning',
        issuerOrEvent: 'Kaggle',
        dateOrDetail: 'Sept 2026',
      },
    ],
  },
  about: {
    sectionTitle: 'About Nitin',
    bio: [
      'BCA student at PSIT, Kanpur (CSJMU). Focused on data analytics and AI/ML.',
    ],
    education: {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'PSIT, Kanpur (CSJMU)',
      focus: 'Data Analytics & AI/ML',
    },
    skillGroups: [
      {
        category: 'Programming',
        skills: ['Python', 'C', 'C++', 'Java basics', 'SQL'],
      },
      {
        category: 'Data',
        skills: ['Excel', 'pandas', 'NumPy', 'matplotlib', 'seaborn'],
      },
      {
        category: 'AI/ML',
        skills: ['scikit-learn', 'MediaPipe', 'Computer Vision'],
      },
      {
        category: 'Web',
        skills: ['HTML', 'CSS', 'JS', 'Next.js / TypeScript / Supabase (AI-assisted)'],
      },
      {
        category: 'Tools',
        skills: ['GitHub', 'Webots', 'CARLA', 'Ollama'],
      },
    ],
  },
  contact: {
    sectionTitle: 'Get In Touch',
    sectionSubtitle: 'Open to data analytics and AI/ML opportunities.',
    email: 'nk3320427@gmail.com',
    githubUrl: 'https://github.com/Nitinn2006',
    linkedinUrl: '', // Left empty as requested: button will be cleanly hidden with no '#' link
    cvPath: './Nitin_Kashyap_CV.pdf',
    cvButtonLabel: 'Download CV',
  },
};
