import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import './components/SoulBreakSearch';
import SoulBreakSearch from './components/SoulBreakSearch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Tutorial from './components/Tutorial';
import AppBarLink from './components/AppBarLink';
import CommandsPage from './components/CommandsPage';
import Header from './components/Header';
import { Grid } from '@material-ui/core';
import { styled, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import tyro from './static/images/tyro-32.png';
const ComponentGrid = styled(Grid)({
  width: '97.5%',
  margin: '0 auto',
});

const Tyro = styled(Avatar)({
  width: '32px',
  height: '32px',
});
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#398CBD'
    },
  },
});
// const FFRKBar = styled(AppBar)({
//   backgroundColor: '#398CBD',
// });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="static" color='primary'>
              <Toolbar>
                <Tyro src={tyro}/>
                <AppBarLink text='Home' route='/' />
                <AppBarLink text='SB Search' route='/sbsearch'/>
                <AppBarLink text='Tutorial' route='/tutorial'/>
                <AppBarLink text='Donate' href='https://www.paypal.me/kramerajeffrey'/>
              </Toolbar>
          </AppBar>
          <ComponentGrid container>
              <Header />
                <Switch>
                  <Route exact path='/'>
                    <CommandsPage/>
                  </Route>
                  <Route exact path="/sbsearch">
                    <SoulBreakSearch/>
                  </Route>
                  <Route exact path='/tutorial'>
                    <Tutorial/>
                  </Route>
                </Switch>
          </ComponentGrid>
        </div>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
