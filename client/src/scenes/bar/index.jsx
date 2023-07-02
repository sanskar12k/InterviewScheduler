import { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Api from "../../api";
// import moduleName from 'module';

import "./Xcel.css";
const host = 'http://localhost:8000';

function Xcel() {
  const [data, setData] = useState([]);
  const { isSidebar, setIsSidebar } = useAuth();
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      console.log(parsedData);
    };


  };
  const handleDataUpload = async () => {
    // setBLoading(true);
    try {
      console.log("start")
      const user = await Api.post('/cand/addCandidate',
       { data:data},
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      )
      console.log("Ernd")
    }
    catch(err){
      console.log(err);
    }
  }
  

  return (
    <>
    <Sidebar isSidebar={isSidebar} />
    <div className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleDataUpload}>Upload</button>
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <br />
    </div>
    </div>
    </>
  );
}

export default Xcel;
