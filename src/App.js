import React, {Component} from 'react';

import './App.css';

// import './styles/cardStyles.css';

import About from './components/About';
import Nav from './components/Nav';
//import Shop from './Shop';
import Home from './components/Home';
import Elokuvat from './components/Elokuvat';
import Elokuva from './components/Elokuva';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/*
 * Auttasko jos tallettas
 */
class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/elokuvat" exact component={Elokuvat} />
            <Route path="/elokuvat/:id" component={Elokuva} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
