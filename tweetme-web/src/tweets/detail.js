import React, {useState} from 'react'
import { ActionButton } from './buttons'
import { UserDisplay,UserPicture} from '../profile'

export function TweetParent (props) {
    const {tweet} = props
    return tweet.parent ? <Tweet isRetweet retweeter={props.retweeter} hideActions className={' '} tweet={tweet.parent} /> : null
}
  


export  function Tweet (props) {
    const {tweet, didRetweet, hideActions, isRetweet, retweeter} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    className = isRetweet === true ? `${className} p-2 border rounded` : className
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
{isRetweet === true && <div className='mb-2'>
          <span className='small text-muted'>Retweet via <UserDisplay user={retweeter}></UserDisplay></span>
        </div>}
        <div className='d-flex'>

          <div className=''>
          <UserPicture user = {tweet.user}></UserPicture>
          </div>
          <div className='col-11'>
              <div>
                <p>
                <UserDisplay user={tweet.user} includeFullname></UserDisplay>
                </p>
                <p>{tweet.content}</p>

                <TweetParent tweet={tweet} retweeter={tweet.user} />
            </div>
              <div className='btn btn-group px-0' >
              {(actionTweet && hideActions !== true) && <React.Fragment>
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "like",display : "Likes"}} />
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "unlike",display : "Unlike"}} />
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "retweet",display : "Retweet"}} />
              </React.Fragment>
              }
             
              {
                isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleClick}>View</button>
              }
              </div>
</div>
</div>
              
    </div>
   }