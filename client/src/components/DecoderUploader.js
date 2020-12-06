import React, { Fragment, useState } from "react";
import styled from "styled-components";
import axios from "axios";

var wrup = require("wrapup")();

wrup.require("get-pixels", "get-pixels").up(function(err, js) {
  console.log(js);
});

var getPixels = require("get-pixels");

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

const DecoderUploader = () => {
  const [fileToDecode, setFileToDecode] = useState("");
  const [fileNameToDecode, setFileNameToDecode] = useState(
    "Choose Image or Video"
  );
  const [uploadedKey, setUploadedKey] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");
  const [imgData, setImgData] = useState("");
  const [mode, setMode] = useState("Start");

  const uploadedKeyInput = e => {
    setUploadedKey(e.target.value);
  };
  const uploadedFileToDecode = e => {
    const f = e.target.files[0];
    setFileToDecode(f);
    setFileNameToDecode(f.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(f);
  };
  const onSubmit = e => {
    e.preventDefault();
    sendImageKey(imgData);
    setTimeout(function() {
      setMode("End");
    }, 1000);
  };

  function sendImageKey(inf) {
    //param inf : imgData

    // convert array to image
    // combine first 'half' of array received with last half
    getPixels(inf, function(err, pixels) {
      if (err) {
        console.log("Bad image path");
        return;
      }
      const pxs = pixels.data; // ORIGINAL Uint8Arr
      const imgPixels = Array.from(pxs); // Uint8Arr to []

      // set only partial array
      let arrThres;
      imgPixels.length > 496 ? (arrThres = 496) : (arrThres = imgPixels.length);
      const max_arr = imgPixels.slice(0, arrThres);
      console.log("Hi");
      console.log(uploadedKey);
      const url = "http://localhost:3001/decoded";
      axios
        .get(url, {
          crossdomain: true,
          params: {
            imsrc: max_arr,
            key: uploadedKey
          }
        })
        .then(response => {
          //handle success
          setDecodedMessage(response.data.decodedMessage);
        })
        .catch(error => {
          //handle error
          alert(error);
        });
    });
  }

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
