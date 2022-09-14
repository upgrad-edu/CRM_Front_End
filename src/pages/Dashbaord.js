import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Fragment } from "react";
import gradient from "../assets/gradient.png";
import { Link } from "react-router-dom";
export function Dashboard() {
  return (
    <Fragment>
      <CssBaseline />
      <Link to="/">
        {" "}
        <ActionAreaCard title="Open Requests" description="12"></ActionAreaCard>
      </Link>
      <ActionAreaCard title="Closed Requests" description="2" />
      <ActionAreaCard title="Accepted Requests" description="10" />
      <ActionAreaCard title="Denied Requests" description="0" />
    </Fragment>
  );
}

export default function ActionAreaCard({ title, description }) {
  return (
    <Card style={{ marginTop: "50px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="20"
          image={gradient}
          alt="gradient"
        />
        <CardContent style={{ backgroundImage: gradient }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
