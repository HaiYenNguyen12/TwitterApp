import React from 'react'

import logo from './logo.svg';
import './App.css';
import {TweetList} from '.tweets'

function loadingTweet(callback){
  const axemple_ajax = new XMLHttpRequest()
  const method = 'GET'
  const url = 'http://localhost:8000/api/tweets'
  const responseType = 'json'

  axemple_ajax.responseType = responseType
  axemple_ajax.open(method,url)
  axemple_ajax.onload = function() {
        callback(axemple_ajax.response, axemple_ajax.status)
      }
  axemple_ajax.send()

}




function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {}
        </div>
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
