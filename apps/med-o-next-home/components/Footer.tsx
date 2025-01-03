import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-white dark:bg-black bg-white px-4 sm:px-8 md:px-10 py-6 md:py-10">
      <h2 className="text-xl font-medium">Google Developers Group</h2>
      <p className="text-neutral-500 dark:text-white mt-2 text-lg">
        Quick Links
      </p>
      <ul className="my-4">
        <li>Home</li>
        <li>About Us</li>
        <li>Our Apps</li>
        <li>Our Team</li>
        <li>Contact Us</li>
      </ul>
    </div>
  );
};

export default Footer;
