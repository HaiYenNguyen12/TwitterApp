import {backendLookup} from  '../lookup'

export function apiTweetCreate(newTweet,callback){
    backendLookup('POST', '/tweets/create/', callback, {content: newTweet})
    
    }

export function apiTweetAction(id,action,callback){
        const data  = {id: id, action:action} 
        backendLookup('POST', '/tweets/action/', callback, data)
        
        }

export function apiTweetDetail(id, callback){
  backendLookup('GET', `/tweets/${id}`, callback)
  
  }

export function apiTweetFeed(callback, nextUrl) {
  let endpoint =  "/tweets/feed/"
  if (nextUrl !== null && nextUrl !== undefined){
    endpoint = nextUrl.replace("http://localhost:8000/api","")
  }
  backendLookup('GET', endpoint, callback)

}
  export function apiTweetList(username, callback, nextUrl){
    let endpoint = `/tweets`
    if (username){
      endpoint = `/tweets/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined){
      endpoint = nextUrl.replace("http://localhost:8000/api","")
      console.log(endpoint)
    }
    backendLookup('GET', endpoint, callback)
    
    }