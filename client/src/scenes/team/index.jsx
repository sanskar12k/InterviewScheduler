import { Box, FormControl, Typography, useTheme } from "@mui/material";
import { DataGrid ,  GridActionsCellItem,} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import {Checkbox, Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [candidates, setCandidates] = useState("");
  const { isSidebar, setIsSidebar, user, getUser } = useAuth();
  const [data, setData] = useState([]);
  const uid = localStorage.getItem("users");
  const getCandidates = async () => {
    try {
      console.log(user)
      const res = await Api.get(`/user/${uid}/myCandidates`    )
      console.log(res.data.candidates.candidateList);
      if (res.status === 200) {
      //   setTimeout(() => {
      //     toast.success(user.data.message, {
      //       position: "top-center",
      //     });
      //   }, 100);
      console.log(res.data.candidates.candidateList);
      // setData(res.data.candidates.candidateList);
      setData(
        res.data.candidates.candidateList.map(e => {
          e.time = `${e.dateNdTime.time} - ${e.dateNdTime.time + 1}` 
          return { ...e }
        })
      )
      }
      else {
      }
      // setBLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
    getCandidates();
 }, [])

 const statusUpdate = async(id) =>{
  try {
    const uid = localStorage.getItem("users");
    const res = await Api.patch(`/user/${uid}/cand/${id}/updateStatus`, {
      status : 1
    }) 
    console.log(res);   
  } catch (error) {
    console.log(error)
  }
 }

 const handleSelectionChange = async(selectionModel) => {
  try {
    const uid = localStorage.getItem("users");
    const res = await Api.patch(`/user/${uid}/taken/${selectionModel}`);
    if(res.status === 200){
      console.log(res.data)
      console.log("Interview Taken");
    }
  } catch (error) {
    console.log(error)
  }
};

 const addComment = async(e, cid) =>{
  e.preventDefault();
  try {
    const uid = localStorage.getItem("users");
    const res = await Api.post(`/user/${uid}/cand/${cid}/comment`,{
      comment:e.target.value
    })
    if(res.status === 200){
      console.log(res.data);
    }
  } catch (error) {
    console.log(error)
  }
 }
  const columns = [
    { field: "time", headerName: "Time" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
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
      type:"actions",
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={
              <FormControl sx={{ minWidth: 120 }}>
              {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
              <Select
                defaultValue={1}
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // value={"Wail"}
                // label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={1} disabled>Wait</MenuItem>
                <MenuItem value={2}>Pass</MenuItem>
                <MenuItem value={3}>Fail</MenuItem>
              </Select>
            </FormControl>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />
        ];
      },
      
    },
    {
      field: "action",
      headerName: "Comment",
      flex: 1,
      type: "actions",
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          // <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
          iid="filled-textarea"
          // label="Multiline Placeholder"
          placeholder="Write comment"
          multiline
          variant="standard"
        />
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
    <Box m="20px">
      <Header title="Candidates" subtitle="Managing the candidates" />
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
        }}
      >
        <DataGrid  rows={mockDataTeam} columns={columns} rowHeight={70}/>
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Team;