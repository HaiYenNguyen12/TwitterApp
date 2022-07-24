import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TweetComponents } from './tweets';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('hihi'));
if (root){
  root.render(

    <TweetComponents/>

);
}

const rootme = ReactDOM.createRoot(document.getElementById('rootme'));
if (rootme) {
  rootme.render(

    <App/>

);
}



// const tweets = ReactDOM.createRoot(document.getElementById('root');
// tweets.render(

//     <TweetComponents />
 
// );

// const appEl = document.getElementById("root")
// if(appEl){
//   ReactDOM.render(<App />, appEl);
// }

const tweetsEl = document.getElementById("hehe")
if (tweetsEl){
  console.log("hihi")
  ReactDOM.render(<TweetComponents />, tweetsEl);
  console.log("bye")
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
