import React, {useState} from 'react'
import { TweetList } from './list'
import { TweetCreate } from './create'






export function TweetComponents (props) {
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "true" ? true : false

    const handleNewTweet = (newTweet) =>{
        const newTweetList  = [...newTweets]
        newTweetList.unshift(newTweet)
        setNewTweets(newTweetList)
    }
    return <div className= {props.clasName}>
    { canTweet === true &&<TweetCreate didTweet={handleNewTweet} className='col-12 mb-13'/>}
    <TweetList newTweets = {newTweets}   {...props}/>
    </div>
}


  

  


