import React from 'react';
import './App.css';
import './components/SoulBreakSearch';
import SoulBreakSearch from './components/SoulBreakSearch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
function App() {
  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              FFRK Lookup
            </Typography>
          </Toolbar>
        </AppBar>
        {/* This is where the content is, shouldn't it have spacing? */}
        <Grid container xs={12}> 
          <SoulBreakSearch/>
        </Grid>
    </div>
  );
}

export default App;
