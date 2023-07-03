import { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useAuth } from "../../Context/AppContext";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Api from "../../api";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { isSidebar, setIsSidebar } = useAuth();
  const [available, setAvailable] = useState();
  const getAvailable = async () => {
    try {
      const uid = localStorage.getItem("users");
      const res = await Api.get(`/user/${uid}/allAvailability`);
      if (res.status === 200) {
        console.log(res.data);
        setAvailable(res.data.dates.map(e => {
          e.id = e._id
          e.date = new Date(e.date);
          let strt = new Date(e.date.getTime() + (e.time * 60 * 60 * 1000));
          let end = (new Date(e.date.getTime() + ((e.time+1) * 60 * 60 * 1000)))
          e.start = strt.toISOString().slice(0, -1);;
          e.end = end.toISOString().slice(0, -1); ;
          console.log(e.start , e.end)
          return { ...e }
        }))
        console.log(typeof(res.data.dates))
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDateClick = async (selected) => {
    // const title = prompt("Please enter a new title for your event");
    const title = ""
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    console.log("in dateStr");
    // console.log(selected.dateStr, selected.startStr, selected.endStr);
    calendarApi.addEvent({
      id: `${selected.dateStr} to ${title}`,
      start: selected.startStr,
      end: selected.endStr,
      backgroundColor: "green",
      // display: "block"
    });
    console.log(`${selected.dateStr} to ${title}`)
    const date = selected.startStr.slice(0, 10);
    const time = selected.startStr.slice(11, 13)
    // console.log(date, selected.startStr, time);
    const user = localStorage.getItem("users")
    console.log(selected.startStr)
    const res = await Api.patch(`/user/updateAvaialability`, {
      user,
      date,
      time
    })
    if (res.status === 200) {
      console.log("Updated availability")
    }
  };

  const handleEventClick = async(selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      console.log(selected.event._def.extendedProps._id)
      const remove = await Api.patch(`/user/removeTime` , {
        user:localStorage.getItem("users"),
        _id:selected.event._def.extendedProps._id
      })
      selected.event.remove();
      if(remove.status === 200){
        console.log(remove.data.msg)
      }
    }
    // setIsModalOpen(true);

  };
  const slotLabelContent = (slotInfo) => {
    const slotLabelStyle = {
      height: "50px", // Adjust the height value as needed
    };

    return (
      <Box sx={{ height: 50, alignItems: 'center' }}>
        {slotInfo.text}
      </Box>
    );
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
  };
  const handleStartMeet = () => {
    // redirect to the meeting link
  };
  const handleGO = () => {
    //make the candidate go to the next round
  }
  const handleNOGO = () => {
    // remove the candidate
  }
  const handleFinishMeet = () => {
    setIsStatusModalOpen(true);
    setIsModalOpen(false)
  }

  useEffect(() => {
    getAvailable();
  }, [])
  return (
    <>
      <Sidebar isSidebar={isSidebar} />
      <div className="content">
        <Topbar setIsSidebar={setIsSidebar} />
<<<<<<< HEAD
        <Box m="20px">
          <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

          <Box display="flex" justifyContent="space-between">
=======
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />
      
      <Box display="flex" justifyContent="space-between">
>>>>>>> 55929734b29e22ad7bcd95757d4989b258784ccf

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
           {available &&  <FullCalendar
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
              initialEvents={available}
              views={{
                timeGrid: {
                  slotDuration: "01:00:00", // Set the time slot duration to one hour
                },
              }}
            />
           }
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <DialogContent>
                {/* Display the details of the candidates */}
                <Header title="" subtitle="Interview" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleStartMeet} sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
                  Start
                </Button>
                <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }} onClick={handleFinishMeet}>
                  End
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={isStatusModalOpen} onClose={handleCloseModal}>
              <DialogContent>
                {/* Display the details of the candidates */}
                <Header title="Fate of Candidate" subtitle="" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleGO} sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}>
                  GO
                </Button>
                <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }} onClick={handleNOGO}>
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