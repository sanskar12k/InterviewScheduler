import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, MenuItem, List, ListItem, ListItemText, Select, InputLabel, FormControl, Box, Stack, Snackbar, Alert } from '@mui/material';
import Header from "../../components/Header";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Api from '../../api';

const AlertFunc = React.forwardRef(function AlertFunc(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AutoGenerate = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    availabilityDate: '',
    round: ''
  };

  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [selectedInterviewTrack, setSelectedInterviewTrack] = useState("");
  const { isSidebar, setIsSidebar } = useAuth();

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
    "Technical",
    "Managerial",
    "HR",
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
    }
  });

  const [alert, setAlert] = React.useState(false);

  const handleAlertOpen = () => {
    setAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const  assignInterview = async() =>{
    try {
      const assign = await Api.post("/user/assignInterviewers");
      if(assign.status === 200)
      console.log(assign);


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Sidebar isSidebar={isSidebar} />
    <div className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
    <Container maxWidth="sm">
      <Header title="AUTO ASSIGN INTERVIEWS" subtitle="Automatatically assign interviewers to candidates"/>
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
            <InputLabel>Interview Track</InputLabel>
            <Select
              fullWidth
              value={selectedInterviewTrack}
              onChange={handleInterviewTrackChange}
              label="INTERVIEW TRACK"
              >
              {interviewTracks.map((track) => (
                <MenuItem key={track} value={track}>
                  {track}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} style={{textAlign:"center"}}>
            <Button 
            type="submit" 
            variant="contained" 
            style={{backgroundColor:"#016064",fontWeight:"bold"}}
            onClick={assignInterview}
            >
              Assign
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Box>
    </div>

      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Interviews have been assigned!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AutoGenerate;
