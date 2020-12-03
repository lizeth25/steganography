// const http = require('http');
// const { app } = require('./routes');

// const server = http.createServer(app).listen(process.env.PORT || 3001);
// console.log('Listening on port %d', server.address().port); // eslint-disable-line no-console

// Asynchornous Encryption
// Encoding - Uses public key to encode encrypted3
// Decode - Private key to decode

"use strict";

// const Fs = require('fs')
// const Path = require('path')
// const Axios = require('axios')
// const { response } = require('express')
// async function download(){
//     const url = 'https://unsplash.com/photos/XDCeQYYmQ3Y/download?force=true'
//     const path = Path.resolve(__dirname, ("~/"+ usr +"/Downloads/"), 'image.jpg')
//     const response = await Axios({
//         method : 'GET',
//         url : url,
//         responseType : 'stream'
//     })

//     response.data.pipe(Fs.createWriteStream(path))

//     return new Promise((resolve, reject)=> {
//         response.data.on('end', () => {
//             resolve()
//         })

//         response.data.on('error', () =>{
//             reject(err)
//         })
//     })
// }

// download().then(()=>{
//     console.log("download finished")
// })

const spawn = require("child_process").spawn;
const next_process = spawn("python3", ["./hello.py"]);

let out;
next_process.stdout.on("data", data => {
  out = JSON.parse(data);
});

const { response } = require("express");
const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send(req.query);
});

// app.post("/", function(req, res) {
//   res.send(out);
// });
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port, function() {
  console.log("Server started successfully");
});
