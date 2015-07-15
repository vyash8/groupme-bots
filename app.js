var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var router = express.Router();

var bot_id = process.env.BOT_ID;

router.get('/', function(req, res){
   res.json({ message: 'TESTING CALLBACK FROM GROUPME'})
})

router.get('/clockwork-bot', function(req, res){
    console.log(req.query)
    request({
      url: 'https://api.groupme.com/v3/bots/post',
      method: 'POST',
      json: {
          "bot_id": bot_id,
          "text": "hello"
      }
    }, function(error, response, body){
      console.log(response.statusCode);
      console.log(error);
    })
});

app.use('/api', router);

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start(){
  app.listen(port);
  console.log('listening on ' + port);
}


