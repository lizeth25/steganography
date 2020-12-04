import React from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mattis rhoncus urna
        neque viverra justo nec ultrices dui sapien. Ut tristique et egestas
        quis ipsum suspendisse
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
