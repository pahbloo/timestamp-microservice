// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// MY SOLUTION
app.get("/api", function (req, res) {
  let date = new Date();
  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:timeInput", function (req, res) {
  let input = req.params.timeInput;
  let date;

  if (isNaN(Number(input))) {
    date = new Date(input);
  } else {
    date = new Date(Number(input));
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});
