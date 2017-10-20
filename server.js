// server.js
// where your node app starts

// init project
const express = require('express');
const moment = require('moment');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', (req, res) => {
  if (req.params) {
    let param = req.params.date,
        unix = null,
        natural = null;
    
    if (moment.unix(param).isValid()){
      unix = param;
      natural = moment.unix(param).format('MMMM DD, YYYY');
    } else if (moment(param).isValid()) {
      unix = moment(param).format('X');
      natural = param;
    }
    
    let json = {
      "unix": unix,
      "natural": natural
    }
    
    res.send(json);
    
  }
});

app.put("/:date", (req, res) => {
  console.log(req.params);
});

const listener = app.listen(process.env.PORT, (err, res) => {
  if (err) throw err;
  console.log('Your app is listening on port ' + listener.address().port);
});

