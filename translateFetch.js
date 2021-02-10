const fetch = require('node-fetch');
const tokenizer = require('sbd');

//const config = require('../config.json');
var subscriptionKey = "213774178de74ca093625d834beb7670";
var location = "westus2";

function splitSlice(str, len) {
  var ret = [ ];
  for (var offset = 0, strLen = str.length; offset < strLen; offset += len) {
    ret.push(str.slice(offset, len + offset));
  }
  return ret;
}

function splitSBD(str, len) {
  if (str.length > 150000) {
    str = str.substr(0, 150000);
  }

  const sentences = tokenizer.sentences(str);

  chunks = [];
  chunk = '';
  
  while (sentences.length > 0) {
    const sentence = sentences.shift();
    if (chunk.length + sentence.length + 1 < len) {
      chunk = `${chunk} ${sentence}`;
    } else {
      chunks.push(chunk);
      chunk = '';
    }
  }

  return chunks;
}

const translateText = function (content, from = 'auto', to = 'en') {
  const chunks = splitSBD(content, 4950);

  const allPromises = chunks.map(chunk => {
    const body = [{ Text: chunk }];
    const params = (from === 'auto' ? '' : `from=${from}`) + `&to=${to}`;

    return axios({
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
    })
  });

  return Promise.all(allPromises)
    .then(values => {
      const allValues = values.map(value => value.text());
      return Promise.all(allValues);
    });
};


module.exports = translateText;