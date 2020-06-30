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
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tutorial from './components/Tutorial';
import AppBarLink from './components/AppBarLink';

function App() {
  return (
    <Router>
      <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                FFRK Lookup
              </Typography>
              <AppBarLink text='SB Search' route='/'/>
              <AppBarLink text='Tutorial' route='/tutorial'/>
              <AppBarLink text='Donate' href='https://www.paypal.me/kramerajeffrey'/>
            </Toolbar>
          </AppBar>
          {/* This is where the content is, shouldn't it have spacing? */}
          <Switch>
            <Route exact path="/">
              <Grid container spacing={3}>
                <SoulBreakSearch />
              </Grid>
            </Route>
            <Route path='/tutorial'>
              <Tutorial />
            </Route>
          </Switch>
      </div>
      
    </Router>
  );
}

export default App;
