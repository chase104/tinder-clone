import React, { useState, useContext, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import axios from 'axios'
import { AppContext } from '../context.js'
import Modal from '@material-ui/core/Modal';
import './login.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  const [modalState, setModalState] = useState(false)



  const { setState } = useContext(AppContext)

  const classes = useStyles()

  const closeModal = () => {
    setModalState(false)
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })

  }
  const handleGuestClick = async () => {
    await axios({
      method: "POST",
      data: {
        email: "c@c",
        password: "c"
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

  const modalMessage = (
    <div className="modal-container">
      <div className="modal-title">App Options</div>
      <div className="columns">
        <div className="column-one">
          <div className="top-row">
            <div className="one">1</div>
            <div className="column-title">Login</div>
          </div>
          <div className="column-content">
            <div className="title">
              <div>Email:</div>
              <div>Password:</div>
            </div>
            <div className="content">
              <div>email@email.com</div>
              <div>password</div>
            </div>
          </div>
        </div>
        <div className="column-two">
          <div className="top-row">
            <div className="one">2</div>
            <div className="column-title">Sign up</div>
          </div>
          <div className="column-content">
            <ExitToAppIcon className="sign-in" />
          </div>
        </div>     
       </div>
    </div>
  )

  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <div className={classes.inputContainer}>
      <TextField variant="outlined" id="email" label="email" className={classes.input} onChange={(e) => handleChange(e)}></TextField>
      <TextField variant="outlined" id="password" label="password" className={classes.input} onChange={(e) => handleChange(e)}></TextField>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleSubmit()}>Login</Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleGuestClick()}>Use Guest Account</Button>
      </div>
      <Modal
      open={modalState}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableScrollLock={true}
      >
      {
        modalMessage
      }
      </Modal>
    </div>
  )
}

export default Login
