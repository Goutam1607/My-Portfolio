/**
 * ─────────────────────────────────────────────────────────────
 *  ALL OF YOUR PORTFOLIO CONTENT LIVES IN THIS ONE FILE.
 *  Edit the text below and the website updates automatically.
 *  You never need to touch the components to change content.
 *
 *  Anything that starts with "TODO:" is a placeholder for info
 *  that is still missing. The site hides TODO values (e.g. a
 *  GitHub button with a TODO link is simply not shown), so it is
 *  safe to leave them until you have the real value.
 * ─────────────────────────────────────────────────────────────
 */

/** True when a value is still a "TODO:" placeholder. */
export const isTodo = (value?: string | null) =>
  !value || value.trim().toUpperCase().startsWith("TODO");

/* ───────────────────────── Identity ───────────────────────── */

export const profile = {
  name: "K Goutam",
  displayName: "Goutam",
  monogram: "KG",
  role: "Embedded & ML Engineer",
  email: "kgoutam12504@gmail.com",
  github: "https://github.com/Goutam1607",
  linkedin: "TODO: add my LinkedIn URL",
  resume: "/Resume.pdf",
  /** The file name visitors get when they download the résumé. */
  resumeDownloadName: "K_Goutam_Resume.pdf",
  location: "Mysuru, India",
  photo: "/me/photo.jpg",
  /**
   * Your site's address once it's live (e.g. "https://kgoutam.dev"), used for link previews.
   * Not needed on Render's or Vercel's own address (detected automatically during the build);
   * set it if you add a custom domain.
   */
  siteUrl: "TODO: add site URL after deploying",
};

/** What Google and link previews show. Keep the description under ~160 characters. */
export const seo = {
  description:
    "K Goutam: ECE (AIML) student at VVCE Mysuru building secure, intelligent systems across embedded hardware, IoT network security and machine learning.",
  keywords: [
    "K Goutam",
    "Embedded Systems",
    "Machine Learning",
    "IoT Security",
    "RFC 8520",
    "Raspberry Pi",
    "VVCE",
    "ECE",
    "Portfolio",
  ],
};

/* ──────────────────────── Navigation ──────────────────────── */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Section labels + headings. Every heading is a bold part followed by
 * an italic serif part, e.g. "Things I've" + "built."
 */
export const sections = {
  about: { number: "01", label: "About", title: ["Hi, I'm", "Goutam."] },
  skills: { number: "02", label: "Skills", title: ["The periodic table", "of my stack."] },
  work: { number: "03", label: "Work", title: ["Things I've", "built."] },
  certifications: { number: "04", label: "Certifications", title: ["Always", "learning."] },
  experience: { number: "05", label: "Experience", title: ["Education &", "experience."] },
  achievements: { number: "06", label: "Achievements", title: ["Proud", "moments."] },
  contact: { number: "07", label: "Contact", title: ["Let's", "build something."] },
} satisfies Record<string, { number: string; label: string; title: [string, string] }>;

/* ─────────────────────────── Hero ─────────────────────────── */

export const hero = {
  watermark: "GOUTAM",
  eyebrow: "ECE · AIML · DEFENCE TECH",
  titleLines: ["Embedded & ML", "Engineer"],
  subtitle: "Building secure, intelligent systems from hardware to model.",
  cta: "Explore work",
  video: "/avatar/intro.mp4",
  poster: "/avatar/poster.jpg",
};

/* ────────────────────────── About ─────────────────────────── */

export const about = {
  bio: "Electronics and Communication Engineering student passionate about defence technologies, working where embedded hardware, network security and machine learning meet to build intelligent, data-driven systems.",
  bioSecondary:
    "I like taking ideas all the way from a Raspberry Pi on the bench to a model in production, and I enjoy leading teams, from hackathons to national-level events.",
  quote: "From the sensor to the model.",
};

export const quickFacts = [
  { label: "Based in", value: "Mysuru, India" },
  { label: "Studying", value: "B.E. Electronics & Communication (AIML)" },
  { label: "College", value: "Vidyavardhaka College of Engineering (VVCE)" },
  { label: "Batch", value: "2023 – 2027" },
  { label: "CGPA", value: "7.73 (till 6th sem)" },
  { label: "Focus", value: "Embedded · Network Security · ML" },
];

/** The hanging ID card in the About section. */
export const idCard = {
  header: "DEVELOPER ID",
  name: "K GOUTAM",
  role: "ECE · AIML",
  fields: [
    { label: "ID", value: "4VV23EC061" },
    { label: "Batch", value: "2023–27" },
  ],
  backTitle: "What I am",
  whatIAm: [
    { title: "Embedded systems builder", detail: "Raspberry Pi · MQTT · Linux" },
    { title: "IoT security", detail: "RFC 8520 MUD implementation" },
    { title: "ML practitioner", detail: "scikit-learn · Deep Learning · NLP" },
    { title: "Web builder", detail: "Symbiot 2026 official website" },
    { title: "Class Representative", detail: "ECE Dept, VVCE" },
  ],
  signature: "K Goutam",
};

/* ───────────────────────── Skills ─────────────────────────── */

export type SkillCategory = "Languages" | "ML & Data" | "IoT & Security" | "Tools";

export const skillCategories: SkillCategory[] = ["Languages", "ML & Data", "IoT & Security", "Tools"];

export type Skill = {
  symbol: string;
  name: string;
  category: SkillCategory;
  /** One line shown in the hover preview. */
  note: string;
  /** Which logo to show in the preview (mapped to an icon in the Skills component). */
  logo: string;
};

const skillList: Skill[] = [
  // Languages
  { symbol: "Py", name: "Python", category: "Languages", logo: "python", note: "My main language: MUD IoT, review intelligence and skin cancer detection." },
  { symbol: "Sq", name: "SQL", category: "Languages", logo: "sql", note: "Querying and modelling data; Introduction to Databases (Meta)." },
  { symbol: "Ml", name: "MATLAB", category: "Languages", logo: "matlab", note: "Numerical computing; MATLAB Onramp (MathWorks)." },
  { symbol: "Ht", name: "HTML", category: "Languages", logo: "html", note: "Markup for the Symbiot 2026 official website." },
  { symbol: "Cs", name: "CSS", category: "Languages", logo: "css", note: "Responsive, mobile-optimised UI for Symbiot 2026." },
  // ML & Data
  { symbol: "Sk", name: "scikit-learn", category: "ML & Data", logo: "scikitlearn", note: "Classical machine learning: regression and classification models." },
  { symbol: "Pd", name: "Pandas", category: "ML & Data", logo: "pandas", note: "Data wrangling and analysis for my ML work." },
  { symbol: "Np", name: "NumPy", category: "ML & Data", logo: "numpy", note: "Fast numerical computing for machine learning." },
  { symbol: "Dl", name: "Deep Learning", category: "ML & Data", logo: "deeplearning", note: "Used in my Skin Cancer Detector project." },
  { symbol: "Nl", name: "NLP", category: "ML & Data", logo: "nlp", note: "Sentiment and pain-point extraction from customer reviews." },
  { symbol: "Ga", name: "Generative AI", category: "ML & Data", logo: "genai", note: "Used in my Competitor Review Intelligence Platform." },
  { symbol: "Dv", name: "Data Visualisation", category: "ML & Data", logo: "dataviz", note: "Turning review analysis into decision-ready insights." },
  // IoT & Security
  { symbol: "Rp", name: "Raspberry Pi", category: "IoT & Security", logo: "raspberrypi", note: "The gateway hardware in my MUD IoT project." },
  { symbol: "Mq", name: "MQTT (Mosquitto)", category: "IoT & Security", logo: "mqtt", note: "IoT device messaging in my MUD IoT project." },
  { symbol: "Ip", name: "iptables", category: "IoT & Security", logo: "iptables", note: "MUD policies translated into live firewall rules." },
  { symbol: "Lx", name: "Linux", category: "IoT & Security", logo: "linux", note: "The OS running my Raspberry Pi gateway." },
  { symbol: "Ns", name: "Network Security", category: "IoT & Security", logo: "netsec", note: "RFC 8520 MUD, HMAC-SHA256 verification; Cisco Networking Basics." },
  { symbol: "Es", name: "Embedded Systems", category: "IoT & Security", logo: "embedded", note: "From the sensor to the model; Introduction to Microprocessors (ARM)." },
  // Tools
  { symbol: "Fl", name: "Flask", category: "Tools", logo: "flask", note: "MUD file server and MUD manager in my IoT project." },
  { symbol: "Gt", name: "Git / GitHub", category: "Tools", logo: "github", note: "Version control; my projects live on GitHub." },
  { symbol: "Ra", name: "REST APIs", category: "Tools", logo: "restapi", note: "Connecting services in my review intelligence platform." },
  { symbol: "Rn", name: "Render", category: "Tools", logo: "render", note: "Deployed the Symbiot 2026 website." },
];

/** Skills numbered 1, 2, 3… automatically, in the order listed above. */
export const skills = skillList.map((skill, i) => ({ ...skill, number: i + 1 }));

/* ──────────────────────── Projects ────────────────────────── */

export type Project = {
  title: string;
  /** Short name shown on the rotated strip when the card is collapsed. */
  shortTitle: string;
  tags: string[];
  description: string;
  features: string[];
  stack: string[];
  link: string;
  linkLabel: string;
  /** Which mini UI mockup to draw on the card. */
  mockup: "firewall" | "sentiment" | "scan" | "leaderboard";
};

export const projects: Project[] = [
  {
    title: "MUD-Based IoT Security System (RFC 8520)",
    shortTitle: "MUD IoT Security",
    tags: ["IoT", "Network Security", "Embedded"],
    description:
      "Implements the IETF RFC 8520 Manufacturer Usage Description standard on Raspberry Pi so IoT devices are automatically restricted to the network behaviour their manufacturer declared.",
    features: [
      "Flask-based MUD file server and MUD manager",
      "MUD policies translated into live iptables firewall rules",
      "HMAC-SHA256 MUD file signature verification",
      "CSV audit log of every policy decision, 8/8 correct allow/block in rogue-device tests",
    ],
    stack: ["Python", "Raspberry Pi", "Linux", "iptables", "MQTT (Mosquitto)", "JSON", "Flask"],
    link: "https://github.com/Goutam1607/MUD_IoT",
    linkLabel: "View on GitHub",
    mockup: "firewall",
  },
  {
    title: "Competitor Review Intelligence Platform",
    shortTitle: "Review Intelligence",
    tags: ["NLP", "Generative AI", "Data"],
    description:
      "AI-powered platform that aggregates and analyses customer reviews from Zepto, BigBasket and Swiggy Instamart to surface actionable competitor insights.",
    features: [
      "Web scraping of customer reviews",
      "Sentiment analysis and pain-point extraction",
      "Feature-level gap comparison across brands",
      "Insights for business decisions",
    ],
    stack: ["Python", "Web Scraping", "NLP", "Generative AI", "Data Visualization", "REST APIs"],
    link: "TODO: add GitHub URL",
    linkLabel: "View on GitHub",
    mockup: "sentiment",
  },
  {
    title: "Skin Cancer Detector using Machine Learning",
    shortTitle: "Skin Cancer Detector",
    tags: ["Deep Learning", "Computer Vision", "Healthcare AI"],
    description: "Deep learning model that classifies dermoscopic images to help detect skin cancer.",
    features: [
      "Image preprocessing pipeline",
      "Deep learning classifier trained on a Kaggle dataset",
      "High classification accuracy",
    ],
    stack: ["Python", "Deep Learning", "Image Processing", "Kaggle Dataset"],
    link: "TODO: add GitHub URL",
    linkLabel: "View on GitHub",
    mockup: "scan",
  },
  {
    title: "Symbiot 2026: National Hackathon Official Website",
    shortTitle: "Symbiot 2026",
    tags: ["Web", "Full-Stack", "Event"],
    description:
      "Designed and deployed the official website for Symbiot 2026, a 24-hour national hackathon at VVCE Mysuru.",
    features: [
      "Problem-statement management",
      "Team shortlisting and live results",
      "Domain-wise filtering",
      "Mobile-optimised UI",
    ],
    stack: ["Web Development", "Full-Stack", "Render", "Responsive Design"],
    link: "TODO: live site URL",
    linkLabel: "Visit live site",
    mockup: "leaderboard",
  },
];

/* ───────────────────── Certifications ─────────────────────── */

export const certificationsIntro = "9 certifications across ML, networking, robotics and data science.";

export const certifications = [
  { name: "Supervised Machine Learning: Regression & Classification", issuer: "Stanford Online (Coursera)" },
  { name: "Advanced Learning Algorithms", issuer: "Stanford Online (Coursera)" },
  { name: "Networking Basics", issuer: "Cisco Networking Academy" },
  { name: "Introduction to Databases", issuer: "Meta (Coursera)" },
  { name: "Python for Everybody", issuer: "University of Michigan (Coursera)" },
  { name: "MATLAB Onramp", issuer: "MathWorks" },
  { name: "Aerial Robotics", issuer: "University of Pennsylvania (Coursera)" },
  { name: "Introduction to Microprocessors", issuer: "ARM" },
  { name: "Data Science with Generative AI", issuer: "PW Skills", date: "Sep 2026" },
];

/* ──────────────── Education & experience ──────────────────── */

export type TimelineType = "Education" | "Leadership" | "Club" | "Event";

export type TimelineEntry = {
  year: number;
  type: TimelineType;
  title: string;
  place: string;
  period?: string;
  bullets: string[];
  tags: string[];
};

export const timeline: TimelineEntry[] = [
  {
    year: 2023, // TODO: confirm year of Class XII
    type: "Education",
    title: "Class XII (AISSCE, PCM + Computer Science)",
    place: "Sri Sankara Vidyalaya, Bhilai",
    bullets: ["Score: 358/500 (71.6%)"],
    tags: ["PCM", "Computer Science"],
  },
  {
    year: 2023,
    type: "Education",
    title: "B.E. Electronics & Communication Engineering (AIML)",
    place: "Vidyavardhaka College of Engineering, Mysuru",
    period: "2023 – 2027",
    bullets: ["CGPA 7.73 (till 6th sem)"],
    tags: ["ECE", "AIML"],
  },
  {
    year: 2024,
    type: "Club",
    title: "Member, IoTCrew",
    place: "VVCE",
    period: "Aug 2024 – Present",
    bullets: [],
    tags: ["IoT"],
  },
  {
    year: 2025,
    type: "Club",
    title: "Core Member, RoboRise Robotics Club",
    place: "VVCE",
    period: "May 2025 – Present",
    bullets: [],
    tags: ["Robotics"],
  },
  {
    year: 2025,
    type: "Leadership",
    title: "Class Representative, ECE Department",
    place: "VVCE",
    period: "July 2025 – Present",
    bullets: [
      "Elected liaison between students and faculty",
      "Coordinating schedules, feedback and departmental communication",
    ],
    tags: ["Leadership"],
  },
  {
    year: 2026,
    type: "Event",
    title: "Organiser & Web Lead, Symbiot 2026",
    place: "National hackathon, VVCE Mysuru",
    bullets: [
      "Managed logistics, judging and live operations",
      "Built the official event website",
    ],
    tags: ["Event Management", "Web"],
  },
];

/** Extra one-liners shown at the end of the timeline. */
export const timelineExtras = ["Volunteer, Youth for Seva"];

/* ─────────────────────── Achievements ─────────────────────── */

export const stats = [
  { value: 5, suffix: "+", label: "Hackathons & technical workshops", note: "Alongside organising Symbiot 2026", icon: "rocket" },
  { value: 4, suffix: "", label: "Projects shipped", note: "From IoT security to NLP, vision and web", icon: "folder" },
  { value: 9, suffix: "", label: "Certifications", note: "Stanford, Cisco, Meta, ARM and more", icon: "badge" },
  { value: 1, suffix: "", label: "National hackathon website", note: "Built for Symbiot 2026", icon: "globe" },
] as const;

export const awards = [
  {
    title: "Runner-Up, “Idea to Enterprise” Competition",
    org: "ASPERA, VVCE",
    detail: "Modular Laptops concept on upgradeability and e-waste reduction, in a 12-hour sprint.",
    icon: "trophy",
  },
  {
    title: "Best Achiever in Co-Curricular Activities",
    org: "VVCE · 4th Semester",
    detail: "Recognised for contributions and participation beyond the classroom.",
    icon: "medal",
  },
  {
    title: "Letter of Appreciation",
    org: "ECE Department, VVCE",
    detail: "For building the official Symbiot 2026 website.",
    icon: "award",
  },
  {
    title: "Elected Class Representative",
    org: "ECE Department, VVCE",
    detail: "Chosen by classmates to represent them to faculty.",
    icon: "users",
  },
] as const;

/* ────────────────────────── Contact ───────────────────────── */

export const contact = {
  blurb: "Have an idea, a role or a project in embedded systems, security or ML? I'd love to hear about it.",
  footer: "© 2026 K Goutam · Built with Next.js",
};
