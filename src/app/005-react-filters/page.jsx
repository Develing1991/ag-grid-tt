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
  console.log(p.value);
  console.log(p.data);
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
  return <></>;
};

const getRowStyle = (params) => {
  if (params.data.key % 2 === 0) {
    return { background: "orange", height: "0px" };
  }
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
    { field: "key" },
    { field: "show" },
    { field: "showText" },
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
      cellRendererSelector: (p) => {
        if (p.data.year == 2000) {
          return { component: SimpleComp1 };
        }
        if (p.data.year == 2004) {
          return null;
        }
      },
    }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((result) => result.json())
      .then((rowData) => {
        const data = rowData.map((rData, index) => {
          const show = index % 2 == 0;
          return {
            ...rData,
            key: index,
            show: show,
            showText: `${show}`,
          };
        });
        setRowData(data);
      });
  }, []);

  const aaa = () => {
    debugger;
  };

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
      <button onClick={aaa}>ttt</button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        animateRows={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
      />
    </div>
  );
}

export default Page;
