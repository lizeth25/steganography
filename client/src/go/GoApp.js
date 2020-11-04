import React, { useState } from 'react';
import data from './seed.json';

import Student from 'Student';

import styled from 'styled-components';

const Title = styled.h1`
text-align: center;
`;

function App() {
  // create two state variables to store the student collection and the current student
   
  const [collection, setCollection] = useState(data);

  // Utilize conditional rendering to only display the Student component when
  // there is a currentStudent

  const [editing, setEditing] = useState(false);


  return (
    <div>
    <Title>CS Majors</Title>


    </div>
  );

}

export default App;
