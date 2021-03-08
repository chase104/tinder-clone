import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AppContext = createContext(null)

export function AppProvider ({children}) {

  const [state, setState] = useState({
    loggedIn: null
  })
  if (state.loggedIn === null) {
    axios({
      method: "GET",
      url: "/check"
    }).then((res) => {
      setState({
        loggedIn: res
      })
    })
  }
  return (
    <AppContext.Provider
    value={{state, setState}}
    >
    {children}
    </AppContext.Provider>
  )
}
