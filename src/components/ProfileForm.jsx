import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [firstName, setFirstName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      const previewUrl = URL.createObjectURL(uploadedFile);
      setImagePreview(previewUrl); // Set preview URL for the image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, file);
  };

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
      <div className="bg-slate-100 rounded-lg p-4 flex gap-4 justify-between items-center">
        <p className="w-1/3 text-gray-600">Profile Picture</p>
        <label
          htmlFor="file"
          className="w-1/3 flex flex-col items-center justify-center text-gray-800 rounded-md p-2 border border-gray-500 cursor-pointer hover:bg-gray-500 transition-colors h-52 bg-black/70 relative"
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

        <p className="w-1/3 text-gray-600 text-sm">
          Image must be below 5MB and use JPG, PNG, or JPEG formats.
        </p>
      </div>

      <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-4 mt-8">
        <div className="flex justify-between items-center">
          <label htmlFor="firstName" className="text-gray-600">
            First Name*
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="firstName"
            name="firstName"
            className="border border-gray-300 rounded-md py-2 px-3 w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your first name"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="lastName" className="text-gray-600">
            Last Name*
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="lastName"
            name="lastName"
            className="border border-gray-300 rounded-md py-2 px-3 w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your last name"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="email" className="text-gray-600">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md py-2 px-3 w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className="hr border-t border-gray-300 mt-14"></div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-5 font-medium rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
