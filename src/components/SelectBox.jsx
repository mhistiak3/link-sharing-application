import React from "react";
import {
  FaGithub,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
const SocialLinksDropdown = ({ selected, handleSelect, isOpen, setIsOpen }) => {
   
    
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="text-xl mr-2" />,
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-xl mr-2" />,
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-xl mr-2" />,
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl mr-2" />,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-xl mr-2" />,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <div
        className="bg-white p-3 rounded-md flex items-center justify-between cursor-pointer border-2 border-gray-300"
        onClick={() => setIsOpen()}
      >
        <span className="text-gray-600">
          {selected.name ? (
            <span className="flex items-center">
              {selected.icon} {selected.name}
            </span>
          ) : (
            "Select a Social Media"
          )}
          {/* Display selected option */}
        </span>
        <span className="text-gray-800">
          <IoIosArrowDown />
        </span>{" "}
        {/* Dropdown icon */}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="max-h-60 overflow-y-auto">
            {socialLinks.map((social, index) => (
              <li
                key={index}
                className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(social.name)}
              >
               
                {social.icon} {/* Display icon */}
                <span className="ml-2 text-gray-800">{social.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SocialLinksDropdown;
