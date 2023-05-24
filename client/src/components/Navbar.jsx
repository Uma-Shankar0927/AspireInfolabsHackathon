import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import person from '../assets/person.png'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateNav = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/Signup" ||
      location.pathname === "/passwordChange"
    ) {
      navigate("/");
    } else navigate("/Home");
  };
  const gotoUserdetail = () => {
    navigate("/userdetail");
  };
  return (
    <div className="main-nav">
      <p className="logo" onClick={navigateNav}>
        HealthActive
      </p>
      <div className="userProfileNav">
        {location.pathname !== "/" &&
          location.pathname !== "/Signup" &&
          location.pathname !== "/passwordChange" && (
            <div className="useraccount" onClick={gotoUserdetail}>
              <img src={person} alt="" />
            </div>
          )}
      </div>
    </div>
  );
};

export default Navbar;
