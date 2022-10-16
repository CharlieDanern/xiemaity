import React, { useMemo, useState, useEffect } from "react";
import "./autoStowDeviation.css";
import { useTable } from "react-table";
import Loading from "./Loading";
import axios from "axios";
import { defaultData } from "./defaultData";
import { defaultCont } from "./defaultCont";

const AutoStowDeviation = ({ uploadedFile, status, setSecondary }) => {
   const [finale, setFinale] = useState(defaultData);
   // const finale = defaultData;
   const [stat, setStat] = useState(status);

   // const url = "http://localhost:4000/autostow/result";
   const url = "https://api.xiemaity.com/autostow/result";

   useEffect(() => {
      setSecondary(defaultCont);
      setStat(status);
      const sse = new EventSource(`${url}/indicator`); //, { withCredentials: true });
      sse.onmessage = async (e) => {
         const dataToReceive = JSON.parse(e.data);
         console.log(dataToReceive);
         if (dataToReceive[`${uploadedFile.fileName}`] === "ready") {
            const data = await axios.get(`${url}/${uploadedFile.fileName}`);
            setStat("Ready to Launch!");
            setFinale(data.data.devi);
            setSecondary(data.data.finalResult);
            sse.close();
         }
      };

      return () => {
         sse.close();
      };
   }, [status, uploadedFile.fileName, setSecondary]);

   const data = useMemo(() => [...finale], [finale]);

   const columns = useMemo(
      () =>
         Object.keys(finale[0]).map((e, i) => {
            return {
               Header: i > 0 && i < Object.keys(finale[0]).length - 2 ? `WC ${i}` : i === 0 ? "BAY" : e,
               accessor: e,
            };
         }),
      [finale]
   );

   // const loadingBool = data[0]["ID"] === "00";
   const loadingBool = stat === "Ready to Launch!";

   const tableInstance = useTable({ columns, data });
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

   return (
      <div className="Deviation_Table">
         {!loadingBool ? (
            <>
               <h1 className="Hidden">{stat}</h1>
               <Loading />
            </>
         ) : (
            <div className="Deviation_Table">
               <h4>DEVIATION</h4>
               <table className="table" {...getTableProps()}>
                  <thead className="thead">
                     {headerGroups.map((headerGroup) => (
                        <tr className="tr" {...headerGroup.getHeaderGroupProps()}>
                           {headerGroup.headers.map((column) => (
                              <th className="th" {...column.getHeaderProps()}>
                                 {column.render("Header")}
                              </th>
                           ))}
                        </tr>
                     ))}
                  </thead>
                  <tbody className="tbody" {...getTableBodyProps()}>
                     {rows.map((row) => {
                        prepareRow(row);
                        return (
                           <tr className="tr" {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                 return (
                                    <td className="td" {...cell.getCellProps()}>
                                       {cell.render("Cell")}
                                    </td>
                                 );
                              })}
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default AutoStowDeviation;
