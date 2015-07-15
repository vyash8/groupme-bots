var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var router = express.Router();
var bot_id = process.env.BOT_ID;

router.get('/', function(req, res){
   res.json({ message: 'TESTING CALLBACK FROM GROUPME'})
})

router.post('/clockwork-bot', function(req, res){
    var query = req.body['text'];
    console.log(/#east/.test(query));
    // request({
    //   url: 'https://api.groupme.com/v3/bots/post',
    //   method: 'POST',
    //   json: {
    //       "bot_id": bot_id,
    //       "text": "hello"
    //   }
    // }, function(error, response, body){
    //     return {'message': 'message delivered'};
    // })
});

app.use('/api', router);

app.listen(port);
console.log('listening on ' + port);



