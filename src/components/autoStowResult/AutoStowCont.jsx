import React, { useMemo } from "react";
import "./autoStowCont.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AutoStowCont = ({ secondary }) => {
   const data = useMemo(() => [...secondary], [secondary]);
   console.log(secondary);

   const loadingBool = data[0]["ID"] === "00";
   const onCopy = () => {
      const notify = () =>
         toast.success("Copied!", {
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
   };

   return (
      <div className="autoStow_Cont">
         {loadingBool ? (
            <Loading />
         ) : (
            <div className="autostow_cont_table">
               <h4>CONTAINER LIST</h4>
               {data.map((bay) => {
                  const containerNo = bay.Value.map((cont, i) => {
                     return i !== 0 ? " " + cont : cont;
                  });
                  return (
                     <div className="Cont_form" key={bay.ID}>
                        <form>
                           <label>{bay.ID}</label>
                           <input type="text" defaultValue={containerNo}></input>
                           <CopyToClipboard text={containerNo} onCopy={onCopy}>
                              <button className="Cont_form_btn" type="button">
                                 Copy
                              </button>
                           </CopyToClipboard>
                        </form>
                        <ToastContainer />
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default AutoStowCont;
