import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import profileService from "../appwrite/profile.service";
import {
  ERROR_MESSAGES,
  MAX_FILE_SIZE_MB,
  SUCCESS_MESSAGES,
} from "../config/constants";
import { getProfile } from "../store/profile.slice";
import { isValidFileSize, isValidImageType } from "../utils/helpers";

const ProfileForm = () => {
  const user = useSelector((state) => state.auth.user);
  let profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];

    // Validate file size
    if (uploadedFile && !isValidFileSize(uploadedFile, MAX_FILE_SIZE_MB)) {
      toast.error(ERROR_MESSAGES.FILE_TOO_LARGE);
      return;
    }

    // Validate file type
    if (uploadedFile && !isValidImageType(uploadedFile)) {
      toast.error(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return;
    }

    setFile(uploadedFile);
    if (uploadedFile) {
      const previewUrl = URL.createObjectURL(uploadedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (profile) {
        // update Profile
        if (file) {
          let isDelete = true;
          if (profile?.profileImage) {
            isDelete = await profileService.deleteFile(profile?.profileImage);
          }

          if (isDelete) {
            const fileId = await profileService.uploadFile(file);
            if (fileId && !fileId.error) {
              const updatedProfile = await profileService.updateProfile(
                user.$id,
                {
                  firstName,
                  lastName,
                  email,
                  profileImage: fileId.$id,
                }
              );
              if (updatedProfile && !updatedProfile.error) {
                dispatch(getProfile({ profile: updatedProfile }));
                toast.success(SUCCESS_MESSAGES.PROFILE_UPDATED);
              } else {
                toast.error("Failed to update profile");
              }
            } else {
              toast.error("Failed to upload image");
            }
          } else {
            toast.error("Failed to delete old image");
          }
        } else {
          const updatedProfile = await profileService.updateProfile(user.$id, {
            firstName,
            lastName,
            email,
          });
          if (updatedProfile && !updatedProfile.error) {
            dispatch(getProfile({ profile: updatedProfile }));
            toast.success(SUCCESS_MESSAGES.PROFILE_UPDATED);
          } else {
            toast.error("Failed to update profile");
          }
        }
      } else {
        // create Profile
        if (file) {
          const fileId = await profileService.uploadFile(file);

          if (fileId && !fileId.error) {
            // Create profile
            const newProfile = await profileService.createProfile({
              firstName,
              lastName,
              email,
              userId: user?.$id,
              profileImage: fileId?.$id,
            });

            if (newProfile && !newProfile.error) {
              dispatch(getProfile({ profile: newProfile }));
              toast.success(SUCCESS_MESSAGES.PROFILE_CREATED);
            } else {
              toast.error("Failed to create profile");
            }
          } else {
            toast.error("Failed to upload image");
          }
        } else {
          toast.error(ERROR_MESSAGES.IMAGE_REQUIRED);
        }
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setImagePreview(profileService.getFilePreview(profile.profileImage));
    }
  }, [profile]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-2/3 bg-white px-6 rounded-lg h-full py-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
      <p className="text-gray-600 mb-8 mt-1">
        Add your details to create a personal touch to your profile.
      </p>

      {/* Profile Picture Upload */}
      <div className="bg-slate-100 rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <p className="w-full md:w-1/3 text-gray-600">Profile Picture</p>
        <label
          htmlFor="file"
          className="w-full md:w-1/3 flex flex-col items-center justify-center text-gray-800 rounded-md p-2 border border-gray-500 cursor-pointer hover:bg-gray-500 transition-colors h-52 bg-black/70 relative"
          style={{
            backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleImageUpload}
          />

          {imagePreview && (
            <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
          )}

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center text-white">
            <CiImageOn className="text-4xl mr-2" />
            <span>Upload Image</span>
          </div>
        </label>

        <p className="w-full md:w-1/3 text-gray-600 text-sm">
          Image must be below 5MB and use JPG, PNG, or JPEG formats.
        </p>
      </div>

      <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-4 mt-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <label htmlFor="firstName" className="text-gray-600">
            First Name*
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="firstName"
            name="firstName"
            className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <label htmlFor="lastName" className="text-gray-600">
            Last Name*
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="lastName"
            name="lastName"
            className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <label htmlFor="email" className="text-gray-600">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      <div className="hr border-t border-gray-300 mt-14"></div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className={
            "bg-purple-600 text-white py-2 px-5 font-medium rounded-md hover:bg-purple-700 transition-colors duration-200" +
            (loading ? " cursor-not-allowed" : "")
          }
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
