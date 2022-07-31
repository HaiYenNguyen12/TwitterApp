

import React from 'react'
import { apiTweetAction } from './lookup'



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
  
