import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { isSidebar, setIsSidebar } = useAuth();

  const handleDateClick = (selected) => {
    // const title = prompt("Please enter a new title for your event");
    const title = ""
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    console.log("in dateStr");
    console.log(selected.dateStr);
    calendarApi.addEvent({
      id: `${selected.dateStr} to ${title}`,
      start: selected.startStr,
      end: selected.endStr,
      backgroundColor: "green",
      display: "block"
    });
  
    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
  };

  const handleEventClick = (selected) => {
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    // }
    setIsModalOpen(true);

  };
  const slotLabelContent = (slotInfo) => {
    const slotLabelStyle = {
      height: "50px", // Adjust the height value as needed
    };

    return (
      <Box sx={{height: 50, alignItems: 'center'}}>
        {slotInfo.text}
      </Box>
    );
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
  };
  const handleStartMeet = ()=>{
    // redirect to the meeting link
  };
  const handleGO = ()=>{
    //make the candidate go to the next round
  }
  const handleNOGO = () =>{
    // remove the candidate
  }
  const handleFinishMeet = () =>{
    setIsStatusModalOpen(true);
    setIsModalOpen(false)
  }

  return (
    <>
    <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      
      <Box display="flex" justifyContent="space-between">

        {/* CALENDAR SIDEBAR */}
        {/* <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box> */}

        {/* CALENDAR */}
      </Box>
      <Box flex="1 1 100%" ml="15px">
        <FullCalendar
          height="75vh"
          plugins={[
            // dayGridPlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "title",
            // right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            right: "prev,next today"
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          // selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={handleEventClick}
          slotLabelContent={slotLabelContent}
          eventsSet={(events) => setCurrentEvents(events)}
          views={{
            timeGrid: {
              slotDuration: "01:00:00", // Set the time slot duration to one hour
            },
          }}
        />
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogContent>
        {/* Display the details of the candidates */}
        <Header title="Chirag" subtitle="Interview" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStartMeet} sx={{backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
            Start
          </Button>
          <Button sx={{backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px"}} onClick={handleFinishMeet}>
            End
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isStatusModalOpen} onClose={handleCloseModal}>
      <DialogContent>
      {/* Display the details of the candidates */}
      <Header title="Fate of Candidate" subtitle="Chirag" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGO} sx={{backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
          GO
        </Button>
        <Button sx={{backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px"}} onClick={handleNOGO}>
          NO GO
        </Button>
      </DialogActions>
    </Dialog>
        
       
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Calendar;