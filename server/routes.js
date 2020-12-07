const express = require("express");
const path = require("path"); // eslint-disable-line global-require
const spawn = require("child_process").spawn;

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/encoded", (req, res) => {
  const ima = req.query.imsrc; // partial array of the image uploaded
  const msgToEncode = req.query.msg;
  // exceptions
  // use python script then send to server
  const nextProcess = spawn("python3", ["./imageencoder.py", ima, msgToEncode]);
  nextProcess.stdout.on("data", data => {
    res.send(JSON.parse(data));
  });
});

app.get("/decoded", (req, res) => {
  const ima = req.query.imsrc; // partial array of the image uploaded
  const pKey = req.query.pkey;
  const nextProcessD = spawn("python3", ["./imagedecoder.py", ima, pKey]);
  nextProcessD.stdout.on("data", data => {
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
