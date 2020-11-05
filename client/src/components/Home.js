import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
  text-align: center;
`;

const Home = () => {
  return (
    <div>
      <Title> What is Steganography? </Title>
    </div>
  );
};
Home.propTypes = {};

export default Home;
