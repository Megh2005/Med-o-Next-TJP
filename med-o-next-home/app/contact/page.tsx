// pages/contact.tsx
"use client";
import { submitContactForm } from "@/lib/actions/submitContactForm";
import { useEffect, useState } from "react";
import {
  CalendarIcon,
  HandshakeIcon,
  HomeIcon,
  InfoIcon,
  UsersIcon,
  MenuIcon,
  XIcon,
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
      "Kolkata",
      "Howrah",
      "Durgapur",
      "Siliguri",
      "Asansol",
      "Darjeeling",
      "Kharagpur",
      "Haldia",
      "Nabadwip",
    ],
    Delhi: [
      "New Delhi",
      "Dwarka",
      "Rohini",
      "Saket",
      "Janakpuri",
      "Laxmi Nagar",
      "Karol Bagh",
      "Pitampura",
      "Connaught Place",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Alappuzha",
      "Palakkad",
      "Kollam",
      "Kannur",
      "Kottayam",
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Thane",
      "Kolhapur",
      "Solapur",
      "Amravati",
    ],
  },
};

export default function Contact() {
  const [selectedState, setSelectedState] = useState<
    keyof (typeof statesAndCities)["India"] | ""
  >("");
  const [cities, setCities] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

  const handleStateChange = (
    state: keyof (typeof statesAndCities)["India"]
  ) => {
    setSelectedState(state);
    setCities(statesAndCities["India"][state] || []);
  };

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    contactNumber: "",
    email: "",
    state: selectedState,
    city: "",
    address: "",
  });

  useEffect(() => {
    if (selectedState) {
      setFormData({
        ...formData,
        state: selectedState,
      });
    }
  }, [selectedState]);

  const handleFormSubmit = async () => {
    if (
      !formData.name ||
      !formData.gender ||
      !formData.contactNumber ||
      !formData.email ||
      !formData.state ||
      !formData.city ||
      !formData.address
    ) {
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 p-4 bg-black shadow-md z-10">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">Med-o-Next</span>

          {/* Desktop Navbar */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-2 text-white"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center bg-black rounded-lg p-4 space-y-4 w-3/4 mt-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-2 text-white"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Contact Form (Centered) */}
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg mx-auto mt-24">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-blue-500">
          Contact Us
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              className="w-full px-5 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full px-5 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Contact Number
            </label>
            <input
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              type="number"
              className="w-full px-5 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              className="w-full px-5 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">State</label>
            <select
              className="w-full px-5 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedState}
              onChange={(e) =>
                handleStateChange(
                  e.target.value as keyof (typeof statesAndCities)["India"]
                )
              }
            >
              <option value="">Select a state</option>
              {Object.keys(statesAndCities["India"]).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">City</label>
            <select
              className="w-full px-5 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedState}
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            >
              <option value="">
                {selectedState ? "Select a city" : "Select a state first"}
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Message</label>
            <textarea
              className="w-full px-5 py-3 bg-gray-700 resize-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
              rows={6}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
              disabled={submitting}
              type="submit"
              className="w-full py-3 text-xl font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-md hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
