import React, { useState, useEffect, useContext } from 'react'
import "./Header.css"
import {Person as PersonIcon, Forum as ForumIcon, ArrowBackIos as BackArrowIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import logo from '../../images/find_me_logo.jpg'
import axios from 'axios'
import { AppContext } from '../../context.js'
import Grid from '@material-ui/core/Grid';

function Header(props) {
  const [buttonStateOne, setButtonStateOne] = useState(false);
  const [buttonStateTwo, setButtonStateTwo] = useState(false);
  const { state, setState } = useContext(AppContext)
  const [loggedIn, setLoggedIn] = useState(state.loggedIn);

  useEffect(() => {
    console.log(state.loggedIn);
    setLoggedIn(state.loggedIn)
  }, [state])
  const buttonClick = (number) => {
    if (number == "one") {
      setButtonStateOne(!buttonStateOne)
    } else {
      setButtonStateTwo(!buttonStateTwo)
    }
  }

  const handleLogout = () => {
    axios({
      method: "GET",
      url: "/logout"
    }).then((res) => {
      if (res.status === 200) {
        setState({
          loggedIn: false
        })
        props.history.push("/login")
      }
    })
  }

  const returnFirst = () => {
    if (loggedIn) {
      let returnValue
      switch(props.history.location.pathname){
        case "/chat":
        returnValue = <Link to="/home">
          <IconButton>
            <BackArrowIcon fontSize="large" className="header_icon"/>
          </IconButton>
        </Link>
        break;
        case "/home":
        returnValue = <Link to="/account">
          <IconButton>
            <PersonIcon fontSize="large" className="header_icon"/>
          </IconButton>
        </Link>
        break;
        default:
        returnValue = <Link to="/home">
          <IconButton>
            <BackArrowIcon fontSize="large" className="header_icon"/>
          </IconButton>
        </Link>
      }
      return returnValue
    }
  }



  return (
    <Grid container className="header">
      <Grid item xs={4} sm={4} md={4}>
        {loggedIn ? returnFirst() : <div></div>}
      </Grid>
      <Grid item xs={4} sm={4} md={4} className="center-grid">
        <Link to="/home">
          <div className="logo-container">
            <div className="logo-title">Find</div>
            <img
            className="header__logo"
            src={logo}
            alt="Tinder Logo"
            />
            <div className="logo-title">Me</div>
          </div>
        </Link>
      </Grid>
      <Grid item xs={4} sm={4} md={4} className="button-container">
      {
        loggedIn === null ? <div></div> :
        loggedIn === true ?
        <div style={{display: "flex"}}>
          <Link className={buttonStateOne == false ? "button-holder" : "button-holder darker"} onMouseDown={() => buttonClick("one")} onMouseUp={() => buttonClick()} onClick={() => handleLogout()}>
            <div className="button">Logout</div>
          </Link>
          <Link to="/chats">
            <IconButton>
              <ForumIcon fontSize="large" className="header_icon"/>
            </IconButton>
          </Link>
        </div>
        :
        <div style={{display: "flex", height: "100%"}} className="button-container">
          <Link to="/newuser" className={buttonStateOne == false ? "button-holder" : "button-holder darker"} onMouseDown={() => buttonClick("one")} onMouseUp={() => buttonClick("one")}>
            <div className="button">SignUp</div>
          </Link>
          <Link to="/login" className={buttonStateTwo == false ? "button-holder" : "button-holder darker"} onMouseDown={() => buttonClick("two")} onMouseUp={() => buttonClick()}>
            <div className="button">Login</div>
          </Link>
        </div>

      }
      </Grid>
    </Grid>
  )
}

export default Header
