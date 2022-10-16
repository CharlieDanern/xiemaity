import axios from "axios";
import React, { useState } from "react";
import "./autoStowResult.css";
import "./defaultData";
// import { defaultData } from "./defaultData";
// import { defaultCont } from "./defaultCont";

const AutoStowResult = ({ uploadedFile, setStatus }) => {
   // const [result, setResult] = useState(null);
   // const [devi, setDevi] = useState(null);
   const [score, setScore] = useState(3);
   const onChange = (e) => {
      setScore(e.target.value);
   };
   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         setStatus({ msg: "Waiting for your command!" });
         const fileName = uploadedFile.fileName;

         // const url = "http://localhost:4000/autostow/result";
         const url = "https://api.xiemaity.com/autostow/result";

         const msg = await axios.post(`${url}/update/${fileName}`, {
            fileName: fileName,
         });

         const res = await axios.post(url, {
            fileName: fileName,
            score: score,
         });
         console.log(msg);

         if (res.data.msg === "Algorithm started") {
            // setFinale({ finalResult: res.data.finalResult, devi: res.data.devi });
            setStatus({ msg: "Algorithm started, please wait!" });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="autostow_result">
            <h4>Desired Score</h4>
            <form className="autostow_text" onSubmit={onSubmit}>
               <input type="number" step="0.1" max="9" onChange={onChange}></input>
               <button className="autostow_button">Let's gooooooooo</button>
            </form>
            {/* <label className="autostow_label"></label> */}
         </div>
      </>
   );
};

export default AutoStowResult;
