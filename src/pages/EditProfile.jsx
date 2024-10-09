import Header from "../components/Header";
import MobileImg from "../assets/mobile.png";
import ProfileForm from "../components/ProfileForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileService from "../appwrite/profile.service";
import { getProfile } from "../store/profile.slice";
const EditProfile = () => {
  const { user, status } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(status);

    if (status) {
      profileService
        .getProfile(user?.$id)
        .then((profile) => {
          dispatch(getProfile({ profile }));
          setProfileData(profile);
        })
        .catch((err) => {
          dispatch(getProfile({ profile: null }));
        });
    }
  }, [status]);

  return (
    <div className="w-full bg-slate-100 py-4">
      <Header />

      <div className="w-full md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative mt-5 gap-6">
        {/* Image Container */}
        <div className="w-full md:w-1/3 bg-white rounded-lg h-full flex items-center justify-center py-12">
          <img
            src={MobileImg}
            alt="Mobile"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Profile Form Container */}
        <ProfileForm profileData={profileData} />
      </div>
    </div>
  );
};

export default EditProfile;
