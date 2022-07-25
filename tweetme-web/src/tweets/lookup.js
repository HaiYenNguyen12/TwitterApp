import {backendLookup} from  '../lookup'

export function apiTweetCreate(newTweet,callback){
    backendLookup('POST', '/tweets/create/', callback, {content: newTweet})
    
    }

export function apiTweetAction(id,action,callback){
        const data  = {id: id, action:action} 
        backendLookup('POST', '/tweets/action/', callback, data)
        
        }

  export function apiTweetList(callback){
    backendLookup('GET', '/tweets', callback)
    
    }