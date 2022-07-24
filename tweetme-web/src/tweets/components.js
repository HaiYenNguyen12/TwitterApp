import React, {useEffect, useState} from 'react'
import { loadingTweet, createTweet } from '../lookup'


export function TweetComponents (props) {
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault()
        const newContent = textAreaRef.current.value
        const newTweetList  = [...newTweets]
        createTweet(newContent, (response, status)=>{
            if (status === 201) {
                newTweetList.unshift(response)
            } else {
                console.log(response)
                alert("An error occured please try again")
            }
        })

        setNewTweets(newTweetList)
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
    const {item,action} = props
    const [like, setLike] = useState (item.like ? item.like : 0)
    const [justClicked, setJustClicked] = useState(false)
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like') {
            if (justClicked === false){
                setLike(like+1)
                setJustClicked(true)
            }
            else {
                setLike(like-1)
                setJustClicked(false)
            }
        }
        // if (action.type === 'unlike') {
        //     if (justClicked === true) {
        //         setLike(like - 1)
        //     }
        // }
    }
    const clasName = props.clasName ? props.clasName :  'btn btn-primary btn-sm' 

    const display = action.type === 'like' ? `${like}  ${action.display}` : action.display

    return  <button className={clasName} onClick={handleClick}>{display}</button>
  } 
  
  
  
  
export  function Tweet (props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className= {className}>
              <p>  {tweet.id} - {tweet.content}</p>
              <div className='btn btn-group'>
              <ActionButton item = {tweet} action = {{type: "like",display : "Likes"}} />
              <ActionButton item = {tweet} action = {{type: "unlike",display : "Unlike"}} />
              <ActionButton item = {tweet} action = {{type: "retweet",display : "Retweet"}} />
              </div>
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
                    }
                }
                loadingTweet(myCallback)
        }

      },[tweetsInit,setTweetDid,tweetDid])
    return (tweets.map((item, index)=>{
        return <Tweet tweet= {item}  key = {index} className ='my-5 py-5 border bg-white text-dark'/>
      }))
}