"use client";
import { useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { CalendarIcon, HandshakeIcon, HomeIcon, InfoIcon, UsersIcon } from "lucide-react";

const navItems = [
  { name: "Home", link: "/", icon: <HomeIcon className="w-5 h-5 text-neutral-500 dark:text-white" /> },
  { name: "About Us", link: "/about", icon: <CalendarIcon className="w-5 h-5 text-neutral-500 dark:text-white" /> },
  { name: "Our Team", link: "/team", icon: <UsersIcon className="w-5 h-5 text-neutral-500 dark:text-white" /> },
  { name: "Our Apps", link: "/apps", icon: <InfoIcon className="w-5 h-5 text-neutral-500 dark:text-white" /> },
  { name: "Contact Us", link: "/contact", icon: <HandshakeIcon className="w-5 h-5 text-neutral-500 dark:text-white" /> },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Med-o-Next</h1>

        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden block text-gray-800 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className={`w-6 h-6 transform ${isOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links */}
        <div className={`lg:flex items-center ${isOpen ? "block" : "hidden"}`}>
          <ul className="lg:flex lg:space-x-8 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  className="flex items-center text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Megh Deb",
      designation: "Lead Developer @ TJP",
      src: "https://res.cloudinary.com/djyk287ep/image/upload/v1731178410/IMG-20240317-WA0013-1_s1a2ts.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Subham Mani",
      designation: "Web Developer @ TJP",
      src: "https://witblogpic.s3.amazonaws.com/1729668715434-1ea6ea27-24a5-40af-9ce7-a3d1cbfada2a.jpeg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Sayambar Roy Chowdury",
      designation: "ML Engineer @ TJP",
      src: "https://avatars.githubusercontent.com/u/161194965?v=4",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Ronit Bose",
      designation: "Blockchain Developer @ TJP",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-6">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
}
