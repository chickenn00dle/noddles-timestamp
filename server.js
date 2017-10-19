// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var port = 8000;

var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', (req, res) => {
  if (req.params) {
    var param = req.params.date;
    if (moment(param).isValid()){
      var unix = moment(param).unix();
      var natural = moment(param).format('MMMM D, YYYY');
    } else {
      var unix = null;
      var natural = null;
    }
    
    res.send({
      "unix": unix,
      "natural": natural
    });
    
  }
});

app.put("/:date", (req, res) => {
  console.log(req.params);
});

var listener = app.listen(process.env.PORT, (err, res) => {
  if (err) throw err;
  console.log('Your app is listening on port ' + listener.address().port);
});

