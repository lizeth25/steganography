import React from "react";
import styled from "styled-components";
import DecoderUploader from "./DecoderUploader";

const Title = styled.h1`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 24px;
  padding: 0.5em;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

const Description = styled.p`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
`;

const Decoder = () => {
  return (
    <div
      style={{
        backgroundColor: "white"
      }}
    >
      <div style={{ padding: "20px 0px" }}></div>

      <Title> Instructions </Title>
      <Description>
        Upload the encoded photo or video, as well as the private key pair
        needed to decrypt the message.
      </Description>

      <div style={{ padding: "1em" }}>
        <DecoderUploader></DecoderUploader>
      </div>

      <div style={{ padding: "20px 0px" }}></div>
    </div>
  );
};
Decoder.propTypes = {};

export default Decoder;
