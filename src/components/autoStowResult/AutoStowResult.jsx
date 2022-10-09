import axios from "axios";
import React, { useState } from "react";
import "./autoStowResult.css";
import Loading from "./Loading";

const AutoStowResult = ({ uploadedFile }) => {
   const [result, setResult] = useState(null);
   const [devi, setDevi] = useState(null);
   const [score, setScore] = useState(3);
   const onChange = (e) => {
      setScore(e.target.value);
   };
   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         const fileName = uploadedFile.fileName;
         console.log(fileName);
         console.log(score);

         const res = await axios.post("/autostow/result", {
            fileName: fileName,
            score: score,
         });

         setResult(res.data.finalResult);
         setDevi(res.data.devi);
         console.log(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="autostow_result">
            <form className="autostow_text" onSubmit={onSubmit}>
               <label className="autostow_label">
                  <p>Desired Score</p>
                  <input type="number" step="0.1" onChange={onChange}></input>
                  <button className="autostow_button">Let's gooooooooo</button>
               </label>
            </form>
         </div>
         <div className="autostow_result_boxes">
            {result ? (
               <>
                  <h3>Below is your result: </h3>
                  <h4>
                     Deviation:
                     {Object.keys(devi).map((e, i) => {
                        return (
                           <>
                              <p key={Object.keys(devi)[i]}>{Object.keys(devi)[i]}</p>
                              <p>{devi[e].join(", ")}</p>
                           </>
                        );
                     })}
                  </h4>
                  <h4>
                     Container Number:
                     {Object.keys(result).map((e, i) => {
                        return (
                           <>
                              <p key={Object.keys(result)[i]}>{Object.keys(result)[i]}</p>
                              <p>{result[e].join(", ")}</p>
                           </>
                        );
                     })}
                  </h4>
               </>
            ) : (
               <Loading />
            )}
         </div>
      </>
   );
};

export default AutoStowResult;
