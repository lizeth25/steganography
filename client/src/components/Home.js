import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "white"
      }}
    >
      <div style={{ padding: "20px 0px" }}></div>
      <Title> What is Steganography?</Title>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mattis rhoncus urna
        neque viverra justo nec ultrices dui sapien. Ut tristique et egestas
        quis ipsum suspendisse ultrices gravida dictum. Nullam eget felis eget
        nunc. Turpis nunc eget lorem dolor. Lorem mollis aliquam ut porttitor
        leo a. Dolor sit amet consectetur adipiscing elit. Non odio euismod
        lacinia at quis risus sed vulputate. Ornare massa eget egestas purus
        viverra accumsan. Nibh tortor id aliquet lectus proin nibh. Turpis nunc
        eget lorem dolor sed viverra ipsum nunc. Interdum posuere lorem ipsum
        dolor sit. Amet nulla facilisi morbi tempus iaculis urna. Praesent
        semper feugiat nibh sed pulvinar proin gravida hendrerit. Cursus sit
        amet dictum sit amet. Enim blandit volutpat maecenas volutpat blandit.
        Mattis pellentesque id nibh tortor id aliquet lectus proin.
      </Description>

      <div style={{ padding: "10px 0px" }}></div>

      <Title> What about Encryption and Cryptography?</Title>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mattis rhoncus urna
        neque viverra justo nec ultrices dui sapien. Ut tristique et egestas
        quis ipsum suspendisse ultrices gravida dictum. Nullam eget felis eget
        nunc. Turpis nunc eget lorem dolor. Lorem mollis aliquam ut porttitor
        leo a. Dolor sit amet consectetur adipiscing elit. Non odio euismod
        lacinia at quis risus sed vulputate. Ornare massa eget egestas purus
        viverra accumsan. Nibh tortor id aliquet lectus proin nibh. Turpis nunc
        eget lorem dolor sed viverra ipsum nunc. Interdum posuere lorem ipsum
        dolor sit. Amet nulla facilisi morbi tempus iaculis urna. Praesent
        semper feugiat nibh sed pulvinar proin gravida hendrerit. Cursus sit
        amet dictum sit amet. Enim blandit volutpat maecenas volutpat blandit.
        Mattis pellentesque id nibh tortor id aliquet lectus proin.
      </Description>

      <div style={{ padding: "10px 0px" }}></div>

      <Title> Encoder & Decoder Tools</Title>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mattis rhoncus urna
        neque viverra justo nec ultrices dui sapien. Ut tristique et egestas
        quis ipsum suspendisse ultrices gravida dictum. Nullam eget felis eget
        nunc. Turpis nunc eget lorem dolor. Lorem mollis aliquam ut porttitor
        leo a. Dolor sit amet consectetur adipiscing elit. Non odio euismod
        lacinia at quis risus sed vulputate. Ornare massa eget egestas purus
        viverra accumsan. Nibh tortor id aliquet lectus proin nibh. Turpis nunc
        eget lorem dolor sed viverra ipsum nunc. Interdum posuere lorem ipsum
        dolor sit. Amet nulla facilisi morbi tempus iaculis urna. Praesent
        semper feugiat nibh sed pulvinar proin gravida hendrerit. Cursus sit
        amet dictum sit amet. Enim blandit volutpat maecenas volutpat blandit.
        Mattis pellentesque id nibh tortor id aliquet lectus proin.
      </Description>
    </div>
  );
};
Home.propTypes = {};

export default Home;
