import { check } from "prettier";
import React, { Fragment, useState, useEffect, useRef, createRef } from "react";
import styled from "styled-components";
import axios from "axios";

const Description = styled.div`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
`;
const DescriptionLight = styled.div`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
  background: #d5f2e2;
  padding: 1em;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;

var download = require("downloadjs");

function textToBinary(t) {
  var out = "";
  for (var i = 0; i < t.length; i++) {
    var b = t[i].charCodeAt().toString(2);
    b = new Array(9 - b.length).join("0") + b;
    out += b;
  }
  return out;
}

/*
TO DO
set canvas width and height
png vs jpeg download
video
*/

const Uploader = () => {
  const [fileName, setFileName] = useState("Choose Image or Video");
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End
  const [imgData, setImgData] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [privateKey, setPrivateKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const canvas = React.useRef(null);
  var newImgData;
  var imgWidth = 60;
  var imgHeight = 60;

  function sendMessage() {
    let url = "http://localhost:3001/encoded";
    axios
      .get(url, {
        crossdomain: true,
        params: {
          msg: message
        }
      })
      .then(response => {
        //handle success
        setPrivateKey(response.data.privateKey);
        setEncrypted(response.data.encrypted);
        // combine the first and last of our private key
        // give private key to user
      })
      .catch(error => {
        //handle error
        alert(error);
      });
  }

  useEffect(() => {
    const newImage = new Image();
    newImage.src = imgData;

    newImage.onload = () => {
      setImage(newImage);
    };
  }, [mode]);

  useEffect(() => {
    if (image && canvas) {
      // sendMessage();
      const ctx = canvas.current.getContext("2d");
      const w = canvas.current.width;
      const h = canvas.current.height;
      ctx.drawImage(image, 0, 0); // displays image

      const imageData = ctx.getImageData(0, 0, w, h);
      var data = imageData.data;
      const messageLen = encrypted.length;
      const finalMessageString = messageLen.toString() + "*" + encrypted;

      const bs = textToBinary(finalMessageString); // returns binary string to encode
      var arrIndex = [];
      var st = "";
      var bsIndex = 0; // tell us when to stop encoding message
      for (var index = 0; index < data.length; index += 2) {
        // Only encode up to length of binary string
        if (bsIndex < bs.length) {
          const num = data[index];
          const binNum = num.toString(2);
          const binNumBefore = binNum.slice(0, -1); // get everything but last bit
          const newBinNum = binNumBefore + bs[bsIndex]; // string representing binary integer
          // create new integer from potentially modified lsb
          const newNum = parseInt(newBinNum, 2);

          data[index] = newNum;
          arrIndex.push(index);
          bsIndex += 1;
          st += newBinNum.slice(-1);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      newImgData = canvas.current.toDataURL("image/png");

      download(newImgData, "encoded.png");
    }
  }, [image, canvas]);

  const uploadedFile = e => {
    const f = e.target.files[0];
    setFileName(f.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(f);
  };
  const uploadedMessage = e => {
    setMessage(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    sendMessage();
    setTimeout(function() {
      setMode("End");
    }, 2000);
  };

  if (mode === "Start") {
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <div
            className=" mb-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <label htmlFor="customText" style={{ padding: "0px 10px 0px 0px" }}>
              Message to encode:
            </label>
            <input
              style={{
                borderWidth: "thin",
                borderColor: "#cdd3d8",
                borderRadius: "2.5px"
              }}
              type="text"
              id="customText"
              placeholder="Message"
              maxLength="46"
              onChange={uploadedMessage}
            />
          </div>

          <div
            style={{ left: "26%", width: "50%" }}
            className="custom-file mb-4"
          >
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={uploadedFile}
            />
            <label className="custom-file-label sm-4" htmlFor="customFile">
              {fileName}
            </label>
          </div>
          <div
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <input
              style={{ background: "#00DE66", border: "0px" }}
              type="submit"
              value="Encode"
              className="btn"
            />
          </div>
        </form>
      </Fragment>
    );
  } else {
    return (
      <div>
        <Description>
          Your message has been successfully encoded into your image! Before the
          message was encoded, it was encrypted with RSA. <br></br>The private
          key pair needed to decrypt the message is: <br></br>
        </Description>
        <DescriptionLight>{privateKey ? privateKey : ""}</DescriptionLight>
        <Description>
          This is the original, nonencoded image you uploaded! <br></br>
          <br></br>
        </Description>
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <canvas ref={canvas} width={60} height={60} />
        </div>
        <br></br>
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <input
            style={{ background: "#00DE66", border: "0px" }}
            type="button"
            value="Encode Another Image"
            className="btn"
            onClick={() => setMode("Start")}
          ></input>
        </div>
      </div>
    );
  }
};

export default Uploader;
