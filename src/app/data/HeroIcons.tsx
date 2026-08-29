import { ReactElement } from 'react'
import InstagramLineIcon from 'remixicon-react/InstagramLineIcon'
import FacebookCircleLineIcon from 'remixicon-react/FacebookCircleLineIcon'
import GithubLineIcon from 'remixicon-react/GithubLineIcon'

// 1. Rename the interface to follow standard naming conventions (PascalCase)
interface HeroIcon {
  name: string;
  href: string;
  icon: ReactElement;
}

// 2. Use the interface to type the array of objects
export const HERO_ICONS: HeroIcon[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/santosjohncarl',
    icon: <InstagramLineIcon size={40} />,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/santosjohncarl',
    icon: <FacebookCircleLineIcon size={40} />,
  },


  {
    name: 'GitHub',
    href: 'https://github.com/JohnCarl-30',
    icon: <GithubLineIcon size={40} />,
  },
]

export const aboutText: string = "I'm John Carl Santos, an AI full-stack engineer and computer science student at Philippine Christian University (consistent Dean's Lister). I work at SOFI AI Tech Solutions on training data and LLM evaluation, and I interned as a backend engineer at FlyRank AI and a software engineer at Alphaexplora. I build full-stack products with AI inside: StudyAI turns documents into flashcards over a RAG pipeline, Resumae analyzes resumes against job posts, and CiviReport handles barangay complaints. My stack is Python, TypeScript, FastAPI, Laravel, React, Next.js, PostgreSQL, and LangChain. I care about systems that keep working after the demo.";

interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'infra' | 'ai';
}

export const skillsData: Skill[] = [
  { name: 'Figma', icon: '/skills/figma.png', category: 'frontend' },
  { name: 'VS Code', icon: '/skills/vscode.png', category: 'infra' },
  { name: 'HTML', icon: '/skills/html.png', category: 'frontend' },
  { name: 'CSS', icon: '/skills/css.png', category: 'frontend' },
  { name: 'JavaScript', icon: '/skills/js.png', category: 'frontend' },
  { name: 'TailwindCSS', icon: '/skills/tailwind.png', category: 'frontend' },
  { name: 'Vite', icon: '/skills/vite.png', category: 'frontend' },
  { name: 'ReactJS', icon: '/skills/react.png', category: 'frontend' },
  { name: 'TypeScript', icon: '/skills/ts.png', category: 'frontend' },
  { name: 'AI', icon: '/skills/ai.png', category: 'ai' },
  { name: 'NextJS', icon: '/skills/nextjs.png', category: 'frontend' },
  { name: 'NodeJS', icon: '/skills/nodejs.png', category: 'backend' },
  { name: 'Github', icon: '/skills/github.png', category: 'infra' },
  { name: 'Docker', icon: '/skills/Docker.png', category: 'infra' },
  { name: 'Python', icon: '/skills/python-logo.svg', category: 'backend' },
  { name: 'Postgresql', icon: '/skills/PostgresSQL.png', category: 'backend' },
  { name: 'TensorFlow', icon: '/skills/tensorflow.svg', category: 'ai' },
  { name: 'LangChain', icon: '/skills/langchain.svg', category: 'ai' },
  { name: 'LangGraph', icon: '/skills/langgraph.svg', category: 'ai' }
];
