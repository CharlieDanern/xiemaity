import axios from "axios";
import React, { useState } from "react";
import "./autoStowResult.css";
import "./defaultData";

const AutoStowResult = ({ uploadedFile, setStatus }) => {
   const [score, setScore] = useState(6);
   const [dif, setDif] = useState(3);
   const [count, setCount] = useState(0);

   const onChangeScore = (e) => {
      setScore(e.target.value);
   };
   const onChangeDif = (e) => {
      setDif(e.target.value);
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      try {
         setCount(count + 1);
         setStatus({ msg: "Waiting for your command!" });
         const fileName = uploadedFile.fileName;

         // const url = "http://localhost:4000/autostow/result";
         const url = "https://api.xiemaity.com/autostow/result";

         // const msg =
         await axios.post(`${url}/update/${fileName}`, {
            fileName: fileName,
         });

         const res = await axios.post(url, {
            fileName: fileName,
            score: score,
            dif: dif,
         });
         // console.log(msg);

         if (res.data.msg === "Algorithm started") {
            // setFinale({ finalResult: res.data.finalResult, devi: res.data.devi });
            setStatus({ msg: `Algorithm started ${count} time, please wait!` });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="autostow_result">
            <h4>Stowage Settings</h4>
            <form className="autostow_text" onSubmit={onSubmit}>
               <p>Difficult Level</p>
               <input type="number" placeholder={dif} step="1" min="0" max="10" onChange={onChangeDif}></input>
               <p>Desired Score</p>
               <input type="number" placeholder={score} step="0.1" min="1" max="9" onChange={onChangeScore}></input>
               <button className="autostow_button">Let's gooooooooo</button>
            </form>
            {/* <label className="autostow_label"></label> */}
         </div>
      </>
   );
};

export default AutoStowResult;
