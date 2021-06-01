import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Home from './Home/Home';
import Details from './Details/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/"/>
        {/* Someone is trying to modify existing game */}
        <Details path="/games/:gameId" />
        {/* Someone is trying to add a new game to a list */}
        <Details path="/games/new" /> 
      </Router>
    </div>  
  );
}

export default App;
