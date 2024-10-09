import Header from "../components/Header";
import MobileImg from "../assets/mobile.png";
import ProfileForm from "../components/ProfileForm";

const EditProfile = () => {
  return (
    <div className="w-full bg-slate-100 py-4">
      <Header />

      <div className="w-full md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative mt-5 gap-6">
        {/* Image Container */}
        <div className="w-full md:w-1/3 bg-white rounded-lg h-full flex items-center justify-center py-7">
          <img
            src={MobileImg}
            alt="Mobile"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Profile Form Container */}
          <ProfileForm />
      
      </div>
    </div>
  );
};

export default EditProfile;
