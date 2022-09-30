// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', function (req, res) {
  let date1 = new Date();
  res.json({
    unix: Math.floor(date1.getTime()),
    utc: date1.toGMTString(),
  })
})

// your first API endpoint...
app.get('/api/:date', function (req, res) {
  const { date } = req.params;

  let date1 = new Date(date);
  if ((Object.prototype.toString.call(date1) === '[object Date]' && date1 != "Invalid Date")) {
    res.json({
      unix: Math.floor(date1.getTime()),
      utc: date1.toGMTString(),
    })
  }
  else if (new Date(parseInt(date))) {
    if (parseInt(date)) {
      res.json({
        unix: parseInt(date),
        utc: new Date(parseInt(date)).toGMTString()
      })
    } else {
      res.json({
        error : "Invalid Date"
      })
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
