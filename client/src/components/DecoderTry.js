import { check } from "prettier";
import React, { Fragment, useState, useEffect, useRef, createRef } from "react";
import styled from "styled-components";
import Home from "./Home";

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
  const [uploadedKey, setUploadedKey] = useState("");
  const canvas = React.useRef(null);

  useEffect(() => {
    const newImage = new Image();
    newImage.src = imgData;
    newImage.onload = () => {
      setImage(newImage);
    };
  }, [mode]);

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
      var msg_len = ""; // bin String converted
      var hidden_msg = ""; // encoded bin str
      var foundLen = false;
      var foundMsg = false;
      var index = 0;
      var out_msg = "";

      // we can use len_str to add 8 bin chars which we will convert to a number unless it is our signal
      // always check last 8 chars for signal. when found turn len_str[:-8] into integer
      // Then we keep and index and for every set of 8 bin numbers we have one character we add to our message

      // calculate length of the message by adding appropriate bin value to len_str until * tells us when to stop adding
      decode: for (var i = 0; i < data.length; i += 4) {
        // if (i % 4 != 3) {
        if (!foundMsg) {
          const num = data[i];
          const binNum = num.toString(2);
          const least_bit = binNum.slice(-1);
          if (!foundLen) {
            if (len_str != "" && len_str.length % 8 == 0) {
              const last_eight = len_str.slice(-8);
              // we can check last 8 bits added and convert to a character
              if (last_eight == signal) {
                foundLen = true;
                try {
                  msg_len = parseInt(msg_len, 10); // length of out bit message
                } catch {
                  out_msg = "Not an encoded image";
                  break decode;
                }
                hidden_msg += least_bit;
              }
              // if not the signal, convert the eight bits to a character
              else {
                msg_len += binaryToText(last_eight);
                len_str += least_bit; // check this
              }
            } else {
              // we are adding the least significant value to our len_str until we find signal
              len_str += least_bit;
            }
          }

          // length has been found we now are ready to add our binary numbers to our msg string and then convert
          else {
            if (index < msg_len * 8) {
              hidden_msg += least_bit;
              index += 1;
            } else {
              foundMsg = true;
            }
          }
        }
        //}
        if (!foundMsg) {
          out_msg = "Msg Not Found";
        } else {
          // Our message now contains all the bits we need to convert
          out_msg = binaryToText(hidden_msg);
          out_msg = out_msg.slice(0, -1);
        }
      }

      setDecodedMessage(out_msg);

      ctx.putImageData(imageData, 0, 0); // i think we can delete
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
        <Description>
          This is the encoded image you uploaded! <br></br>
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