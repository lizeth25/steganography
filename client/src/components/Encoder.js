import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Collapse } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const HeaderDescriptions = styled.p`
  text-align: left;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 2em;
`;

const Upload = styled.div`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  padding: 0em 2em;
  align: center;
`;

const SubHeaders = styled(Button)`
  text-align: left;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 20px;
  padding: 0.5em;
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-weight: 500;
  outline: transparent;
`;

const Encoder = () => {
  const [LSBisOpen, LSBsetIsOpen] = useState(false);
  const [RSAisOpen, RSAsetIsOpen] = useState(false);

  const toggleLSB = () => LSBsetIsOpen(!LSBisOpen);
  const toggleRSA = () => RSAsetIsOpen(!RSAisOpen);

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

      <div style={{ padding: "20px 0px" }}></div>

      <Upload>
        <form onSubmit={console.log("submitted!")}>
          <label>
            Upload File
            <input style={{ padding: "0px 0px 0px 50px" }} type="file" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Upload>

      <div style={{ padding: "20px 0px" }}></div>

      <Title> Techniques </Title>
      <div>
        <SubHeaders
          color="transparent"
          onClick={toggleLSB}
          style={{ marginBottom: "1rem" }}
        >
          Least Significant Bit (LSB)
        </SubHeaders>
        <Collapse isOpen={LSBisOpen}>
          <HeaderDescriptions>Explanation for LSB</HeaderDescriptions>
        </Collapse>
      </div>

      <div>
        <SubHeaders
          color="transparent"
          onClick={() => {
            toggleRSA();
          }}
          style={{ marginBottom: "1rem" }}
        >
          Rivest-Shamir-Adleman (RSA)
        </SubHeaders>
        <Collapse isOpen={RSAisOpen}>
          <HeaderDescriptions>Explanation for RSA</HeaderDescriptions>
        </Collapse>
      </div>
    </div>
  );
};
Encoder.propTypes = {};

export default Encoder;
