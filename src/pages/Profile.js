import { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { Fragment } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { KeyboardArrowRight } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import { updateUserInfo } from "../constants";

export function Profile() {
  const userDataFromStorage = JSON.parse(sessionStorage.getItem("userData"));
  const userIdfromStorage = userDataFromStorage?.userId;
  const [UserData, setUserData] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    setUserData(userDataFromStorage);
    if (userIdfromStorage == null)
      setAlertMessage("please login to fetch details and refresh the page");
    setSnackbarOpen(true);
  }, []);

  const updateProfile = () => {
    if (userDataFromStorage !== null) {
      const profileData = {
        name: formValues.name.value,
        userId: formValues.userId.value,
        email: formValues.email.value,
        userTypes: formValues.userTypes.value,
        userStatus: userDataFromStorage.userStatus,
      };
      fetch(updateUserInfo + `${userIdfromStorage}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userDataFromStorage.accessToken,
        },
        body: JSON.stringify(profileData),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          setAlertMessage(result.message);
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setAlertMessage("Please login first and refresh the page.");
      setSnackbarOpen(true);
    }
  };

  const [formValues, setFormValues] = useState({
    name: {
      value: userDataFromStorage.name,
      error: false,
      errorMessage: "You must enter a name",
    },
    userId: {
      value: userDataFromStorage.userId,
      error: false,
      errorMessage: "You must enter an userId",
    },
    email: {
      value: userDataFromStorage.email,
      error: false,
      errorMessage: "You must enter valid email",
    },
    userTypes: {
      value: userDataFromStorage.userTypes,
      error: false,
      errorMessage: "You must choose your user type",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormValues(newFormValues);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Box style={{ "padding-top": "50px" }}>
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={alertMessage}
        />
        <Container>
          <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h6" style={{ "margin-top": "50px" }}>
              Hi {userDataFromStorage?.name}
            </Typography>

            <TextField
              placeholder="Enter your name"
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              required
              value={formValues.name.value}
              onChange={handleChange}
              error={formValues.name.error}
              helperText={formValues.name.error && formValues.name.errorMessage}
            />

            <TextField
              style={{ "margin-top": "50px" }}
              placeholder="Enter your userId"
              label="User ID"
              name="userId"
              variant="outlined"
              fullWidth
              required
              type="text"
              value={formValues.userId.value}
              onChange={handleChange}
              error={formValues.userId.error}
              helperText={
                formValues.userId.error && formValues.userId.errorMessage
              }
            />

            <TextField
              style={{ "margin-top": "50px" }}
              placeholder="Describe the best tech stack you worked with and you like most?"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              required
              value={formValues.email.value}
              multiline
              rows={4}
              type="email"
              onChange={handleChange}
              error={formValues.email.error}
              helperText={
                formValues.email.error && formValues.email.errorMessage
              }
            />

            <br></br>
            <Button
              disabled={
                formValues.name.value === "" ||
                formValues.userId.value === "" ||
                formValues.email.value === ""
              }
              type="submit"
              variant="outlined"
              color="secondary"
              onClick={updateProfile}
              endIcon={<KeyboardArrowRight />}
            >
              Update
            </Button>
          </form>
        </Container>
      </Box>
    </Fragment>
  );
}
