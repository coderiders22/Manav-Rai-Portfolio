// Single source of truth for portfolio content.
// Update this file when the résumé changes; every section reads from here.

export const profile = {
  name: "Manav Rai",
  role: "SWE-I",
  company: "Gemini Solutions",
  headline: "AI Engineer, GenAI & Full Stack",
  summary:
    "I work on AI agents, backend APIs and full-stack apps. At Gemini Solutions I'm building an AI platform that turns a requirements document into a working web app. Before this, I built a healthcare app used by 100+ patients at PGIMER Chandigarh.",
  location: "Chandigarh, India",
  timezone: "IST · UTC+5:30",
  email: "manavrai454@gmail.com",
  phone: "+91 8054776034",
  phoneHref: "tel:+918054776034",
  resume: "/Manav_Rai_Resume.pdf",
  resumeDownloadName: "Manav_Rai_Resume.pdf",
  site: "https://manavrai.netlify.app",
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
  { value: 5, suffix: "", label: "Organisations", detail: "Enterprise, healthcare, defense" },
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
] as const;

export const pillars = [
  {
    icon: "bot",
    title: "AI & Agents",
    body: "Building AI agents that plan, write code and test it, with a person approving each step. Mostly with LangGraph, AWS Bedrock and good prompt engineering.",
    tools: ["LangGraph", "AWS Bedrock", "Prompt Engineering", "Autogen", "OpenAI / Azure OpenAI"],
  },
  {
    icon: "server",
    title: "Backend",
    body: "Building APIs with FastAPI and Spring Boot, with login, user roles and automatic deployment using Docker and Jenkins.",
    tools: ["FastAPI", "Spring Boot", "Docker", "Jenkins"],
  },
  {
    icon: "layers",
    title: "Web & Mobile Apps",
    body: "Building websites with Next.js and React, and mobile apps with Flutter that people use every day.",
    tools: ["Next.js", "React", "Flutter", "PostgreSQL"],
  },
] as const;

export type Experience = {
  company: string;
  companyUrl?: string;
  org?: string;
  role: string;
  period: string;
  type?: string;
  location?: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Gemini Solutions",
    companyUrl: "https://www.geminisolutions.com/",
    role: "SWE-I · GenAI",
    period: "Sep 2026 - Present",
    type: "Full-time",
    location: "Gurugram, India",
    current: true,
    points: [
      "**Lead developer of Agentic SDLC**, Gemini's in-house AI product.",
      "Built our **own agent harness** instead of using off-the-shelf coding agents like GitHub Copilot or OpenCode.",
      "Demoed it to VPs, management and the presales team, got great feedback, and it's now in an **internal pilot across Gemini**.",
      "Improving it from user feedback, adding new features and extending it to Figma designs and mobile apps.",
      "Building **smart recommendations for a healthcare client**: personalised push notifications based on each user's profile and searches.",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "AWS Services", "ChromaDB", "Docker", "Jenkins", "Azure DevOps"],
  },
  {
    company: "Gemini Solutions",
    companyUrl: "https://www.geminisolutions.com/",
    role: "Software Developer Intern",
    period: "Mar 2026 - Sep 2026",
    type: "Internship",
    location: "Gurugram, India",
    points: [
      "Built **Agentic SDLC**, an AI platform that turns a requirements doc into a live web app. **POC in 1 day vs 2 weeks (90% faster)**, by 1 person instead of a team.",
      "AI agents design, code, test and auto-deploy, with human approval at each step. Deploy & Maintain handles standalone deploys plus AI bug fixes and features on live apps.",
      "Monitoring with live logs, AI root-cause analysis and cost tracking.",
      "Built an **AI API contract testing pipeline** that runs on every code push: generates tests for changed endpoints, auto-approves confident ones, sends uncertain ones to human review and explains failures.",
    ],
    stack: ["LangGraph", "FastAPI", "AWS Bedrock", "Azure OpenAI", "Jenkins", "Python"],
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
    kicker: "AI platform · Gemini Solutions",
    summary:
      "An AI platform that takes a requirements document and turns it into a tested, working web app.",
    highlights: [
      "A person approves each step before it moves on",
      "Tests the app and fixes errors on its own",
      "Sends the code as a pull request and deploys it automatically",
      "Explains errors from the logs, with login, user roles and daily limits",
    ],
    stack: ["LangGraph", "FastAPI", "AWS Bedrock", "Docker", "Jenkins", "React"],
    metrics: [
      { value: "1 day", label: "POC time, down from 2 weeks" },
      { value: "Pilot", label: "Used inside Gemini" },
    ],
    status: "Internal pilot",
  },
  {
    slug: "contract-testing",
    title: "API Contract Testing",
    kicker: "AI testing tool · Gemini Solutions",
    summary:
      "Checks API changes on every code push: it writes tests, runs them and explains what broke.",
    highlights: [
      "Reviews API designs for security and design problems",
      "Writes tests only for the parts that changed",
      "Approves tests it's sure about and sends the rest to a person",
      "Explains failures and suggests how to fix them",
    ],
    stack: ["Python", "Azure OpenAI", "Jenkins", "OpenAPI"],
    metrics: [
      { value: "Every push", label: "Tests run automatically" },
      { value: "Human check", label: "For unsure tests" },
    ],
    status: "In use",
  },
  {
    slug: "pgimer-health",
    title: "PGIMER Healthcare App",
    kicker: "Healthcare app · PGIMER Chandigarh",
    summary:
      "A Flutter app built with doctors at PGIMER that helps patients manage their medical history and assessments.",
    highlights: [
      "Built together with doctors",
      "Patients can track their medical history and fill assessments",
      "Used by 100+ patients, with 35% better tracking",
      "Got a Letter of Appreciation from PEC Chandigarh",
    ],
    stack: ["Flutter", "Spring Boot", "MySQL", "REST APIs"],
    metrics: [
      { value: "100+", label: "Patients using it" },
      { value: "+35%", label: "Better tracking" },
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
    icon: "bot",
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
    certificate: "https://drive.google.com/file/d/109niyKRJuXvVsivd5DqqrQNlXPMGzKoI/view",
  },
  {
    icon: "medal",
    title: "2nd Place",
    event: "24-Hour Coding Marathon",
    org: "STGI Technologies Consulting",
    year: "2024",
    note: "VYC: AI-powered KYC with liveness detection.",
    certificate: "https://drive.google.com/file/d/1u6fzPMjpWmFh4S56bXZJplXp0OY7Nn8T/view",
  },
  {
    icon: "flag",
    title: "National Finalist",
    event: "Dark Patterns Buster Hackathon",
    org: "IIT BHU & Dept. of Consumer Affairs, Govt. of India",
    year: "2024",
    note: "Om Browser: ML-based dark-pattern detection.",
    certificate: "https://drive.google.com/file/d/1oym7bMiR6qHwgIRRQgNoFzEXi2ww6oWp/view",
  },
  {
    icon: "scroll",
    title: "Letter of Appreciation",
    event: "Healthcare App for PGIMER",
    org: "Punjab Engineering College",
    year: "2025",
    note: "For designing and building the PGIMER patient app.",
    certificate: "https://drive.google.com/file/d/1qUI32VV4JYSNxU3tx7feJ0PbVs8TUipl/view",
  },
] as const;

export const education = {
  degree: "B.Tech, Computer Science & Engineering (Data Science)",
  school: "Punjab Engineering College, Chandigarh",
  period: "Nov 2022 - Jun 2026",
} as const;
