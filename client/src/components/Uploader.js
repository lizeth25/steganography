import React, { Fragment, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { saveAs } from "file-saver";

const Description = styled.div`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
`;

// <p>{privateKey?privateKey:"none"}</p>

var wrup = require("wrapup")();
var download = require("downloadjs");

wrup.require("get-pixels", "get-pixels").up(function(err, js) {
  console.log(js);
});

var getPixels = require("get-pixels");

const Uploader = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image or Video");
  // const [finalFile, setFinalFile] = useState("");
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End
  const [privateKey, setPrivateKey] = useState("");

  const [imgData, setImgData] = useState("");
  const [message, setMessage] = useState("");
  const [imgUInt, setImgUIInt] = useState("");
  let content;

  var imgPixels;
  let pxs;

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
    // const data = new FormData();
    // data.append("file", file);
    // let imS = "data:image/png;base64,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";
    sendData(imgData);
    setMode("End");
  };

  function encode(input) {
    var keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
      chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output +=
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
    }
    return output;
  }

  function saveAs(blob, fileName) {
    var url = window.URL.createObjectURL(blob);

    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);

    // On Edge, revokeObjectURL should be called only after
    // a.click() has completed, atleast on EdgeHTML 15.15048
    setTimeout(function() {
      window.URL.revokeObjectURL(url);
    }, 1000);
  }

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function sendData(d) {
    //param d : imgData

    // convert array to image
    // combine first 'half' of array received with last half

    getPixels(d, function(err, pixels) {
      if (err) {
        console.log("Bad image path");
        return;
      }
      pxs = pixels.data; // ORIGINAL Uint8Arr
      // setImgUIInt(pxs);
      // console.log("setImgUINT below")
      // console.log(imgUInt)
      // console.log("lizeth");
      // console.log(pxs);
      imgPixels = Array.from(pxs); // Uint8Arr to []

      lizeth_image =
        "data:image/png;base64," +
        btoa(String.fromCharCode.apply(null, pxs.buffer));
      console.log("lizeth image");
      console.log(lizeth_image);

      lizeth_image2 = "data:image/png;base64," + encode(pxs.buffer);
      console.log("lizeth image2");
      console.log(lizeth_image2);

      let lizeth_image3 =
        "data:image/png;base64," + _arrayBufferToBase64(pxs.buffer);
      console.log("lizeth_image3");
      console.log(lizeth_image3);

      // blobby = URL.createObjectURL(
      //  new Blob([pxs.buffer], { type: "image/png" } /* (1) */)
      //  )

      blobby = URL.createObjectURL(
        new Blob([JSON.stringify(pxs.buffer)], { type: "image/png" } /* (1) */)
      );

      //FileSaver.saveAs(blobby, "image.png");

      blob = new Blob([pxs.buffer], { type: "image/png" });
      const newreader = new FileReader();
      newreader.readAsDataURL(blob);

      // gold right here
      download(lizeth_image3, "blob.jpg");

      // blob_image= document.getElementById('blob_image');
      // blob_image.alt="here should be some image";
      // blob_image.src = URL.createObjectURL(blob);
      // blob_image.onload = e => URL.revokeObjectURL( url );
      // document.body.appendChild(blob_image);

      //imgBlob = document.getElementById('imgBlob');
      //imgBlob.src = blobby;

      blob_image2 = document.getElementById("blob_image2");
      blob_image2.src = imS;
      //blob_image2.src = 'data:image/png;base64,'+ encode(pxs);
      //blob_image2.src = 'data:image/png;base64,'+ btoa(String.fromCharCode.apply(null, pxs));
      document.body.appendChild(blob_image2);

      // set only partial array
      let arrThres;
      imgPixels.length > 496 ? (arrThres = 496) : (arrThres = imgPixels.length);
      let max_arr = imgPixels.slice(0, arrThres);

      let url = "http://localhost:3001/";
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
          console.log("printing pixel");
          console.log(imArr);

          let final_imageArr = imArr.concat(
            imgPixels.slice(arrThres, imgPixels.length)
          );
          console.log(final_imageArr);
          // console.log("final im arr")
          // console.log(final_imageArr)
          // let newIm = new Uint8Array(final_imageArr);
          // let newIm = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 5, 8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0, 28, 73, 68, 65, 84, 8, 215, 99, 248, 255, 255, 63, 195, 127, 6, 32, 5, 195, 32, 18, 132, 208, 49, 241, 130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14, 31, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
          // setImgUIInt(pxs);
          // console.log("Img length is ")
          // console.log(newIm.length)
          // console.log("IMG UI INT IS ")
          // console.log(imgUInt)
          // combine the first and last of our private key
          // give private key to user
        })
        .catch(error => {
          //handle error
          alert("There was a problem connecting with the server");
        });
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
          <br></br>
          {privateKey ? privateKey : ""}
          {imgData ? imgData : "False"}
        </Description>
        <div>
          <a
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            href={URL.createObjectURL(
              new Blob([{ pxs }.buffer], { type: "image/png" } /* (1) */)
            )}
            download
          >
            Click here to download the new image
          </a>
        </div>
      </div>
    );
  }
};

export default Uploader;
//src={imgData?imgData:""}>
/*
         <img
          alt = "Submitted"
          style={{
            width:"150px",
            height:"auto"
          }}
          src={URL.createObjectURL(
            new Blob([content.buffer], { type: 'image/png' })
          )}>
          </img>
*/
