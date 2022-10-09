import { useState } from "react";
import { Footer } from "../../containers";
import { Navbar, AutoStow, AutoStowResult } from "../../components";
import "./tool.css";

function Tool() {
   const [uploadedFile, setUploadedFile] = useState({});

   return (
      <div className="Tool">
         <div className="gradient__bg">
            <Navbar />
            <div className="Tool_box">
               <div className="Tool_box_SectionA">
                  <AutoStow setUploadedFile={setUploadedFile} />
               </div>
               <AutoStowResult uploadedFile={uploadedFile} />
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Tool;
