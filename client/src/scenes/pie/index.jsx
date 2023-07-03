import { ChatEngine } from "react-chat-engine";
import "./pie.css";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useAuth } from "../../Context/AppContext";
const Pie = () => {
  const { isSidebar, setIsSidebar } = useAuth();
  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        {/* <Topbar setIsSidebar={setIsSidebar} /> */}
        <ChatEngine
          height="100vh"
          projectID="
0ca50e53-0f22-46e7-b492-8c6f757b847c"
          userName="codeworks"
          userSecret="123123"
        />
      </div>
    </>
  );
};

export default Pie;
