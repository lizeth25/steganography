// const http = require('http');
// const { app } = require('./routes');

// const server = http.createServer(app).listen(process.env.PORT || 3001);
// console.log('Listening on port %d', server.address().port); // eslint-disable-line no-console

// Asynchornous Encryption
// Encoding - Uses public key to encode encrypted3
// Decode - Private key to decode

"use strict";
const { response } = require("express");
const express = require("express");
const spawn = require("child_process").spawn;
var wrup = require("wrapup")();
const app = express();

// const Fs = require('fs')
// const Path = require('path')
// const Axios = require('axios')
// async function download(u){
//     const url = u
//     const path = Path.resolve(__dirname, ("./pics"), 'image3.png')
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  let ima = req.query.imsrc; // partial array of the image uploaded
  let msgToEncode = req.query.msg;

  console.log("2img array is : ");
  console.log(ima);

  // // use python script then send to server
  const next_process = spawn("python3", ["./hello.py", ima, msgToEncode]);

  next_process.stdout.on("data", data => {
    let out = JSON.parse(data);
    // let out = data
    console.log("out is");
    console.log(out);
    res.send(out);
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port, function() {
  console.log("Server started successfully");
});
