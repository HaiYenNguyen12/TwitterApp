import React, {useEffect, useState} from 'react'
import { apiTweetCreate, apiTweetList, apiTweetAction } from './lookup'


export function TweetComponents (props) {
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
    const {item,action,didPerformAction} = props
    const like = item.like ? item.like : 0
    // const [like, setLike] = useState (item.like ? item.like : 0)
    // const [justClicked, setJustClicked] = useState(false)
    const handleActionButton = (response, status)=>{
        // console.log(response)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response)
        }
        // if (action.type === 'like') {
        //     if (justClicked === false){
        //                 if (status === 200) {
        //                     setLike(response.like)
        //                     setJustClicked(true)
        //                 }
        //         }
        //     else {
        //         setLike(like-1)
        //         setJustClicked(false)
        //     }
            
        //     }
      
        }
    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(item.id, action.type,handleActionButton)
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
    <Tweet clasName={' '} tweet={tweet.parent}/></div>
    </div> : null
}
  
  
export  function Tweet (props) {
    const {tweet} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    
    const handlePerformAction = (newActionTweet) => {
        setActionTweet(newActionTweet)
    }



    return <div className= {className}>
            <div>
            <p>  {tweet.id} - {tweet.content}</p>
            <TweetParent tweet = {tweet} />
            </div>
              
              {actionTweet && <div className='btn btn-group'>
              <ActionButton item = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "like",display : "Likes"}} />
              <ActionButton item = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "unlike",display : "Unlike"}} />
              <ActionButton item = {actionTweet} didPerformAction={handlePerformAction} action = {{type: "retweet",display : "Retweet"}} />
              </div>}
    </div>
   }

export function TweetList (props) {
    const [tweetsInit, setTweetsInit]  = useState([])
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
                }
                apiTweetList(myCallback)
        }

      },[tweetsInit,setTweetDid,tweetDid])
    return (tweets.map((item, index)=>{
        return <Tweet tweet= {item}  key = {index} className ='my-5 py-5 border bg-white text-dark'/>
      }))
}