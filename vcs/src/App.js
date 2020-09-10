import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js'
import Register from './components/Register'
import Login from './components/Login'
import Repository from './components/RepositoryPage'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div >
       <Navbar/>
      <header >
       
        <Repository/>
      </header>
      
    </div>
    </Router>
  );
}

export default App;
