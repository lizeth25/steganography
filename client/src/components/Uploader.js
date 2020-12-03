import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Description = styled.div`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
`;

const Uploader = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image or Video");
  const [finalFile, setFinalFile] = useState("");
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End

  const [imgData, setImgData] = useState(null);
  const [message, setMessage] = useState("");

  const uploadedFile = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadedMessage = e => {
    console.log("Message is ");
    console.log(e.target.value);
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
    attempt();

    // check restrictions of file
    // check if message longer than
    // set final file , let user know if modified
    // use final file w/ script
    // return rsa key
  };
  function attempt() {
    axios
      .get("http://localhost:3001/", {
        crossdomain: true,
        params: { msg_received: message }
      })
      .then(response => {
        let c = response.data.msg_received;
        console.log("printing server message");
        console.log(c);
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

        <a
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          href={imgData}
          download
        >
          Click here to download the new image
        </a>
      </div>
    );
  }
};

export default Uploader;
