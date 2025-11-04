import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import linksService from "../appwrite/links.service";
import profileService from "../appwrite/profile.service";
import { Loader } from "../components/Loader";
import { SUCCESS_MESSAGES } from "../config/constants";
const Preview = () => {
  const { userId } = useParams();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const userStatus = useSelector((state) => state.auth.status);
  const iconMapping = {
    GitHub: {
      icon: <FaGithub className="text-xl mr-2" />,
      color: "bg-black text-white", // Background and text color for GitHub
    },
    YouTube: {
      icon: <FaYoutube className="text-xl mr-2" />,
      color: "bg-red-600 text-white", // Background and text color for YouTube
    },
    Facebook: {
      icon: <FaFacebook className="text-xl mr-2" />,
      color: "bg-blue-600 text-white", // Background and text color for Facebook
    },
    Instagram: {
      icon: <FaInstagram className="text-xl mr-2" />,
      color: "bg-pink-500 text-white", // Background and text color for Instagram
    },
    LinkedIn: {
      icon: <FaLinkedin className="text-xl mr-2" />,
      color: "bg-blue-900 text-white", // Background and text color for LinkedIn
    },
  };

  const profileInfo = async () => {
    try {
      setLoading(true);
      const profile = await profileService.getProfile(userId);
      setProfile(profile);
      const links = await linksService.getLinks(userId);
      const orginalLinks = JSON.parse(links.links);
      setLinks(orginalLinks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error loading profile:", error);
    }
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(SUCCESS_MESSAGES.LINK_COPIED);
  };

  useEffect(() => {
    profileInfo();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <div className="w-full bg-purple-600 h-72 rounded-b-3xl">
        {userStatus && (
          <div className="w-full md:max-w-7xl mx-auto bg-white flex justify-between items-center py-3 px-5 rounded-lg mt-5">
            <Link
              to="/profile-details"
              className="border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-300"
            >
              Back to Editor
            </Link>
            <button
              title="Copy Link"
              className="bg-purple-600 text-white px-5 py-2 rounded-md font-medium hover:bg-purple-800 hover:text-white transition duration-300"
              onClick={copyToClipboard}
            >
              Share Link
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-xl rounded-xl w-72 p-10  mt-[-140px] text-center relative z-10">
        <img
          src={
            profile
              ? profileService.getFilePreview(profile?.profileImage)
              : "https://via.placeholder.com/100"
          }
          alt="Profile Placeholder"
          className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-purple-600"
        />

        <h2 className="text-2xl font-semibold text-gray-900">
          {profile ? `${profile?.firstName} ${profile?.lastName}` : "404"}
        </h2>
        <p className="text-gray-500 mb-6">{profile ? profile.email : ""}</p>

        <div className="space-y-4 mt-8">
          {links && links.length > 0 ? (
            links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "flex items-center justify-between py-3 rounded-lg shadow-md transition px-4 " +
                  iconMapping[link.selectedIcon].color
                }
              >
                <span className="flex items-center">
                  {iconMapping[link.selectedIcon].icon} {link.name}
                </span>
                <FaArrowRightLong />
              </a>
            ))
          ) : (
            <p className="text-gray-500 text-center">No links added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
