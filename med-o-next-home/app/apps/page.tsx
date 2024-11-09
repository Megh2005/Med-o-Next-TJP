import { HoverEffect } from '@/components/ui/card-hover-effect';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { CalendarIcon, HandshakeIcon, HomeIcon, InfoIcon, UsersIcon } from 'lucide-react';
import React from 'react'

const page = () => {
    const navItems = [
      {
        name: "Home",
        link: "/",
        icon: <HomeIcon className="w-5 h-5 text-neutral-500 dark:text-white" />,
      },
      {
        name: "About Us",
        link: "/about",
        icon: (
          <CalendarIcon className="w-5 h-5 text-neutral-500 dark:text-white" />
        ),
      },
      {
        name: "Our Team",
        link: "/team",
        icon: (
          <UsersIcon className="w-5 h-5 text-neutral-500 dark:text-white" />
        ),
      },
      {
        name: "Our Apps",
        link: "/apps",
        icon: <InfoIcon className="w-5 h-5 text-neutral-500 dark:text-white" />,
      },
      {
        name: "Contact Us",
        link: "/contact",
        icon: (
          <HandshakeIcon className="w-5 h-5 text-neutral-500 dark:text-white" />
        ),
      },
    ];
    const nameItems = [
      {
        title: "Health Check",
        description:
          "Schedule routine health check-ups with certified professionals.",
        link: "https://example.com/health-check",
      },
      {
        title: "Wellness Programs",
        description:
          "Discover personalized wellness programs tailored to your needs.",
        link: "https://example.com/wellness-programs",
      },
      {
        title: "Consultation Services",
        description: "Book online consultations with top medical experts.",
        link: "https://example.com/consultation-services",
      },
      {
        title: "Emergency Support",
        description: "Access immediate support during medical emergencies.",
        link: "https://example.com/emergency-support",
      },
    ];

  return (
    <div className="w-full items-center">
      <FloatingNav navItems={navItems} />
      <HoverEffect items={nameItems} />
    </div>
  );
}

export default page