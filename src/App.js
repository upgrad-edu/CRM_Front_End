import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import MiniDrawer from "./components/MiniDrawer";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <MiniDrawer />
      </Container>
    </Fragment>
  );
}

export default App;
