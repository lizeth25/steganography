const express = require("express");
const path = require("path"); // eslint-disable-line global-require
const spawn = require("child_process").spawn;
// var wrup = require("wrapup")();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, "../client/build");

// CORS
const corsOptions = {
  methods: ["GET", "PUT", "POST", "DELETE"],
  origin: "*",
  allowedHeaders: ["Content-Type", "Accept", "X-Requested-With", "Origin"]
};
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

// TODO: Add any middleware here
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/encoded", (req, res) => {
  let ima = req.query.imsrc; // partial array of the image uploaded
  console.log(ima);
  let msgToEncode = req.query.msg;
  console.log(typeof msgToEncode);
  // exceptions
  // use python script then send to server
  const next_process = spawn("python3", [
    "./imageencoder.py",
    ima,
    msgToEncode
  ]);
  next_process.stdout.on("data", data => {
    console.log("out of thin");
    res.send(JSON.parse(data));
  });
});

app.get("/decoded", (req, res) => {
  let ima = req.query.imsrc; // partial array of the image uploaded
  let key = req.query.key;
  console.log(ima);
  console.log(key);
  const next_processD = spawn("python3", ["./imagedecoder.py", ima, key]);
  next_processD.stdout.on("data", data => {
    console.log(JSON.parse(data));
    res.send(JSON.parse(data));
  });
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = {
  app
};
