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

var wrup = require("wrapup")();

wrup.require("get-pixels", "get-pixels").up(function(err, js) {
  console.log(js);
});

var getPixels = require("get-pixels");

const Uploader = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image or Video");
  // const [finalFile, setFinalFile] = useState("");
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End

  const [imgData, setImgData] = useState("");
  const [message, setMessage] = useState("");
  var imgUInt;
  var imgPixels;

  const uploadedFile = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadedMessage = e => {
    setMessage(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);

    setMode("End");

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(file);
    //reader.readAsArrayBuffer(file);
    // attempt();

    // check restrictions of file
    // check if message longer than
    // set final file , let user know if modified
    // use final file w/ script
    // return rsa key
  };
  // function attempt() {
  //   axios
  //     .get("http://localhost:3001/", {
  //       crossdomain: true,
  //       params: { msg_received: message }
  //     })
  //     .then(response => {
  //       let c = response.data.msg_received;
  //       console.log("printing server message");
  //       console.log(c);
  //     });
  // }

  function sendData(d) {
    //param d : imgData

    // convert array to image
    // combine first 'half' of array received with last half

    getPixels(d, function(err, pixels) {
      //if(err) {
      //    console.log("Bad image path")
      //   return
      //}
      let pxs = pixels.data;
      imgPixels = Array.from(pxs); // Uint8Arr to []

      console.log("lizeth");
      console.log(imgPixels);
    });

    // set only partial array
    console.log("erika");
    console.log(imgPixels);
    let max_arr = imgPixels.slice(0, 104);

    let URL = "http://localhost:3001/";
    axios
      .get(URL, {
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
        let privateKey = response.data.privateKey;
        console.log("printing pixel");
        console.log(imArr);
        console.log("printing privateKey");
        console.log(privateKey);

        let final_imageArr = imArr.concat(
          imgPixels.slice(104, imgPixels.length)
        );
        imgUInt = new Uint8Array(final_imageArr);
        // combine the first and last of our private key
        // give private key to user
      })
      .catch(error => {
        //handle error
        console.log(error);
      });
  }

  const content = new Uint8Array([
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10,
    0,
    0,
    0,
    13,
    73,
    72,
    68,
    82,
    0,
    0,
    0,
    5,
    0,
    0,
    0,
    5,
    8,
    6,
    0,
    0,
    0,
    141,
    111,
    38,
    229,
    0,
    0,
    0,
    28,
    73,
    68,
    65,
    84,
    8,
    215,
    99,
    248,
    255,
    255,
    63,
    195,
    127,
    6,
    32,
    5,
    195,
    32,
    18,
    132,
    208,
    49,
    241,
    130,
    88,
    205,
    4,
    0,
    14,
    245,
    53,
    203,
    209,
    142,
    14,
    31,
    0,
    0,
    0,
    0,
    73,
    69,
    78,
    68,
    174,
    66,
    96,
    130
  ]);

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
          message was encoded, it was encrypted with RSA. The private key pair
          needed to decrypt the message is:
        </Description>
        <div>
          {sendData(imgData)}
          <a
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            href={URL.createObjectURL(
              new Blob([content.buffer], { type: "image/jpeg" } /* (1) */)
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
