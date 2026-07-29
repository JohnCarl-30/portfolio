export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-ai-features-without-the-demo-trap",
    title: "Shipping AI features without the demo trap",
    excerpt:
      "A working prototype is easy. A feature that survives real prompts, latency, and empty states is the actual product work.",
    date: "2026-06-12",
    readingTime: "5 min",
    tags: ["AI", "Product"],
    content: [
      "Most AI demos look sharp in a five-minute walkthrough. The model answers cleanly, the UI feels magical, and everyone nods. Then a real user pastes a messy PDF, asks an ambiguous question, or refreshes mid-stream — and the feature falls apart.",
      "When I build AI into a product, I treat the model as one dependency in a larger workflow. The hard parts are usually around the edges: what happens when the response is slow, when retrieval returns nothing useful, or when the user needs a way to correct the system without starting over.",
      "A practical loop that keeps working for me: define the job in one sentence, constrain inputs, show progress early, and make failure recoverable. If a feature only works on curated happy-path prompts, it is still a demo.",
      "The goal is not to hide the model. It is to make the product honest about what it can do, fast enough to trust, and resilient enough to ship.",
    ],
  },
  {
    slug: "notes-from-building-study-tools-with-llms",
    title: "Notes from building study tools with LLMs",
    excerpt:
      "Turning notes and PDFs into flashcards taught me more about async jobs and evaluation than about prompt wording.",
    date: "2026-04-28",
    readingTime: "6 min",
    tags: ["AI", "Full-stack"],
    content: [
      "Study tools look simple from the outside: upload a document, get cards back. Underneath, that flow is a pipeline — parsing, chunking, generation, review, and storage — and each stage can fail independently.",
      "The first version I shipped generated everything synchronously. It worked for short notes and broke for longer PDFs. Moving heavier work behind a queue forced clearer boundaries: what the user waits for, what can finish later, and how the UI shows stale versus ready content.",
      "Prompt quality still matters, but evaluation mattered more. I started saving a small set of real study materials and checking whether the cards were specific, answerable, and faithful to the source. That beat endless prompt rewriting.",
      "If you are building learning products with LLMs, invest early in the pipeline and in a tiny evaluation set. The model is rarely the only bottleneck.",
    ],
  },
  {
    slug: "what-i-look-for-when-choosing-a-stack",
    title: "What I look for when choosing a stack",
    excerpt:
      "I pick tools for the next six months of shipping, not for an imaginary perfect architecture.",
    date: "2026-02-10",
    readingTime: "4 min",
    tags: ["Engineering", "Full-stack"],
    content: [
      "Stack decisions get romantic fast. It is easy to optimize for elegance and end up with a setup that is hard to deploy, hard to hire for, or hard to debug under deadline.",
      "My filter is boring on purpose: can I ship a vertical slice this week, can I host it without ceremony, and can I explain the pieces to another engineer in ten minutes? Next.js, TypeScript, and a small backend or serverless surface usually clear that bar for the work I do.",
      "I also care about escape hatches. If the project needs queues, vector search, or a heavier Python service later, I want seams that can grow without a full rewrite.",
      "The best stack is the one that stays out of the way while the product gets clearer. Novelty is optional. Clarity is not.",
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();
}
