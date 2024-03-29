function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const axemple_ajax = new XMLHttpRequest()
  const url = `http://localhost:8000/api${endpoint}`
  // /tweets'
  const responseType = 'json'

  axemple_ajax.responseType = responseType
  
  const csrftoken = getCookie('csrftoken');
  axemple_ajax.open(method,url)
  axemple_ajax.setRequestHeader("Content-Type","application/json")
  if (csrftoken){
    // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    axemple_ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    axemple_ajax.setRequestHeader("X-CSRFToken", csrftoken)
  }

  axemple_ajax.onload = function() {
        if (axemple_ajax.status === 403) {
          const detail  = axemple_ajax.response.detail
          if (detail === 'Authentication credentials were not provided.'){
            if (window.location.href.indexOf("login") === -1) {
              window.location.href = "/login?showLoginRequired=true"
            }
          }
        }
        callback(axemple_ajax.response, axemple_ajax.status)
      }
  axemple_ajax.send(jsonData)
}
