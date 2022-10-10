import { useState } from "react";
import { Footer } from "../../containers";
import { Navbar, AutoStow, AutoStowResult, AutoStowDeviation, AutoStowCont } from "../../components";
import { defaultData } from "../../components/autoStowResult/defaultData";
import { defaultCont } from "../../components/autoStowResult/defaultCont";
import "./tool.css";

function Tool() {
   const [uploadedFile, setUploadedFile] = useState({});
   const [finale, setFinale] = useState({
      devi: defaultData,
      finalResult: defaultCont,
   });

   return (
      <div className="Tool">
         <div className="gradient__bg">
            <Navbar />
            <h1 className="gradient__textt">Vessel Automation Tool</h1>
            <div className="Tool_box">
               <div className="Tool_box_SectionA">
                  <AutoStow setUploadedFile={setUploadedFile} />
                  <AutoStowResult uploadedFile={uploadedFile} setFinale={setFinale} />
               </div>
               <div className="Tool_box_SectionB">
                  <AutoStowDeviation finale={finale.devi} />
                  <AutoStowCont finale={finale.finalResult} />
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Tool;
