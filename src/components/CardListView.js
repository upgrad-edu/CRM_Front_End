import React, { Fragment } from "react";
import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import { updateTicketById, updateUserInfo } from "../constants";

export default function ImgMediaCard({
  type,
  data,
  index,
  handlePopupOpen,
  setSelectedTicketData,
}) {
  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));

  const updateTicketorUser = (status) => {
    if (type === "user") {
      const userData = {
        name: data.name,
        userId: data.userId,
        email: data.email,
        userTypes: data.userTypes,
        userStatus: status,
      };
      fetch(updateUserInfo + `${data.userId}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userDataFromStorage?.accessToken,
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (type === "ticket") {
      const ticketData = {
        title: data.title,
        description: data.description,
        ticketPriority: data.ticketPriority,
        status: status === "APPROVED" ? "OPEN" : "CLOSED",
        assignee: userDataFromStorage.userId,
      };
      fetch(updateTicketById + `${data.id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userDataFromStorage?.accessToken,
        },
        body: JSON.stringify(ticketData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Card key={data.id}>
      <CardHeader
        avatar={<Avatar aria-label={data.id}>{index + 1}</Avatar>}
        action={
          <Fragment>
            {((type === "user" && data.userStatus === "PENDING") ||
              (type === "ticket" && data.assignee === "")) && (
              <IconButton
                aria-label="settings"
                //disabled={(type==="user" && data.userStatus==="APPROVED") || (type==="ticket" && data.assignee)}
                onClick={() => updateTicketorUser("APPROVED")}
              >
                <Done />
              </IconButton>
            )}
            {((type === "user" && data.userStatus === "PENDING") ||
              (type === "ticket" && data.assignee === "")) && (
              <IconButton
                aria-label="settings"
                // disabled={(type==="user" && data.userStatus==="APPROVED") || (type==="ticket" && data.assignee)}
                onClick={() => updateTicketorUser("DECLINED")}
              >
                <Close />
              </IconButton>
            )}
          </Fragment>
        }
        title={data.title || data.name}
        subheader={
          <div
            onClick={() => {
              if (type === "ticket") {
                setSelectedTicketData(data);
                handlePopupOpen("updateTicket");
              }
            }}
          >
            <p
              style={{
                maxWidth: "60vw",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.description || data.email}
            </p>
            <p>Status: {data.status || data.userStatus}</p>
            {data?.reporter && (
              <span>Reporter: {data.reporter}&nbsp;&nbsp;&nbsp;</span>
            )}
            {data?.assignee && <span>Assignee: {data.assignee}</span>}
          </div>
        }
      />
    </Card>
  );
}
