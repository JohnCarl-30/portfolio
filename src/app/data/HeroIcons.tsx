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
    href: 'https://github.com/santosjohncarl',
    icon: <GithubLineIcon size={40} />,
  },
]

export const aboutText: string = "I am a passionate software developer who enjoys building practical and user-focused applications. I specialize in creating full-stack systems, including POS solutions, database-driven applications, and modern web interfaces. With experience in Java, MySQL, and React-based frameworks, I focus on writing clean, efficient, and maintainable code. I am continuously learning new technologies and improving my problem-solving skills, aiming to develop systems that make everyday tasks easier and more efficient.";

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
  { name: 'Postgresql', icon: '/skills/PostgresSQL.png', category: 'backend' }
];
