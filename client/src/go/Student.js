/*
  Student displays the name and image of a student passed down in its props.

  props:
    student: Student to display
*/

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledArticle = styled.div`
  margin: 40px;
`;

const Student = props => {
  const {
    student: { name, image }
  } = props;

  return (
    <StyledArticle>
      <h3>{name}</h3>
      <div>{image}</div>
    </StyledArticle>
  );
};

Student.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default Student;
