// pages/contact.tsx
"use client";
import { useState } from "react";

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

  const handleStateChange = (
    state: keyof (typeof statesAndCities)["India"]
  ) => {
    setSelectedState(state);
    setCities(statesAndCities["India"][state] || []);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select className="w-full px-4 py-2 bg-gray-700 rounded-md text-white">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
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
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
              disabled={!selectedState}
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
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2 bg-gray-700 resize-none rounded-md text-white"
              placeholder="Enter your message"
              rows={6}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-8 py-2 text-center me-2 mb-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
