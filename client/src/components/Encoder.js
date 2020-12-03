import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Collapse } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Uploader from "./Uploader";

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
        Upload a photo or video of your choice, as well as the message you wish
        to encode in the file.
      </Description>

      <div style={{ padding: "1em" }}>
        <Uploader></Uploader>
      </div>

      <div style={{ padding: "20px 0px" }}></div>
      <div
        style={{
          border: "0.50px",
          borderStyle: "solid",
          borderColor: "#cdd3d8"
        }}
      ></div>
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
          <HeaderDescriptions>
            In this form of steganography, the secret message is embeded in the
            least significant bits of a media file. In an image file, each pixel
            is comprised of three bytes of data corresponding to the colors red,
            green, and blue. The Least Significant Bit method changes the last
            bit of each of those bytes to hide one bit of data. Since modifying
            the last bit of the pixel value doesn’t result in a visually
            perceptible change to the picture, a person viewing the original and
            the steganographically modified images won’t be able to tell the
            difference between the two images. The same technique can be applied
            to other digital media, such as audio and video, where data is
            hidden in parts of the file that result in the least change to the
            audible or visual output.
          </HeaderDescriptions>
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
          <HeaderDescriptions>
            RSA is an asymmetric cryptographic algorithm that encrypts and
            decrypts data. It works by factoring a gigantic integer based on the
            multiplication of random prime numbers. The multiplication of these
            two number is easy, but determining these two numbers from the
            product of them is almost nearly impossible. RSA has two keys: a
            public key, which can be stored and shared publicly, and a private
            key, which must be kept secret. Fundamentally, RSA cryptography
            relies on the difficulty of prime factorization as its security
            method.
          </HeaderDescriptions>
        </Collapse>
      </div>
    </div>
  );
};
Encoder.propTypes = {};

export default Encoder;
