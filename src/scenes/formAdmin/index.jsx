import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, MenuItem, List, ListItem, ListItemText, Select, InputLabel, FormControl, Box } from '@mui/material';
import Header from "../../components/Header";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const FormComponent = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    availabilityDate: '',
    round: ''
  };

  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([{name: "Sample Name", branch: "Sample Branch"}]);
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
    "Technical Round",
    "Managerial Round",
    "HR Round",
    // Add more interview tracks as needed
  ];

  const host = 'http://localhost:8000';

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

  const getInterviewTrack = (InterviewTrack)=>{
    if(InterviewTrack === 'Technical Round')
    {
      return 0;
    }
    else if(InterviewTrack === 'Managerial Round')
    {
      return 1;
    }
    else if(InterviewTrack === 'HR Round')
    {
      return 2;
    }
    else
    {
      return -1;
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // Perform filtering logic using the form values
      const filteredValues = {
        iTrack: getInterviewTrack(selectedInterviewTrack),
        specialisations: selectedSpecialisations,
        availabilityDate: values.availabilityDate,
        time: values.time
      }; // Replace with your actual filtering logic
      console.log(filteredValues);

      fetch(`${host}/getCand`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(filteredValues)
      }).then(response => response.json())
      .then(data =>{
        console.log(data);
        setFilteredCandidates(data);
      })
      .catch(err=>{
        console.log(err);
      })


      // setFilteredCandidates(filteredResults);

      onSubmit(values);
    }
  });

  return (
    <>
    <Sidebar isSidebar={isSidebar} />
    <div className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
    <Container maxWidth="sm">
      <Header title="Filter Candidate" subtitle="Find the candidates"/>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="availabilityDate"
              name="availabilityDate"
              label="Availability Date"
              type="date"
              value={formik.values.availabilityDate}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="time"
              name="time"
              label="Time"
              type="time"
              value={formik.values.time}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 minutes interval
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {filteredCandidates.length > 0 && (
        <List>
          <h2>Filtered Candidates:</h2>
          {filteredCandidates.map((candidate, index) => (
            <>
            <ListItem key={index}>
              <ListItemText primary={candidate.name} secondary={`Branch: ${candidate.branch}`}/>
            </ListItem>
            </>
          ))}
        </List>
      )}

    </Container>
    </Box>
    </div>
    </>
  );
};

export default FormComponent;
