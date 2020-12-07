import { check } from "prettier";
import React, { Fragment, useState, useEffect, useRef, createRef } from "react";
import styled from "styled-components";

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

const Uploader = () => {
  const [fileName, setFileName] = useState("Choose Image or Video");
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End
  const [imgData, setImgData] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const canvas = React.useRef(null);
  var newImgData;

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

      const messageLen = message.length;
      const messBegin = messageLen.toString() + "*";
      const finalMessageString = messageLen.toString() + "*" + message;

      const bs = textToBinary(finalMessageString); // returns binary string to encode
      //   console.log("BS is ")
      //   console.log(bs)

      //   const s1 = "00110010001010100100100001101001" // "2*Hi"
      //   // check if string is correct
      //   console.log(s1===bs)

      var bsIndex = 0; // tell us when to stop encoding message
      //   var checkString = ""; // we dont need this
      console.log("previous data image array");
      console.log(data);

      for (var index = 0; index < data.length; index += 4) {
        // Only encode up to length of binary string
        if (bsIndex < bs.length) {
          const num = data[index];
          const binNum = num.toString(2);
          const binNumBefore = binNum.slice(0, -1); // get everything but  last bit
          const newBinNum = binNumBefore + bs[bsIndex]; // string representing binary integer
          // create new integer from potentially modified lsb
          const newNum = parseInt(newBinNum, 2);

          data[index] = newNum;

          // checkString+=bs[bsIndex]
          bsIndex += 1;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      console.log("after data image array");
      console.log(data);
      newImgData = canvas.current.toDataURL("image/png");
      //   console.log("Binstring and index final")
      //   console.log(checkString)
      //   console.log(bsIndex)
      console.log(newImgData);
      download(newImgData, "workpls.png");
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
    // base64 !!!
    // var encodedImage = "data:image/png;base64," + almost + "=";

    // automatically downloads image for you
    // download(encodedImage, "encodedImage.png");
    setTimeout(function() {
      setMode("End");
    }, 1000);
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
        <DescriptionLight></DescriptionLight>
        <canvas ref={canvas} width={60} height={60} />
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
