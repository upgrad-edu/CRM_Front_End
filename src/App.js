import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import MiniDrawer from "./components/MiniDrawer";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl" style={{ backgroundColor: "#f4f4f4" }}>
        <MiniDrawer />
      </Container>
    </Fragment>
  );
}

export default App;
