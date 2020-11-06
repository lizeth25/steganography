import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
  text-align: center;
  color: black;
`;

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "white"
      }}
    >
      <Title> What is Steganography?</Title>
      <p>
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
      </p>

      <Title> What about Encryption and Cryptography?</Title>
      <p>
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
      </p>

      <Title> Encoder & Decoder Tools</Title>
      <p>
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
      </p>
    </div>
  );
};
Home.propTypes = {};

export default Home;
