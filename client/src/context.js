import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AppContext = createContext(null)

export function AppProvider ({children}) {

  const [state, setState] = useState({
    loggedIn: null
  })

  useEffect(() => {
    axios({
      method: "GET",
      url: "check"
    }).then((res) => {
      console.log(res);
      if (res.data.user === false){
        setState({
          loggedIn: false
        })
      } else {
        setState({
          loggedIn: true
        })
      }
    })
  }, [window.location])

  return (
    <AppContext.Provider
    value={{state, setState}}
    >
    {children}
    </AppContext.Provider>
  )
}
