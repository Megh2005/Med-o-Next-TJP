"use client";

import { submitContactForm } from "@/lib/actions/submitContactForm";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  HandshakeIcon,
  HomeIcon,
  InfoIcon,
  UsersIcon,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

type StatesAndCitiesType = {
  [country: string]: {
    "West Bengal": string[];
    Delhi: string[];
    Kerala: string[];
    Maharashtra: string[];
  };
};

const statesAndCities: StatesAndCitiesType = {
  India: {
    "West Bengal": [
      "Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol",
      "Darjeeling", "Kharagpur", "Haldia", "Nabadwip",
    ],
    Delhi: [
      "New Delhi", "Dwarka", "Rohini", "Saket", "Janakpuri",
      "Laxmi Nagar", "Karol Bagh", "Pitampura", "Connaught Place",
    ],
    Kerala: [
      "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur",
      "Alappuzha", "Palakkad", "Kollam", "Kannur", "Kottayam",
    ],
    Maharashtra: [
      "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad",
      "Thane", "Kolhapur", "Solapur", "Amravati",
    ],
  },
};

export default function Contact() {
  const [selectedState, setSelectedState] = useState<keyof (typeof statesAndCities)["India"] | "">("");
  const [cities, setCities] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
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
    { name: "Home", link: "/", icon: <HomeIcon className="w-4 h-4" /> },
    { name: "About Us", link: "/about", icon: <CalendarIcon className="w-4 h-4" /> },
    { name: "Our Team", link: "/team", icon: <UsersIcon className="w-4 h-4" /> },
    { name: "Our Apps", link: "/apps", icon: <InfoIcon className="w-4 h-4" /> },
    { name: "Contact Us", link: "/contact", icon: <HandshakeIcon className="w-4 h-4" /> },
  ];

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    contactNumber: "",
    email: "",
    state: selectedState,
    city: "",
    address: "",
  });

  const handleStateChange = (state: keyof (typeof statesAndCities)["India"]) => {
    setSelectedState(state);
    setCities(statesAndCities["India"][state] || []);
  };

  useEffect(() => {
    if (selectedState) {
      setFormData({ ...formData, state: selectedState });
    }
  }, [selectedState]);

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.gender || !formData.contactNumber || 
        !formData.email || !formData.state || !formData.city || !formData.address) {
      alert("Please fill all the fields");
      return;
    }

    setSubmitting(true);
    const res = await submitContactForm(formData);
    if (res.success) {
      alert(res.message);
      setFormData({
        name: "",
        gender: "",
        contactNumber: "",
        email: "",
        state: "",
        city: "",
        address: "",
      });
      setSelectedState("");
    } else {
      alert(res.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/90 backdrop-blur-md">
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

      {/* Contact Form */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                  <input
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    type="number"
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                  <select
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value as keyof (typeof statesAndCities)["India"])}
                  >
                    <option value="">Select a state</option>
                    {Object.keys(statesAndCities["India"]).map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                  <select
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    disabled={!selectedState}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="">{selectedState ? "Select a city" : "Select a state first"}</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter your message"
                  rows={4}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                  }}
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}