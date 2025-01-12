"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  CalendarIcon,
  HandshakeIcon,
  HomeIcon,
  InfoIcon,
  UsersIcon,
  Menu,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="w-4 h-4" />,
    },
    {
      name: "About Us",
      link: "/about",
      icon: <CalendarIcon className="w-4 h-4" />,
    },
    {
      name: "Our Team",
      link: "/team",
      icon: <UsersIcon className="w-4 h-4" />,
    },
    {
      name: "Our Apps",
      link: "/apps",
      icon: <InfoIcon className="w-4 h-4" />,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <HandshakeIcon className="w-4 h-4" />,
    },
  ];

  const nameItems = [
    {
      title: "Med-o-Chat",
      description:
        "Real-time medical consultations with certified doctors. Schedule video consultations for in-depth discussions. Share images and reports during chat for precise medical advice.New! Message history for better follow-up and patient-doctor communication.",
      link: "http://med-o-chat-snowy.vercel.app",
    },
    {
      title: "Med-o-Shop",
      description:
        "Directly order authentic medications from certified manufacturers.Automatic refill reminders based on prescriptions.Transparent pricing and home delivery options available for every user.Discounted rates for long-term prescriptions and bulk orders.",
      link: "http://med-o-shop-1.onrender.com",
    },
    {
      title: "Med-o-AI",
      description:
        "Get instant answers to medical queries with our AI-driven assistant.Extensive knowledge base for reliable and accurate medical information.Personalize the AI responses based on user health history and preferences.",
      link: "http://med-o-ai.vercel.app",
    },
    {
      title: "Med-o-Search",
      description:
        "Med-o-Search is an app that provides detailed information on medicines and diseases, including symptoms, dosage, side effects, and precautions, helping users access reliable health information easily.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Med-o-Next
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="group flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <HoverEffect items={nameItems} />
      </div>
    </div>
  );
};

export default Page;