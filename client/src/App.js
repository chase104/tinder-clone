import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

// providers
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { AppProvider } from './context.js'
//  pages

import LoggedInRoute from './routes/LoggedInRoute.js'
import LoggedOutRoute from './routes/LoggedOutRoute.js'
import Header from './components/header/Header.js'
import Dashboard from './pages/Dashboard'
import ChatsPage from './pages/ChatsPage'
import IndividualChat from './components/individual-chat/IndividualChat.js'
import NewUser from './pages/NewUser'
import Login from './pages/Login'
import Account from './pages/Account'



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#004aad',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#006eff',
      main: '#004aad',
      dark: '#003780',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    //Bem class Naming convention
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
        <AppProvider>
          <Route component={Header} />
          <Switch>
            <LoggedOutRoute exact path="/">
                <Redirect to="/login" />
            </LoggedOutRoute>
            <LoggedInRoute path="/home" component={Dashboard} />
            <LoggedInRoute path="/chats" component={ChatsPage} />
            <LoggedInRoute path="/account" component={Account} />
            <LoggedInRoute path="/chat/:person" component={IndividualChat} />
            <LoggedOutRoute path="/login" component={Login} />
            <LoggedOutRoute path="/newuser" component={NewUser} />
          </Switch>
        </AppProvider>
        </ThemeProvider>

      </Router>
    </div>
  );
}

export default App;
