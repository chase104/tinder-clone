import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'



 const LoggedOutRoute = ({component: Component, ...rest}) => {

   const [finished, setFinished] = useState(false)
   const [check, setCheck] = useState(null)



  const checker = async () => {

    const axiosCheck = await axios({
        method: "GET",
        url: "/check"
      })
      console.log(axiosCheck);
      console.log(axiosCheck.data.user);
      if (axiosCheck.data.user === false){
        setCheck(true)
      } else{
        setCheck(false)
      }
      setFinished(true)
  }
  checker()

  if (finished) {
    return(
      <Route {...rest}
      render={(props) => {
        if (check) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/home" />
        }
      }
      }

      />
     )
  } else {
    return null
  }



 }


export default LoggedOutRoute
