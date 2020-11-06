import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
  text-align: center;
`;

const Encoder = () => {
  return (
    <div
      style={{
        backgroundColor: "black"
      }}
    >
      <Title> Encoder </Title>
    </div>
  );
};
Encoder.propTypes = {};

export default Encoder;
