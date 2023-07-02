import { Box, IconButton, useTheme, FormControl, Select, Menu, MenuItem, ClickAwayListener } from "@mui/material";
import { useState, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null); // Track the anchor element for the menu
  const [anchorElNotif, setAnchorElNotif] = useState(null);

  const handleOpenMenuNotif = (event) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleCloseMenuNotif = () => {
    setAnchorElNotif(null);
  };

  const navigate=useNavigate();


  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget); // Set the anchor element when the menu is clicked
  }

  function handleMenuClose() {
    setAnchorEl(null); // Reset the anchor element to close the menu
  }

  function signOut() {
    localStorage.removeItem("users");
    localStorage.removeItem("userType")
    return navigate("/");
  }

  const notifications = [
    { id: 1, name: 'John Doe', status: 'Accepted' },
    { id: 2, name: 'Jane Smith', status: 'Rejected' },
    { id: 3, name: 'Michael Johnson', status: 'Accepted' },
  ];

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
        style={{ color: '#ffffff' }}
        onClick={handleOpenMenuNotif}
        >
          <NotificationsOutlinedIcon/>
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorElNotif}
          keepMounted
          open={Boolean(anchorElNotif)}
          onClose={handleCloseMenuNotif}
          // style={{ marginTop: '16px' }}
          sx={{borderRadius: "0", margin: "auto", paddingTop:"0px"}}
        >
          {notifications.map((notification) => (
          <MenuItem key={notification.id} sx={{color:"red", backgroundColor: "white"}}>
              <span>{notification.name}</span>
              <span>{notification.status}</span>
          </MenuItem>
        ))}
        </Menu>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuClick} id="person-menu">
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;


