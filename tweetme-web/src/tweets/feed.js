import React, {useEffect, useState} from 'react'
import { Tweet } from './detail'
import {apiTweetFeed} from './lookup'



export function FeedList (props) {

    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [tweetDid, setTweetDid] = useState(false)
    useEffect(()=>{
        const final = [...props.newTweets].concat(tweetsInit)
        if ( final.length !== tweets.length){
            setTweets(final)
        }
    }, [tweetsInit,tweets, props.newTweets])

    useEffect(() =>{
      if (tweetDid === false) {
            const myCallback = (response, status) => {
                
                    if (status === 200){
                        setTweetsInit (response.results)
                        setNextUrl(response.next)
                        setTweetDid(true)
                    }

                }
                apiTweetFeed( myCallback)
        }

      },[tweetsInit,setTweetDid,tweetDid, props.username])

      const handleNextButton = (event) =>{
        event.preventDefault()
        if (nextUrl!= null){
            apiTweetFeed((response,status)=>{
                if (status === 200){
                    const newListTweet = [...tweets].concat(response.results)
                    setTweetsInit(newListTweet)
                    setTweets (newListTweet)
                    setNextUrl(response.next)
                }

            }, nextUrl)
        }
      }

      const handleDidReTweet = (newTweet) => {
        console.log("new")
        console.log(newTweet)
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        console.log("hi")
        console.log(updateTweetsInit)
        setTweetsInit(updateTweetsInit)
        const updateFinalTweets = [...tweets]
   
        updateFinalTweets.unshift(newTweet)
        console.log("nice")
        console.log(updateFinalTweets)
        setTweets(updateFinalTweets)
      }
    return (<React.Fragment>{tweets.map((tweet, index)=>{
        
        return <Tweet
         tweet= {tweet} 
         didRetweet={handleDidReTweet}
         key = {`${index}-{tweet.id}`} 
         className ='my-5 py-5 border bg-white text-dark'/>
      })}
      {nextUrl!== null && <button onClick={handleNextButton} className='btn btn-outline-primary'>Next</button>}
      </React.Fragment>)
}  