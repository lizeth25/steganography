import React, { Fragment, useEffect, useState } from "react";

const Uploader = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image or Video");
  const [finalFile, setFinalFile] = useState("");

  const uploadedFile = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);

    // check restrictions of file
    // check if message longer than
    // set final file , let user know if modified
    // use final file w/ script
    // return rsa key
  };

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
          />
        </div>

        <div style={{ left: "26%", width: "50%" }} className="custom-file mb-4">
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
};

export default Uploader;