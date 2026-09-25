import OpenAI from "openai";
import { aboutText } from "@/app/data/HeroIcons";
import { projectsData } from "@/app/data/Projects";
import { experience, stack } from "@/app/data/Profile";
import { certifications } from "@/app/data/Certifications";

// Built from the same data files the site renders, so the assistant can't
// drift from the page. Only facts with no data file behind them are inline.
const education = experience.filter((item) => item.kind === "education");
const work = experience.filter((item) => item.kind === "work");

const SYSTEM_PROMPT = `
You are an AI assistant for John Carl Santos (who also goes by "CJ"), an AI full-stack engineer and computer science student.
Your goal is to answer questions about CJ's skills, projects, background, and practical career growth based on the provided information.
If asked for his name or what to call him, you can mention that he goes by "CJ".
You can also answer general knowledge questions unrelated to CJ. Just be helpful, clear, and concise.

Education:
${education.map((e) => `- ${e.org}: ${e.role} (${e.period}). ${e.summary}`).join("\n")}

Experience:
${work.map((e) => `- ${e.role} @ ${e.org} (${e.period}): ${e.summary}`).join("\n")}

Technical Skills:
${stack.map((g) => `- ${g.group}: ${g.items.join(", ")}`).join("\n")}

Certifications:
${certifications.map((c) => `- ${c.title} (${c.issuer}, ${c.issueDate})`).join("\n")}

Awards:
- 3rd Place Hackathon — Java Problem Solving Competition

About John
${aboutText}

Projects:
${projectsData.map(p => `- ${p.name}: ${p.desc} (Tech: ${p.tech.join(", ")})`).join("\n")}

Guidelines:
- Answer as John's professional representative.
- Be concise, helpful, warm, and professional.
- Use details from the Education, Experience, Skills, Projects, Certifications, and Awards sections.
- For questions about becoming a better developer, learning faster, choosing projects, building skills, job readiness, or career growth:
  - Give practical, step-by-step advice.
  - Ground the answer in CJ's path when relevant: shipping projects, AI/backend learning, internships, and building real portfolio work.
  - Favor concrete actions over generic motivation.
- Keep responses short (max 2-3 sentences unless asked for details).
- Don't make up information.
- Safety: If asked to help with anything illegal, harmful, dangerous, or inappropriate, refuse politely and redirect to CJ's professional topics.
- No Code Generation: Do not write, generate, or create code, scripts, programs, or applications for users. Do not help with coding homework or assignments. Redirect to CJ's projects or general advice instead.
`;

const GUARDRAIL_KEYWORDS = [
  "hack", "steal", "password", "credit card", "ssn", "social security",
  "bomb", "weapon", "kill", "hurt", "attack", "illegal", "drug", "porn",
  "nude", "sex", "explicit", "violence", "terror", "fraud", "scam",
  "phishing", "malware", "virus", "exploit", "inject", "sql injection",
  "ddos", "botnet", "ransomware", "trojan", "spyware", "keylogger",
  "write code", "generate code", "create code", "build code", "code for me",
  "make a script", "write a script", "generate script", "create script",
  "make a program", "write a program", "generate program", "create program",
  "make an app", "build an app", "create an app", "develop an app",
  "solve this coding", "do my homework", "do my assignment", "cheat",
];

// Whole-word match (plus plain inflections) so "skills" doesn't trip "kill"
// and "hackathon" doesn't trip "hack".
const GUARDRAIL_PATTERN = new RegExp(
  `\\b(?:${GUARDRAIL_KEYWORDS.join("|")})(?:s|es|ed|ing|er|ers)?\\b`,
  "i",
);

const containsGuardrailViolation = (message: string): boolean =>
  GUARDRAIL_PATTERN.test(message);

const MAX_MESSAGE_LENGTH = 1000;
const MAX_REPLY_TOKENS = 400;

// Best-effort per-IP limit. State lives in the serverless instance, so it
// resets on cold start and isn't shared across instances — enough to stop a
// single client looping on the endpoint, not a substitute for a real store.
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
};

const getClientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

const normalizeMessage = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const MAX_HISTORY_TURNS = 8;
const MAX_HISTORY_TURN_LENGTH = 2000;

type Turn = { role: "user" | "assistant"; content: string };

// Client-supplied, so treat as untrusted: keep only well-formed user/assistant
// turns (never "system"), bounded in count and length.
const normalizeHistory = (value: unknown): Turn[] => {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (turn): turn is Turn =>
        typeof turn === "object" &&
        turn !== null &&
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string" &&
        turn.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((turn) => ({
      role: turn.role,
      content: turn.content.slice(0, MAX_HISTORY_TURN_LENGTH),
    }));
};

const buildProjectReply = (message: string) => {
  const lowerMessage = message.toLowerCase();
  // Match on the project's name (without any "(domain)" suffix) or id. The
  // old reverse check — message is a substring of the project text — made
  // "hi" match whichever project mentioned "this" first.
  const matchingProject = projectsData.find((project) => {
    const name = project.name.replace(/\s*\(.*\)$/, "").toLowerCase();
    return lowerMessage.includes(name) || lowerMessage.includes(project.id.replace(/-/g, ""));
  });

  if (!matchingProject) {
    return null;
  }

  return `${matchingProject.name} is a ${matchingProject.category.toLowerCase()} project where CJ worked as ${matchingProject.role}. It uses ${matchingProject.tech.join(", ")} and focuses on ${matchingProject.desc.toLowerCase()}`;
};

const getOfflineReply = (message: string) => {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("better developer") ||
    lowerMessage.includes("improve as developer") ||
    lowerMessage.includes("be a better developer") ||
    lowerMessage.includes("how do i improve") ||
    lowerMessage.includes("how can i improve")
  ) {
    return "A strong next step is to build more real projects, not just follow tutorials. Focus on one stack, ship small apps end-to-end, study the code you write, and keep improving fundamentals like JavaScript/TypeScript, APIs, databases, and debugging.";
  }

  if (
    lowerMessage.includes("roadmap") ||
    lowerMessage.includes("learn web development") ||
    lowerMessage.includes("learn ai") ||
    lowerMessage.includes("what should i learn")
  ) {
    return "A practical roadmap is: master one language, learn Git, build frontend and backend projects, understand databases and APIs, then add deployment and AI features. CJ's own path leans toward Python, TypeScript, backend systems, RAG, and shipping portfolio projects that solve real problems.";
  }

  if (
    lowerMessage.includes("portfolio") ||
    lowerMessage.includes("project idea") ||
    lowerMessage.includes("what project") ||
    lowerMessage.includes("resume project")
  ) {
    return "The best portfolio projects solve a real problem and show clear technical depth. Good examples from CJ's path are AI-assisted tools, backend-heavy apps, or full-stack products with authentication, APIs, databases, and deployment.";
  }

  if (
    lowerMessage.includes("skills") ||
    lowerMessage.includes("tech stack") ||
    lowerMessage.includes("what does john know")
  ) {
    return `CJ's stack: ${stack.map((g) => `${g.group} — ${g.items.join(", ")}`).join("; ")}. His strongest direction is full-stack AI and backend-focused product development.`;
  }

  if (
    lowerMessage.includes("background") ||
    lowerMessage.includes("about john") ||
    lowerMessage.includes("who is john") ||
    lowerMessage.includes("who is cj")
  ) {
    return "John Carl Santos, also called CJ, is a AI full-stack engineer and Computer Science student at Philippine Christian University. He has worked on backend systems, RAG-oriented projects, and portfolio products aimed at solving real user problems.";
  }

  const projectReply = buildProjectReply(message);
  if (projectReply) {
    return projectReply;
  }

  return "I can help with CJ's background, skills, projects, certifications, and practical advice on improving as a developer. Try asking about his tech stack, portfolio projects, or how to grow as a software engineer.";
};

export async function POST(req: Request) {
  let userMessage = "";

  try {
    const body = (await req.json()) as { message?: unknown; history?: unknown };
    const message = normalizeMessage(body.message);
    const history = normalizeHistory(body.history);
    userMessage = message;

    if (!message) {
      return Response.json(
        { error: "Please send a valid message." },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { error: `Please keep messages under ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 },
      );
    }

    if (isRateLimited(getClientIp(req))) {
      return Response.json(
        { error: "Too many messages — try again in a minute." },
        { status: 429 },
      );
    }

    if (containsGuardrailViolation(message)) {
      return Response.json({
        reply: "I can't help with that. I'm here to answer questions about CJ's background, skills, projects, and career growth.",
        source: "guardrail",
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ reply: getOfflineReply(message), source: "fallback" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: MAX_REPLY_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    return Response.json({ reply, source: "openai" });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process chat request.";

    console.error("Chat API error:", errorMessage);

    const fallbackReply = userMessage
      ? getOfflineReply(userMessage)
      : "I can help with CJ's background, skills, projects, and developer growth advice.";

    return Response.json(
      {
        reply: fallbackReply,
        source: "fallback",
      },
      { status: 200 },
    );
  }
}
