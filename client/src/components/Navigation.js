import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const Title = styled.h1`
  text-align: center;
`;

const Navigation = () => {
  const homeButton = (
    <Button
      size="sm"
      type="button"
      name="Home"
      style={{ float: "right" }}
      //onClick={() => {
      //  pageSelect("volunteerChoice");
      //}}
    >
      Home
    </Button>
  );

  const decoderButton = (
    <Button
      size="sm"
      type="button"
      name="Decoder="
      style={{ float: "right" }}
      //onClick={() => {
      //  pageSelect("volunteerChoice");
      //}}
    >
      Decoder
    </Button>
  );

  const encoderButton = (
    <Button
      size="sm"
      type="button"
      name="Encoder"
      style={{ float: "right" }}
      //onClick={() => {
      //  pageSelect("volunteerChoice");
      //}}
    >
      Encoder
    </Button>
  );

  return (
    <div
      style={{
        backgroundColor: "green"
      }}
    >
      <Title>
        {" "}
        ... {decoderButton} {encoderButton} {homeButton}{" "}
      </Title>

      <div></div>
    </div>
  );
};
Navigation.propTypes = {};

export default Navigation;
