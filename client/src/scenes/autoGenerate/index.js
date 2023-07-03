import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Grid,
  Container,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Select,
  InputLabel,
  FormControl,
  Box,
  Stack,
  Snackbar,
  Alert,
  TableCell,
  TableHead,
  Table,
  Paper,
  TableRow,
  TableContainer,
  TableBody,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Api from "../../api";
import { mockAssigned } from "../../data/mockData";
const AlertFunc = React.forwardRef(function AlertFunc(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AutoGenerate = ({ onSubmit }) => {
  const initialValues = {
    name: "",
    availabilityDate: "",
    round: "",
  };

  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [selectedInterviewTrack, setSelectedInterviewTrack] = useState("");
  const { isSidebar, setIsSidebar } = useAuth();
  const [list,  setList] = useState([])
  const specialisations = [
    "None",
    "Bachelors: Computer Science",
    "Bachelors: Electronics",
    "Bachelors: Electrical",
    "Masters: Computer Science",
    "Masters: Embedded",
    "Masters: Control Systems",
    "Masters: VLSI",
    "Masters: Signal Processing & Communication",
    // Add more specialisations as needed
  ];
  const interviewTracks = [
    "IIT KGP",
    "NIT Rourkela",
    "IIT BHU"
    // Add more interview tracks as needed
  ];

  const handleSpecialisationsChange = (event) => {
    const { value } = event.target;

    // If "None" is selected, clear the selectedSpecialisations array
    if (value.includes("None")) {
      setSelectedSpecialisations([]);
    } else {
      setSelectedSpecialisations(value);
    }
  };
  const handleInterviewTrackChange = (event) => {
    setSelectedInterviewTrack(event.target.value);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // Perform filtering logic using the form values

      // setFilteredCandidates(filteredResults);

      onSubmit(values);
    },
  });

  const [alert, setAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("Interviews have been scheduled!");

  const handleAlertOpen = () => {
    setAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const assignInterview = async () => {
    try {
      const assign = await Api.post("/user/assignInterviewers");
      if (assign.status === 200) {
        console.log(assign);
        setAlertMsg(assign.data.msg);
        setList(assign.data.list)
        setAlert(true);
      }
      else{
        setAlertMsg(assign.data.msg);
        setAlert(true);
      }
      
    } catch (error) {
      console.log(error);
      setAlertMsg("Failed to schedule interviews");
      setAlert(true);
    }
  };

  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Container maxWidth="sm">
            <Header
              title="AUTO ASSIGN INTERVIEWS"
              // subtitle="Automatatically assign interviewers to candidates"
            />
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid> */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>College</InputLabel>
                    <Select
                      fullWidth
                      value={selectedInterviewTrack}
                      onChange={handleInterviewTrackChange}
                      label="College"
                    >
                      {interviewTracks.map((track) => (
                        <MenuItem key={track} value={track}>
                          {track}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Specialization</InputLabel>
                    <Select
                      multiple
                      fullWidth
                      id="specialization"
                      name="Specialization"
                      label="Specialization"
                      value={selectedSpecialisations}
                      onChange={handleSpecialisationsChange}
                    >
                      {specialisations.map((specialisation) => (
                        <MenuItem key={specialisation} value={specialisation}>
                          {specialisation}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#016064", fontWeight: "bold" }}
                    onClick={assignInterview}
                  >
                    Assign
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
          <Container>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
              <Table
                sx={{ minWidth: 650, margin: "auto" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#3e4396" }}>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      Date
                    </TableCell>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      Time
                    </TableCell>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      Interviewer
                    </TableCell>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      Candidate
                    </TableCell>
                    <TableCell align="right" sx={{ textAlign: "center" }}>
                      Specialisation
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#141b2d" }}>
                  {list.map((row, column) => (
                    <TableRow
                      key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          </Container>
        </Box>
      </div>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity={alertMsg==="Failed to schedule interviews"?"error":"success"}
          sx={{ width: "100%" }}
        >
        {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AutoGenerate;
