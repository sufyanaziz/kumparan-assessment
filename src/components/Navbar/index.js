import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const NavbarContainer = styled.div`
  height: 15vh;
  padding: 0 6rem;
  background: var(--dark);
  color: var(--light);
  display: flex;
  align-items: center;

  a {
    color: unset;
    text-decoration: none;
  }

  .header {
    font-size: 22px;
    font-weight: bold;
    margin-right: auto;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link to="/">
        <div className="header">
          <p>Kumparan - Frontend Technical Assessment</p>
        </div>
      </Link>
      <nav className="navbar"></nav>
    </NavbarContainer>
  );
};

export default Navbar;
