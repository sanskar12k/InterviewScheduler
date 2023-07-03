import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TableCell,
  TableHead,
  Table,
  Paper,
  TableRow,
  TableContainer,
  TableBody,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockNotification, mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import Link from "@mui/material/Link";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useEffect, useState } from "react";
import Api from "../../api";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isSidebar, setIsSidebar, user } = useAuth();
  const [actionData, setActionData] = useState(mockTransactions);
  const [notifications, setNotifications] = useState([]);
  const userType = localStorage.getItem('userType');
  const [interviewTaken, setInterviewTaken] = useState(0);
  const [interviewsLeft, setInterviewsLeft] = useState(0);

  const fetchInterviewers = async ()=>{
    try {
      console.log("start");
      const users = await Api.get(
        "/user/getAllInterviewers",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      );

      const interviewers = users.data;

      let newData = 0;
      let newDataLeft = 0;
      console.log(interviewers);
      for(let i=0; i<interviewers.length; i++)
      {
        newData = newData + interviewers[i].interviewTaken;
        newDataLeft = interviewers[i].candidateList.length - interviewers[i].interviewTaken;
      }
      setInterviewTaken(newData);
      setInterviewsLeft(newDataLeft);
      console.log(interviewTaken);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchNotifs = async ()=>{
    try {
      console.log("start");
      const user = await Api.get(
        "/notif/getNotif",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      );
      const data = user.data.notif;
      setNotifications(data.reverse());
      // console.log(user);
      // console.log(user.data.notif);
      console.log(notifications);
      console.log("Ernd");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotifs();
    fetchInterviewers();
    console.log('user:');
    console.log(user);
    // eslint-disable-next-line
  }, []);
  const [candList, setCand] = useState();
  const handleGoOnclick = async (row, column)=>{
    console.log(row);
    console.log(column);
    setActionData(
      actionData.filter((e) => {
        return e !== row;
      })
    );

    const data = {
      name: row.user,
      iTrack: row.round,
      specialisation: row.specialisation,
      status: `Accepted for ${row.round}`,
    };

    console.log(data);

    try {
      const cid = candList[column]._id;
      const res = await Api.patch(`/cand/${cid}/goStatus`,{
        goStatus:1
      })
      if(res.status === 200){
        console.log(res)
      }
      
      console.log("start");
      const user = await Api.post("/notif/addNotif", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      });
      console.log("Ernd");
    } catch (err) {
      console.log(err);
    }
  };
  const handleNoGoOnclick = async (row, column) => {
    console.log(row);
    console.log(column);
    setActionData(
      actionData.filter((e) => {
        return e !== row;
      })
    );

    const data = {
      name: row.user,
      iTrack: row.round,
      specialisation: row.specialisation,
      status: `Rejected at ${row.round}`,
    };

    console.log(data);

    try {
      console.log("start");
      const user = await Api.post("/notif/addNotif", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        },
      });
      console.log("Ernd");
    } catch (err) {
      console.log(err);
    }
  };

  const listOfCandidates = async()=>{
    try {
      const res = await Api.get('/user/adminDashboard');
      console.log(res);
      if(res.status === 200){
        console.log(res.data.cand);
        setActionData(res.data.cand);
        setCand(res.data.candidate);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    listOfCandidates();
  },[])

  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Header title="DASHBOARD"/>
          </Box>
          <Box m="10px" >
            <Typography display="flex"  justifyContent="center" alignItems="center" >
              <Link
                style={{textDecoration:'none'}}
                component="button"
                variant="body2"
                onClick={() => {
                  window.open("https://meet.google.com/cio-xsdc-xxn", "_blank");
                }}
                sx={{ color: "#1F2A40",fontSize:"20px",fontWeight:"bold",backgroundColor:"#005ab3",height:"40px",width:"200px",borderRadius:"10px" }}
              >
                Meeting Link
              </Link>
            </Typography>
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="10px"
            >
              <PeopleTwoToneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
              <Box
                sx={{
                  backgroundColor: colors.primary[400],
                  color: colors.grey[100],
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                  {userType==='Admin'?interviewTaken:user.interviewTaken}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                >
                  {userType==='Admin'?<>INTERVIEWS DONE</>:<>INTERVIEWS TAKEN BY YOU</>}
                </Typography>
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="10px"
            >
              <DevicesOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
              <Box
                sx={{
                  backgroundColor: colors.primary[400],
                  color: colors.grey[100],
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                  {/* {userType==='Admin'?interviewsLeft:(user.candidateList.length - user.interviewTaken)} */}
                  {user?(userType==='Admin'?interviewsLeft:(user.candidateList.length - user.interviewTaken)):0}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                >
                  Interviews Left
                </Typography>
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="10px"
            >
              <DoneAllIcon
                sx={{ color: colors.greenAccent[600], fontSize: "32px" }}
              />
              <Box
                sx={{
                  backgroundColor: colors.primary[400],
                  color: colors.grey[100],
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: "2rem", fontWeight: "bold" }}
                >
                  12,361
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                >
                  Selected by you
                </Typography>
              </Box>
            </Box>
            {userType === "Interviewer" ? (
              <>
              <Box
                gridColumn="span 20"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"
              >
                <Typography
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  colors={colors.grey[100]}
                  p="15px"
                >
                  Recent Interviews
                </Typography>
              
              <TableContainer component={Paper} sx={{marginTop:"10px"}}>
              <Table sx={{ margin:"auto" }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{backgroundColor:"#3e4396"}}>
                    <TableCell sx={{textAlign:"center"}}>Name</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Round</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Specialisation</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor:"#141b2d"}}>
                  {notifications.map((row, column) => (
                    <TableRow
                      key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.values(row).slice(1,5).map((value, column) => (
                        <TableCell align="right" key={column} sx={{textAlign:"center"}}>{value} </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
                </TableContainer>
                </Box>
                </>
            ):<></>
            } 
            {
            userType==='Admin'?
            <Box
              gridColumn="span 20"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Action Required
                </Typography>
              </Box>
              
                <TableContainer component={Paper} sx={{marginTop:"10px"}}>
                <Table sx={{ minWidth: 650,margin:"auto" }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{backgroundColor:"#3e4396"}}>
                      <TableCell sx={{textAlign:"center"}}>Name</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Round</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Specialisation</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Status 1</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Round 1</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Status 2</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Round 2</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Status 3</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Round 3</TableCell>
                      <TableCell align="right" sx={{textAlign:"center"}}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{backgroundColor:"#141b2d"}}>
                    {actionData.map((row, column) => (
                      <TableRow
                        key={row}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        {Object.values(row).map((value, column) => (
                          <TableCell align="right" key={column} sx={{textAlign:"center"}}>{value} </TableCell>
                        ))}
                        <TableCell align="right" key={column} sx={{textAlign:"center"}}>
                          <Button variant="contained" color="success" sx={{margin: "2px"}} onClick={()=>{handleGoOnclick(row, column)}}>GO</Button>
                          <Button variant="contained" color="error" sx={{margin: "2px"}} onClick={()=>{handleNoGoOnclick(row, column)}}>NO-GO</Button>
                        </TableCell>
                      </TableRow>))}
                    </TableBody>
                    <TableBody sx={{ backgroundColor: "#141b2d" }}>
                      {mockNotification.map((row, column) => (
                        <TableRow
                          key={row}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {Object.values(row).map((value, column) => (
                            <TableCell
                              align="right"
                              key={column}
                              sx={{ textAlign: "center" }}
                            >
                              {value}{" "}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
             : (
              <></>
            )}
            
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;