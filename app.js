var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var router = express.Router();

router.get('/clockwork-bot', function(req, res){
    console.log(req.query)
    res.json({ message: 'TESTING CALLBACK FROM GROUPME'})
    request({
      url: 'https://api.groupme.com/v3/bots/post',
      method: 'POST',
      json: {
          "bot_id": "f9c260f4645a7b602e55d6b124",
          "text": req.query['text']
      }
    }, function(error, response, body){
      console.log(response.statusCode);
      console.log(error);
    })
});

app.use('/api', router);

app.listen(port);
console.log('listening on ' + port);
