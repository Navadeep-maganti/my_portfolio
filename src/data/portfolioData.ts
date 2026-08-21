export interface Project {
  title: string;
  description: string;
  category: 'Full-Stack' | 'Mobile' | 'Systems & APIs';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  highlights?: string[];
}

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'Exploring' | 'Prototyping' | 'Researching' | 'Open to Collaborators';
  category: 'Healthcare AI' | 'Health Data' | 'Safety Tech';
  tags: string[];
  proposedArchitecture?: string;
  lookingFor?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Languages' | 'Tools & Others';
  level: number;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  skills?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  score: string;
  scoreLabel: string;
  location: string;
  highlights: string[];
}

export interface LeetCodeStats {
  username: string;
  solved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  ranking: number;
  acceptanceRate: number;
}

export interface Achievement {
  title: string;
  description: string;
  year?: string;
  tag?: string;
}

export interface LeadershipActivity {
  role: string;
  description: string;
  organization?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  roles: string[];
  subTitle: string;
  bio: string;
  email: string;
  phone: string;
  studentEmail: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  location: string;
  status: string;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  ideas: ProjectIdea[];
  experiences: Experience[];
  leetcodeStats: LeetCodeStats;
  achievements: Achievement[];
  leadership: LeadershipActivity[];
}

export const portfolioData: PortfolioData = {
  name: "Navadeep Maganti",
  title: "I Build What I Wish Existed",
  roles: [
    "Building Ideas Into Real-World Systems",
    "Exploring Software, AI & System Design",
    "Turning Real Problems Into Practical Products",
    "B.Tech CSE @ NIT Andhra Pradesh"
  ],
  subTitle: "A Computer Science student exploring software, AI, and system design by turning interesting problems into practical products.",
  bio: "I like building things that start with a \"what if?\" I am a Computer Science student interested in turning real-world problems into practical software solutions. Most of my projects begin as ideas: noticing something that could work better, exploring how technology could help, and gradually shaping that idea into a system that can actually be built. My interests span full-stack development, AI/ML, intelligent automation, and system design, with a focus on useful products rather than just demonstrating technologies. I am still learning, experimenting, and occasionally overcomplicating ideas before figuring out how to simplify them, but that is also what makes building them interesting.",
  email: "magantinavadeep@gmail.com",
  phone: "+91 9494463809",
  studentEmail: "424151@student.nitandhra.ac.in",
  resumeUrl: "#",
  githubUrl: "https://github.com/Navadeep-maganti",
  linkedinUrl: "https://www.linkedin.com/in/navadeep-maganti-735250349/",
  leetcodeUrl: "https://leetcode.com/u/NAVADEEP_MAGANTI/",
  location: "Tadepalligudem, Andhra Pradesh, India",
  status: "Open to Summer Internships & Software Roles",
  education: [
    {
      institution: "National Institute of Technology, Andhra Pradesh",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      period: "Aug 2024 – Present (Graduating 2028)",
      score: "8.3",
      scoreLabel: "CGPA",
      location: "Tadepalligudem, AP",
      highlights: [
        "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Discrete Mathematics",
        "Active member of Technical Fest & Open Source development communities"
      ]
    },
    {
      institution: "Narayana Junior College",
      degree: "Higher Secondary Certificate (Class XII)",
      field: "MPC (Mathematics, Physics, Chemistry)",
      period: "Jun 2022 – May 2024",
      score: "973 / 1000 (97.3%)",
      scoreLabel: "Score",
      location: "Vijayawada, AP",
      highlights: [
        "Ranked top percentile in State Board Examinations",
        "Secured All India Rank (AIR) 14,707 in JEE Main 2024 among 1.4+ million candidates"
      ]
    }
  ],
  skills: [
    // Languages
    { name: "C++", category: "Languages", level: 92 },
    { name: "Java", category: "Languages", level: 82 },
    { name: "Python", category: "Languages", level: 88 },
    { name: "JavaScript", category: "Languages", level: 80 },
    { name: "HTML5/CSS3", category: "Languages", level: 88 },

    // Frontend
    { name: "React.js", category: "Frontend", level: 84 },
    { name: "Flutter", category: "Frontend", level: 78 },
    { name: "DOM Manipulation", category: "Frontend", level: 82 },
    { name: "Responsive UI", category: "Frontend", level: 88 },

    // Backend
    { name: "Django", category: "Backend", level: 85 },
    { name: "REST APIs", category: "Backend", level: 88 },
    { name: "DBMS", category: "Backend", level: 82 },
    { name: "Operating Systems", category: "Backend", level: 78 },

    // Tools
    { name: "Git & GitHub", category: "Tools & Others", level: 88 },
    { name: "Postman", category: "Tools & Others", level: 82 },
    { name: "LeetCode", category: "Tools & Others", level: 92 }
  ],
  projects: [
    {
      title: "TestDoc Pro - Test Case Documenter",
      category: "Full-Stack",
      description: "A production-grade QA test management platform for organizing projects, authoring test cases, executing step-by-step validations, attaching screenshot evidence, and generating audit-ready PDF, Word, CSV, and JSON reports.",
      tags: ["Next.js", "React 19", "Prisma", "PostgreSQL", "NextAuth", "PDF/DOCX Export"],
      githubUrl: "https://github.com/Navadeep-maganti/Test_case_documenter",
      liveUrl: "https://test-case-documenter.vercel.app/",
      featured: true,
      highlights: [
        "Project-centric test suites with pass/fail/blocked execution tracking",
        "Clipboard screenshot proof upload with export-ready evidence",
        "Secure Google OAuth authentication with Prisma-backed persistence"
      ]
    },
    {
      title: "University Placement Portal",
      category: "Full-Stack",
      description: "A secure and scalable full-stack application featuring student and recruiter authentication with role-based access control. Designed robust backend APIs for tracking and managing placement pipelines, interview schedules, and applicant screening.",
      tags: ["React.js", "Django", "REST APIs", "DBMS", "JWT"],
      githubUrl: "https://github.com/Navadeep-maganti/Placement-Portal",
      featured: true,
      highlights: [
        "Role-based authorization for students, recruiters, and TPO admins",
        "RESTful API design with Django REST Framework",
        "Automated application status tracking and filtering"
      ]
    },
    {
      title: "Library Management Application",
      category: "Mobile",
      description: "A responsive cross-platform mobile application built with Flutter for fast searching, reservation, and live inventory tracking of library books. Integrated secure backend verification for authentication and efficient transaction logging.",
      tags: ["Flutter", "Dart", "Firebase", "State Management"],
      githubUrl: "https://github.com/Navadeep-maganti/library-book-reservation-app",
      featured: true,
      highlights: [
        "Cross-platform support with responsive Flutter UI",
        "Real-time inventory lookup and booking status updates",
        "Clean architecture with robust state management"
      ]
    },
    // {
    //   title: "Smart Scheduler & Agenda Optimizer",
    //   category: "Systems & APIs",
    //   description: "An intelligent task scheduling application that optimizes daily agendas and meeting timings based on priority levels, deadline urgency, and user availability vectors. Employs priority sorting algorithms to minimize time conflicts.",
    //   tags: ["React.js", "Django", "REST APIs", "Algorithms", "Optimization"],
    //   githubUrl: "https://github.com/Navadeep-maganti/Smart_Scheduler_backend",
    //   featured: true,
    //   highlights: [
    //     "Dynamic priority sorting algorithm to resolve meeting overlaps",
    //     "Intuitive calendar UI with instant conflict alerts",
    //     "Custom heuristic for deadline-based scheduling"
    //   ]
    // }
  ],
  ideas: [
    {
      id: "healthbridge",
      title: "HealthBridge - AI-Powered Preventive Healthcare Platform",
      tagline: "A multilingual AI health companion for preventive guidance, symptom awareness, and everyday health decisions.",
      category: "Healthcare AI",
      status: "Open to Collaborators",
      description: "HealthBridge is designed to make preventive healthcare more accessible by turning trusted medical knowledge into simple, personalized guidance. The platform would support AI-powered health education, symptom awareness, medication reminders, lifestyle recommendations, and early risk signals while keeping users informed without replacing professional medical care.",
      proposedArchitecture: "Mobile/Web App + AI Guidance Layer + Multilingual Knowledge Base + Secure User Profiles",
      lookingFor: "Collaborators interested in healthcare UX, AI safety, multilingual product design, medical knowledge systems, and backend engineering.",
      tags: ["Healthcare AI", "Preventive Care", "Multilingual", "Health Education", "Mobile App"]
    },
    {
      id: "health-intelligence-platform",
      title: "Health Intelligence Platform",
      tagline: "A privacy-first lifelong health timeline that transforms scattered medical records into meaningful insights.",
      category: "Health Data",
      status: "Researching",
      description: "A secure platform where users can consolidate lab reports, prescriptions, scans, discharge summaries, and health records into one organized timeline. The system would extract structured information from unstructured documents, surface trends over time, and help patients understand their medical history through personalized, explainable analysis.",
      proposedArchitecture: "Document Upload + OCR/NLP Pipeline + Encrypted Health Timeline + Insight Dashboard",
      lookingFor: "Collaborators with interest in privacy engineering, OCR/NLP, medical document parsing, secure cloud architecture, and data visualization.",
      tags: ["Health Records", "Privacy", "OCR", "NLP", "Data Visualization"]
    },
    {
      id: "safecity-ai",
      title: "SafeCity AI",
      tagline: "Context-aware personal safety assistance powered by AI, geospatial intelligence, and real-time signals.",
      category: "Safety Tech",
      status: "Open to Collaborators",
      description: "SafeCity AI aims to move beyond conventional SOS apps by understanding travel context, location patterns, route risk, time of day, and real-time environmental signals. The platform would provide adaptive safety recommendations, trusted contact workflows, safer route suggestions, and privacy-conscious assistance before a situation becomes critical.",
      proposedArchitecture: "Mobile App + Geospatial Risk Engine + AI Context Analysis + Real-Time Alert APIs",
      lookingFor: "Looking for collaborators across AI/ML, mobile development, backend systems, and geospatial intelligence.",
      tags: ["AI/ML", "Mobile", "Backend", "Geospatial", "Personal Safety"]
    }
  ],
  experiences: [
    {
      role: "Web Developer – Vulcanzy 2026",
      company: "NIT Andhra Pradesh",
      period: "Feb 2026 - Mar 2026",
      location: "Tadepalligudem, AP",
      description: [
        "Engineered the official responsive event website for the institute's flagship annual technical festival.",
        "Optimized cross-browser performance and collaborated with design teams on UI/UX flows.",
        "Ensured zero-downtime operations during high-traffic registration and event scheduling windows."
      ],
      skills: ["React.js", "JavaScript", "Responsive Design", "Git"]
    },
    {
      role: "Full-Stack Developer Intern",
      company: "TechnoForest Innovations",
      period: "Aug 2025 - Feb 2026",
      location: "Remote",
      description: [
        "Architected and deployed responsive web modules using React.js and Django with deep backend service integration.",
        "Implemented secure JWT/Session authentication protocols and designed relational database schemas.",
        "Streamlined API response times by optimizing database query logic and endpoint caching."
      ],
      skills: ["Django", "React.js", "REST APIs", "SQL", "Postman"]
    }
  ],
  leetcodeStats: {
    username: "NAVADEEP_MAGANTI",
    solved: 177,
    totalQuestions: 4029,
    easySolved: 76,
    easyTotal: 960,
    mediumSolved: 92,
    mediumTotal: 2103,
    hardSolved: 9,
    hardTotal: 966,
    ranking: 955881,
    acceptanceRate: 56.3
  },
  achievements: [
    {
      title: "JEE Main 2024 – AIR 14,707",
      description: "Secured an All India Rank of 14,707 among 1.4+ million candidates in one of the most competitive engineering entrance exams in India.",
      year: "2024",
      tag: "Competitive Exam"
    },
    {
      title: "12th Board Examinations – 97.3%",
      description: "Achieved a score of 973/1000 (97.3%) in Mathematics, Physics, and Chemistry at Narayana Junior College.",
      year: "2024",
      tag: "Academic"
    },
    {
      title: "177+ LeetCode Problem Solutions",
      description: "Solved 177+ algorithmic problems across Data Structures, Dynamic Programming, Graph Algorithms, and Trees.",
      year: "2025-2026",
      tag: "Algorithms"
    }
  ],
  leadership: [
    {
      role: "Workshop Volunteer – Google & Hack2Skill",
      organization: "NIT Andhra Pradesh",
      description: "Mentored attendees and facilitated hands-on coding labs during the campus-wide AI and Web Technology workshop series."
    },
    {
      role: "Technical Event Co-Organizer",
      organization: "Ideathon & Project Expo",
      description: "Coordinated logistics, evaluated submissions, and hosted participants during institute-level engineering showcases."
    },
    {
      role: "Institute Athlete – Basketball",
      organization: "NIT Andhra Pradesh Sports Contingent",
      description: "Represented NIT Andhra Pradesh in the Inter-NIT Basketball Tournament, demonstrating teamwork and sportsmanship."
    }
  ]
};
