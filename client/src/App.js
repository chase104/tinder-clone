import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// providers
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { AppProvider } from './context.js'
//  pages

import Header from './components/header/Header.js'
import Dashboard from './pages/Dashboard'
import ChatsPage from './pages/ChatsPage'
import IndividualChat from './components/individual-chat/IndividualChat.js'
import NewUser from './pages/NewUser'
import Login from './pages/Login'

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
          <Route path="/" component={Header} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/chat" component={ChatsPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/chat/:person" component={IndividualChat} />
            <Route exact path="/newuser" component={NewUser} />
          </Switch>
        </AppProvider>
        </ThemeProvider>

      </Router>
    </div>
  );
}

export default App;
