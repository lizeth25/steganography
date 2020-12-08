import { check } from "prettier";
import React, { Fragment, useState, useEffect, useRef, createRef } from "react";
import styled from "styled-components";
import Home from "./Home";
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

// from
// https://stackoverflow.com/questions/21354235/converting-binary-to-text-using-javascript
function binaryToText(b) {
  return b.replace(/[01]{8}/g, function(v) {
    return String.fromCharCode(parseInt(v, 2));
  });
}

/*
DONE
add 'here is your original image' and 'upload only png'
*/

/*
TO DO
fix 'encode another image'
decoder
set canvas width and height
updating our server to only receive message, and send back encrypted3 and private key
useEffect?
png vs jpeg download

go/csmajorss
based on new changes we can update our max message length

video potentially

textToBinary will not work with special characters like those who have more than 8bits
*/

const DecoderUploader = () => {
  const [fileNameToDecode, setFileNameToDecode] = useState(
    "Choose Image or Video"
  );
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End
  const [imgData, setImgData] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");
  const [image, setImage] = useState(null);
  const [encrypted, setEncrypted] = useState("");
  const [uploadedKey, setUploadedKey] = useState("");
  const canvas = React.useRef(null);

  function sendImageKey() {
    const url = "http://localhost:3001/decoded";
    axios
      .get(url, {
        crossdomain: true,
        params: {
          encryptedK: encrypted,
          pkey: uploadedKey
        }
      })
      .then(response => {
        //handle success
        console.log("sent to server");
        setDecodedMessage(response.data.decodedMessage);
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
  }, [imgData]);

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      const w = canvas.current.width;
      const h = canvas.current.height;
      ctx.drawImage(image, 0, 0); // displays image

      const imageData = ctx.getImageData(0, 0, w, h);
      var data = imageData.data;
      // for Decoder

      // using * as signal to denote when the length of the message is done being encoded into message
      const signal = "00101010"; // represents the first *
      var len_str = ""; // bin string w/ length
      var msg_len; // bin String converted
      var hidden_msg = ""; // encoded bin str
      var foundLen = false;
      var foundMsg = false;
      var out_msg = "";

      // checking to see if encoded image and if so finding length of hidden msg
      for (var i = 0; i < data.length; i += 2) {
        const num = data[i];
        const binNum = num.toString(2);
        const least_bit = binNum.slice(-1);
        len_str += least_bit;
        const l = len_str.length;
        if (l !== 0 && l % 8 === 0) {
          const last_eight = len_str.slice(-8);
          if (last_eight === signal) {
            try {
              const beforeStr = len_str.slice(0, l - 8);
              const beforeInt = binaryToText(beforeStr);
              msg_len = parseInt(beforeInt, 10); // length of out bit message
              foundLen = true;
            } catch {
              out_msg = "Not an encoded image";
            }
          }
        }
      }
      console.log(msg_len);

      if (foundLen) {
        const startIndex = (msg_len.toString().length + 1) * 8 * 2;
        const remainingBits = msg_len * 8;
        // looping only whats left of message
        for (var i = 0; i < remainingBits * 2 && i < data.length; i += 2) {
          const num = data[i + startIndex];
          const binNum = num.toString(2);
          const least_bit = binNum.slice(-1);
          hidden_msg += least_bit;
        }
        if (i < remainingBits * 4 && i >= data.length) {
          out_msg = "Msg not found";
        } else {
          foundMsg = true;
          out_msg = binaryToText(hidden_msg);
        }
      } else {
        out_msg = "Not an encoded image";
      }
      setEncrypted(out_msg);
      // ctx.putImageData(imageData, 0, 0); // i think we can delete
    }
  }, [image, canvas]);

  const uploadedKeyInput = e => {
    setUploadedKey(e.target.value);
  };

  const uploadedFileToDecode = e => {
    const f = e.target.files[0];
    setFileNameToDecode(f.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(f);
  };

  const onSubmit = e => {
    e.preventDefault();

    sendImageKey();
    setTimeout(function() {
      setMode("End");
    }, 1000);
  };

  if (mode === "Start") {
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <div
            className="mb-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <label htmlFor="customKey" style={{ padding: "0px 10px 0px 0px" }}>
              Encryption Key:
            </label>
            <input
              type="text"
              id="customKey"
              style={{
                borderWidth: "thin",
                borderColor: "#cdd3d8",
                borderRadius: "2.5px"
              }}
              placeholder="Key"
              onChange={uploadedKeyInput}
              maxLength="893"
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
              onChange={uploadedFileToDecode}
            />
            <label className="custom-file-label sm-4" htmlFor="customFile">
              {fileNameToDecode}
            </label>
          </div>
          {imgData ? (
            <Description>
              This is the encoded image you uploaded! <br></br>
              <br></br>
            </Description>
          ) : (
            ""
          )}
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
              value="Decode"
              className="btn"
            />
          </div>
        </form>
      </Fragment>
    );
  } else if (mode === "End") {
    return (
      <div>
        <Description>
          Your message has been successfully decoded! <br></br>
          <br></br>
        </Description>
        <DescriptionLight>
          {decodedMessage ? decodedMessage : ""}
        </DescriptionLight>

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
            value="Decode Another Image"
            className="btn"
            onClick={() => setMode("Start")}
          ></input>
        </div>
      </div>
    );
  }
};

export default DecoderUploader;
