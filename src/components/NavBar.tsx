import { FC } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./Search/SearchBox";

const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center my-7">
      <Link to="/" className="flex items-center gap-2">
        <i className="fas fa-arrow-left text-xl w-[24px] text-white"></i>
        <img className="w-8 h-8" src="/vmc_avatar.webp" alt="" />
        <span className="text-xl font-medium">VMC Social</span>
      </Link>

      <Link className="block md:hidden" to="/search">
        <i className="fas fa-search text-2xl"></i>
      </Link>

      <div className="max-w-[500px] hidden md:block">
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;
