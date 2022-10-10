import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import Message from "./Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./autoStow.css";

import axios from "axios";

// we need to pass the fileName to AutoStowResult component
const AutoStow = ({ setUploadedFile }) => {
   const [file, setFile] = useState("");
   //const [uploadedFile, setUploadedFile] = useState({});
   const [name, setName] = useState("Choose File");

   const [message, setMessage] = useState(null);
   console.log(message);

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

         const notify = () =>
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
         notify();

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
