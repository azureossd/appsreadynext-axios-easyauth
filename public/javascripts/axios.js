function axiosGet() {
    var respElement = document.getElementById('response');
    respElement.innerHTML = '';
    
    axios.get('/testAxios.json')
      .then(function (response) {
        respElement.innerHTML = updateHTML(response);
      })
      .catch(function (error) {
        respElement.innerHTML = updateHTMLError(error);
      });   
  }
  function updateHTML(response) {
    return  '<h5>Response:</h5>' + 
            '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>'; 
  }
  function updateHTMLError(error) {
    return  '<h5>Error:</h5> ' + 
            '<pre>' + error.message + '</pre>'
  }
