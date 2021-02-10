const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

var subscriptionKey = "213774178de74ca093625d834beb7670";
var endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = "westus2";

const translateText = function(data, from, to) {
axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: {
        'api-version': '3.0',
        'from': from,
        'to': to
    },
    data: [{
        'text': data
    }],
    responseType: 'json'
}).then(function(response){
    console.log(JSON.stringify(response.data, null, 4));
    return response.data;
}).catch(function (error) {
    // handle error
    console.log(error);
  })
}

module.exports = translateText;