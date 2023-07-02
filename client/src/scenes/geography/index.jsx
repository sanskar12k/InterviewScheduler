import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isSidebar, setIsSidebar } = useAuth();
  return (
    <>
    <Sidebar isSidebar={isSidebar} />
    <div className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Geography;
