import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout";
import Create from "./components/create";
import Preview from "./components/preview";
import Myform from "./components/myform";
import { createTheme, ThemeProvider } from "@mui/material";

const THEME = createTheme({
  typography: {
    fontFamily: `"FigTree", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/create" replace />} />
            <Route path="create" element={<Create />} />
            <Route path="preview" element={<Preview />} />
            <Route path="myforms" element={<Myform />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
