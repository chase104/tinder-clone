import React, { useState, useContext } from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import axios from 'axios'
import { AppContext } from '../context.js'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "5vh 10vw 5vh 10vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  input:{
    marginTop: "8px",
    width: "fit-content"
  },
  inputContainer:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginTop:"8px",
    color: "white"
  }
}));
const Login = (props) => {

  const [formState, setFormState] = useState({})

  const { setState } = useContext(AppContext)

  const classes = useStyles()

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })

  }
  const handleSubmit = async () => {
    await axios({
      method: "POST",
      data: {
        email: formState.email,
        password: formState.password
      },
      withCredentials: true,
      url: "/login"
    }).then((res) => {
      if (res.data.loggedIn === true) {
        setState({
          loggedIn: true
        })
        props.history.push("/")
      } else {
        console.log('nope...');
      }
    })
  }

  const checkUser = () => {
    axios({
      method: "GET",
      url: "/check"
    }).then((res) => {
      console.log(res.data);
    })
  }
  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <div className={classes.inputContainer}>
      <TextField variant="outlined" id="email" label="email" className={classes.input} onChange={(e) => handleChange(e)}></TextField>
      <TextField variant="outlined" id="password" label="password" className={classes.input} onChange={(e) => handleChange(e)}></TextField>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleSubmit()}>Login</Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => checkUser()}>check</Button>
      </div>
    </div>
  )
}

export default Login
