import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./autoStow.css";
import * as XLSX from "xlsx";

import axios from "axios";

// we need to pass the fileName to AutoStowResult component
const AutoStow = ({ setUploadedFile }) => {
   const [file, setFile] = useState("");
   const [p_Valid, setP_Valid] = useState(false);
   const [y_Valid, setY_Valid] = useState(false);
   const [name, setName] = useState("Choose File");

   const [message, setMessage] = useState(null);

   const onChange = async (e) => {
      const file = e.target.files[0];
      const fileName = e.target.files[0].name;
      e.target.value = "";

      setFile(file);
      setName(fileName);

      const data = await file.arrayBuffer();
      const workbook = XLSX.readFile(data, { sheetRows: 2 });

      const ProjectionSheet = workbook.Sheets[workbook.SheetNames[0]];
      const yardInputSheet = workbook.Sheets[workbook.SheetNames[1]];

      const ProjectionJSON = XLSX.utils.sheet_to_json(ProjectionSheet);
      const yardInputJSON = XLSX.utils.sheet_to_json(yardInputSheet);

      const P_OcjectKeys = Object.keys(ProjectionJSON[0]);

      if (
         ProjectionJSON[0][P_OcjectKeys[0]] >= 20000 &&
         ProjectionJSON[0][P_OcjectKeys[0]] <= 999999 &&
         ProjectionJSON[0][P_OcjectKeys[1]] > 0 &&
         ProjectionJSON[0][P_OcjectKeys[1]] < 99 &&
         ProjectionJSON[0][P_OcjectKeys[2]].length === 3 &&
         (ProjectionJSON[0][P_OcjectKeys[2]].slice(2, 3) === "A" ||
            ProjectionJSON[0][P_OcjectKeys[2]].slice(2, 3) === "B")
      ) {
         setP_Valid(true);
      }

      const Y_OcjectKeys = Object.keys(yardInputJSON[0]);

      const Y_Position_regex = /[0-9][A-Z][0-9][0-9][A-Z]\.[0-9]/;
      if (
         yardInputJSON[0][Y_OcjectKeys[1]].length === 7 &&
         Y_Position_regex.test(yardInputJSON[0][Y_OcjectKeys[1]]) === true &&
         yardInputJSON[0][Y_OcjectKeys[2]] > 0 &&
         yardInputJSON[0][Y_OcjectKeys[2]] < 99
      ) {
         setY_Valid(true);
      }
   };

   const onSubmit = async (e) => {
      e.preventDefault();

      if (p_Valid === true && y_Valid === true) {
         const formData = new FormData();
         formData.append("file", file);

         // const url = "http://localhost:4000/autostow/upload";
         const url = "https://api.xiemaity.com/autostow/upload";

         try {
            const res = await axios.post(url, formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            const { msg, fileName } = res.data;
            setUploadedFile({ msg, fileName });
            setMessage(msg);

            console.log({ msg, fileName });
         } catch (error) {
            if (error.response.status === 500) {
               setMessage("There was a problem with the server");
            } else {
               setMessage(error.response.data.msg);
            }
            console.log(error);
         }
      } else {
         const notify = () =>
            toast.error("File Format Error", {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
         notify();
      }
   };

   const notify = (msg) =>
      toast.success(msg, {
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      });

   if (message === "File Uploaded Successfully") {
      notify(message);
      setMessage(null);
   }

   return (
      <div className="autostow_header">
         <div className="autoStow">
            <h4>File Upload</h4>
            <input
               type="file"
               id="fileUpload"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
               onChange={onChange}
            />
            <label className="label_as_btn" htmlFor="fileUpload">
               <p>{name}</p>
            </label>
            <p>Currently only Supported Files: .xlsx</p>
            <form className="autoStow_submit" onSubmit={onSubmit}>
               <button className="btn">Submit</button>
            </form>
         </div>
         <ToastContainer />
      </div>
   );
};

export default AutoStow;
