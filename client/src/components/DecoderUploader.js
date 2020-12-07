import React, { Fragment, useState } from "react";
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

const DecoderUploader = () => {
  const [fileNameToDecode, setFileNameToDecode] = useState(
    "Choose Image or Video"
  );
  const [uploadedKey, setUploadedKey] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");
  const [imgData, setImgData] = useState("");
  const [mode, setMode] = useState("Start");

  // // taken from
  // // https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
  // function _arrayBufferToBase64(buffer) {
  //   var binary = "";
  //   var bytes = new Uint8Array(buffer);
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return window.btoa(binary);
  // }

  // taken from
  // https://github.com/danguer/blog-examples/blob/master/js/base64-binary.js
  // http://blog.danguer.com/2011/10/24/base64-binary-decoding-in-javascript/
  var Base64Binary = {
    _keyStr:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /* will return a  Uint8Array type */
    decodeArrayBuffer: function(input) {
      var bytes = (input.length / 4) * 3;
      var ab = new ArrayBuffer(bytes);
      this.decode(input, ab);

      return ab;
    },

    removePaddingChars: function(input) {
      var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
      if (lkey === 64) {
        return input.substring(0, input.length - 1);
      }
      return input;
    },

    decode: function(input, arrayBuffer) {
      //get last chars to see if are valid
      input = this.removePaddingChars(input);
      input = this.removePaddingChars(input);

      var bytes = parseInt((input.length / 4) * 3, 10);

      var uarray;
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      var j = 0;

      if (arrayBuffer) uarray = new Uint8Array(arrayBuffer);
      else uarray = new Uint8Array(bytes);

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); // eslint-disable-line no-useless-escape

      for (i = 0; i < bytes; i += 3) {
        //get the 3 octects in 4 ascii chars
        enc1 = this._keyStr.indexOf(input.charAt(j++));
        enc2 = this._keyStr.indexOf(input.charAt(j++));
        enc3 = this._keyStr.indexOf(input.charAt(j++));
        enc4 = this._keyStr.indexOf(input.charAt(j++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        uarray[i] = chr1;
        if (enc3 !== 64) uarray[i + 1] = chr2;
        if (enc4 !== 64) uarray[i + 2] = chr3;
      }

      return uarray;
    }
  };

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
    sendImageKey(imgData);
    setTimeout(function() {
      setMode("End");
    }, 1000);
  };

  function sendImageKey(inf) {
    //param inf : imgData

    // convert array to image
    // combine first 'half' of array received with last half

    // base64 -- > ArrayBuffer
    var byteArray = Base64Binary.decodeArrayBuffer(inf);

    // ArrayBuffer --> UInt8Array
    var uint8View = new Uint8Array(byteArray);

    // UInt8Array --> Array
    var normalArray = Array.from(uint8View);

    // can rename normalArray to imgPixels, which is what we modify to send partial array
    var imgPixels = normalArray;

    // SEND PARTIAL ARRAY AND CHANGE PIXELS

    // set only partial array
    let arrThres;
    imgPixels.length > 496 ? (arrThres = 496) : (arrThres = imgPixels.length);
    let max_arr = imgPixels.slice(0, arrThres);

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
        console.log("sent to server");
        setDecodedMessage(response.data.decodedMessage);
      })
      .catch(error => {
        //handle error
        alert(error);
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
