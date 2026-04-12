'use client'
import { useEffect } from 'react';
import HomeComponent from "@/components/Home";

export default function SkillsPage() {
  useEffect(() => {
    const element = document.getElementById('skills');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return <HomeComponent />;
}
