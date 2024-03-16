import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { MdLibraryMusic } from "react-icons/md";

const Sidenav = ({ show }) => {
  return (
    <>
      <div className={show ? `sidenav active` : `sidenav`}>
        <ul className="">
          <li>
            <Link to="/">
              <div>Home</div>
              <div className="icon-wrapper">
                <IoHome />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <div>Search</div>
              <div className="icon-wrapper">
                <IoSearch />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <div>Register</div>
              <div className="icon-wrapper">
                <FiUserPlus />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <div>Login</div>
              <div className="icon-wrapper">
                <FiLogIn />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <div>Profile</div>
              <div className="icon-wrapper">
                <FiUser />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <div>Library</div>
              <div className="icon-wrapper">
                <MdLibraryMusic />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidenav;
