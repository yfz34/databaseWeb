import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator'
import Nav from './components/nav/nav.jsx'
import Login from './components/login/login'
import Footer from './components/footer/footer'
import DataTable from './components/datatable/datatable_1'
import DataTablePanel from './components/datatable/panel'
import Snackbar from './components/snackbar/snackbar'

import axios from 'axios'
function App() {

  const domain = 'http://localhost/APITest/api'
  // const domain = 'https://localhost:44397/api'

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    axios.put(domain + '/data', {
      params: {
        id: 1,
      },
      // headers: { "Accept": "application/json; odata=nometadata" },
    })
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  return (
    <Router>
      {/* <div id="id_wrapper"> */}
        <LoadingIndicator/>
        <Snackbar />
        {/* <div id="id_header"> */}
          <Nav />
          
        {/* </div> */}
        {/* <div id="id_content"> */}
          <div className="App">
            <Switch>
              <Route path="/" exact component={Logo} />
              <Route path="/Login" component={Login} />
              <Route path="/DataTable1" component={DataTable} />
              <Route path="/DataTable" component={DataTablePanel} />
            </Switch>
          </div>
        {/* </div> */}
        {/* <div id="id_footer"> */}
          <Footer />
        {/* </div> */}
      {/* </div> */}
    </Router>
  );
}

function Logo(){
  return (
    <div className="App">  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
