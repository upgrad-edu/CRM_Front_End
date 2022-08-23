import { Dialog,DialogActions,DialogTitle,DialogContentText, DialogContent } from "@mui/material";
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";

export default function LoginPopup({ openLogin, handleLoginClose }) {
  return (
    <Dialog open={openLogin} onClose={handleLoginClose}>
      <DialogTitle>Login/Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To do any operations please Login or Register
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
         <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginClose}>Login</Button>
        <Button onClick={handleLoginClose}>Register</Button>
      </DialogActions>
    </Dialog>
  );
}
