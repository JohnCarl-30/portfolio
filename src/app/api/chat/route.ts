import OpenAI from "openai";
import { aboutText } from "@/app/data/HeroIcons";
import { projectsData } from "@/app/data/Projects";

const SYSTEM_PROMPT = `
You are an AI assistant for John Carl Santos (who also goes by "CJ"), an aspiring software engineer and AI-focused developer.
Your goal is to answer questions about CJ's skills, projects, background, and practical career growth based on the provided information.
If asked for his name or what to call him, you can mention that he goes by "CJ".
You can also answer general knowledge questions unrelated to CJ. Just be helpful, clear, and concise.

Education:
- Philippine Christian University: Bachelor of Science in Computer Science (Expected 2027)
- Consistent Dean's Lister (GWA: 1.15)
- Relevant Coursework: Data Structures & Algorithms, Linear Algebra, AWS S3, Software Engineering

Technical Skills (Detailed):
- Languages: Python, Java, JavaScript, TypeScript, PHP
- Frameworks & Libraries: FastAPI, Flask, TensorFlow, Scikit-learn, Pandas, NumPy, LangChain, RAG, ReactJS, Laravel
- Database: Postgresql, Supabase, Firebase, SQLAlchemy, MySql
- Tools: Git, Docker (Basic), Jupyter, VS Code, Render, Vercel, Google Colab, UiPath (RPA), Xampp, Postman
- Concepts: Machine Learning, REST APIs, LLMs

Resume Projects:
- Point of Sale (POS) System: Desktop POS using Java Swing, Apache POI for Excel integration.
- Mini Score Predictor: Predictive model estimating scores based on study hours (Python, Docker).
- Sociatech - Social Learning Platform: Project Lead & Backend Developer. Full-stack platform using Firebase Auth, REST API, JWT.

Certifications & Awards:
- Introduction to Cloud 101 (AWS)
- Building RAG Apps Using MongoDB (MongoDB)
- Oracle Cloud Infrastructure 2025 AI Foundations Associate
- Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
- Machine Learning Foundations (AWS)
- Generative AI Fundamentals (DataBricks)
- 3rd Place Hackathon — Java Problem Solving Competition

About John
${aboutText}

Other Projects:
${projectsData.map(p => `- ${p.name}: ${p.desc} (Tech: ${p.tech.join(", ")})`).join("\n")}

Guidelines:
- Answer as John's professional representative.
- Be concise, helpful, warm, and professional.
- Use details from the Education, Skills, Resume Projects, and Certifications sections.
- For questions about becoming a better developer, learning faster, choosing projects, building skills, job readiness, or career growth:
  - Give practical, step-by-step advice.
  - Ground the answer in CJ's path when relevant: shipping projects, AI/backend learning, internships, and building real portfolio work.
  - Favor concrete actions over generic motivation.
- Keep responses short (max 2-3 sentences unless asked for details).
- Don't make up information.
`;

const getErrorDetails = (error: unknown) => {
  if (typeof error !== "object" || error === null || !("response" in error)) {
    return null;
  }

  const response = (error as { response?: { data?: unknown } }).response;
  return response?.data ?? null;
};

const normalizeMessage = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const buildProjectReply = (message: string) => {
  const lowerMessage = message.toLowerCase();
  const matchingProject = projectsData.find((project) => {
    const searchableText = [
      project.name,
      project.desc,
      project.longDescription,
      project.role,
      ...project.tech,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerMessage) || lowerMessage.includes(project.name.toLowerCase());
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
    return "CJ works across Python, JavaScript, TypeScript, Java, and PHP, with experience in FastAPI, Flask, TensorFlow, React, Laravel, RAG, REST APIs, PostgreSQL, Supabase, Firebase, Docker, Vercel, and Render. His strongest direction is full-stack AI and backend-focused product development.";
  }

  if (
    lowerMessage.includes("background") ||
    lowerMessage.includes("about john") ||
    lowerMessage.includes("who is john") ||
    lowerMessage.includes("who is cj")
  ) {
    return "John Carl Santos, also called CJ, is a Computer Science student at Philippine Christian University and an aspiring software engineer focused on AI and full-stack development. He has worked on backend systems, RAG-oriented projects, and portfolio products aimed at solving real user problems.";
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
    const body = (await req.json()) as { message?: unknown };
    const message = normalizeMessage(body.message);
    userMessage = message;

    if (!message) {
      return Response.json(
        { error: "Please send a valid message." },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ reply: getOfflineReply(message), source: "fallback" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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
        details: getErrorDetails(error),
      },
      { status: 200 },
    );
  }
}
