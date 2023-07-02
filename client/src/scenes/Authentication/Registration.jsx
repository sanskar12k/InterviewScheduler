import * as React from "react";
import { useState } from "react";
import "./registrationStyle.css";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Api from "../../api";
import {useNavigate } from "react-router-dom";

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [addclass, setaddclass] = useState("");
  const [selectedInterviewTrack, setSelectedInterviewTrack] = useState("");
  const [selectedSpecialisations, setSelectedSpecialisations] = useState([]);
  const [selectedjoinAs, setjoinAs] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

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
    "Technical",
    "Manegerial",
    "HR",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setBLoading(true);
    try {
      console.log("start")
      const user = await Api.post('/user/createuser',
        {
          fname: fname,
          lname: lname,
          email:email,
          password: password,
          phNumber: phone,
          iTrack: selectedInterviewTrack,
          specialisation: selectedSpecialisations,
          user: selectedjoinAs
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      )
      console.log("Ernd")
      console.log(user.data.user);
      if (user.status === 200) {
      //   setTimeout(() => {
      //     toast.success(user.data.message, {
      //       position: "top-center",
      //     });
      //   }, 100);
      console.log(user.status);
      localStorage.setItem("userType", selectedjoinAs)
      localStorage.setItem("users", user.data.user._id)
        setFname('');
        setLname('');
        setPhone('');
        setPassword('');
        setEmail('');
        setSelectedInterviewTrack('');
        setSelectedSpecialisations([]);
        navigate('/Dashboard')
      }
      else {
        // // console.log(user)
        // toast.warn(user, {
        //   position: "top-center",
        // });
      }
      // setBLoading(false);
    } catch (error) {
      console.log(error);
      // toast.warn(error.response.data.error, {
      //   position: "top-center",
      // });
    }
    // setBLoading(false);
  }
  const login = async (e) => {
    e.preventDefault();
    // setBLoading(true);
    try {
      console.log("login")
      const user = await Api.post('/user/login',
        {
          email: emailLog,
          password: passwordLog
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
        }
      )
      console.log("Ernd")
      console.log(user.data.userExist);
      if (user.status === 200) {
      //   setTimeout(() => {
      //     toast.success(user.data.message, {
      //       position: "top-center",
      //     });
      //   }, 100);
      console.log(user.status);
      localStorage.setItem("userType", user.data.userType);
      localStorage.setItem("users", user.data.userExist._id);
        setPasswordLog('');
        setEmailLog('');
        navigate('/Dashboard');
      }
      else {
        // // console.log(user)
        // toast.warn(user, {
        //   position: "top-center",
        // });
      }
      // setBLoading(false);
    } catch (error) {
      console.log(error);
      // toast.warn(error.response.data.error, {
      //   position: "top-center",
      // });
    }
    // setBLoading(false);
  }
  
  return (
    <div className={`container ${addclass}`} id="container">
      <div className="form-container  sign-up-container">
        <form className="registration-form">
          <h1>Create Account</h1>
          <input type="text" placeholder="FIRST NAME" onChange={e => setFname(e.target.value)} value={fname} required="true" />
          <input type="text" placeholder="LAST NAME" onChange={e => setLname(e.target.value)} required="true" />
          <input type="email" placeholder="EMAIL" onChange={e => setEmail(e.target.value)} required="true" />
          <input type="phone" placeholder="PHONE NUMBER" onChange={e => setPhone(e.target.value)} required="true" />
          <input type="password" placeholder="PASSWORD" onChange={e => setPassword(e.target.value)} required="true" />
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
              <InputLabel style={{ color: "grey" }}>SPECIALISATION</InputLabel>
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
          <button onClick={handleSubmit}>REGISTER</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="registration-form">
          <h1>Login</h1>
          <input type="email" placeholder="EMAIL" onChange={e => {setEmailLog(e.target.value); console.log(emailLog)}}  required="true" />
          <input type="password" placeholder="PASSWORD" onChange={e => setPasswordLog(e.target.value)}  required="true" />
          <button onClick={login}>LOGIN</button>
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
