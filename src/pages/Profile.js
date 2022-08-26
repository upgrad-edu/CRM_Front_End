import { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { Fragment } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { KeyboardArrowRight } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userBasedonUserId } from "../constants";

export function Profile() {
    const userIdfromStorage = localStorage.getItem('userId');
const [UserData,setUserData] = useState(null);
    useEffect(()=>{
        if(userIdfromStorage !=null){
        fetch(userBasedonUserId+`/${userIdfromStorage}`)
        .then((res) => res.json())
        .then(
          (result) => {
            // if(result.length>0)
            // setTicketsData(result)
            // else
            setUserData(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
           setUserData(null);
           alert('Some Error while fetching the details');
          }
        );}
        else
        alert('please login to fetch details')

    },[])

    const [formValues, setFormValues] = useState({
        name:{
          value:'',
          error:false,
          errorMessage:'You must enter a name'
        },
        userId:{
          value:'',
          error:false,
          errorMessage:'You must enter an userId'
        },
        email:{
          value:'',
          error:false,
          errorMessage:'You must enter valid email'
        },
        userType:{
          value:'ADMIN',
          error:false,
          errorMessage:'You must choose your user type'
        }
      })

      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
          ...formValues,
          [name]:{
            ...formValues[name],
            value
          }
        })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
    
        const formFields = Object.keys(formValues);
        let newFormValues = {...formValues}
    
        for (let index = 0; index < formFields.length; index++) {
          const currentField = formFields[index];
          const currentValue = formValues[currentField].value;
    
          if(currentValue === ''){
            newFormValues = {
              ...newFormValues,
              [currentField]:{
                ...newFormValues[currentField],
                error:true
              }
            }
          }
    
        }
    
        setFormValues(newFormValues)
      }


  return (
    <Fragment >
      <CssBaseline />
    <Box style={{"padding-top":"50px"}} >
    <Container  >
      <form noValidate onSubmit={handleSubmit} >
          <Typography 
            variant="h6">
             Hi {}
          </Typography>

          <TextField 
          style={{"padding-top":"50px"}}
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
          style={{"padding-top":"50px"}}
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
            helperText={formValues.userId.error && formValues.userId.errorMessage}
            />

          <TextField 
          style={{"padding-top":"50px"}}
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
            helperText={formValues.email.error && formValues.email.errorMessage}
          />

          <FormControl >
            <FormLabel>User Type</FormLabel>
            <RadioGroup name="usertype" value={formValues.userType.value} onChange={handleChange}
            style={{"padding-top":"50px"}} >
              <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
              <FormControlLabel value="CUSTOMER" control={<Radio />} label="Customer" />
              <FormControlLabel value="ENGINEER" control={<Radio />} label="Engineer" />
            </RadioGroup>
          </FormControl>
            <br></br>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
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
