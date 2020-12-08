import { check } from "prettier";
import React, { Fragment, useState, useEffect, useRef, createRef } from "react";
import styled from "styled-components";
import Home from "./Home";
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

var download = require("downloadjs");

// from
// https://stackoverflow.com/questions/21354235/converting-binary-to-text-using-javascript
function binaryToText(b) {
  return b.replace(/[01]{8}/g, function(v) {
    return String.fromCharCode(parseInt(v, 2));
  });
}

/*
DONE
add 'here is your original image' and 'upload only png'
*/

/*
TO DO
fix 'encode another image'
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

const DecoderUploader = () => {
  const [fileNameToDecode, setFileNameToDecode] = useState(
    "Choose Image or Video"
  );
  const [mode, setMode] = useState("Start"); //2 Modes: Start and End
  const [imgData, setImgData] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");
  const [image, setImage] = useState(null);
  const [encrypted, setEncrypted] = useState("");
  const [uploadedKey, setUploadedKey] = useState("");
  const canvas = React.useRef(null);

  function sendImageKey() {
    const url = "http://localhost:3001/decoded";
    console.log("being sent to server, hopefully");
    const correct =
      "nVSH+GSmK6r+BB4r0onZ5LVrdTDKKUisUAq1UeItJ81D2b6mHmZP1cxQc/PNrm7vSV+B+5bXuZL6cRdX52YgTX5LPDQ5SkpYPj3p8eYYD7Z9zn9pTsIYyGUhdE7g9VeiGJCIOrh+jzb2xyBx8ROwS6SXTkkYhkEypBw1R8WCo2Y=";
    console.log(correct === encrypted);
    console.log(encrypted);
    console.log(uploadedKey);
    axios
      .get(url, {
        crossdomain: true,
        params: {
          encryptedK: encrypted,
          pkey: uploadedKey
        }
      })
      .then(response => {
        //handle success
        console.log("sent to server");
        setDecodedMessage(response.data.decodedMessage);
        console.log(response.data.decodedMessage);
      })
      .catch(error => {
        //handle error
        alert(error);
      });
  }

  useEffect(() => {
    const newImage = new Image();
    newImage.src = imgData;
    newImage.onload = () => {
      setImage(newImage);
    };
  }, [imgData]);

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      const w = canvas.current.width;
      const h = canvas.current.height;
      console.log(w, h);
      ctx.drawImage(image, 0, 0); // displays image

      const imageData = ctx.getImageData(0, 0, w, h);
      var data = imageData.data;
      // for Decoder

      // using * as signal to denote when the length of the message is done being encoded into message
      const signal = "00101010"; // represents the first *
      var len_str = ""; // bin string w/ length
      var msg_len; // bin String converted
      var hidden_msg = ""; // encoded bin str
      var foundLen = false;
      var foundMsg = false;
      var index = 0;
      var out_msg = "";
      console.log(data);

      // checking to see if encoded image and if so finding length of hidden msg
      for (var i = 0; i < data.length; i += 4) {
        const num = data[i];
        const binNum = num.toString(2);
        const least_bit = binNum.slice(-1);
        len_str += least_bit;
        const l = len_str.length;
        if (l !== 0 && l % 8 === 0) {
          const last_eight = len_str.slice(-8);
          if (last_eight === signal) {
            try {
              const beforeStr = len_str.slice(0, l - 8);
              const beforeInt = binaryToText(beforeStr);
              console.log("before");
              console.log(beforeInt);
              msg_len = parseInt(beforeInt, 10); // length of out bit message
              foundLen = true;
              console.log("Found Length", msg_len.toString());
              console.log("final index i am at ", i.toString());
            } catch {
              out_msg = "Not an encoded image";
            }
          }
        }
      }
      console.log(msg_len);

      if (foundLen) {
        const startIndex = (msg_len.toString().length + 1) * 8 * 4;
        console.log("start index ", startIndex);
        const remainingBits = msg_len * 8;
        console.log("remaining ", remainingBits);
        for (var i = 0; i < remainingBits * 4; i += 4) {
          const num = data[i + startIndex];
          const binNum = num.toString(2);
          const least_bit = binNum.slice(-1);
          hidden_msg += least_bit;
        }
        foundMsg = true;
        console.log("Hidden message");
        console.log(hidden_msg);
        console.log(hidden_msg.length);
        console.log(binaryToText(hidden_msg));
        console.log(w, h);
      } else {
        out_msg = "Not an encoded image";
        console.log(out_msg);
      }

      // // we can use len_str to add 8 bin chars which we will convert to a number unless it is our signal
      // // always check last 8 chars for signal. when found turn len_str[:-8] into integer
      // // Then we keep and index and for every set of 8 bin numbers we have one character we add to our message
      // var aR = []
      // // calculate length of the message by adding appropriate bin value to len_str until * tells us when to stop adding
      // decode:
      // for (var i = 0; i < data.length; i += 4) {
      //   // if (i % 4 != 3) {
      //   if (!foundMsg) {
      //     aR.push(i)
      //     const num = data[i];
      //     const binNum = num.toString(2);
      //     const least_bit = binNum.slice(-1);
      //     if (!foundLen) {
      //       console.log("Cool")
      //       if (len_str != "" && len_str.length % 8 == 0) {
      //         const last_eight = len_str.slice(-8);
      //         // we can check last 8 bits added and convert to a character
      //         if (last_eight === signal) {
      //           foundLen = true;
      //           try {
      //             msg_len = parseInt(msg_len, 10); // length of out bit message
      //             console.log("Found String",msg_len)
      //             hidden_msg += least_bit;
      //           } catch {
      //             console.log("caught err")
      //             out_msg = "Not an encoded image";
      //             break decode;
      //           }

      //         }
      //         // if not the signal, convert the eight bits to a character
      //         else {
      //           msg_len += binaryToText(last_eight);
      //           len_str += least_bit; // check this
      //         }
      //       } else {
      //         // we are adding the least significant value to our len_str until we find signal
      //         len_str += least_bit;
      //       }
      //     }

      //     // length has been found we now are ready to add our binary numbers to our msg string and then convert
      //     else {
      //       if (index < (msg_len * 8)) {
      //         hidden_msg += least_bit;
      //         index += 1;
      //       } else {
      //         foundMsg = true;
      //       }
      //     }
      //   }
      //   //}
      // }

      // if (!foundMsg) {
      //   out_msg = "Not an encoded image";
      // } else {
      //   // Our message now contains all the bits we need to convert
      //   out_msg = binaryToText(hidden_msg);
      //   // out_msg = out_msg.slice(0, -1);
      // }
      // console.log(aR)
      // console.log("hidden text is");
      // console.log(hidden_msg);
      // console.log(out_msg)

      // examples
      var corr =
        "nVSH+GSmK6r+BB4r0onZ5LVrdTDKKUisUAq1UeItJ81D2b6mHmZP1cxQc/PNrm7vSV+B+5bXuZL6cRdX52YgTX5LPDQ5SkpYPj3p8eYYD7Z9zn9pTsIYyGUhdE7g9VeiGJCIOrh+jzb2xyBx8ROwS6SXTkkYhkEypBw1R8WCo2Y=";
      var keyy =
        "b'-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQCa2YBlh3RGDve2sS3sAt0DtqSzoCofH2KqQ8vvhcfWyPX+YYvs\n44jCN+m/CwpGD8UIxdvjERkGNMrnAeaOQe0oGDJrdL7OYNPKVk01ihCFR7yvNE1c\nSbgHxMiYQGS8Vafqik0RirZ7tFuCD/M8c4/B+nFvoeMjXIZ2Fn8ljztMJQIDAQAB\nAoGAPsne5ExOe3HqQ+wIIODwWWcf1a4mJkSFr2CaOt9WLuOBy8omAMIqXAZsA4ko\ne0w9qtb/2EzAhuG1PIJqyFg3Hx8WCWaXiXF/0Jg9BMaKJ9i2JxfH2HBVAG4b51m7\nyQJCLjrDxBULjQno7eOGuXEqtfMU8TeRShD6oq3oCiAfFsECQQC63N1wONylkhdC\n3jbvyqnzluabHk2rxYRd+RigOW0LqvNQAV5iMJMSLxgXYUiIRjdN14cH3Q6cYrds\nElc/2xANAkEA1CRwSF9VPDyctNsXdhSgP3Rz0w198JHEPlPURNU3w35M0lm8vtP/\nM0Xx0WAPs/1ZcvwDVtqyBisRzCKguRAOeQJAQEu6zeBi232XD2USlhOvwqcLlhgp\nNY9y6jrJpGfeA4PA0KiH51U7Zahaq8DHikxOvzQHvEbtvhWhc0gkSU6BCQJBAKBq\nUXGYjSZ4mvLzfUEwBaEWGQNt/16rix6qWygVpw4v8j1Z2Czgt+h4qovtvNIY8MvP\nH2NNCjM53EJlqO1n49kCQHvUokmpJfT0lVJiWPztIOVTrhDcbu9Ygrxc4xYBwOzL\nBOXlcSpfs1k6C2DS04UUJUIuEQ62SQqiAzLW+2sWeWc=\n-----END RSA PRIVATE KEY-----'";

      setEncrypted(corr);
      console.log("encrypted.length");
      console.log(corr);
      console.log(corr.length);
      //setDecodedMessage(out_msg);

      ctx.putImageData(imageData, 0, 0); // i think we can delete
    }
  }, [image, canvas]);

  const uploadedKeyInput = e => {
    const pk =
      "-----BEGIN RSA PRIVATE KEY-----MIICWwIBAAKBgQCtF/UjdBQty6fyBTKxyHP7y4+ivSnc4mvPmJAtsVnze3UwS5EGtwGCZXXofeK6u9UhuZgBS3JN2AgieNShlstNVip8l3EycxPzCP0hpbwdcvpK0UtZ72G59nwD/OahkGS4JST8jS/pIsSXoovBmqpGkOXOGaOIf3lt/wsmFXEsyQIDAQABAoGAE4oOzA/Ab2L79GAN1u/P1+6kqjQ8U4jjrq2EKQRKKSgYlHkTR/TEoNmfM71yKK4nYwU2WX8QyiTG1k1Zg1woWsUCO6lKJ62f9tZGMrMi9O8XFfys4s937i3UfygC/dXXzq7WSeerOd9ZdwVenRyMLY7FaAHW9bbSflSJhM5dohkCQQDMziS5CZpieIP98431QghQVcfAlqBfpxS6wDf3Rna5gelbNq3e4aU1e5dKqo1B9suJX+SFhbdUSoJH7oDOKFKrAkEA2FyHFcb/ic10gJX3TXPIPmTxHTPO7zXZAlY8HwUT5xfNhU/vGzMm1vQ1d1APEoyDTS6dRLOZL+HaPT31FENeWwJAKYG1y5J4qXBHP9Z2dLg3OyDHZO6h/gC8oMSIEyNCuIHtq0C/qCYO93HezZEXI8FCqsq2Y6Ef8INROAbML/vYFQJATe29xg0/+y1iOfJJ+b6rMDYBVmhTr3swp5PR4cZdbc33+31X/O8GnUOmgkv2sdKkdEdG4/jgQwvRJF/NhzfgowJAOYWSyK0cAnEdDG5jfOCE4ptchWu80mNCIlJcI7RJkWd8OyqXXzNEMO+KveNmfVzObdpQTqQkC6NTOIbCikWHAA==-----END RSA PRIVATE KEY-----";
    // setUploadedKey(e.target.value);
    setUploadedKey(pk);
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
    console.log("encrypted is:");
    console.log(encrypted);
    console.log("private key before calling send()");
    console.log(uploadedKey);

    sendImageKey();
    setTimeout(function() {
      setMode("End");
    }, 1000);
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

          <Description>
            This is the encoded image you uploaded! <br></br>
            <br></br>
          </Description>
          <div
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <canvas ref={canvas} />
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
