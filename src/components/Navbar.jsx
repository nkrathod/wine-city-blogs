import React, { useEffect, useContext } from "react";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../authContext";
import Button from "@mui/material/Button";

function NavbarComponent() {
  const { authenticated, setAuthenticated, userDetails, setUserDeatils } =
    useContext(AuthContext);
  let sidemenu = document.getElementById("sidemenu");
  const closemenu = () => {
    sidemenu.style.right = "-150px";
  };
  const openmenu = () => {
    sidemenu.style.right = "0";
  };

  const handleLogout = () => {
    setUserDeatils({});
    localStorage.setItem("userDetails", "{}");
    window.location = "/";
  };

  useEffect(() => {
    sidemenu = document.getElementById("sidemenu");
  }, []);

  return (
    <nav>
      <h1 className="logo">
        <TempleHinduIcon fontSize="medium" />{" "}
        <span style={{ color: "#ff004f" }}>N</span>ashik{" "}
        <span style={{ color: "#ff004f" }}>Temple</span>
      </h1>
      <ul id="sidemenu">
        <li>
          <a onClick={() => (window.location = "/")}>Home</a>
        </li>
        <li>
          <a onClick={() => (window.location = "/about")} href="#about">
            About
          </a>
        </li>
        <li>
          <a href="/my-blogs">My Blogs</a>
        </li>
        {userDetails && userDetails.firstName && (
          <li>
            <a href="/profile">{userDetails.firstName}</a>
          </li>
        )}
        <li>
          {authenticated ? (
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => (window.location = "/signin")}
            >
              Login
            </Button>
          )}
        </li>
        <CloseTwoToneIcon className="fa-solid" onClick={() => closemenu()} />
      </ul>
      <MenuIcon className="fa-solid" onClick={() => openmenu()} />
    </nav>
  );
}

export const Navbar = React.memo(NavbarComponent);
