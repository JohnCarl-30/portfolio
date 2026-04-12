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
    href: 'https://instagram.com',
    icon: <InstagramLineIcon size={40} />,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <FacebookCircleLineIcon size={40} />,
  },


  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: <GithubLineIcon size={40} />,
  },
]

export const aboutText: string = "I am a passionate software developer who enjoys building practical and user-focused applications. I specialize in creating full-stack systems, including POS solutions, database-driven applications, and modern web interfaces. With experience in Java, MySQL, and React-based frameworks, I focus on writing clean, efficient, and maintainable code. I am continuously learning new technologies and improving my problem-solving skills, aiming to develop systems that make everyday tasks easier and more efficient.";

interface Skill {
  name: string;
  icon: string;
}

export const skillsData: Skill[] = [
  { name: 'Figma', icon: '/skills/figma.png' },
  { name: 'VS Code', icon: '/skills/vscode.png' },
  { name: 'HTML', icon: '/skills/html.png' },
  { name: 'CSS', icon: '/skills/css.png' },
  { name: 'JavaScript', icon: '/skills/js.png' },
  { name: 'TailwindCSS', icon: '/skills/tailwind.png' },
  { name: 'Vite', icon: '/skills/vite.png' },
  { name: 'ReactJS', icon: '/skills/react.png' },
  { name: 'TypeScript', icon: '/skills/ts.png' },
  { name: 'AI', icon: '/skills/ai.png' },
  { name: 'NextJS', icon: '/skills/nextjs.png' },
  { name: 'NodeJS', icon: '/skills/nodejs.png' },
  { name: 'Github', icon: '/skills/github.png' },
  { name:'Docker', icon:'/skills/Docker.png'},
  {name: 'Python', icon: '/skills/python-logo.svg'},
  {name: 'Postgresql', icon: '/skills/PostgresSQL.png'}
];
