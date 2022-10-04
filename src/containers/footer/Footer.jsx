import React from "react";
import "./footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
   return (
      <div className="nk__footer section-padding">
         <div className="nk__footer-links">
            <div className="nk__footer-links_logo">
               <img src={logo} alt="logo" />
            </div>

            <div className="nk__footer-links_div">
               <h4>a Nice Kaizen Project</h4>
               <p>© 2022. All Rights Reserved</p>
            </div>
            <div className="nk__footer-links_div">
               <h4>Kaizen Team</h4>
            </div>
            <div className="nk__footer-links_div">
               <h4>Get in touch</h4>
               <p>Tel: +84 909291268</p>
               <p>charlie.danen@gmail.com</p>
            </div>
         </div>
      </div>
   );
};

export default Footer;
