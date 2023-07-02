import { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Api from "../../api";
import {
  Box,
  TableCell,
  TableHead,
  Table,
  Paper,
  TableRow,
  TableContainer,
  TableBody,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Checkbox, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
// import moduleName from 'module';

import "./Xcel.css";
const host = "http://localhost:8000";

function Xcel() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      console.log("start");
      const user = await Api.post(
        "/cand/addCandidate",
        { data: data },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      );
      console.log("Ernd");
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "Time", headerName: "Time" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "link",
      headerName: "Resume Link",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Status",
      type: "actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Checkbox defaultChecked color="success" />}
            label="Edit"
            className="textPrimary"
            // onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "action",
      headerName: "Comment",
      flex: 1,
      type: "actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          // <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="filled-multiline-static"
            label="Comment"
            multiline
            rows={1}
            sx={{ m: 1, width: "50ch" }}
            margin="none"
            padding="normal"
            fullWidth
            // variant="outline"
          />,
          // </FormControl>
        ];
      },
    },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <div className="App">
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{backgroundColor:"#141b2d"}}/>
          <button onClick={handleDataUpload}>Upload</button>
          {data.length > 0 && (
            <>

            <TableContainer component={Paper} sx={{marginTop:"10px"}}>
              <Table sx={{ minWidth: 650,margin:"auto" }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{backgroundColor:"#3e4396"}}>
                    <TableCell sx={{textAlign:"center"}}>ID</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>First Name</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Last Name</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Email</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Phone Number</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Specialisation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor:"#141b2d"}}>
                  {data.map((row, column) => (
                    <TableRow
                      key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.values(row).map((value, column) => (
                        <TableCell align="right" key={column} sx={{textAlign:"center"}}>{value} </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
          )}
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Xcel;
