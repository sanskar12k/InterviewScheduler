import * as React from "react";
import { useState } from "react";
import "./registrationStyle.css";
import { FormControl, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Registration = () => {
  const theme = useTheme();

  const [addclass, setaddclass] = useState("");
  const [selectedInterviewTrack, setSelectedInterviewTrack] = useState("");
  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [selectedjoinAs, setjoinAs] = useState("");

  const handleInterviewTrackChange = (event) => {
    setSelectedInterviewTrack(event.target.value);
  };
  const handlejoinAsChange = (event) => {
    setjoinAs(event.target.value);
  };
  const handleSpecialisationsChange = (event) => {
    const { value } = event.target;

    // If "None" is selected, clear the selectedSpecialisations array
    if (value.includes("None")) {
      setSelectedSpecialisations([]);
    } else {
      setSelectedSpecialisations(value);
    }
  };

  const interviewTracks = [
    "Technical Round",
    "Manegerial Round",
    "HR Round",
    // Add more interview tracks as needed
  ];

  const joinAsAdminInterviewer = [
    "Admin",
    "Interviewer",
    // Add more interview tracks as needed
  ];

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

  return (
    <div className={`container ${addclass}`} id="container">
      <div className="form-container  sign-up-container">
        <form className="registration-form">
          <h1>Create Account</h1>
          <input type="text" placeholder="FIRST NAME" required="true"/>
          <input type="text" placeholder="LAST NAME" required="true"/>
          <input type="email" placeholder="EMAIL" required="true"/>
          <input type="phone" placeholder="PHONE NUMBER" required="true"/>
          <input type="password" placeholder="PASSWORD" required="true"/>
          
          <FormControl
            fullWidth
            className="white-background"
            required="true"
            sx={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
          >
            <InputLabel style={{ color: "grey" }}>JOIN AS</InputLabel>
            <Select
              value={selectedjoinAs}
              onChange={handlejoinAsChange}
              label="JOIN AS"
              className="white-text"
            >
              {joinAsAdminInterviewer.map((joinas) => (
                <MenuItem key={joinas} value={joinas}>
                  {joinas}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

            {selectedjoinAs === 'Interviewer' && <>
            <FormControl
              fullWidth
              className="white-background"
              required="true"
              sx={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
            >
              <InputLabel style={{ color: "grey" }}>INTERVIEW TRACK</InputLabel>
              <Select
                value={selectedInterviewTrack}
                onChange={handleInterviewTrackChange}
                label="INTERVIEW TRACK"
                className="white-text"
                
              >
                {interviewTracks.map((track) => (
                  <MenuItem key={track} value={track}>
                    {track}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              className="white-background"
              required="true"
              sx={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
            >
              <InputLabel  style={{ color: "grey" }}>SPECIALISATION</InputLabel>
              <Select
                multiple
                value={selectedSpecialisations}
                onChange={handleSpecialisationsChange}
                label="SPECIALISATION"
                className="white-text"
              >
                {specialisations.map((specialisation) => (
                  <MenuItem key={specialisation} value={specialisation}>
                    {specialisation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> 
            </>}

          

          <button type="submit">REGISTER</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="registration-form">
          <h1>Login</h1>
          <input type="email" placeholder="EMAIL" required="true"/>
          <input type="password" placeholder="PASSWORD" required="true"/>
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <button
              className="ghost"
              id="signIn"
              onClick={() => setaddclass("")}
            >
              GO TO LOGIN
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <button
              className="ghost"
              id="signUp"
              onClick={() => setaddclass("right-panel-active")}
            >
              GO TO REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
