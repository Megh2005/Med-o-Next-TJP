// pages/contact.tsx
"use client";
import { submitContactForm } from "@/lib/actions/submitContactForm";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
            >
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
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              type="number"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2 bg-gray-700 resize-none rounded-md text-white"
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
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-8 py-2 text-center me-2 mb-2"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
