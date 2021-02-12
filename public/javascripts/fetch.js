function fetchGet() {
  var respElement = document.getElementById('response');
  respElement.innerHTML = '';
  
  fetch('/testFetch.json')
    .then(function(response) {
    response.json().then(function(data) {
      let newResp = data;
      respElement.innerHTML = updateHTML(newResp);
    })
    })
    .catch(function (error) {
      respElement.innerHTML = updateHTMLError(error);
    });   
}
function updateHTML(newResp) {
  return  '<h5>Response:</h5>' + 
          '<pre>' + JSON.stringify(newResp, null, '\t') + '</pre>'; 
}
function updateHTMLError(error) {
  return  '<h5>Error:</h5> ' + 
          '<pre>' + error.message + '</pre>'
}
