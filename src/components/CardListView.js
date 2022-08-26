import React, { Fragment } from "react";
import { Card, CardHeader, Avatar, IconButton ,Checkbox} from "@mui/material";
import { Done } from "@mui/icons-material";


export default function ImgMediaCard({ data,index }) {
  return (
    <Card key={data.id}>
        
      <CardHeader
        avatar={<Avatar aria-label={data.id}>{index+1}</Avatar>}
        action={
            <Fragment>
          <IconButton aria-label="settings" disabled={data.status==="CLOSED"}>
            <Done/>
          </IconButton>
          <Checkbox />
          </Fragment>
        }
        title={data.title || data.name}
        subheader={<div><p>{data.description || data.email}</p><p>Status: {data.status || data.userStatus }</p></div>}
      />
    </Card>
  );
}
