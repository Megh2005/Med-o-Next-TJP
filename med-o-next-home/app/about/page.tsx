"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import React, { useState } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  InfoIcon,
  HandshakeIcon,
} from "lucide-react";

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav className="bg-black text-white shadow-md px-4 py-2 flex items-center justify-between">
      <div className="text-2xl font-bold">Med-o-Next</div>
      {/* Desktop Navbar */}
      <ul className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a href={item.link} className="flex items-center space-x-2">
              {item.icon}
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-black text-white space-y-4 p-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.link} className="flex items-center space-x-2">
                {item.icon}
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default function HeroHighlightDemo() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Add the Navbar here */}
      <HeroHighlight>
        <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          With insomnia, nothing&apos;s real. Everything is far away. Everything
          is a
          <br/>
          <Highlight className="text-black dark:text-white">
            copy, of a copy, of a copy.
          </Highlight>
        </h1>
      </HeroHighlight>
    </div>
  );
}
