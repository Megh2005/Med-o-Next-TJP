"use client";

import { useState, useEffect } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { CalendarIcon, HandshakeIcon, HomeIcon, InfoIcon, UsersIcon, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", link: "/", icon: <HomeIcon className="w-4 h-4" /> },
  { name: "About Us", link: "/about", icon: <CalendarIcon className="w-4 h-4" /> },
  { name: "Our Team", link: "/team", icon: <UsersIcon className="w-4 h-4" /> },
  { name: "Our Apps", link: "/apps", icon: <InfoIcon className="w-4 h-4" /> },
  { name: "Contact Us", link: "/contact", icon: <HandshakeIcon className="w-4 h-4" /> },
];

export default function AnimatedTestimonialsDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      src: "https://scontent.fccu3-1.fna.fbcdn.net/v/t39.30808-1/357498768_1927460760942901_8532340701160226773_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=IAT_S9Vl37MQ7kNvgFe62ml&_nc_zt=24&_nc_ht=scontent.fccu3-1.fna&_nc_gid=AoOHnbjStMQ2Mi4xJX24pNW&oh=00_AYCcvS2xePzGwyQ4369TWQT5J65iC_qOQUqVWWKwZDNB1Q&oe=67358229",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800' : 'bg-transparent border-transparent'
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
                    className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200"
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none transition-colors duration-200"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="group flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
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

      {/* Main content with padding for fixed navbar */}
      <div className="pt-16">
        <div className="container mx-auto py-6">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}