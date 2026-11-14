export const profile = {
  name: "Nifemi",
  wordmark: "nifemi",
  whatsapp: "https://wa.me/2349065431332",
  email: "oluwaladen@gmail.com",
  github: "https://github.com/oluwaladehub",
};

export const capabilities = [
  { title: "Backend & APIs", tools: "Python · FastAPI · REST", detail: "I turn feature requirements into typed request and response schemas, validate inputs, and design predictable error responses. I test endpoints with representative requests and document examples for integration." },
  { title: "Mobile development", tools: "Flutter · Dart · Android", detail: "I build reusable Flutter screens, connect them to REST APIs, and preserve form state across steps. I verify loading, empty, error, and retry states on devices and emulators." },
  { title: "Frontend engineering", tools: "React · Next.js · TypeScript", detail: "I build responsive interfaces with reusable components, typed props, and clear form feedback. I use browser tools to investigate rendering and network performance." },
  { title: "Systems & integration", tools: "Ubuntu · SSH · Git", detail: "I troubleshoot web applications using logs, service status, and HTTP responses. I prepare release checks and verify configuration, deployment, and transactional email changes." },
];

export const experience = [
  ["2026", "Python Backend Developer", "Alderbridge Data Systems", "Built REST endpoints with input validation, filtering, pagination, and documented test cases."],
  ["2026", "Flutter Mobile Developer", "Harborlane Mobile Labs", "Built reusable Android screens, integrated REST APIs, and verified multi-step flows."],
  ["2026", "React Frontend Developer", "Northfield Interface Labs", "Built typed React interfaces and checked keyboard navigation, responsive layouts, and performance."],
  ["2025", "API Integration and Test Engineer", "Cedarline Integration Services", "Wrote Python integration tests and verified API changes in staging."],
  ["2025", "Ubuntu Systems Support Technician", "Westmere Managed Services", "Maintained Ubuntu hosts and diagnosed service and transactional email issues."],
  ["2024", "Programming Tutor", "EarlyFounders NG", "Taught web, Python, and Flutter development through practical projects."],
  ["2021", "Backend Engineer", "Farskadeli", "Maintained REST APIs and investigated production performance and stability issues."],
  ["2020", "Laboratory Assistant", "Ragolis Bottle Limited", "Performed pH and total dissolved solids quality-control tests and documented results."],
] as const;

export type Project = {
  id: string;
  category: string;
  title: string;
  stack: string;
  description: string;
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  { id: "backend", category: "API engineering", title: "Backend Web Applications", stack: "Python · FastAPI", description: "Built Python and FastAPI endpoints used by web and mobile applications. My work covered request validation, data handling, and consistent responses that frontend and mobile developers could integrate against.", links: [] },
  { id: "serveez", category: "Mobile application", title: "ServeeZ", stack: "Frontend · Backend", description: "Contributed frontend and backend features to a published home-services app. Customers in Nigeria can use ServeeZ to book handymen and pay in the app.", links: [{ label: "View on Google Play", url: "https://play.google.com/store/apps/details?id=com.webinnovation.serveez" }] },
  { id: "raretified", category: "Corporate website", title: "Raretified", stack: "HTML · CSS · JavaScript", description: "Built a responsive corporate website using HTML, CSS, and vanilla JavaScript, including lightweight interactive elements.", links: [{ label: "Visit Raretified", url: "https://www.raretified.com/" }] },
  { id: "react", category: "Frontend engineering", title: "React Business & E-commerce Websites", stack: "React · API integration", description: "Built mobile-first websites using reusable components, API-driven content, and real-time updates. Projects include Sonia Glow Heaven, Dox Reliability, and Jamazavi.", links: [{ label: "Dox Reliability", url: "https://www.doxreliability.com/" }, { label: "Jamazavi", url: "https://jamazavi.com/" }] },
  { id: "imtta", category: "Web maintenance", title: "IMTTA Website", stack: "PHP · Ubuntu · SMTP", description: "Updated a PHP site on Ubuntu and worked on checkout messaging, transactional email templates, and SMTP configuration.", links: [] },
];
