import "./App.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Home from "./components/Home";
import Encoder from "./components/Encoder";
import Decoder from "./components/Decoder";
import Navigation from "./components/Navigation";

// library.add(faAngleRight)
// library.add(faAngleDown)

const Title = styled.h1`
  text-align: center;
  color: #00de66;
  padding: 1em;
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-family: Kohinoor Bangla;
  font-size: 42px;
`;

const Buttons = styled(Button)`
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: black;
  font-family: Kohinoor Bangla;
  box-shadow: 0;

  :hover {
    color: white;
    background: transparent;
    text-decoration: underline;
    border: none;
  }
`;

const Selected = styled(Button)`
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: white;
  font-family: Kohinoor Bangla;
  text-decoration: underline;
  box-shadow: 0;

  :hover {
    color: white;
    background: transparent;
    text-decoration: underline;
    border: none;
  }
`;

const App = () => {
  const [mode, setMode] = useState("Home"); //3 Modes: Home, Encoder, and Decoder

  const homeButton = (
    <Buttons
      size="sm"
      type="button"
      name="Home"
      onClick={() => {
        setMode("Home");
      }}
    >
      Home
    </Buttons>
  );

  const encoderButton = (
    <Buttons
      size="sm"
      type="button"
      name="Encoder"
      onClick={() => {
        setMode("Encoder");
      }}
    >
      Encoder
    </Buttons>
  );

  const decoderButton = (
    <Buttons
      size="sm"
      type="button"
      name="Decoder="
      onClick={() => {
        setMode("Decoder");
      }}
    >
      Decoder
    </Buttons>
  );

  const currentButton = (
    <Selected
      size="sm"
      type="button"
      name="Decoder="
      onClick={() => {
        setMode(mode);
      }}
    >
      {mode}
    </Selected>
  );

  if (mode === "Home") {
    return (
      <div style={{ backgroundColor: "black", padding: "0em" }}>
        <Title>Welcome to StegMsg</Title>
        <div
          style={{
            backgroundColor: "#00DE66",
            padding: "2em"
          }}
        >
          <div style={{ float: "right", align: "right", margin: "-20px 0px" }}>
            {currentButton} {encoderButton} {decoderButton}
          </div>
        </div>
        <Home></Home>
      </div>
    );
  } else if (mode === "Encoder") {
    return (
      <div style={{ backgroundColor: "black", padding: "0em" }}>
        <Title>StegMsg</Title>
        <div
          style={{
            backgroundColor: "#00DE66",
            padding: "2em"
          }}
        >
          <div style={{ float: "right", align: "right", margin: "-20px 0px" }}>
            {homeButton} {currentButton} {decoderButton}
          </div>
        </div>
        <Encoder></Encoder>
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "black", padding: "0em" }}>
        <Title>StegMsg</Title>
        <div
          style={{
            backgroundColor: "#00DE66",
            padding: "2em"
          }}
        >
          <div style={{ float: "right", align: "right", margin: "-20px 0px" }}>
            {homeButton} {encoderButton} {currentButton}
          </div>
        </div>
        <Decoder></Decoder>
      </div>
    );
  }
};

export default App;
