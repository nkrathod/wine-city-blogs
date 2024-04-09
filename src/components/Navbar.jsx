import React, { useEffect } from "react";
import WineBarTwoToneIcon from "@mui/icons-material/WineBarTwoTone";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuIcon from '@mui/icons-material/Menu';

function NavbarComponent() {
  let sidemenu = document.getElementById("sidemenu");
  const closemenu = () => {
    sidemenu.style.right = "-150px";
  };
  const openmenu = () => {
    sidemenu.style.right = "0";
  };

  useEffect(() => {
    sidemenu = document.getElementById("sidemenu");
  }, []);

  return (
    <nav>
      <h1 className="logo">
        <WineBarTwoToneIcon fontSize="medium"/> <span style={{ color: "#ff004f" }}>N</span>ashik
        City of <span style={{ color: "#ff004f" }}>Wine</span>
      </h1>
      <ul id="sidemenu">
        <li>
          <a onClick={() => (window.location = "/")}>Home</a>
        </li>
        <li>
          <a onClick={() => (window.location = "/about")} href="#about">About</a>
        </li>
        <li>
          <a href="/blogs">My Blogs</a>
        </li>
        <li>
          <a href="#contact">Logout</a>
        </li>
        <CloseTwoToneIcon className="fa-solid" onClick={() => closemenu()}/>
      </ul>
      <MenuIcon className="fa-solid" onClick={() => openmenu()} />
    </nav>
  );
}

export const Navbar = React.memo(NavbarComponent);
