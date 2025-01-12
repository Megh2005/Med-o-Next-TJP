"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  InfoIcon,
  HandshakeIcon,
  Menu,
  X,
} from "lucide-react";

export default function HeroHighlightDemo() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
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
                  <a
                    key={item.name}
                    href={item.link}
                    className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-black/20 rounded-lg transition-all duration-200"
                  >
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-black/20 focus:outline-none transition-colors duration-200"
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
              <a
                key={item.name}
                href={item.link}
                className="group flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-black/30 transition-colors duration-200"
              >
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-16">
        <HeroHighlight>
          <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
            Welcome To
            <br />
            <Highlight className="text-black dark:text-white">
              Tech Janta Party
            </Highlight>
          </h1>
          <div className="flex flex-col items-center justify-center">
            <p className="text-balance text-center text-xl my-4">
              We&apos;re a dynamic team of tech enthusiasts and problem-solvers
              united by a shared vision: to build innovative, accessible, and
              people-focused digital solutions. Comprising{" "}
              <Highlight>Megh Deb</Highlight> as our Team Lead,{" "}
              <Highlight>Subham Mani</Highlight> as our Web Developer,{" "}
              <Highlight>Sayambar Roy Chowdhury</Highlight> as our AI/ML
              Developer, and <Highlight>Ronit Bose</Highlight> as our Backend and
              Web3 Developer, we bring diverse expertise and passion for making
              technology work for everyone.
            </p>
            <p className="text-xl text-center my-4 max-w-5xl">
              At Tech Janta Party, we believe that technology should empower
              individuals and communities. Our latest project,{" "}
              <Highlight>Med-o-Next</Highlight>, is a comprehensive medical web
              application designed to transform the healthcare experience by
              seamlessly integrating multiple essential services into one platform.
              Imagine booking doctor appointments with ease, engaging in live video
              consultations, and ordering prescribed medications—all through a
              single, user-friendly app.
            </p>
          </div>
        </HeroHighlight>
      </div>
    </div>
  );
}