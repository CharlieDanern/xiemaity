import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Menu = () => (
   <>
      <p>
         <a href="home">Home</a>
      </p>
      <p>
         <a href="tools">Internal Tools</a>
      </p>
      <p>
         <a href="library">Library</a>
      </p>
   </>
);

const Navbar = () => {
   const [toggleMenu, setToggleMenu] = useState(false);
   return (
      <div className="nk__navbar">
         <div className="nk__navbar-links">
            <div className="nk__navbar-links_logo">
               <img src={logo} alt="logo" />
            </div>
            <div className="nk__navbar-links_container">
               <Menu />
            </div>
         </div>
         <div className="nk__navbar-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
         </div>
         <div className="nk__navbar-menu">
            {toggleMenu ? (
               <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
            ) : (
               <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
            )}
            {toggleMenu && (
               <div className="nk__navbar-menu_container scale-up-center">
                  <div className="nk__navbar-menu_container-links">
                     <Menu />
                     <div className="nk__navbar-menu_container-links-sign">
                        <p>Sign in</p>
                        <button type="button">Sign up</button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Navbar;
