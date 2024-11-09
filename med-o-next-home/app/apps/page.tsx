"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  CalendarIcon,
  HandshakeIcon,
  HomeIcon,
  InfoIcon,
  UsersIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="w-5 h-5 text-white" />,
    },
    {
      name: "About Us",
      link: "/about",
      icon: <CalendarIcon className="w-5 h-5 text-white" />,
    },
    {
      name: "Our Team",
      link: "/team",
      icon: <UsersIcon className="w-5 h-5 text-white" />,
    },
    {
      name: "Our Apps",
      link: "/apps",
      icon: <InfoIcon className="w-5 h-5 text-white" />,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <HandshakeIcon className="w-5 h-5 text-white" />,
    },
  ];

  const nameItems = [
    {
      title: "Med-o-Chat",
      description:
        "Real-time medical consultations with certified doctors. Schedule video consultations for in-depth discussions. Share images and reports during chat for precise medical advice.New! Message history for better follow-up and patient-doctor communication.",
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
    <div className="flex flex-col items-center min-h-screen w-full">
      <nav className="flex items-center justify-between w-full md:full p-4 bg-black rounded-lg mb-8">
        {/* Logo / Brand Name */}
        <span className="text-white font-bold">Med-o-Next</span>

        {/* Desktop Navbar */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center gap-2 text-white"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Hamburger Icon for Mobile */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black rounded-lg p-4 space-y-4 w-3/4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center gap-2 text-white"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}

      <HoverEffect items={nameItems} />
    </div>
  );
};

export default Page;
