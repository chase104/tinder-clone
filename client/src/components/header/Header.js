import React, { useState, useEffect, useContext } from 'react'
import "./Header.css"
import {Person as PersonIcon, Forum as ForumIcon, ArrowBackIos as BackArrowIcon} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import logo from '../../images/find_me_logo.jpg'
import axios from 'axios'
import { AppContext } from '../../context.js'

function Header(props) {
  const [buttonState, setButtonState] = useState(false);
  const { state, setState } = useContext(AppContext)
  const [loggedIn, setLoggedIn] = useState(state.loggedIn);

  useEffect(() => {
    console.log(state.loggedIn);
    setLoggedIn(state.loggedIn)
  }, [state])
  const buttonClick = () => {
    setButtonState(!buttonState)
  }

  const handleLogout = () => {
    axios({
      method: "GET",
      url: "/logout"
    }).then((res) => {

    })
  }

  return (
    <div className="header">
    {props.history.location.pathname == "/chat" ?
    <Link to="/">
      <IconButton>
        <BackArrowIcon fontSize="large" className="header_icon"/>
      </IconButton>
    </Link>
     :
     props.history.location.pathname == "/" ?
    <Link to="/account">
      <IconButton>
        <PersonIcon fontSize="large" className="header_icon"/>
      </IconButton>
    </Link>
    :
    <Link to="/chat">
      <IconButton>
        <BackArrowIcon fontSize="large" className="header_icon"/>
      </IconButton>
    </Link>
  }

      <Link to="/">
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

      {
        loggedIn ?
        <div style={{display: "flex"}}>
          <Link className={buttonState == false ? "button-holder" : "button-holder darker"} onMouseDown={() => buttonClick()} onMouseUp={() => buttonClick()} onClick={() => handleLogout()}>
            <div className="button">Logout</div>
          </Link>
          <Link to="/chat">
            <IconButton>
              <ForumIcon fontSize="large" className="header_icon"/>
            </IconButton>
          </Link>
        </div>

        :
        <Link to="/login" className={buttonState == false ? "button-holder" : "button-holder darker"} onMouseDown={() => buttonClick()} onMouseUp={() => buttonClick()}>
          <div className="button">Login</div>
        </Link>
      }



    </div>
  )
}

export default Header
