// Heuristic client-side resume analyzer. Not AI, but deterministic and useful.
export type AnalysisResult = {
  score: number;
  wordCount: number;
  detectedSkills: string[];
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  sections: { name: string; present: boolean }[];
  contact: { email: boolean; phone: boolean; linkedin: boolean };
  metrics: {
    hasQuantifiableResults: boolean;
    actionVerbCount: number;
    avgBulletLength: number;
  };
};

const SKILL_LIBRARY = [
  // Programming
  "javascript", "typescript", "python", "java", "c++", "c#", "go", "rust", "ruby", "php", "swift", "kotlin", "scala", "r",
  // Frontend
  "react", "vue", "angular", "svelte", "next.js", "nuxt", "tailwind", "html", "css", "sass", "redux", "webpack", "vite",
  // Backend
  "node.js", "express", "django", "flask", "fastapi", "spring", "rails", ".net", "graphql", "rest", "grpc",
  // Data / AI
  "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "kafka", "spark", "hadoop", "airflow",
  "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "llm", "openai", "nlp", "computer vision", "machine learning",
  // Cloud / DevOps
  "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ansible", "jenkins", "github actions", "ci/cd", "linux",
  // Tools
  "git", "jira", "figma", "agile", "scrum", "kanban",
  // Soft
  "leadership", "communication", "collaboration", "mentoring", "problem-solving",
];

const RECOMMENDED_KEYWORDS = [
  "leadership", "collaboration", "agile", "problem-solving", "communication",
  "results-driven", "cross-functional", "stakeholder", "impact", "metrics",
  "ownership", "mentoring", "strategy", "innovation", "scalable",
];

const ACTION_VERBS = [
  "led", "built", "designed", "developed", "implemented", "launched", "improved",
  "increased", "reduced", "optimized", "delivered", "managed", "created", "architected",
  "shipped", "scaled", "spearheaded", "drove", "owned", "engineered", "automated",
];

const SECTIONS = [
  { name: "Contact", pattern: /(contact|email|phone)/i },
  { name: "Summary", pattern: /(summary|objective|profile|about)/i },
  { name: "Experience", pattern: /(experience|employment|work history)/i },
  { name: "Education", pattern: /(education|academic|university|degree)/i },
  { name: "Skills", pattern: /(skills|technologies|technical)/i },
  { name: "Projects", pattern: /(projects|portfolio)/i },
];

export function analyzeResume(rawText: string): AnalysisResult {
  const text = rawText.replace(/\s+/g, " ").trim();
  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Skills detected
  const detectedSkills = SKILL_LIBRARY.filter((s) => {
    const re = new RegExp(`\\b${escape(s)}\\b`, "i");
    return re.test(lower);
  });

  // Missing recommended keywords
  const missingKeywords = RECOMMENDED_KEYWORDS.filter(
    (k) => !new RegExp(`\\b${escape(k)}\\b`, "i").test(lower),
  );

  // Sections
  const sections = SECTIONS.map((s) => ({ name: s.name, present: s.pattern.test(rawText) }));
  const sectionScore = sections.filter((s) => s.present).length / sections.length;

  // Contact
  const contact = {
    email: /[\w.-]+@[\w.-]+\.\w+/.test(rawText),
    phone: /(\+?\d[\d\s\-().]{7,})/.test(rawText),
    linkedin: /linkedin\.com\/[\w-]+/i.test(rawText),
  };

  // Quantifiable results
  const hasQuantifiableResults = /(\d+%|\$\d|\d+x\b|\d{2,}\+?)/i.test(rawText);

  // Action verbs
  const actionVerbCount = ACTION_VERBS.reduce((acc, v) => {
    const matches = lower.match(new RegExp(`\\b${v}\\b`, "g"));
    return acc + (matches ? matches.length : 0);
  }, 0);

  // Bullet analysis
  const bullets = rawText.split(/[\n•\-●]/).map((b) => b.trim()).filter((b) => b.length > 20);
  const avgBulletLength = bullets.length ? bullets.reduce((a, b) => a + b.length, 0) / bullets.length : 0;

  // Scoring
  let score = 0;
  score += Math.min(30, detectedSkills.length * 2.5); // up to 30
  score += sectionScore * 20; // up to 20
  score += (contact.email ? 5 : 0) + (contact.phone ? 3 : 0) + (contact.linkedin ? 4 : 0); // 12
  score += hasQuantifiableResults ? 10 : 0;
  score += Math.min(15, actionVerbCount * 1.5);
  score += wordCount > 250 && wordCount < 900 ? 8 : wordCount > 120 ? 4 : 0;
  score += missingKeywords.length < 5 ? 5 : missingKeywords.length < 10 ? 2 : 0;
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Strengths
  const strengths: string[] = [];
  if (detectedSkills.length >= 8) strengths.push(`Rich technical skillset (${detectedSkills.length} skills detected)`);
  if (hasQuantifiableResults) strengths.push("Includes quantifiable achievements and metrics");
  if (actionVerbCount >= 6) strengths.push("Strong use of action verbs throughout");
  if (contact.email && contact.phone) strengths.push("Complete contact information");
  if (contact.linkedin) strengths.push("LinkedIn profile linked");
  if (sectionScore >= 0.8) strengths.push("Well-structured with all key sections");
  if (wordCount >= 300 && wordCount <= 800) strengths.push("Ideal resume length");

  // Weaknesses
  const weaknesses: string[] = [];
  if (!hasQuantifiableResults) weaknesses.push("No measurable results or numbers found");
  if (actionVerbCount < 4) weaknesses.push("Few strong action verbs used");
  if (!contact.linkedin) weaknesses.push("Missing LinkedIn profile");
  if (!contact.phone) weaknesses.push("No phone number detected");
  if (detectedSkills.length < 5) weaknesses.push("Limited technical skills mentioned");
  if (wordCount < 200) weaknesses.push("Resume feels too short — add more detail");
  if (wordCount > 1000) weaknesses.push("Resume may be too long — aim for 1–2 pages");
  if (sectionScore < 0.6) weaknesses.push("Missing standard resume sections");

  // Improvements
  const improvements: string[] = [];
  if (missingKeywords.length > 0) {
    improvements.push(`Consider weaving in keywords like: ${missingKeywords.slice(0, 5).join(", ")}.`);
  }
  if (!hasQuantifiableResults) {
    improvements.push("Add numbers to your accomplishments (e.g., 'increased conversion by 30%').");
  }
  if (avgBulletLength > 220) {
    improvements.push("Some bullet points are long — aim for concise, one‑line impact statements.");
  }
  if (actionVerbCount < 6) {
    improvements.push("Start bullets with powerful verbs: led, built, launched, optimized, delivered.");
  }
  if (!sections.find((s) => s.name === "Summary")?.present) {
    improvements.push("Add a short professional Summary section at the top.");
  }
  if (!sections.find((s) => s.name === "Projects")?.present) {
    improvements.push("Include a Projects section to showcase practical work.");
  }
  if (improvements.length === 0) {
    improvements.push("Your resume is in great shape. Tailor it to each role for best results.");
  }

  return {
    score,
    wordCount,
    detectedSkills,
    missingKeywords,
    strengths,
    weaknesses,
    improvements,
    sections,
    contact,
    metrics: {
      hasQuantifiableResults,
      actionVerbCount,
      avgBulletLength: Math.round(avgBulletLength),
    },
  };
}

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
