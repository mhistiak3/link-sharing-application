import MobileImg from "../assets/mobile.png";

const Image = () => {
  return (
    <div className="w-full md:w-1/3 bg-white rounded-lg h-full">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={MobileImg}
          alt="Mobile"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Image;
