import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FeedComponent, TweetComponents, TweetDetailComponent } from './tweets';
import reportWebVitals from './reportWebVitals';
// const e = React.createElement()
// const root = document.getElementById('hihi');
// if (root){
//   ReactDOM.render(
//     e(TweetComponents, root.dataset),root
//     // <TweetComponents/>
// );
// }

const e = React.createElement

const feedEl = document.getElementById("feed");
if (feedEl) {
    // ReactDOM.render(<TweetsComponent />, tweetsEl);
    ReactDOM.render(
        e(FeedComponent, feedEl.dataset),feedEl);
}


const detailEl = document.querySelectorAll(".tweetme-2-detail")

detailEl.forEach(container=>{
  ReactDOM.render(
    e(TweetDetailComponent, container.dataset), container);
});

const root = document.getElementById("hihi");
if (root) {
    // ReactDOM.render(<TweetsComponent />, tweetsEl);
    ReactDOM.render(
        e(TweetComponents, root.dataset),root);
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

// const tweetsEl = document.getElementById("hehe")
// if (tweetsEl){
//   console.log("hihi")
//   ReactDOM.render(<TweetComponents />, tweetsEl);
//   console.log("bye")
// }


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
