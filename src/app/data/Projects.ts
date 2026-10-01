export interface KeyFeature {
  title: string;
  description: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: "Web" | "Mobile" | "UI/UX" | "AI" | "None";
  desc: string;
  url: string;
  tech: string[];
  role: string;
  timeline: string;
  longDescription: string;
  highlights?: string[];
  keyFeatures: KeyFeature[];
  liveDemoUrl?: string;
  /** Public source, for work whose evidence is the code rather than a deploy. */
  repoUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "rfq-bot",
    name: "RFQ Email Bot",
    category: "AI",
    desc: "An email bot for a steel supplier that reads free-text price inquiries, matches each item to a 960-SKU catalog, and replies in the customer's thread with a priced quotation.",
    longDescription: "Customers ask for prices the way they would ask a counter clerk: \"100 pcs 10mm rebar 6m and 20 sheets of 4x8 GI sheet 1.2mm\", often in Taglish. The bot polls a Gmail inbox, has an LLM turn the email into structured line items (product, grade, every size in millimetres, quantity), and checks each item against the line it came from before using it.\n\nEach item is matched to the catalog on product, stated variants, and sizes, with inch sizes snapped to the metric stock they are sold as. An item is only priced on a confident match; anything ambiguous or missing goes back to the customer as a question listing the closest SKUs. The reply is a quotation with SKUs, 12% VAT, a validity window, and terms, threaded under the customer's own email.",
    url: "/projects/rfq-bot.png",
    tech: ["Python", "OpenAI API", "Gmail API", "Google OAuth", "RapidFuzz", "pytest"],
    role: "AI Engineer",
    timeline: "2026",
    highlights: [
      "Extracts line items with a strict JSON schema; every item must cite a real line in the email and match the quantity written there, with a rules parser as fallback.",
      "Matches on every size given (beams carry five), applies trade defaults like Grade 40 rebar and tells the customer, and asks instead of guessing; all 960 SKUs find themselves from their own description.",
      "Handles each email exactly once across restarts using Gmail history and claim/processed labels, with per-sender rate limits and no automatic replies to forged or bulk mail.",
    ],
    keyFeatures: [
      {
        title: "Free Text to Line Items",
        description: "An LLM reads Taglish, misspellings, and inch shorthand into structured items, each tied to the line it came from.",
        image: "/projects/rfq-bot.png",
      },
      {
        title: "Match or Ask",
        description: "Confident catalog matches are priced; unknown or ambiguous items come back as a question with the closest SKUs.",
        image: "/projects/rfq-bot.png",
      },
      {
        title: "Threaded Quotation",
        description: "SKU table, subtotal, 12% VAT, total, validity, and terms, replied in the customer's own thread in about 30 seconds.",
        image: "/projects/rfq-bot.png",
      }
    ],
  },
  {
    id: "directory-pipeline",
    name: "directory-pipeline",
    category: "AI",
    desc: "A crawl \u2192 extract \u2192 enrich \u2192 resolve \u2192 search pipeline on Temporal, where an eval decides how much of the extraction the model is allowed to do \u2014 and the answer is two fields out of 234.",
    longDescription: "A directory of companies is built by crawling listing pages, pulling a record out of each one, enriching it, deciding which records are the same company, and indexing the survivors behind an OpenSearch alias. Temporal owns the orchestration, so a crawl that dies halfway resumes rather than restarts: one batch of twenty-five exhausts its own retries and fails alone while the rest keep indexing.\n\nExtraction is three layers, cheapest first \u2014 CSS selectors, then regex over the page's prose, then a model call \u2014 and each layer fills only what the one above it missed. The split is measured rather than asserted. The fixtures are the ground truth, since the mock site renders its pages from the same records the extractor is trying to recover, so every company can be rendered under rich markup, prose-only, and near-empty templates and scored per field. Facts a page never prints are excluded from recall, because a stub listing genuinely has no phone number and no layer could recover one; counting those as misses had overstated the case for the model by nearly three times.\n\nThe result is that the deterministic layers recover 232 of 234 recoverable fields with zero incorrect values, and the model is needed for two \u2014 both headcounts written as bare numbers, where \"around 500\" could as easily be revenue. An agentic extractor was built first and rejected on its own numbers. The eval is also what caught a regression I introduced while closing an address gap: a single pattern accepting both \"TX\" and \"Texas\" matched the street as the city on \"1 Rockefeller Plaza, New York, NY\".",
    url: "/projects/directory-pipeline.png",
    tech: ["Python", "Temporal", "OpenSearch", "FastAPI", "Anthropic API", "MCP", "Prometheus", "Docker", "pandas", "pytest"],
    role: "Backend & Data Engineer",
    timeline: "2026",
    repoUrl: "https://github.com/JohnCarl-30/directory-pipeline",
    highlights: [
      "Measured the extraction cascade instead of arguing it: 232 of 234 recoverable fields from selectors and regex, zero incorrect values across 36 pages, and the model needed for two.",
      "Built the agentic extractor and rejected it on the numbers \u2014 $2.56 for one company, six tool calls including three 404s, and it read an unrelated company's page, which in a pipeline that then resolves duplicates is a correctness problem rather than waste.",
      "Found the Dockerised worker had never once started: it crash-looped on a TypeError while 144 tests, an in-process smoke run and the image build all stayed green, because none of the three ever ran the container that ships. Added a CI job that boots the stack, and confirmed it against the bug by reverting the fix.",
      "Fixed a retry policy that named an exception class nothing raises, so terminal 404s retried six times over ten minutes; the verdict now travels with the exception, and a test asserts every entry in that list resolves to a real class.",
      "Stopped a reindex retry from starting a second concurrent copy of a multi-hour index build \u2014 the index name is unique by construction, so a retry minted a new target and left the first copy filling an index nothing would swap to.",
      "Exported latency as histogram buckets rather than percentiles so worker replicas aggregate correctly, since averaging two workers' p95 is not the fleet's p95.",
    ],
    keyFeatures: [
      {
        title: "Why This Ranked",
        description: "Expanding a result shows the stored document and the BM25 breakdown behind its score \u2014 boost, idf, tf and the parameters \u2014 so relevance is inspectable rather than argued about.",
        image: "/projects/directory-pipeline-explain.png",
      },
      {
        title: "Measured, Not Argued",
        description: "An eval scores each extraction layer per field against the records the fixture pages are rendered from, and separates facts a page never printed from facts the parser missed.",
        image: "/projects/directory-pipeline.png",
      },
      {
        title: "The Agent That Did Not Pay",
        description: "The agentic version of the extractor cost $2.56 per company, wandered onto 404s, and returned a state name where the index wanted a code. The write-up states what the single spike does and does not prove.",
        image: "",
      },
      {
        title: "Green Tests, Dead Worker",
        description: "Unit tests drove workflows through a time-skipping environment and never started a worker; CI built the image and stopped. A job now boots the real containers and asserts the worker logged a start, holds no traceback, and has not restarted.",
        image: "",
      }
    ],
  },
  {
    id: "auto-learn",
    name: "auto-learn",
    category: "Web",
    desc: "An ESL writing tool where the explanation is a gate, not a receipt: the better word is withheld until you open the card that teaches it.",
    longDescription: "auto-learn fixes a sentence and teaches the word that fixed it. Typos, spacing, and punctuation are corrected inline and never discussed. Anything that is a real choice \u2014 grammar, word choice, register, wordiness \u2014 is marked but held back: the API drops the replacement from its response and keeps it server-side, so the only way to read the stronger word is to open the card that explains it.\n\nThe withholding is the product, so it is enforced where it cannot be walked around. The field is absent from the payload rather than flagged inside it, which means it is not sitting in the network tab either. Accepting a word banks it, and the next request tells the model which words the writer has already met so it reaches for one they have not.\n\nMost of the work went into knowing whether the model was any good. An eval harness scores both model calls against a committed baseline using deterministic checks and an LLM judge, and the judge was validated against hand-labelled cases before it was trusted \u2014 Cohen\u2019s kappa, not impressions. It paid for itself by catching a prompt change that raised one score while quietly lowering another.",
    url: "/projects/auto-learn.png",
    tech: ["NextJS", "TypeScript", "NestJS", "PostgreSQL", "Redis", "OpenAI API", "ElevenLabs", "Auth.js", "Zod", "WordNet", "Jest", "Vitest", "Playwright"],
    role: "Full-stack Developer",
    timeline: "2026 - Present",
    repoUrl: "https://github.com/JohnCarl-30/auto-learn",
    highlights: [
      "Enforced the gate on the server: the replacement is dropped from the proposal and released only when a card is opened, so it never reaches the browser early.",
      "Validated the LLM judge against hand-labelled cases before trusting it, then held every prompt change to a committed baseline at six runs per case.",
      "Grounded word senses in a local WordNet database rather than a dictionary API, so the part the cards are built on needs no network and no key.",
      "Measured the voice path instead of estimating it \u2014 setting the synthesis output format cut each spoken word from 15,090 bytes to 3,989.",
      "Split tests across three runners by filename to keep an ESM-only AI SDK and a CommonJS API in one repository: 498 tests across the three packages.",
      "Synced the word bank to an account without uploading the writing: the sentence a word was met in has no column on the server and never leaves the browser.",
    ],
    keyFeatures: [
      {
        title: "The Gate",
        description: "Tier-two suggestions arrive as a mark and a teaser. The replacement stays on the server until the reader opens the card that teaches it.",
        image: "",
      },
      {
        title: "Evaluated, Not Assumed",
        description: "Deterministic scorers and a validated LLM judge run both model calls against a committed baseline, so a prompt change has to prove it helped.",
        image: "",
      },
      {
        title: "A Bank That Earns Its Reward",
        description: "Words are banked only when chosen, and the product congratulates reuse rather than attendance \u2014 it fires on evidence the writer used the word again unprompted.",
        image: "",
      }
    ],
  },
  {
    id: "relaydesk",
    name: "Relaydesk",
    category: "AI",
    desc: "A support chat widget that answers from a help center, links the article it quoted, and opens a ticket in a staff inbox when it can't help.",
    longDescription: "Relaydesk is a support widget and staff inbox, demoed on Nimbus, a made-up analytics company. A visitor asks a question and a LangGraph loop retrieves help articles, answers by quoting the best match (or with an LLM when a key is set), and searches again with a rewritten query when the first pass is weak. Questions the help center can't answer, or a tap on \"This didn't help\", open a ticket with the full transcript.\n\nMost of the work went into the second message, not the first. Follow-ups like \"and Starter?\" or \"can I export them first?\" are resolved against the conversation, \"thanks\" gets a reply instead of a ticket, and a price question with no price in the articles goes to a person. A 43-conversation eval and Playwright tests in CI check that it stays that way.",
    url: "/projects/relaydesk.png",
    tech: ["LangGraph", "NextJS", "TypeScript", "OpenAI API", "Playwright", "LangChain", "SQLite", "TailwindCSS", "OpenTelemetry"],
    role: "Full-stack AI Engineer",
    timeline: "2026 - Present",
    repoUrl: "https://github.com/JohnCarl-30/relaydesk",
    highlights: [
      "Built the LangGraph loop: retrieve, answer by quoting or generating, and retry with a rewritten query when retrieval is weak.",
      "Resolved follow-up questions against the conversation, checked by a 43-conversation multi-turn eval. Failures found in review went in as test cases before each fix.",
      "Traced a failing CI quality gate to a metric that scored correct refusals near zero, and changed my eval harness to score refused answers separately.",
      "Covered the widget with Playwright tests that run against a production build in CI.",
    ],
    keyFeatures: [
      {
        title: "Answers With a Source",
        description: "Each reply quotes the help article it came from and links it under \"Answer based on\".",
        image: "/projects/relaydesk.png",
      },
      {
        title: "Handoff to a Staff Inbox",
        description: "Unanswerable questions and \"This didn't help\" open a ticket. Staff see the full transcript, with bot replies marked.",
        image: "/projects/relaydesk-inbox.png",
      },
      {
        title: "The Help Center It Searches",
        description: "Articles are grouped by topic, and each ends with a \"Still stuck?\" box that opens the chat.",
        image: "/projects/relaydesk-help.png",
      }
    ],
  },
  {
    id: "resumae",
    name: "Resumae",
    category: "AI",
    desc: "A resume checker that lines a resume up against one job post and marks what to fix: job words it never uses, bullets with no outcome, and layout that slows a scan.",
    longDescription: "Most resume checkers score a resume against a generic template. Resumae scores it against the posting the person is actually applying to. They paste the job post and upload a PDF or DOCX; the API pulls the text out and an LLM returns the analysis as a typed object: matched and missing job words, a match score, bullet-level notes, and layout issues that would slow a six-second skim.\n\nSuggestions are edits the user reviews, not a rewrite. Each one sits next to the bullet it refers to and only changes the resume when accepted. If the model call fails or AI is switched off, rule-based analyzers for keywords, impact, writing, and parseability produce the same report shape, so the check still returns. Building a resume needs no account: four templates, an inline editor with undo and redo, and drafts kept in the browser until the user saves one.",
    url: "/projects/resumae.png",
    tech: ["NextJS", "NestJS", "TypeScript", "PostgreSQL", "Azure OpenAI", "Vercel AI SDK", "Clerk", "Docker"],
    role: "Full-stack Developer",
    timeline: "2026 - Present",
    highlights: [
      "Gets analysis back as a Zod-validated object through the AI SDK's generateObject, so the UI renders typed fields instead of parsing prose.",
      "Falls back to rule-based analyzers with the same output shape whenever the model call fails, so a check never dead-ends on an AI error.",
      "Covered by Jest on the NestJS API, Vitest with fast-check property tests on the web app, and Playwright browser tests in CI.",
    ],
    keyFeatures: [
      {
        title: "Checked against the posting",
        description: "Paste the job post and upload a PDF or DOCX; the report lists the job words the resume uses, the ones it is missing, and a match score.",
        image: "/projects/resumae.png",
      },
      {
        title: "Edits you approve",
        description: "Each weak bullet gets a suggested rewrite with the outcome it was missing; nothing changes until the user accepts it.",
        image: "/projects/resumae.png",
      },
      {
        title: "Builder with no sign-in",
        description: "Four templates and an inline editor with undo and redo; drafts stay in the browser until the user saves one.",
        image: "/projects/resumae.png",
      }
    ],
    liveDemoUrl: "https://resumae.tech"
  },
  {
    id: "alphaexplora",
    name: "Alphaexplora",
    category: "Web",
    desc: "A fintech workflow platform for teams that run several legal entities, with live dashboards and automated controls.",
    longDescription: "Alphaexplora is a workflow platform for fintech teams that manage several legal entities at once. The site walks through the product, pricing paths, and interface sections that compliance-heavy teams ask about.\n\nThe build itself came down to fast landing-page loads, layouts that hold up on any screen, and a visual system consistent enough for a finance buyer to take seriously.",
    url: "/projects/alphaexplora.png",
    tech: ["NextJS", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
    role: "Web Developer",
    timeline: "2024",
    highlights: [
      "Designed a fintech landing experience with enterprise-oriented messaging and conversion paths.",
      "Built responsive sections for features, pricing, testimonials, and beta sign-up flows.",
      "Used motion and visual hierarchy to make a trust-heavy product feel fast and modern.",
    ],
    keyFeatures: [
      {
        title: "Real-time Visibility",
        description: "Live dashboards show operations across every entity as they happen.",
        image: "/projects/alphaexplora.png",
      },
      {
        title: "Automated Multi-Entity Control",
        description: "Automation rules handle repeated workflow steps across entities.",
        image: "/projects/alphaexplora.png",
      },
      {
        title: "Enterprise-Grade Security",
        description: "Transaction data sits behind role-based access and audit logging.",
        image: "/projects/alphaexplora.png",
      }
    ],
    liveDemoUrl: "https://fintech-nine-psi.vercel.app/"
  },
  {
    id: "study-ai",
    name: "StudyAI (autocards.app)",
    category: "Web",
    desc: "A study platform that turns notes and PDFs into flashcards and summaries.",
    longDescription: "StudyAI (autocards.app) turns study materials into flashcards and short summaries. Upload notes or a PDF and an LLM splits the content into question-and-answer cards; photos of handwritten notes go through OCR first.\n\nA study workspace keeps decks, progress, and recent sessions in one place, and study sessions adapt to which cards a user keeps missing.",
    url: "/projects/autocards.png",
    tech: ["NextJS", "TypeScript", "OpenAI API", "TailwindCSS", "Framer Motion", "Supabase", "Docker", "Digital Ocean", "Redis", "Celery", "pgvector"],
    role: "Lead Developer",
    timeline: "2024 - Present",
    highlights: [
      "Built the AI generation workflow for turning notes and PDFs into flashcards and summaries.",
      "Designed asynchronous processing with Redis and Celery for heavier document jobs.",
      "Integrated Supabase and pgvector to support searchable study content and user workspaces.",
    ],
    keyFeatures: [
      {
        title: "AI Flashcard Generation",
        description: "An LLM splits any text or PDF into structured question-and-answer cards.",
        image: "/projects/autocards.png",
      },
      {
        title: "Intelligent Study Workspace",
        description: "A centralized hub to manage decks, track progress, and jump back into recent study sessions.",
        image: "/projects/autocards.png",
      },
      {
        title: "OCR Integration",
        description: "Photograph handwritten or printed notes and OCR turns them into study material.",
        image: "/projects/autocards.png",
      }
    ],
    liveDemoUrl: "https://autocards.app"
  },
  {
    id: "taskspay",
    name: "TasksPay",
    category: "Web",
    desc: "A task marketplace on the Stellar network where finished tasks pay out instantly in stablecoins.",
    longDescription: "TasksPay is a task marketplace on Stellar. A Soroban smart contract holds the payment while a task is open and releases it once the work is verified, so poster and worker never have to trust each other.\n\nUsers post tasks, pick up someone else's, and get paid in stablecoins the moment the contract settles.",
    url: "/projects/taskspay.png",
    tech: ["React", "JavaScript", "Soroban SDK", "Stellar", "Rust", "TailwindCSS"],
    role: "Full-stack Developer",
    timeline: "2024",
    highlights: [
      "Built a wallet-connected escrow interface for creating and tracking milestone-based tasks.",
      "Integrated Stellar and Soroban concepts into a web workflow for automated settlement.",
      "Designed a focused product interface around trust, payment status, and task progress.",
    ],
    keyFeatures: [
      {
        title: "Stellar Blockchain Integration",
        description: "Payments run over the Stellar network, so transactions settle in seconds for fractions of a cent.",
        image: "/projects/taskspay.png",
      },
      {
        title: "Smart Contract Execution",
        description: "Soroban smart contracts verify task completion and settle payment without a middleman.",
        image: "/projects/taskspay.png",
      },
      {
        title: "Decentralized Task Marketplace",
        description: "Post a task, or finish someone else's and earn cryptocurrency.",
        image: "/projects/taskspay.png",
      }
    ],
    liveDemoUrl: "https://taskspay.vercel.app/"
  },
  {
    id: "sociatech",
    name: "SociaTech",
    category: "Web",
    desc: "A social learning platform connecting students and educators with real-time collaboration tools, resource sharing, and interactive study groups.",
    longDescription: "SociaTech is a social learning platform where students and educators share resources, run study groups, and collaborate in real time. Sign-in works with email and password or Google, backed by Firebase.",
    url: "",
    tech: ["React", "PHP", "Firebase", "XAMPP", "phpMyAdmin"],
    role: "Project Lead & Backend Developer",
    timeline: "2024",
    highlights: [
      "Led the build across authentication, content workflows, and student collaboration features.",
      "Implemented Firebase sign-in and backend API endpoints for user and content management.",
      "Coordinated frontend and backend decisions for a practical classroom collaboration tool.",
    ],
    keyFeatures: [
      {
        title: "Firebase Authentication",
        description: "Secure sign-in with email/password and Google OAuth integration.",
        image: "",
      },
      {
        title: "Real-time Collaboration",
        description: "Interactive study groups and live resource sharing between students.",
        image: "",
      },
      {
        title: "REST API Backend",
        description: "Scalable backend with JWT-secured endpoints for user and content management.",
        image: "",
      }
    ],
  },
  {
    id: "civireport",
    name: "CiviReport",
    category: "Mobile",
    desc: "A barangay issue tracking mobile app that enables citizens to file complaints, track their status, and send emergency alerts to local officials.",
    longDescription: "CiviReport is a mobile app for barangay governance. Residents file complaints, follow the status as officials act on them, and send emergency alerts that attach their location automatically.",
    url: "",
    tech: ["Java", "FastAPI", "Firebase"],
    role: "Mobile Developer",
    timeline: "2025",
    highlights: [
      "Built mobile complaint filing flows for citizens to report barangay concerns.",
      "Connected report tracking to backend services for status visibility.",
      "Added emergency reporting patterns with location-aware response context.",
    ],
    keyFeatures: [
      {
        title: "File a Complaint",
        description: "File a complaint from the app in a few taps.",
        image: "",
      },
      {
        title: "Check Complaint Status",
        description: "Track the progress of filed complaints in real-time with status updates.",
        image: "",
      },
      {
        title: "Emergency Report",
        description: "Send urgent alerts to barangay officials with automatic location and report details included.",
        image: "",
      }
    ],
  },

];

export const projectsButton: string[] = [
  "All",
  "Web",
  "Mobile",
  "UI/UX",
  "AI"
];
