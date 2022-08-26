import { Dialog,DialogActions,DialogTitle,DialogContentText, DialogContent, Box } from "@mui/material";
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import { Fragment, useState } from "react";

export default function Popup({ openLogin, handleLoginClose, type }) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userId,setUserId] = useState('');
  const [isRegister,setIsRegister] = useState(false);
  const [name,setName] = useState('');
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  return (
    <Dialog open={openLogin} onClose={()=>{setIsRegister(false); handleLoginClose({actionType:"close"})}}>
     { type=="loginRegister" && <Fragment><DialogTitle>Login/Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To do any operations please Login or Register
        </DialogContentText>
        <Box component="form"  autoComplete="off">
       {isRegister && 
       <TextField
          autoFocus
          error={name==''}
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          required
          onChange={(event)=>setName(event.target.value)}
        />}
        {isRegister&&
        <TextField
          autoFocus
          required
          error={userId==''}
          margin="dense"
          id="userId"
          label="User Id"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event)=>setUserId(event.target.value)}
        />}
        <TextField
          autoFocus
          required
          error={email==''}
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={(event)=>setEmail(event.target.value)}
        />
         <TextField
          autoFocus
          required
          error={password==''}
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(event)=>setPassword(event.target.value)}
        />
        {isRegister && <Button onClick={()=>{setIsRegister(false); handleLoginClose({actionType:"register",email:email,password:password})}}>Register</Button>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{setIsRegister(false); handleLoginClose({actionType:"login",email:email,password:password})}}>Login</Button>
        {!isRegister && <Button onClick={()=>setIsRegister(true)}>Register</Button>}
      </DialogActions>
      </Fragment>}
      { type=="createTicket" && <Fragment><DialogTitle>Create Ticket</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create New Ticket
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="title"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event)=>setTitle(event.target.value)}
        />
         <TextField
          autoFocus
          margin="dense"
          id="description"
          label="description"
          type="text"
          fullWidth
          variant="standard"
          multiline
          onChange={(event)=>setDescription(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleLoginClose({actionType:"createTicket",title:title,description:description})}>Create</Button>
      </DialogActions>
      </Fragment>}
    </Dialog>
  );
}
