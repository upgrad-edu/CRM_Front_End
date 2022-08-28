import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Fragment, useEffect, useState } from "react";

export default function Popup({
  openLogin,
  handleLoginClose,
  type,
  selectedTicket,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userTypes, setUserTypes] = useState("");
  console.log(selectedTicket);
  useEffect(() => {
    if (selectedTicket != null) {
      setTitle(selectedTicket.title);
      setDescription(selectedTicket.description);
    }
  }, [selectedTicket]);

  return (
    <Dialog
      open={openLogin}
      onClose={() => {
        setIsRegister(false);
        setTitle('');
        setDescription('');
        setEmail('');
        setName('');
        setPassword('');
        setUserId('');
        handleLoginClose({ actionType: "close" });
      }}
    >
      {type === "loginRegister" && (
        <Fragment>
          <DialogTitle>Login/Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To do any operations please Login or Register
            </DialogContentText>
            <Box component="form" autoComplete="off">
              {isRegister && 
                <TextField
                  autoFocus
                  error={name === ""}
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              }
               
                <TextField
                  autoFocus
                  required
                  error={userId === ""}
                  margin="dense"
                  id="userId"
                  label="User Id"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(event) => setUserId(event.target.value)}
                />
              
              {isRegister && <TextField
                autoFocus
                required
                error={email === ""}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(event) => setEmail(event.target.value)}
              />}
              <TextField
                autoFocus
                required
                error={password === ""}
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(event) => setPassword(event.target.value)}
              />
            {isRegister &&  <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(event)=>{setUserTypes(event.target.value)}}
      >
        <FormControlLabel value="ENGINEER" control={<Radio />} label="Engineer" />
        <FormControlLabel value="CUSTOMER" control={<Radio />} label="Customer" />
        <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
      </RadioGroup>
    </FormControl>}
    <br></br>
              {isRegister && (
                <Button
                disabled={userId==="" || email==="" || name==="" || password === "" || userTypes === "" }
                  onClick={() => {
                    setIsRegister(false);
                    handleLoginClose({
                      actionType: "register",
                      userId:userId,
                      email: email,
                      password: password,
                      userTypes: userTypes,
                      name:name

                    });
                  }}
                >
                  Register
                </Button>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {!isRegister && <Button
            disabled={userId==="" || password===""}
              onClick={() => {
                setIsRegister(false);
                handleLoginClose({
                  actionType: "login",
                  userId: userId,
                  password: password,
                });
              }}
            >
              Login
            </Button>}
            {!isRegister && (
              <Button onClick={() => setIsRegister(true)}>Register</Button>
            )}
          </DialogActions>
        </Fragment>
      )}

      {(type === "createTicket" || type === "updateTicket")  && (
          <Fragment>
            <DialogTitle>
              {" "}
              {type === "createTicket" ? "Create" : "Update"} Ticket
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {type === "createTicket" ? "Create New" : "Update"} Ticket
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                value={title}
                variant="standard"
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={description}
                variant="standard"
                multiline
                onChange={(event) => setDescription(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
              disabled={title==="" || description===""}
                onClick={() =>
                  handleLoginClose({
                    actionType:
                      type === "createTicket" ? "createTicket" : "updateTicket",
                    title: title,
                    description: description,
                  })
                }
              >
                {type === "createTicket" ? "Create" : "Update"}
              </Button>
            </DialogActions>
          </Fragment>
        )}
    </Dialog>
  );
}
