import React, { Fragment } from "react";
import { Card, CardHeader, Avatar, IconButton ,Checkbox} from "@mui/material";
import { Done } from "@mui/icons-material";


export default function ImgMediaCard({ data }) {
  return (
    <Card key={data.id}>
        
      <CardHeader
        avatar={<Avatar aria-label={data.id}>{data.id}</Avatar>}
        action={
            <Fragment>
          <IconButton aria-label="settings">
            <Done/>
          </IconButton>
          <Checkbox />
          </Fragment>
        }
        title={data.name}
        subheader={data.description}
      />
    </Card>
  );
}
