import React from "react";
import "./header.css";
import funImage from "../../assets/funImage.png";

const Header = () => {
   return (
      <div className="nk__header section_padding" id="home">
         <div className="nk__header-content">
            <h1 className="gradient__text">Welcome To NK Team Internal Website</h1>
            <p>
               This website was built by the Kaizen Team at CMIT with the intention to reduce the workload and increase
               the productivity of our fellow co-workers. We hope that it can provide service to not just one team but
               to anyone who needs it!
            </p>
            <div className="nk__header-content__getStarted">
               <button type="button">Get Started</button>
            </div>
         </div>
         <div className="nk__header-image">
            <img src={funImage} alt="funImage"></img>
         </div>
      </div>
   );
};

export default Header;
