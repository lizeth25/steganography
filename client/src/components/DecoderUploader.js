import React, { Fragment, useState } from "react";
import styled from "styled-components";
const Description = styled.div`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
`;
const DecoderUploader = () => {
  const [fileToDecode, setFileToDecode] = useState("");
  const [fileNameToDecode, setFileNameToDecode] = useState(
    "Choose Image or Video"
  );
  // const [finalFileToDecode, setFinalFileToDecode] = useState("");

  const [mode, setMode] = useState("Start"); //2 Modes: Start and End

  const uploadedFileToDecode = e => {
    setFileToDecode(e.target.files[0]);
    setFileNameToDecode(e.target.files[0].name);
  };
  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileToDecode);
    setMode("End");

    // check restrictions of file
    // set final file , let user know if message found
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
  } else {
    return (
      <div>
        <Description>
          Your image has been successfully decoded! This was the message:
        </Description>
        <div>
          <Description>hi cs 701</Description>
        </div>
      </div>
    );
  }
};

export default DecoderUploader;
