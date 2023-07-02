import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Pie = () => {
  const { isSidebar, setIsSidebar } = useAuth();
  return (
    <>
    <Sidebar isSidebar={isSidebar} />
    <div className="content">
      <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Pie;
