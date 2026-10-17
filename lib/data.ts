// Single source of truth for portfolio content.
// Update this file when the résumé changes; every section reads from here.

export const profile = {
  name: "Manav Rai",
  role: "SDE-1",
  company: "Gemini Solutions",
  headline: "AI Engineer, GenAI & Full Stack",
  summary:
    "My work spans multi-agent platforms, LLM-powered pipelines and full-stack products, from LangGraph agents on AWS Bedrock to a Flutter app used by 100+ patients. I care about software that holds up in production, not just in demos.",
  location: "Chandigarh, India",
  timezone: "IST · UTC+5:30",
  email: "manavrai454@gmail.com",
  phone: "+91 8054776034",
  phoneHref: "tel:+918054776034",
  resume: "/Manav_Rai_Resume.pdf",
  resumeDownloadName: "Manav_Rai_Resume.pdf",
  site: "https://manavrai.netlify.app",
  availability: "Open to AI Engineer & SDE roles",
  socials: {
    github: "https://github.com/coderiders22",
    githubHandle: "coderiders22",
    linkedin: "https://www.linkedin.com/in/manavrai/",
    linkedinHandle: "manavrai",
  },
} as const;

export const navLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { value: 5, suffix: "", label: "Professional roles", detail: "Enterprise, healthcare, defense" },
  { value: 15, suffix: "+", label: "Projects shipped", detail: "Production & hackathon builds" },
  { value: 100, suffix: "+", label: "Patients served", detail: "By my PGIMER Flutter app" },
  { value: 4, suffix: "", label: "Awards & honors", detail: "Incl. 1st place & national finalist" },
] as const;

export const organisations = [
  "Gemini Solutions",
  "Syncloop.ai",
  "PGIMER Chandigarh",
  "Indian Air Force",
  "Foundingame",
  "Punjab Engineering College",
] as const;

export const pillars = [
  {
    icon: "bot",
    title: "GenAI & Agentic Systems",
    body: "Multi-agent orchestration with LangGraph, prompt engineering, human-in-the-loop approvals, self-healing QA and LLM-powered testing pipelines on AWS Bedrock.",
    tools: ["LangGraph", "AWS Bedrock", "Prompt Engineering", "Autogen", "OpenAI / Azure OpenAI"],
  },
  {
    icon: "server",
    title: "Backend & Platform",
    body: "Production APIs and microservices with FastAPI and Spring Boot: auth, RBAC, usage limits, CI/CD on Jenkins and container deploys to EC2.",
    tools: ["FastAPI", "Spring Boot", "Docker", "Jenkins"],
  },
  {
    icon: "layers",
    title: "Full-stack & Mobile",
    body: "Product-grade interfaces in Next.js and React, and cross-platform mobile apps in Flutter that real users rely on every day.",
    tools: ["Next.js", "React", "Flutter", "PostgreSQL"],
  },
] as const;

export type Experience = {
  company: string;
  companyUrl?: string;
  org?: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Gemini Solutions",
    companyUrl: "https://www.geminisolutions.com/",
    role: "SDE-1 · GenAI",
    period: "Mar 2026 - Present",
    current: true,
    points: [
      "Built a multi-agent **Agentic SDLC platform** (LangGraph, FastAPI, AWS Bedrock) automating **BRD-to-production**: code generation, self-healing QA, automated Jenkins/EC2 deployment, AI log RCA, secure auth, RBAC and usage limits. Now expanding to Figma and mobile apps.",
      "Built an **AI-driven API contract testing pipeline** on Azure OpenAI (LLM-based test generation, review and human-approval workflow on Jenkins) with automated baseline management and confidence-based reasoning.",
    ],
    stack: ["LangGraph", "FastAPI", "AWS Bedrock", "Docker", "Jenkins", "EC2"],
  },
  {
    company: "Syncloop.ai",
    companyUrl: "https://www.syncloop.ai/",
    org: "Nature9 Consulting",
    role: "Software Developer Intern",
    period: "Jan 2025 - Jun 2025",
    points: [
      "Designed **3+ use cases** and built key tools (flowchart builder, VS Code extension, Chathire.ai and product demo), improving platform adoption.",
      "Contributed to **Spring Boot microservices** for AI agent/team creation, enabling SEO, access control and workflow automation.",
    ],
    stack: ["Java", "Spring Boot", "Microservices", "JavaScript"],
  },
  {
    company: "PGIMER Chandigarh",
    companyUrl: "https://pgimer.edu.in/PGIMER_PORTAL/PGIMERPORTAL/home.jsp",
    org: "Postgraduate Institute of Medical Education & Research",
    role: "Mobile App Developer",
    period: "Oct 2024 - Jan 2025",
    location: "Chandigarh",
    points: [
      "Launched a **Flutter healthcare app used by 100+ patients**, improving tracking by **35%**.",
      "Built medical-history and assessment modules with smooth data flow and secure API integration.",
    ],
    stack: ["Flutter", "Dart", "Spring Boot", "MySQL", "REST APIs"],
  },
  {
    company: "Foundingame",
    companyUrl: "https://www.linkedin.com/company/foundingame",
    role: "Founder's Office Intern",
    period: "Aug 2024 - Sep 2024",
    location: "London, UK",
    points: [
      "Worked across operations and UI development in the founder's office, streamlining internal processes and improving interface designs.",
    ],
    stack: ["UI Design", "Operations"],
  },
  {
    company: "Indian Air Force",
    role: "Windows Application Developer",
    org: "Aircraft Health Predictor",
    period: "Oct 2023 - Feb 2024",
    points: [
      "Created a Windows application that predicts **aircraft engine health** from on-board data, improving diagnostics speed by **40%**.",
      "Processed aircraft data with ML models for predictive analytics.",
    ],
    stack: ["Python", "Machine Learning", "Windows"],
  },
];

export type FeaturedProject = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  highlights: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  status: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "agentic-sdlc",
    title: "Agentic SDLC",
    kicker: "Multi-agent development platform · Gemini Solutions",
    summary:
      "A LangGraph + FastAPI + AWS Bedrock multi-agent pipeline that turns a business requirements doc into tested, deployed applications.",
    highlights: [
      "Human-in-the-loop approval gates",
      "Self-healing QA loop running inside Docker",
      "Git OAuth pull requests and automated EC2 deploys via Jenkins",
      "AI log root-cause analysis, secure auth, RBAC and daily usage limits",
    ],
    stack: ["LangGraph", "FastAPI", "AWS Bedrock", "Docker", "Jenkins", "React"],
    metrics: [
      { value: "BRD → Prod", label: "End-to-end automation" },
      { value: "Self-healing", label: "QA in Docker" },
    ],
    status: "In production",
  },
  {
    slug: "contract-testing",
    title: "API Contract Testing",
    kicker: "LLM-powered CI pipeline · Gemini Solutions",
    summary:
      "A Jenkins pipeline on Azure OpenAI that reviews API contracts, generates and runs tests from OpenAPI specs, and explains failures, with a human approval step for anything the AI isn't sure about.",
    highlights: [
      "AI contract review for security, design and compliance issues",
      "Tests generated only for endpoints that changed, using saved baselines",
      "Confidence-based auto-approval, with human review in Jenkins for flagged tests",
      "Failure analysis report with root causes and suggested fixes",
    ],
    stack: ["Python", "Azure OpenAI", "Jenkins", "OpenAPI"],
    metrics: [
      { value: "Spec → Tests", label: "Generated from OpenAPI" },
      { value: "Explainable", label: "Per-test reasoning" },
    ],
    status: "Enterprise pipeline",
  },
  {
    slug: "pgimer-health",
    title: "PGIMER Healthcare App",
    kicker: "Patient self-management · PGIMER Sector-12, Chandigarh",
    summary:
      "A Flutter app built with doctors at PGIMER that helps patients manage their medical history and assessments.",
    highlights: [
      "Built alongside medical professionals for real clinical workflows",
      "Medical-history and assessment modules with secure API integration",
      "Adopted by 100+ patients with a 35% improvement in tracking",
      "Recognised with a Letter of Appreciation from PEC Chandigarh",
    ],
    stack: ["Flutter", "Spring Boot", "MySQL", "REST APIs"],
    metrics: [
      { value: "100+", label: "Active patients" },
      { value: "+35%", label: "Tracking improvement" },
    ],
    status: "Letter of Appreciation",
  },
];

export type ProjectCategory = "AI/ML" | "Full-stack" | "Mobile" | "Web3";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  categories: ProjectCategory[];
  award?: string;
  github?: string;
  private?: string;
};

export const projects: Project[] = [
  {
    title: "Om Browser",
    description:
      "Chromium-based secure browser with an ML-powered extension that detects and flags dark patterns on e-commerce sites.",
    stack: ["Chromium", "ML", "JavaScript"],
    categories: ["AI/ML", "Full-stack"],
    award: "National Finalist · IIT BHU",
    github: "https://github.com/coderiders22/Dark-Pattern-IIT-BHU-hackathon",
  },
  {
    title: "VYC (Verify Your Customer)",
    description:
      "Interactive KYC platform with image verification, liveness detection and AI-generated image detection.",
    stack: ["React", "Computer Vision", "AI/ML"],
    categories: ["AI/ML", "Full-stack"],
    award: "2nd Place · STGI Marathon",
    github: "https://github.com/coderiders22/Data-Mavericks",
  },
  {
    title: "Exoplanet Detection",
    description:
      "Random Forest model that detects exoplanets from stellar light-flux time series, served through a Flask app.",
    stack: ["Python", "Random Forest", "Flask"],
    categories: ["AI/ML"],
    award: "1st Place · Astronomix",
    github: "https://github.com/coderiders22/Astronomicx_Hackathon",
  },
  {
    title: "IAF Aircraft Health Predictor",
    description:
      "Windows application for the Indian Air Force that predicts engine health from aircraft data, speeding up diagnostics by 40%.",
    stack: ["Python", "ML", "Windows"],
    categories: ["AI/ML"],
    award: "Defense",
    private: "Confidential",
  },
  {
    title: "AuscultaTech",
    description:
      "AI-driven lung-sound diagnostics platform that classifies key respiratory patterns to help reduce misdiagnoses.",
    stack: ["React", "AI/ML", "Python"],
    categories: ["AI/ML", "Full-stack"],
    award: "A+ Grade",
    github: "https://github.com/coderiders22/Minor-Project-PEC-Chd",
  },
  {
    title: "High-Frequency Trading Platform",
    description:
      "ML-driven trading platform that analyses market data in real time to execute optimised strategies.",
    stack: ["Python", "ML", "Trading APIs"],
    categories: ["AI/ML"],
    github: "https://github.com/coderiders22/lakshmi_chit_funds",
  },
  {
    title: "AlphaStocks",
    description:
      "LSTM stock-price forecasting combined with news sentiment analysis, plus portfolio guidance for beginners.",
    stack: ["LSTM", "NLP", "Python"],
    categories: ["AI/ML"],
    github: "https://github.com/coderiders22/AlphaStocks",
  },
  {
    title: "Data Scientist Salary Prediction",
    description:
      "Regression models predicting data-scientist salaries, with thorough preprocessing and feature engineering.",
    stack: ["Python", "Regression", "Jupyter"],
    categories: ["AI/ML"],
    github: "https://github.com/coderiders22/Data-Scientist-salary-prediction",
  },
  {
    title: "BlockArticles",
    description:
      "Decentralised article management on Klaytn with smart-contract integration and MetaMask authentication.",
    stack: ["Blockchain", "Klaytn", "Smart Contracts"],
    categories: ["Web3", "Full-stack"],
    github: "https://github.com/coderiders22/BLOCKARTICLES",
  },
  {
    title: "Mera Certi",
    description:
      "Mobile app for storing and managing certificates, with voice instructions for better accessibility.",
    stack: ["Flutter", "Firebase", "Voice"],
    categories: ["Mobile"],
    github: "https://github.com/coderiders22/Mera-Certi",
  },
];

export const projectFilters: ("All" | ProjectCategory)[] = ["All", "AI/ML", "Full-stack", "Mobile", "Web3"];

export const skillGroups = [
  {
    title: "AI & Agents",
    icon: "sparkles",
    items: ["LangGraph", "AWS Bedrock", "Prompt Engineering", "Autogen", "OpenAI API", "Azure OpenAI", "Gemini API", "GitHub Copilot"],
  },
  {
    title: "Languages",
    icon: "code",
    items: ["Python", "Java 21", "JavaScript", "Dart", "HTML", "CSS"],
  },
  {
    title: "Backend",
    icon: "server",
    items: ["FastAPI", "Spring Boot", "Node.js", "REST APIs", "Microservices", "Auth & RBAC"],
  },
  {
    title: "Frontend & Mobile",
    icon: "layout",
    items: ["Next.js", "React", "Tailwind CSS", "Flutter"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: ["AWS (EC2, Bedrock)", "Docker", "Jenkins", "CI/CD Pipelines", "Git"],
  },
  {
    title: "Data & Practices",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "Agile", "Technical Documentation", "Performance Optimization"],
  },
] as const;

export const achievements = [
  {
    icon: "trophy",
    title: "1st Place",
    event: "Astronomix Hackathon",
    org: "ASPS & ACM, PEC",
    year: "2023",
    note: "Exoplanet detection from stellar light-flux data.",
  },
  {
    icon: "medal",
    title: "2nd Place",
    event: "24-Hour Coding Marathon",
    org: "STGI Technologies Consulting",
    year: "2024",
    note: "VYC: AI-powered KYC with liveness detection.",
  },
  {
    icon: "flag",
    title: "National Finalist",
    event: "Dark Patterns Buster Hackathon",
    org: "IIT BHU, Varanasi",
    year: "2024",
    note: "Om Browser: ML-based dark-pattern detection.",
  },
  {
    icon: "scroll",
    title: "Letter of Appreciation",
    event: "Healthcare App for PGIMER",
    org: "Punjab Engineering College",
    year: "",
    note: "For designing and building the PGIMER patient app.",
  },
] as const;

export const education = {
  degree: "B.Tech, Computer Science & Engineering (Data Science)",
  school: "Punjab Engineering College, Chandigarh",
  period: "Nov 2022 - Jun 2026",
} as const;
