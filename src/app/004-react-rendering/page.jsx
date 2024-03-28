"use client";
// avoid wasted renderings
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { useState, useRef, useEffect, useMemo, memo } from "react";
import Image from "next/image";
// const MyComp = (params) => {
//   const imageUrl =
//     "https://img.freepik.com/free-vector/loading-circles-blue-gradient_78370-2646.jpg?size=338&ext=jpg&ga=GA1.1.1222169770.1711497600&semt=ais";
//   const imgStyle = { width: 30, top: 0, left: 0, position: "absolute" };
//   const style = { marginLeft: 20 };
//   return (
//     <span style={style}>
//       {/* <Image src={imageUrl} width="40" height="40" style={imgStyle} alt="ddd" /> */}
//       <img src={imageUrl} style={imgStyle} alt="ddd" />
//       {params.value}
//     </span>
//   );
// };
const MyComp = (params) => {
  const renderCountRef = useRef(1);
  console.log("render count");
  return (
    <>
      <b>({renderCountRef.current++})</b> {params.value}
    </>
  );
};
function Page() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      cellRenderer: memo(MyComp), // 지금 버전은 딱히 필요 없는듯
    }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default Page;
