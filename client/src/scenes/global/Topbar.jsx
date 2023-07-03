import {
  Box,
  IconButton,
  useTheme,
  FormControl,
  Select,
  Menu,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Api from "../../api";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null); // Track the anchor element for the menu
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [notifications, setNotifications] = useState([{name: "harsh", iTrack: "Technical", specialisation: "CS", status: "Accepted"},{name: "harsh", iTrack: "Technical", specialisation: "CS", status: "Accepted"}]);

  const handleOpenMenuNotif = async (event) => {
    setAnchorElNotif(event.currentTarget);

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
      setNotifications(data.reverse().slice(0,4));
      // console.log(user);
      // console.log(user.data.notif);
      console.log(notifications);
      console.log("Ernd");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseMenuNotif = () => {
    setAnchorElNotif(null);
  };

  const navigate = useNavigate();

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget); // Set the anchor element when the menu is clicked
  }

  function handleMenuClose() {
    setAnchorEl(null); // Reset the anchor element to close the menu
  }

  function signOut() {
    localStorage.removeItem("users");
    localStorage.removeItem("userType");
    return navigate("/");
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {/* <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box></Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          aria-controls="notification-menu"
          aria-haspopup="true"
          style={{ color: "#ffffff" }}
          onClick={handleOpenMenuNotif}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorElNotif}
          keepMounted
          open={Boolean(anchorElNotif)}
          onClose={handleCloseMenuNotif}
          sx={{ borderRadius: "0", margin: "auto" }}
          MenuListProps={{ sx: { py: 0 } }}
        >
          {notifications.slice(0,4).map((notification, idx) => (
            <MenuItem
              key={idx}
              sx={{
                // width:"100%",
                color: "white",
                backgroundColor: "#18608a",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor:
                  notification.status[0] === "A"
                    ? "green"
                    : notification.status[0] === "R"
                    ? "red"
                    : "#18608a"
              }}
            >
              <span style={{ padding: "8px" }}>{notification.name}</span>
              <span style={{ padding: "8px" }}>{notification.status}</span>
            </MenuItem>
          ))}
        </Menu>
        <IconButton onClick={handleMenuClick} id="person-menu">
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
