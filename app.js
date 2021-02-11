var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const translateText = require('./translate.js');
var indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var subscriptionKey = process.env.subscriptionKey;
var endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = process.env.location;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(bodyParser.json());

app.get('/face', (req, res)=>{
  axios.get(req.headers.referer + '/testAxios.json')
  .then(response => response.data)
  .then(data => res.send(data));
  
})
app.get('/analytics', (req, res)=>{
  fetch(req.headers.referer + '/testFetch.json')
  .then(response => response.json())
  .then(data => res.send(data));
  
})
app.get('/translate', function(req, res, next) {
  res.render('translate', { error: false });
});
app.post('/translate', jsonParser, (req, res) => {

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
        'from': req.body.from,
        'to': req.body.to
    },
    data: [{
        'text': req.body.data
    }],
    responseType: 'json'
}).then(response=>{
  // handle success
  res.send(response.data)
}).catch(function (error) {
  // handle error
  console.log(error);
})
}
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
