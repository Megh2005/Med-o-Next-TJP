"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";
import { FloatingNav } from "@/components/ui/floating-navbar";
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
    </div>
  );
}
const products = [
  {
    title: "Med-o-Chat",
    link: "http://med-o-chat-snowy.vercel.app",
    thumbnail:
      "https://res.cloudinary.com/djyk287ep/image/upload/v1731157645/chat_zsx2ld.png",
  },
  {
    title: "Med-o-AI",
    link: "http://med-o-ai.vercel.app",
    thumbnail:
      "https://res.cloudinary.com/djyk287ep/image/upload/v1731157798/ai_zx3stc.png",
  },
  {
    title: "Med-o-Shop",
    link: "http://med-o-shop-1.onrender.com",
    thumbnail:
      "https://res.cloudinary.com/djyk287ep/image/upload/v1731157900/shop_mfii9r.png",
  },
  {
    title: "Med-o-Manage",
    link: "#",
    thumbnail:
      "https://res.cloudinary.com/djyk287ep/image/upload/v1731158429/Manage_ybshqq.png",
  },
];
