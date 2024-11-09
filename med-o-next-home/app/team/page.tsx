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
      src: "https://scontent.fccu3-1.fna.fbcdn.net/v/t39.30808-1/357498768_1927460760942901_8532340701160226773_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=IAT_S9Vl37MQ7kNvgFe62ml&_nc_zt=24&_nc_ht=scontent.fccu3-1.fna&_nc_gid=AoOHnbjStMQ2Mi4xJX24pNW&oh=00_AYCcvS2xePzGwyQ4369TWQT5J65iC_qOQUqVWWKwZDNB1Q&oe=67358229",
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
