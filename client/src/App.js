import React from "react";
import "./App.css";
import styled from "styled-components";

import Home from "./components/Home";
import Encoder from "./components/Encoder";
import Decoder from "./components/Decoder";
import Navigation from "./components/Navigation";

const Title = styled.h1`
  text-align: center;
  color: green;
`;

const App = () => {
  return (
    <div
      style={{
        backgroundColor: "black"
      }}
    >
      <Title> Steganography </Title>
      <Navigation> </Navigation>
      <Home></Home>
    </div>
  );
};

export default App;
