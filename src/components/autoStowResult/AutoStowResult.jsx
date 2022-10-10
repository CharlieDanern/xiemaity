import axios from "axios";
import React, { useState } from "react";
import "./autoStowResult.css";
import "./defaultData";
import { defaultData } from "./defaultData";
import { defaultCont } from "./defaultCont";

const AutoStowResult = ({ uploadedFile, setFinale }) => {
   // const [result, setResult] = useState(null);
   // const [devi, setDevi] = useState(null);
   const [score, setScore] = useState(3);
   const onChange = (e) => {
      setScore(e.target.value);
   };
   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         setFinale({ devi: defaultData, finalResult: defaultCont });
         const fileName = uploadedFile.fileName;

         const url = "http://13.212.171.153:4000/autostow/result";

         const res = await axios.post(url, {
            fileName: fileName,
            score: score,
         });

         // setResult(res.data.finalResult);
         // setDevi(res.data.devi);

         setFinale({ finalResult: res.data.finalResult, devi: res.data.devi });
         console.log(res.data.devi);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="autostow_result">
            <h4>Desired Score</h4>
            <form className="autostow_text" onSubmit={onSubmit}>
               <input type="number" step="0.1" max="8" onChange={onChange}></input>
               <button className="autostow_button">Let's gooooooooo</button>
            </form>
            {/* <label className="autostow_label"></label> */}
         </div>
      </>
   );
};

export default AutoStowResult;
