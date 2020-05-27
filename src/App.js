import React, {Component} from 'react';
import './App.css';

import About from './components/About';
import Nav from './components/Nav';
//import Shop from './Shop';
import Home from './components/Home';
//import ItemDetail from './ItemDetail';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
