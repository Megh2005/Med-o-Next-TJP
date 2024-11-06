"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/Footer";
import {
  CalendarIcon,
  HandshakeIcon,
  HomeIcon,
  InfoIcon,
  UsersIcon,
} from "lucide-react";

export default function HeroParallaxDemo() {
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
      icon: <UsersIcon className="w-5 h-5 text-neutral-500 dark:text-white" />,
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

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <HeroParallax products={products} />
      {/* <Footer /> */}
    </div>
  );
}
export const products = [
  {
    title: "Session 0",
    link: "",
    thumbnail:
      "https://res.cloudinary.com/dfdbvvapa/image/upload/v1730129514/SESSION_0_ixkprk.png",
  },
  {
    title: "ML Churn",
    link: "https://algochurn.com",
    thumbnail:
      "https://res.cloudinary.com/dfdbvvapa/image/upload/v1730131019/ML_pbl7f2.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
