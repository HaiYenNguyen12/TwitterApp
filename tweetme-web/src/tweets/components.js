import React, {useEffect, useState} from 'react'
import 
export function ActionButton(props){
    const {item,action} = props
    const clasName = props.clasName ? props.clasName :  'btn btn-primary btn-sm' 
    return  action.type === 'like'?<button className={clasName}>{item.like} Likes</button> : null
  } 
  
  
  
  
export  function Tweet (props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className= {className}>
              <p>  {tweet.id} - {tweet.content}</p>
              <div className='btn btn-group'>
              <ActionButton item = {tweet} action = {{type: "like"}} />
              </div>
    </div>
   }

export function TweetList (props) {
    const [tweets, setTweets]  = useState([])
    useEffect(() =>{
      const myCallback = (response, status) => {
        if (status === 200){
            setTweets (response)
        }
      }
      loadingTweet(myCallback)
      },[])
    return (tweets.map((item, index)=>{
        return <Tweet tweet= {item}  key = {index} className ='my-5 py-5 border bg-white text-dark'/>
      }))
}