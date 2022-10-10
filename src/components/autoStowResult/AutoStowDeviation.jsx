import React, { useMemo } from "react";
import "./autoStowDeviation.css";
import { useTable } from "react-table";
import Loading from "./Loading";

const AutoStowDeviation = ({ finale }) => {
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

   const loadingBool = data[0]["ID"] === "00";

   const tableInstance = useTable({ columns, data });
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

   return (
      <div className="Deviation_Table">
         {loadingBool ? (
            <Loading />
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
