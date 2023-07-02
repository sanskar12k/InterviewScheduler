import { Box } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useEffect, useState } from "react";
import Api from "../../api";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isSidebar, setIsSidebar, user, getUser } = useAuth();
  const [allCand, setCand] = useState([]);
  const getAllCandidate = async(req, res)=>{
    try {
      const res = await Api.get("/cand/allcandidate");
      if(res.status === 200){
        console.log(res.data);
       const can = res.data.candidates;
       let id = 1;
        setCand(
          res.data.candidates.map(e => {
             e.username = `${e.fname} ${e.lname}`
             e.id = id++;
             for(let i = 0;i<3;i++){
              if(e.status[i] === -1){
                e.remark = `Waiting for R${i+1}`;
                break;
              }
              else if(e.status[i] === 0){
                e.remark = "Rejected";
                break;
              }
             }
             if(e.status[2] === 1){
              e.remark = "Cleared"
             }
            return { ...e }
          })
        )
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllCandidate()
  }, [])
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "specialisation",
      headerName: "Specialisation",
      flex:1,
    },
    {
      field:"remark",
      headerName:"Status",
      flex:1,
    }
  ];

  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header
            title="CONTACTS"
            subtitle="List of Contacts for Future Reference"
          />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={allCand}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Contacts;
