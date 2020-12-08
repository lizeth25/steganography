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

//var dojox = require("dojox");
// const CIP = require('canvas_image_processing');

var download = require("downloadjs");

const imageToUri = require("image-to-uri");

const Uploader = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image or Video");

  const [mode, setMode] = useState("Start"); //2 Modes: Start and End
  const [privateKey, setPrivateKey] = useState("");

  const [imgData, setImgData] = useState("");
  const [message, setMessage] = useState("");

  //   function getPixel(imgData, index) {
  //   return imgData.data.subarray(index*4, index*4+4) // Uint8ClampedArray(4) [R,G,B,A]
  // }
  // taken from
  // https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

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
      if (lkey == 64) {
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

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

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
        if (enc3 != 64) uarray[i + 1] = chr2;
        if (enc4 != 64) uarray[i + 2] = chr3;
      }

      return uarray;
    }
  };

  const uploadedFile = e => {
    const f = e.target.files[0];
    setFile(f);
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
    sendData(imgData);
    setTimeout(function() {
      setMode("End");
    }, 1000);
  };

  function sendData(d) {
    //param d : imgData

    // convert array to image
    // combine first 'half' of array received with last half

    // base64 -- > ArrayBuffer
    var byteArray = Base64Binary.decodeArrayBuffer(d);

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

    // console.log("first max_arr");
    // console.log(max_arr);

    let url = "http://localhost:3001/encoded";
    axios
      .get(url, {
        crossdomain: true,
        params: {
          imsrc: max_arr,
          msg: message
        }
      })
      .then(response => {
        //handle success
        console.log("sent to server");
        let imArr = response.data.arr;
        setPrivateKey(response.data.privateKey);
        // console.log("imArr");
        // console.log(imArr);

        // lets try a, frog
        // max_arr[0] = 116
        // max_arr[1] = 170
        // max_arr[2] = 91
        // max_arr[4] = 103
        // max_arr[6] = 122
        // max_arr[8] = 102
        // max_arr[12] = 122
        // max_arr[13] = 175

        // doesnt work for a, frog
        // max_arr[17] = 144

        // why is j showing as message?
        // why is encoding for a and d the same

        // this works
        // max_arr[0] = 255
        // max_arr[1] = 255
        // max_arr[2] = 255
        // max_arr[3] = 255
        // max_arr[4] = 255
        // max_arr[5] = 255
        // max_arr[6] = 255
        // max_arr[7] = 255
        // max_arr[8] = 255
        // max_arr[9] = 255
        // max_arr[10] = 255
        // max_arr[11] = 255
        // max_arr[12] = 255
        // max_arr[13] = 255

        // for d scream
        // max_arr[0] = 116
        // max_arr[1] = 170
        // max_arr[2] = 91
        // max_arr[4] = 103
        // max_arr[6] = 122
        // max_arr[8] = 102
        // max_arr[12] = 122
        // max_arr[13] = 175

        // cant change past 14
        // max_arr[14] = 175
        // need to change d scream
        // max_arr[17] = 144

        // for dd frog
        // max_arr[0] = 116
        // max_arr[1] = 170
        // max_arr[2] = 91
        // max_arr[4] = 103
        // max_arr[6] = 122
        // max_arr[9] = 128
        // max_arr[12] = 122
        // max_arr[13] = 175

        // need to change these for dd too
        // but cant change past 14
        // max_arr[17] = 144
        // max_arr[22] = 129

        // for d frog
        // they work
        // max_arr[0] = 116
        // max_arr[1] = 170
        // max_arr[2] = 91
        // max_arr[4] = 103
        // max_arr[6] = 122
        // max_arr[8] = 102
        // max_arr[12] = 122
        // max_arr[13] = 175

        // what about these --> they work
        // max_arr[5] = 75
        // max_arr[7] = 75
        // max_arr[9] = 75
        // max_arr[10] = 75
        // max_arr[11] = 75

        // doesnt work for d
        // max_arr[17] = 144
        // max_arr[22] = 129
        // max_arr[24] = 1
        // max_arr[25] = 2

        // console.log("final max_arr");
        // console.log(max_arr);

        let final_imageArr = max_arr.concat(
          imgPixels.slice(arrThres, imgPixels.length)
        );

        // console.log("final im arr")
        // console.log(final_imageArr)

        // RECIEVE ARRAY BACK

        // Array --> ArrayBuffer
        var newArrayBuffer = new Uint16Array(final_imageArr);

        // var str = dojox.encoding.base64.encode(newArrayBuffer);
        // console.log("str");
        // console.log(str);

        // ArrayBuffer --> base64
        var almost = _arrayBufferToBase64(newArrayBuffer);
        almost = almost.slice(19, almost.length - 6);

        // base64 !!!
        var encodedImage = "data:image/png;base64," + almost + "=";

        //console.log(encodedImage)
        // canvas ?
        // var c = document.createElement('canvas');
        // var customFile = document.getElementById('customFile');
        // c.height = customFile.height;
        // c.width = customFile.width;
        // var ctx = c.getContext('2d');
        //
        // ctx.drawImage(customFile, 0, 0, c.width, c.height);
        // var base64String = c.toDataURL();

        // canvas attempt 2

        // var cvs = document.createElement('canvas');
        // document.body.appendChild(cvs);
        // var customFile = new Image();
        // customFile.src = d;
        //
        // cvs.width = customFile.width;
        // cvs.height = customFile.height;
        // var ctx = cvs.getContext("2d");
        // ctx.drawImage(customFile, 0, 0, cvs.width, cvs.height);
        // var base64String = cvs.toDataURL();
        // console.log("customFile");
        // console.log(customFile);

        //var idt = ctx.getImageData(0, 0, cvs.width, cvs.height);

        // console.log("d");
        // console.log(d);
        // var ans = getPixel(d.data, 5);
        // console.log("ans");
        // console.log(ans);

        //string imageBase64 = Convert.ToBase64String(item.ImageData);

        // let imagem = imageToUri(d);
        // console.log("imagem");
        // console.log(imagem);

        // var encodedImage2 = CIP.imageToCanvas(d);
        // console.log("encodedImage2");
        // console.log(encodedImage2);

        // automatically downloads image for you
        //download(encodedImage, "encodedImage.png");

        // combine the first and last of our private key
        // give private key to user
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
        <DescriptionLight>
          {privateKey ? privateKey : ""}
          <div></div>
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
