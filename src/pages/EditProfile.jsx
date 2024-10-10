import Header from "../components/Header";
import Image from "../components/Image";

import ProfileForm from "../components/ProfileForm";

const EditProfile = () => {
  return (
    <div className="w-full bg-slate-100 py-4">
      <Header />

      <div className="w-full md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative mt-5 gap-6">
        <Image />

        <ProfileForm />
      </div>
    </div>
  );
};

export default EditProfile;
