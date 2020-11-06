import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
  text-align: center;
`;

const Decoder = () => {
  return (
    <div
      style={{
        backgroundColor: "black"
      }}
    >
      <Title> Decoder </Title>
    </div>
  );
};
Decoder.propTypes = {};

export default Decoder;
