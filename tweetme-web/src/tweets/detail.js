import React, {useState} from 'react'
import { ActionButton } from './buttons'

export function TweetParent (props) {
    const {tweet} = props
    return tweet.parent ? <div className='row'>
    <div className='col-11 mx-auto p-3 border rounded'>
    <p className='mb-0 text-muted small'>Retweet</p>
    <Tweet hideActions   clasName={' '} tweet={tweet.parent}/></div>
    </div> : null
}
  


export  function Tweet (props) {
    const {tweet,  didRetweet, hideActions} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    const path = window.location.pathname
   
    const math = path.match(/(?<tweetid>\d+)/)
    const urlId = math ? math.groups.tweetid : -1
    const isDetail = `${tweet.id}` === `${urlId}`


    const handleClick = (event) =>{
      event.preventDefault()
      window.location.href = `/${tweet.id}`
    }
    
    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200){
          setActionTweet(newActionTweet)
        } else if (status === 201) {
        if (didRetweet){
            didRetweet(newActionTweet)
          }
        }
    }

    return <div className= {className} >
            <div>
            <p>  {tweet.id} - {tweet.content}</p>
            <TweetParent tweet = {tweet} />
            </div>
              <div className='btn btn-group' >
              {(actionTweet && hideActions !== true) && <React.Fragment>
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "like",display : "Likes"}} />
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "unlike",display : "Unlike"}} />
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "retweet",display : "Retweet"}} />
              </React.Fragment>
              }
              </div>
              {
                isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleClick}>View</button>
              }

              
    </div>
   }