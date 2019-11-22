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
import PublicMap from './components/openlayers'
import axios from 'axios'
import qs from "qs";
function App() {

  const domain = 'http://localhost/APITest/api'
  // const domain = 'https://localhost:44397/api'

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // axios.post(domain + '/login', {
    //   data: {
    //     id: 1,
    //     cmd: "12355555"
    //   },
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   // headers: { "Accept": "application/json; odata=nometadata" },
    // })
    // .then(function (response) {
    //   console.log(response.data)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    let data= {
      id: 87,
      cmd: "e04!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    }
    // axios({
    //   method: 'post',
    //   url: domain + '/login',
    //   // data: qs.stringify(data)
    //   data: JSON.stringify(data)
    // })
    // .then((res) => {
    //   console.log("axios:",res.data)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })

    // axios.post(domain + '/login', data)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // fetch(domain + '/login', {
    //   method: 'POST',
    //   // headers 加入 json 格式
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // body 將 json 轉字串送出
    //   body: JSON.stringify({
    //     id: 87,
    //     cmd: "e04!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    //   })
    // })
    // .then((response) => {
    //     // 這裡會得到一個 ReadableStream 的物件
    //     console.log('fetch:',response);
    //     // 可以透過 blob(), json(), text() 轉成可用的資訊
    //     return response.json(); 
    //   }).then((jsonData) => {
    //     console.log(jsonData);
    //   }).catch((err) => {
    //     console.log('錯誤:', err);
    // });
  });

  return (
    <Router basename="/build" >
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
              <Route path="/Map" exact component={PublicMap} />
              <Route path="/Login" component={Login} />
              <Route path="/DataTable1" component={DataTable} />
              <Route path="/DataTable" component={DataTablePanel} />
              <Route component={NoMatch} />
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

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
