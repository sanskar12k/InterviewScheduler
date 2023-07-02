import { Box, Button, IconButton, Typography, useTheme,
  TableCell,
  TableHead,
  Table,
  Paper,
  TableRow,
  TableContainer,
  TableBody } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isSidebar, setIsSidebar } = useAuth();
  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" />
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
                  12,361
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: "0.8rem", textTransform: "uppercase" }}
                >
                  Interviews Taken
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
                  12,361
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

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <TableContainer component={Paper} sx={{marginTop:"10px"}}>
              <Table sx={{ margin:"auto" }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{backgroundColor:"#3e4396"}}>
                    <TableCell sx={{textAlign:"center"}}>Name</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Round</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Specialisation</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Comments</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor:"#141b2d"}}>
                  {mockTransactions.map((row, column) => (
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
            </Box>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <TableContainer component={Paper} sx={{marginTop:"10px"}}>
              <Table sx={{ minWidth: 650,margin:"auto" }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{backgroundColor:"#3e4396"}}>
                    <TableCell sx={{textAlign:"center"}}>Name</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Round</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Specialisation</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Comments</TableCell>
                    <TableCell align="right" sx={{textAlign:"center"}}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor:"#141b2d"}}>
                  {mockTransactions.map((row, column) => (
                    <TableRow
                      key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.values(row).map((value, column) => (
                        <TableCell align="right" key={column} sx={{textAlign:"center"}}>{value} </TableCell>
                      ))}
                      <TableCell align="right" key={column} sx={{textAlign:"center"}}>
                        <Button variant="contained" color="success" sx={{margin: "2px"}}>GO</Button>
                        <Button variant="contained" color="error" sx={{margin: "2px"}}>NO-GO</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
                </TableContainer>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
