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
      <div className="md:hidden bg-black">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-black focus:outline-none text-2xl"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-black bg-opacity-100 text-white space-y-4 p-4 z-10">
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
      <Navbar  />
      <HeroHighlight>
        <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
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
            <Highlight>Med-o-Next</Highlight>, is the perfect embodiment of this
            philosophy. MED-O-NEXT is a comprehensive medical web application
            designed to transform the healthcare experience by seamlessly
            integrating multiple essential services into one platform. Imagine
            booking doctor appointments with ease, engaging in live video
            consultations, and ordering prescribed medications—all through a
            single, user-friendly app.
          </p>
        </div>
      </HeroHighlight>
    </div>
  );
}
