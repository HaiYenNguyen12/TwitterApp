import React, {useEffect, useState} from 'react'
import { apiTweetCreate, apiTweetList, apiTweetAction } from './lookup'


export function TweetComponents (props) {
    console.log(props)
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])
    const handleBackendUpdate = (response, status) =>{
        const newTweetList  = [...newTweets]
        if (status === 201) {
            console.log(response)
            newTweetList.unshift(response)
            setNewTweets(newTweetList)
        } else {
            console.log(response)
            alert("An error occured please try again")
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newContent = textAreaRef.current.value
        
        apiTweetCreate(newContent,handleBackendUpdate)

        
        textAreaRef.current.value = ''
        

    }
    return <div className= {props.clasName}>
    <div className='col-12 mb-13'>
    <form onSubmit={handleSubmit}>
    <textarea ref = {textAreaRef} required={true} className='form-control' name='tweet'>

    </textarea>
    <button type='submit' className='btn btn-primary py-2'>Tweet</button>
    </form>
    </div>
    <TweetList newTweets = {newTweets}/>
    </div>
}

export function ActionButton(props){
    const {tweet,action,didPerformAction} = props
    const like = tweet.like ? tweet.like : 0
    // const [like, setLike] = useState (tweet.like ? tweet.like : 0)
    // const [justClicked, setJustClicked] = useState(false)
    const handleActionButton = (response, status)=>{
        // console.log(response)
        if ((status === 200 || status === 201) && didPerformAction) {
            console.log(response)
            didPerformAction(response,status)
        }
      
        }
    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type,handleActionButton)
    }
    const clasName = props.clasName ? props.clasName :  'btn btn-primary btn-sm' 

    const display = action.type === 'like' ? `${like}  ${action.display}` : action.display

    return  <button className={clasName} onClick={handleClick}>{display}</button>
  } 
  
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
    
    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200){
          setActionTweet(newActionTweet)
        } else if (status === 201) {
        if (didRetweet){
            didRetweet(newActionTweet)
          }
        }
    }

    return <div className= {className}>
            <div>
            <p>  {tweet.id} - {tweet.content}</p>
            <TweetParent tweet = {tweet} />
            </div>
              
              {(actionTweet && hideActions !== true) && <div className='btn btn-group'>
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "like",display : "Likes"}} />
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "unlike",display : "Unlike"}} />
              <ActionButton tweet = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "retweet",display : "Retweet"}} />
              </div>}
    </div>
   }

export function TweetList (props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
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
                        setTweetsInit (response)
                        setTweetDid(true)
                        console.log(response)
                    }
                    else {
                        alert("There was an error")
                    }
                }
                apiTweetList(myCallback)
        }

      },[tweetsInit,setTweetDid,tweetDid])

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
    return (tweets.map((tweet, index)=>{
        
        return <Tweet
         tweet= {tweet} 
         didRetweet={handleDidReTweet}
         key = {`${index}-{tweet.id}`} 
         className ='my-5 py-5 border bg-white text-dark'/>
      }))
}