import { Github, Linkedin, Mail } from "lucide-react";

export const EMAIL = "johncarlsantos30@gmail.com";
export const RESUME_URL = "/JohnCarl_Resume.pdf";

/** Single source of truth for the social links repeated across hero, contact,
 *  footer, and the mobile menu. */
export const socialLinks = [
  {
    href: "https://github.com/JohnCarl-30",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/santosjohncarl",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: `mailto:${EMAIL}`,
    label: "Email",
    icon: Mail,
  },
] as const;
