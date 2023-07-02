import {  Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import FormAdmin from "./scenes/formAdmin";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Invoices from './scenes/invoices'
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Registration from "./scenes/Authentication/Registration";
import { AppProvider } from "./Context/AppContext";
import AutoGenerate from "./scenes/autoGenerate";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AppProvider>
          <div className="app">
              <Routes>
              <Route path="/" element={<Registration />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/formAdmin" element={<FormAdmin />} />
              <Route path="/autoGenerate" element={<AutoGenerate />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </AppProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
