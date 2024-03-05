import { useState } from "react";
import { sideBarData } from "../constants/constants";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [sidebar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!sidebar);
  };

  return (
    <>
      <section>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <div onClick={toggleSideBar}>&#9776;</div>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={toggleSideBar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                &times;
              </Link>
            </li>
            {sideBarData.map((itm, index) => {
              return (
                <li key={index} className={itm.cName}>
                  <Link to={itm.path}>
                    {itm.icon}
                    <span>{itm.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default SideBar;
