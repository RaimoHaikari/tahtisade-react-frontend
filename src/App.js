import React, {Component} from 'react';

import './components/FontawesomeIcons';

import './App.css';

// import './styles/cardStyles.css';

import About from './components/About';

import Movies from './layout/Movies/Movies';
import Genres from './layout/Genres'
import Elokuva from './components/Elokuva';


import FrontPage from './layout/FrontPage';
import Toolbar from './components/Toolbar/Toolbar';
import Navigation from './components/Navbar'


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SlideDrawer from './components/SlideDrawer/SlideDrawer';
import Backdrop from './components/Backdrop/Backdrop';


class App extends Component {

  state = {
    slideDrawerOpen: false
  }

  backdropClickHandler = () => {
    this.setState({slideDrawerOpen: false})
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {slideDrawerOpen: !prevState.slideDrawerOpen}
    })
  }

  render() {

    let backDrop;

    
    if(this.state.slideDrawerOpen){
      backDrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    /*
     * main style: marginTop asetuksen tulee vastata .toolbar komponentin korkeutta

          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SlideDrawer show={this.state.slideDrawerOpen}/>
          {backDrop}

     */
    return (
      <Router>
        <div style={{height: '100%'}}>
          <Navigation />
          <div style={{marginTop: '100px'}}>
            <Switch>
              <Route path="/" exact component={FrontPage} />
              <Route path="/about" component={About} />
              <Route path="/elokuvat" exact component={Movies} />
              <Route path="/elokuvat/:id" component={Elokuva} />
              <Route path="/genret" exact component={Genres} />
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}

export default App;
