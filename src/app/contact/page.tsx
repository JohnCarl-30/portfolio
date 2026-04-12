'use client'
import { useEffect } from 'react';
import HomeComponent from "@/components/Home";

export default function ContactPage() {
  useEffect(() => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return <HomeComponent />;
}
