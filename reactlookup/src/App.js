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
import { styled } from '@material-ui/core/styles';
import tyro from './static/images/tyro-32.png';
const ComponentGrid = styled(Grid)({
  width: '97.5%',
  margin: '0 auto',
});

const Tyro = styled(Avatar)({
  width: '32px',
  height: '32px',
});

function App() {
  return (
    <Router>
      <div className="App">
          <AppBar position="static">
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
            {/* This is where the content is, shouldn't it have spacing? */}
              <Switch>
                <Route exact path='/'>
                  <CommandsPage/>
                </Route>
                <Route path="/sbsearch">
                  <SoulBreakSearch/>
                </Route>
                <Route path='/tutorial'>
                  <Tutorial/>
                </Route>
              </Switch>
        </ComponentGrid>
      </div>
      
    </Router>
  );
}

export default App;
