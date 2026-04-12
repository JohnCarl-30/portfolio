import OpenAI from "openai";
import { aboutText } from "@/app/data/HeroIcons";
import { projectsData } from "@/app/data/Projects";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI assistant for John Carl Santos (who also goes by "CJ"), a passionate software developer. 
Your goal is to answer questions about CJ's skills, projects, and background based on the provided information. If asked for his name or what to call him, you can mention that he goes by "CJ".

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

-Relationship / Status
- I have a girlfriend named Bea Vicente and I lover her so much.

About John:
${aboutText}

Other Projects:
${projectsData.map(p => `- ${p.name}: ${p.desc} (Tech: ${p.tech.join(", ")})`).join("\n")}

Guidelines:
- Answer as John's professional representative.
- Be concise, helpful, and professional.
- Use details from the Education, Skills, Resume Projects, and Certifications sections.
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

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OpenAI API key not configured." }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    return Response.json({ reply });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process chat request.";

    console.error("Chat API error:", errorMessage);
    return Response.json({
      error: errorMessage,
      details: getErrorDetails(error),
    }, { status: 500 });
  }
}
