import React, { Fragment, useState } from "react";

const DecoderUploader = () => {
  const [fileToDecode, setFileToDecode] = useState("");
  const [fileNameToDecode, setFileNameToDecode] = useState(
    "Choose Image or Video"
  );
  // const [finalFileToDecode, setFinalFileToDecode] = useState("");

  const uploadedFileToDecode = e => {
    setFileToDecode(e.target.files[0]);
    setFileNameToDecode(e.target.files[0].name);
  };
  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileToDecode);

    // check restrictions of file
    // set final file , let user know if message found
  };

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
        <div style={{ left: "26%", width: "50%" }} className="custom-file mb-4">
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
};

export default DecoderUploader;
