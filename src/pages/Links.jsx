import AddLinks from "../components/AddLinks";
import Header from "../components/Header";
import Image from "../components/Image";

const Links = () => {
  return (
    <div className="w-full bg-slate-100 py-4 h-full">
      <Header />
      <div className="w-full md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch relative mt-5 gap-6 h-full">
        <Image />
        <AddLinks />
      </div>
    </div>
  );
};
export default Links;
