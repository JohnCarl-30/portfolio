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
    slug: "notes-from-passing-the-claude-developer-exam",
    title: "Notes from passing the Claude developer exam",
    excerpt:
      "I passed Claude Certified Developer – Foundations with 896/1000 after four days of prep. Here is how the exam is weighted and what kind of answer it rewards.",
    date: "2026-10-09",
    readingTime: "4 min",
    tags: ["AI", "Certification"],
    content: [
      "I passed Anthropic's Claude Certified Developer – Foundations (CCDV-F) exam with 896 out of 1,000 after four days of preparation. The pass mark is 720. There are no exam questions in this post. It covers how the exam is weighted and what kind of answer it tends to reward.",
      "The exam has 53 questions and a 120-minute limit, and it's scored from 100 to 1,000. The score report breaks your result into 25 test objectives across eight domains. The official exam guide publishes a weight for each domain, so read it first and plan your time around those numbers.",
      "Applications and Integration is the biggest domain at 33.1%. After it come Model Selection and Optimization (16.8%), Agents and Workflows (14.7%), Prompt and Context Engineering (11%), Tools and MCPs (10.6%) and Security and Safety (8.1%). Claude Code gets 3.1%, and Eval, Testing, and Debugging gets 2.6%.",
      "You don't write any code, and you don't need syntax, parameter names or prices. Each question describes a situation and asks what a developer should do. Models are described by role, such as the fast, low-cost option or the strongest reasoning tier, instead of by name. Time spent memorizing API fields is better spent learning when each feature is the right call.",
      "Many questions have two answers that both sound right, and the better one often puts the steps in a more sensible order: settle the requirements before picking a model, find the cause before applying a fix, and test a new model on your own workload before switching to it. If you can't choose between two options, ask which step should happen first.",
      "Answers that include a check tend to beat answers that don't. \"Pick the cheapest model tier that meets the bar\" is a decent answer. \"Pick the cheapest tier that meets the bar and keep evaluating it\" is a better one. Watch for options that are correct but skip validation.",
      "If something has to happen every time, like a check before a command runs, a fixed output format or a human approval, put it in a hook, a permission rule or an approval step. Asking for it in the prompt isn't enough. When a scenario says the model \"occasionally skips\" a step, the answer is usually to enforce that step in code.",
      "When an agent's history grows too long, give it less to carry: prune old tool results, compact older turns, or hand self-contained work to subagents that have their own context. A bigger context window only delays the problem.",
      "Much of Applications and Integration is general software engineering. Alongside the Claude API, it covers requirement types (functional, non-functional and infrastructure), the system life cycle, version control and code review, and configuration and secrets management. To sort a requirement, try deleting it: if the system still works, just worse, it was non-functional.",
      "Some Claude API rules come up often enough to learn well. If nobody is waiting on the result, use the Message Batches API, which runs requests asynchronously at half the price. If someone is waiting, make a normal request and stream long responses. Prompt caching reuses an identical prefix of the prompt, so it lowers the cost of repeated input but never of output. The API doesn't remember earlier turns or include claude.ai's built-in instructions, so you send the conversation history and the system prompt yourself. Use a workflow when the steps are fixed, and an agent when you can't predict them.",
      "My advice for preparing: start with the exam guide and its weights, practice scenario questions rather than memorizing facts, and review your mistakes by objective instead of by total score. Much of my four days was hands-on, in a playground I built for the Claude API, the Agent SDK, Claude Code and MCP, organized around the exam's objectives.",
      "The certification track from that playground is now a free study site, CCDV-F Study Lab, at johncarl-30.github.io/claude-code-playground. It has knowledge checks, mock exams, a mistakes deck and a study plan, and you don't need an API key. I wrote the questions from the official docs, and none of them come from the real exam.",
      "Good luck if you're taking it soon. If you try the Study Lab and spot a question that's wrong or out of date, tell me and I'll fix it.",
    ],
  },
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
