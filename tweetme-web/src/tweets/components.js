import React, {useState,useEffect} from 'react'
import { TweetList } from './list'
import { TweetCreate } from './create'
import { apiTweetDetail } from './lookup'
import { Tweet } from './detail'



export function TweetDetailComponent(props){
    console.log(props)
    const {id} = props
    const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)
    const handlebBackendLookup = (response, status)=>{
        if(status === 200){
            console.log(response)
            setTweet(response)
        }
        else {
            alert("There was an error finding your tweet")
        }

    }
    useEffect(()=>{
        if(didLookup=== false){
            apiTweetDetail(id, handlebBackendLookup)
            setDidLookup(true)
        }

    },[id, didLookup, setDidLookup])
    return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}





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


  

  


