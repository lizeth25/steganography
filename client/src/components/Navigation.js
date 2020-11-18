import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from "reactstrap";

const Buttons = styled(Button)`
  padding: 10px 20px;
  border: 0px;
  background: #00de66;
  color: black;

  :hover {
    color: white !important;
    background: #00de66;
  }
`;
// We need to get a state of the page wherever it is and update button color appropriately

const Navigation = props => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen)

  // return(
  //   <div>
  //     <Navbar color = "#00DE66" expand = "md">
  //       <NavbarBrand href="/">Home</NavbarBrand>
  //       <NavbarToggler onClick= {toggle}/>
  //       <Collapse isOpen={isOpen} navbar>
  //         <Nav className="mr-auto" navbar>
  //           <NavItem>
  //             <NavLink href="https://reactstrap.github.io/components/navbar/">Encoder</NavLink>
  //           </NavItem>
  //           <NavItem>
  //             <NavLink href="https://github.com/reactstrap/reactstrap">Decoder</NavLink>
  //           </NavItem>
  //         </Nav>
  //         </Collapse>
  //     </Navbar>
  //   </div>
  // )

  const homeButton = (
    <Buttons
      size="sm"
      type="button"
      name="Home"
      //onClick={() => {
      //  pageSelect("volunteerChoice");
      //}}
    >
      Home
    </Buttons>
  );

  const decoderButton = (
    <Buttons
      size="sm"
      type="button"
      name="Decoder="
      //onClick={() => {
      //  pageSelect("volunteerChoice");
      //}}
    >
      Decoder
    </Buttons>
  );

  const encoderButton = (
    <Buttons
      size="sm"
      type="button"
      name="Encoder"
      //onClick={() => {
      //  pageSelect("volunteerChoice");
      //}}
    >
      Encoder
    </Buttons>
  );

  return (
    <div
      style={{
        backgroundColor: "#00DE66",
        padding: "1em"
      }}
    >
      {homeButton} {encoderButton} {decoderButton}
    </div>
  );
};
Navigation.propTypes = {};

// Navbar.propTypes = {
//   light: PropTypes.bool,
//   dark: PropTypes.bool,
//   fixed: PropTypes.string,
//   color: PropTypes.string,
//   role: PropTypes.string,
//   expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//   // pass in custom element to use
// }

// NavbarBrand.propTypes = {
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//   // pass in custom element to use
// }

// NavbarText.propTypes = {
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//   // pass in custom element to use
// }

export default Navigation;
