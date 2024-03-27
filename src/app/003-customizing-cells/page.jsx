"use client";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Component,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const SimpleComp1 = (p) => {
  console.log(p);
  const onDollar = useCallback(() => window.alert("Dollar " + p.value));
  return (
    <div>
      <button onClick={onDollar}>$</button>
      Hello World - {p.value}
    </div>
  );
};
const SimpleComp2 = (p) => {
  const onAt = useCallback(() => window.alert("At " + p.value));
  return (
    <div>
      <button onClick={onAt}>{p.buttonText}</button>
      {p.value}
    </div>
  );
};

class ClassComp extends Component {
  render() {
    return (
      <div>
        <button onClick={() => window.alert("At " + this.props.value)}>
          ClassComp
        </button>
        {this.props.value}
      </div>
    );
  }
}

function Page() {
  const [rowData, setRowData] = useState();

  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", cellRenderer: SimpleComp1 },
    { field: "age", cellRenderer: (p) => <b>{p.value}</b> },
    {
      field: "country",
      cellRenderer: SimpleComp2,
      cellRendererParams: {
        buttonText: "=",
      },
    },
    {
      field: "year",
      cellRendererSelector: (p) => {
        if (p.value == 2000) {
          return { component: SimpleComp1 };
        }
        if (p.value == 2004) {
          return { component: SimpleComp2, params: { buttonText: "!!" } };
        }
      },
    },
    { field: "date", cellRenderer: ClassComp },
    { field: "sport" },
    { field: "gold", cellRenderer: null },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      // cellRenderer: SimpleComp1,
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
