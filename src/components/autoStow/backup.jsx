import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import "./autoStow.css";

import axios from "axios";

// we need to pass the fileName to AutoStowResult component
const AutoStow = ({ setUploadedFile }) => {
   const [file, setFile] = useState("");
   //const [uploadedFile, setUploadedFile] = useState({});
   const [name, setName] = useState("Choose File");

   const [message, setMessage] = useState(null);

   const onChange = (e) => {
      setFile(e.target.files[0]);
      setName(e.target.files[0].name);
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);

      try {
         const res = await axios.post("/autostow/upload", formData, {
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
   };
   return (
      <div className="autostow_header">
         <h1 className="gradient__textt">Vessel Automation Tool</h1>
         <div className="autoStow">
            {message ? <Message msg={message} /> : null}
            <h4>File Upload</h4>
            <input type="file" id="fileUpload" onChange={onChange} />
            <label className="label_as_btn" htmlFor="fileUpload">
               <p>{name}</p>
            </label>
            <p>Supported Files: .xlsx</p>
            <form className="autoStow_submit" onSubmit={onSubmit}>
               <button className="btn">Submit</button>
            </form>
         </div>
      </div>
   );
};

export default AutoStow;
