import React from "react";
import Navbar from "../Navbar";
import styled from "styled-components";

const LayoutContainer = styled.div`
  .layout-child {
    margin: 2rem 6rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <div className="layout-child">{children}</div>
    </LayoutContainer>
  );
};

export default Layout;
