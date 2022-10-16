import { useState } from "react";
import { Footer } from "../../containers";
import { Navbar, AutoStow, AutoStowResult, AutoStowDeviation, AutoStowCont } from "../../components";
// import { defaultData } from "../../components/autoStowResult/defaultData";
import { defaultCont } from "../../components/autoStowResult/defaultCont";
import "./tool.css";

function Tool() {
   const [uploadedFile, setUploadedFile] = useState({ msg: "dummy", fileName: "dummy" });
   // const [finale, setFinale] = useState({
   //    devi: defaultData,
   //    finalResult: defaultCont,
   // });

   const [status, setStatus] = useState({});
   const [secondary, setSecondary] = useState(defaultCont);

   return (
      <div className="Tool">
         <div className="gradient__bg">
            <Navbar />
            <h2 className="gradient__textt">Vessel Automation Tool</h2>
            <div className="Tool_box">
               <div className="Tool_box_SectionA">
                  <AutoStow setUploadedFile={setUploadedFile} />
                  <AutoStowResult uploadedFile={uploadedFile} setStatus={setStatus} />
               </div>
               <div className="Tool_box_SectionB">
                  <AutoStowDeviation uploadedFile={uploadedFile} status={status.msg} setSecondary={setSecondary} />
                  <AutoStowCont secondary={secondary} />
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Tool;
