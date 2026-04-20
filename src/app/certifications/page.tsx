'use client'
import { useEffect } from 'react';
import HomeComponent from "@/components/Home";

export default function CertificationsPage() {
  useEffect(() => {
    const element = document.getElementById('certifications');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return <HomeComponent />;
}
