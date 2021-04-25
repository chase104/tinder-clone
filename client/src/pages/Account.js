import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "5vh 5vw 0 5vw",
    display: "flex",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image:{
    maxHeight: "60vh",
    borderRadius: "114px"
  },

}));

const Account = () => {
  const classes = useStyles()

  const [accountState, setAccountState] = useState(false)
  const [image, setImage] = useState(false)
  const [id, setId] = useState(false)
  useEffect(() => {
    axios({
      method: "GET",
      url: "/get-account"
    }).then((res) => {
      console.log(res);
      setAccountState({
        email: res.data.email,
        name: res.data.name
      })
      setId(res.data._id)
    })
  }, [])

  return (
    <div>
      { accountState ?
        <div className={classes.container}>
        <div>
          {
            id ? <img src={`/get-image/${id}`} className={classes.image}/> : null
          }
        </div>
          {
            accountState ? <div style={{padding: "20px", background: "lightgrey", height: "fit-content", marginLeft: "8px"}}>
          {
            Object.keys(accountState).map((key) => {
              return (
                <div style={{display: "flex", alignItems: "center", height: "fit-content"}}>
                  <div style={{fontSize: "20px", fontWeight: "bold", marginRight: "12px"}}>{key}:</div>
                  <div>{accountState[key]}</div>
                </div>
              )
            })
          }
            </div>
            : null
          }
        </div>
        :
        <div className="loader">
          {
              <Loader
              type="TailSpin"
              color="#004aad"
              className="loader-item"
              height={200}
              width={200}
              timeout={100000}
              />
          }
        </div>
      }

    </div>
  )
}

export default Account
