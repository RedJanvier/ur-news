import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../context/GlobalState";
import logo from "../../assets/logo.png";
import "./Search.css";

const NavBar = ({ changeLinksView, showLinks }) => {
  const { token, logout, role } = useContext(GlobalContext);
  const hamburgerBtn = <FontAwesomeIcon icon={faBars} />;

  return (
    <>
      <div className="search">
        <NavLink to="/home" className="logo">
          <img
            src={logo}
            style={{ width: "2rem", height: "2rem" }}
            alt="logo"
          />
          <h2>UR News Post</h2>
        </NavLink>
        <button onClick={changeLinksView} className="hamburger">
          {hamburgerBtn}
        </button>
        <div className="navbar__links">
          <ul>
            {role !== "student" && (
              <>
                <li>
                  <NavLink to="/create" className="otherBtns">
                    Create
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/created" className="otherBtns">
                    My News
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="otherBtns">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {role === "admin" && (
              <li>
                <NavLink to="/admin" className="otherBtns">
                  Admin
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <button className="otherBtns" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <ul className={`mobile ${!showLinks ? "hide" : ""}`}>
        {role !== "student" && (
          <>
            <li onClick={changeLinksView}>
              <NavLink to="/create" className="otherBtns">
                Create
              </NavLink>
            </li>
            <li onClick={changeLinksView}>
              <NavLink to="/created" className="otherBtns">
                My News
              </NavLink>
            </li>
            <li onClick={changeLinksView}>
              <NavLink to="/profile" className="otherBtns">
                Profile
              </NavLink>
            </li>
          </>
        )}
        {role === "admin" && (
          <li onClick={changeLinksView}>
            <NavLink to="/admin" className="otherBtns">
              Admin
            </NavLink>
          </li>
        )}
        {token && (
          <li onClick={changeLinksView}>
            <button className="otherBtns" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavBar;
